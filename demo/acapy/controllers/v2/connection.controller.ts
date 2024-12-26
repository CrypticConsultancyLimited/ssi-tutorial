import { BaseAgent } from './agent.base';
import { Request, Response } from 'express';
import { apiFetch } from '../../utils/network-call';
import { createConnection, getConnection } from '../../api_v1';

export class ConnectionController extends BaseAgent {
  static async createInvitation(req: Request, res: Response) {
    const { label, alias, domain } = req.body;
    console.log('creating invitation...');
    try {
      const result = await apiFetch(createConnection, 'POST', {
        "accept": [
          "didcomm/aip1",
          "didcomm/aip2;env=rfc19"
        ],
        "alias": alias,
        "attachments": [
          {
            "id": "attachment-0",
            "type": "present-proof"
          }
        ],
        "goal": "To issue a graduate credential",
        "goal_code": "issue-vc",
        "handshake_protocols": [
          "https://didcomm.org/didexchange/1.0"
        ],
        "metadata": {},
        "my_label": label,
        "protocol_version": "1.1",
        "use_did_method": "did:peer:2",
        "use_public_did": false
      });

      // const result = await apiFetch(createConnection, 'POST', {
      //   my_label: label
      // });
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(500).send({ error: 'creating invitation failed' });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  static async getConnection(req: Request, res: Response) {
    const { connectionId, outOfBandId } = req.query;
    try {
      const result = await apiFetch(getConnection(connectionId), 'GET');
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(500).send({ error: 'fetching connection details failed' });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
}
