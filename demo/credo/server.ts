import express, { Request, Response } from "express";
import { BaseAgent } from "./agent";
import cors from "cors";
import dotenv from "dotenv";
import { PredicateProps } from "types";
dotenv.config();

console.log(process.argv[2]);
console.log('issuer agent public endpoint: ', process.env.ISSUER_AGENT_PUBLIC_ENDPOINT);
const agentType = process.argv[2];
const port =
  agentType === "--issuer"
    ? parseInt(process.env.ISSUER_API_PORT || "4000")
    : parseInt(process.env.VERIFIER_API_PORT || "4002");
const agentPublicEndpoint =
  (agentType === "--issuer"
    ? process.env.ISSUER_AGENT_PUBLIC_ENDPOINT
    : process.env.VERIFIER_AGENT_PUBLIC_ENDPOINT) || `http://localhost:${port}`;
const agentLabel =
  (agentType === "--issuer"
    ? process.env.ISSUER_AGENT_LABEL
    : process.env.VERIFIER_AGENT_LABEL) || "MyAgent";
const agentDid =
  agentType === "--issuer"
    ? process.env.ISSUER_DID!
    : process.env.VERIFIER_DID!;
const agentSeed =
  agentType === "--issuer"
    ? process.env.ISSUER_SEED!
    : process.env.VERIFIER_SEED!;

// Initialize the agent
const agent = new BaseAgent({
  port: port + 1,
  label: agentLabel,
  publicEndpoint: agentPublicEndpoint,
});
let credentialDefinitionId: string;

const app = express();
app.use(express.json());
app.use(cors());

const initializeAgent = async () => {
  try {
    await agent.init();
    console.log(
      `${
        agentType === "--issuer" ? "Issuer Agent" : "Verifier Agent"
      } initialized successfully.`
    );

    if (agentType === "--issuer") {
      await agent.importDid(agentDid, agentSeed);
      console.log("DID imported successfully.");

      const schemaTemplate = {
        name: "cryptic",
        version: `1.1.${Math.floor(Math.random() * 100)}`,
        attrNames: ["name", "age", "email", "department"],
        issuerId: agentDid,
      };

      const schemaResp = await agent.createSchema(agentDid, schemaTemplate);
      console.log(schemaResp);
      if (schemaResp.schemaState.state !== "finished") {
        throw new Error("Schema creation error: " + JSON.stringify(schemaResp));
      }
      const schemaId = schemaResp.schemaState.schemaId;

      const credDefResp = await agent.createCredentialDefinition(
        agentDid,
        schemaId,
        "bachelor degree"
      );
      console.log(credDefResp);
      if (credDefResp.credentialDefinitionState.state !== "finished") {
        throw new Error(
          "Credential definition creation error: " + JSON.stringify(credDefResp)
        );
      }
      credentialDefinitionId =
        credDefResp.credentialDefinitionState.credentialDefinitionId;
    }
  } catch (error) {
    console.error("Error initializing BaseAgent:", error);
  }
};

