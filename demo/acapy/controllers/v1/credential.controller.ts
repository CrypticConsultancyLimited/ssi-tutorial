import { BaseAgent } from "./agent.base";
import { Request, Response } from "express";
import { apiFetch } from "../../utils/network-call";
import { getIssuedCredential, issueCredential } from "../../api_v1";

export class CredentialController extends BaseAgent {

  static async issueCredential(req: Request, res: Response){
    const { connectionId, name, email, age } = req.body;
    console.log('----- >>> credDefId: ', BaseAgent.credentialDefinitionId);
    if (!connectionId) {
      return res.status(400).send({ error: "connectionId is required" });
    }
    if (!BaseAgent.credentialDefinitionId) {
      return res
        .status(400)
        .send({ error: "credentialDefinitionId is required" });
    }
    const attributes = [
      {
        // "mime-type": "application/json",
        "name": "name",
        "value": `${name ?? "Jhon Doe"}`,
      },
      {
        // "mime-type": "application/json",
        "name": "age",
        "value": `${age ?? 30}`,
      },
      {
        // "mime-type": "application/json",
        "name": "email",
        "value": `${email ?? "test@test.com"}`,
      },
      {
        // "mime-type": "application/json",
        "name": "department",
        "value": "Computer Science",
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

      const result = await apiFetch(issueCredential, 'POST', {connection_id: connectionId, cred_def_id: BaseAgent.credentialDefinitionId, credential_proposal: { "@type" : "issue-credential/1.0/credential-preview", attributes}});
      if(result){
        res.status(200).send(result);
      }else{
        res.status(500).send({ error: "issuing credential failed" });
      }
      
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: error.message });
    }
  }

  static async issuedCredential(req: Request, res: Response){
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
  }
}