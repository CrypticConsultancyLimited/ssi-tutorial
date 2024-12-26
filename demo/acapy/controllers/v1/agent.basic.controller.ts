
import { createCredentialDefinition, getCredentialDefinition, sendMessage } from './../../api_v1';
import { Request, Response } from "express";
import { apiFetch } from "../../utils/network-call";
import { createSchema, getSchema, getWalletDids } from "../../api_v1";
import { BaseAgent } from './agent.base';

export class AgentBasicController extends BaseAgent {
  static async getWalletDids(req: Request, res: Response){
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
  }

  static async createSchema(req: Request, res: Response){
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
  }

  static async getSchema(req: Request, res: Response){
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
  }

  static async createCredentialDefinition(req: Request, res: Response){
    const { did, schemaId, tag } = req.body;

    // if (!did) {
    //   return res.status(400).send({ error: "did is required" });
    // }
    if (!schemaId) {
      return res.status(400).send({ error: "schemaId is required" });
    }

    try {
      const result = await apiFetch(createCredentialDefinition, 'POST', {schema_id: schemaId, tag});
      console.log('Result: ', JSON.stringify(result));

      if(result){
        BaseAgent.credentialDefinitionId = result.credential_definition_id;
        console.log('----- >>> credDefId: ', BaseAgent.credentialDefinitionId);
        res.status(200).send(result);
      }else{
        res.status(500).send({ error: "createing credential definition failed" });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  static async getCredentialDefinition(req: Request, res: Response){
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
  }

  static async sendMessage(req: Request, res: Response){
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
  }
}