app.get("/wallet-dids", async (req: Request, res: Response) => {
  const { method } = req.query;

  try {
    const result = await agent.getWalletDids(method as string);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post("/create-invitation", async (req: Request, res: Response) => {
  const { label, alias, domain } = req.body;
  const agent_domain = process.env.ISSUER_AGENT_PUBLIC_ENDPOINT ?? `http://localhost:${port+1}`;
  try {
    const result = await agent.createInvitation({ label, alias, domain: agent_domain });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get("/connections", async (req: Request, res: Response) => {
  const { connectionId, outOfBandId } = req.query;
  try {
    const result = await agent.getConnections({
      connectionId: connectionId as string,
      outOfBandId: outOfBandId as string,
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// For Issuer Agent only
app.post("/create-schema", async (req: Request, res: Response) => {
  const { did, name, version, attributes } = req.body;
  const regex = /^\d+\.\d+\.\d+$/;
  if (!Array.isArray(attributes) || attributes.length === 0) {
    return res
      .status(400)
      .send({ error: "attributes must be an array with at least one element" });
  }
  if (!regex.test(version)) {
    return res
      .status(400)
      .send({ error: "version must be in the format x.x.x" });
  }
  if (!did) {
    return res.status(400).send({ error: "did is required" });
  }
  if (!name) {
    return res.status(400).send({ error: "schema name is required" });
  }

  const schema = {
    issuerId: did,
    name,
    version,
    attrNames: attributes,
  };
  try {
    const result = await agent.createSchema(did, schema);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// For Issuer Agent only
app.get("/schemas", async (req: Request, res: Response) => {
  const { schemaId } = req.query;
  try {
    const result = await agent.getSchema(schemaId as string);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// For Issuer Agent only
app.post("/credential-definition", async (req: Request, res: Response) => {
  const { did, schemaId, tag } = req.body;

  if (!did) {
    return res.status(400).send({ error: "did is required" });
  }
  if (!schemaId) {
    return res.status(400).send({ error: "schemaId is required" });
  }

  try {
    const result = await agent.createCredentialDefinition(did, schemaId, tag);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// For Issuer Agent only
app.get("/credential-definitions", async (req: Request, res: Response) => {
  const { credentialDefinitionId } = req.query;

  try {
    const result = await agent.getCredentialDefinition(
      credentialDefinitionId as string
    );
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// For Issuer Agent only
app.post("/issue-credential", async (req: Request, res: Response) => {
  const { connectionId, name, email, age } = req.body;
  if (!connectionId) {
    return res.status(400).send({ error: "connectionId is required" });
  }
  if (!credentialDefinitionId) {
    return res
      .status(400)
      .send({ error: "credentialDefinitionId is required" });
  }
  const attributes = [
    {
      name: "name",
      value: `${name ?? "Jhon Doe"}`,
    },
    {
      name: "age",
      value: `${age ?? 30}`,
    },
    {
      name: "email",
      value: `${email ?? "test@test.com"}`,
    },
    {
      name: "department",
      value: "Computer Science",
    },
  ];
  if (!Array.isArray(attributes) || attributes.length === 0) {
    return res
      .status(400)
      .send({ error: "attributes must be an array with at least one element" });
  }

  for (const attribute of attributes) {
    if (!attribute.name || !attribute.value) {
      return res
        .status(400)
        .send({ error: "attributes must have a name and value" });
    }
  }
  try {
    const result = await agent.issueAnonCredsCredential(
      connectionId,
      credentialDefinitionId,
      attributes
    );
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

// For Issuer Agent only
app.get("/issued-credentials", async (req: Request, res: Response) => {
  const { credentialId } = req.query;

  try {
    const result = await agent.getIssuedCredenitalRecords(
      credentialId as string
    );
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post("/send-proof-request", async (req: Request, res: Response) => {
  const { proofRequestlabel, connectionId, version } = req.body;
  const attributes = {
    name: {
      names: ["department"],
      restriction:
        agentType === "--issuer"
          ? [{ cred_def_id: credentialDefinitionId }]
          : [],
    },
  };
  const predicates: PredicateProps = {
    name: {
      name: "age",
      p_type: ">=",
      p_value: 20,
      restriction:
        agentType === "--issuer"
          ? [{ cred_def_id: credentialDefinitionId }]
          : [],
    },
  };
  if (!proofRequestlabel) {
    return res.status(400).send({ error: "proofRequestlabel is required" });
  }
  if (!connectionId) {
    return res.status(400).send({ error: "connectionId is required" });
  }

  try {
    const result = await agent.sendProofRequest({
      proofRequestlabel,
      connectionId,
      version,
      attributes,
      predicates,
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get("/proof-records", async (req: Request, res: Response) => {
  const { proofRecordId } = req.query;

  try {
    const result = await agent.getProofRecords(proofRecordId as string);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get("/proof-data/:proofRecordId", async (req: Request, res: Response) => {
  const { proofRecordId } = req.params;
  if (!proofRecordId) {
    return res.status(400).send({ error: "proofRecordId is required" });
  }

  try {
    const result = await agent.getProofData(proofRecordId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post("/send-message", async (req: Request, res: Response) => {
  const { connectionId, message } = req.body;
  if (!connectionId) {
    return res.status(400).send({ error: "connectionId is required" });
  }
  if (!message) {
    return res.status(400).send({ error: "message is required" });
  }
  try {
    const result = await agent.sendMessage(connectionId, message);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
app.listen(port, async () => {
  console.log(`Server running on http://localhost:${port}`);
  await initializeAgent();
});
