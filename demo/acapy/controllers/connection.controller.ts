import { BaseAgent } from "./agent.base";
import { Request, Response } from "express";
import { apiFetch } from "../utils/network-call";
import { createConnection, getConnection } from "../api";

export class ConnectionController extends BaseAgent {
  static async createInvitation(req: Request, res: Response){
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
  }

  static async getConnection(req: Request, res: Response){
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
  }
}