import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PredicateProps } from "types";
import { apiFetch } from "./utils/network-call";
import { createConnection, createCredentialDefinition, createSchema, getConnection, getCredentialDefinition, getIssuedCredential, getProofRequest, getSchema, getWalletDids, issueCredential, sendMessage, sendProofRequest } from "./api";
dotenv.config();

const agentType = process.argv[2];
const port =
  agentType === "--issuer"
    ? parseInt(process.env.ISSUER_API_PORT || "4000")
    : parseInt(process.env.VERIFIER_API_PORT || "4002");


let credentialDefinitionId: string = "";

const app = express();
app.use(express.json());
app.use(cors());



app.get("/wallet-dids", async (req: Request, res: Response) => {
  const { method } = req.query;

  try {
    const result = apiFetch(getWalletDids(method), 'GET');
    if(result){
      res.status(200).send(result);
    }else{
      res.status(500).send({ error: "fetching wallet dids failed" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//* DONE
app.post("/create-invitation", async (req: Request, res: Response) => {
  const { label, alias, domain } = req.body;
  try {
    const result = await apiFetch(createConnection, 'POST', {my_label: label});
    if(result){
      res.status(200).send(result);
    }else{
      res.status(500).send({ error: "creating invitation failed" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


//* DONE
app.get("/connections", async (req: Request, res: Response) => {
  const { connectionId, outOfBandId } = req.query;
  try {
    const result = await apiFetch(getConnection(connectionId), 'GET');
    if(result){
      res.status(200).send(result);
    }else{
      res.status(500).send({ error: "fetching connection details failed" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//*DONE
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
  // if (!did) {
  //   return res.status(400).send({ error: "did is required" });
  // }
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
    const result = await apiFetch(createSchema, 'POST', {attributes, schema_name: name, schema_version: version});
    if(result){
      res.status(200).send(result);
    }else{
      res.status(500).send({ error: "creating schema failed" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//* DONE
// For Issuer Agent only
app.get("/schemas", async (req: Request, res: Response) => {
  const { schemaId } = req.query;
  try {
    const result = await apiFetch(getSchema(schemaId), 'GET');
    if(result){
      res.status(200).send(result);
    }else{
      res.status(500).send({ error: "fetching schema failed" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


//* DONE
// For Issuer Agent only
app.post("/credential-definition", async (req: Request, res: Response) => {
  const { did, schemaId, tag } = req.body;

  // if (!did) {
  //   return res.status(400).send({ error: "did is required" });
  // }
  if (!schemaId) {
    return res.status(400).send({ error: "schemaId is required" });
  }

  try {
    const result = await apiFetch(createCredentialDefinition, 'POST', {schema_id: schemaId, tag});
    if(result){
      credentialDefinitionId = result.credential_definition_id;
      res.status(200).send(result);
    }else{
      res.status(500).send({ error: "createing credential definition failed" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


//* DONE
// For Issuer Agent only
app.get("/credential-definitions", async (req: Request, res: Response) => {
  const { credentialDefinitionId } = req.query;
  try {
    const result = await apiFetch(getCredentialDefinition(credentialDefinitionId), 'GET');
    if(result){
      res.status(200).send(result);
    }else{
      res.status(500).send({ error: "fetching credential definition failed" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


//* DONE
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
      mime: "application/json",
      name: "name",
      value: `${name ?? "Jhon Doe"}`,
    },
    {
      mime: "application/json",
      name: "age",
      value: `${age ?? 30}`,
    },
    {
      mime: "application/json",
      name: "email",
      value: `${email ?? "test@test.com"}`,
    },
    {
      mime: "application/json",
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

    const result = await apiFetch(issueCredential, 'POST', {connection_id: connectionId, cred_def_id: credentialDefinitionId, credential_preview: {attributes}});
    if(result){
      res.status(200).send(result);
    }else{
      res.status(500).send({ error: "issuing credential failed" });
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});


//* DONE
// For Issuer Agent only
app.get("/issued-credentials", async (req: Request, res: Response) => {
  const { credentialId } = req.query;

  try {
    const result = await apiFetch(getIssuedCredential(credentialId), 'GET');
    if(result){
      res.status(200).send(result);
    }else{
      res.status(500).send({ error: "issuing credential failed" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


//* DONE
app.post("/send-proof-request", async (req: Request, res: Response) => {
  const { proofRequestlabel, connectionId, version } = req.body;
  console.log('credDefId: ', credentialDefinitionId);
  const attributes = {
    name: {
      names: ["department"],
      restrictions:
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
      restrictions:
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
    const result = await apiFetch(sendProofRequest, 'POST', {connection_id: connectionId, proof_request: {requested_attributes: attributes, requested_predicates: predicates}});
    if(result){
      res.status(200).send(result);
    }else{
      res.status(500).send({ error: "sending proof request failed" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//* DONE
app.get("/proof-records", async (req: Request, res: Response) => {
  const { proofRecordId } = req.query;

  try {
    const result = await apiFetch(getProofRequest(proofRecordId), 'GET');
    if(result){
      res.status(200).send(result);
    }else{
      res.status(500).send({ error: "fetching proof request failed" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//* DONE
app.get("/proof-data/:proofRecordId", async (req: Request, res: Response) => {
  const { proofRecordId } = req.params;
  if (!proofRecordId) {
    return res.status(400).send({ error: "proofRecordId is required" });
  }

  try {
    const result = await apiFetch(getProofRequest(proofRecordId), 'GET');
    if(result){
      res.status(200).send(result);
    }else{
      res.status(500).send({ error: "fetching proof request failed" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//* DONE
app.post("/send-message", async (req: Request, res: Response) => {
  const { connectionId, message } = req.body;
  if (!connectionId) {
    return res.status(400).send({ error: "connectionId is required" });
  }
  if (!message) {
    return res.status(400).send({ error: "message is required" });
  }
  try {
    const result = await apiFetch(sendMessage(connectionId), 'POST', {content: message});
    if(result){
      res.status(200).send(result);
    }else{
      res.status(500).send({ error: "sending message failed" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


app.listen(port, async () => {
  console.log(`Server running on http://localhost:${port}`);
});
