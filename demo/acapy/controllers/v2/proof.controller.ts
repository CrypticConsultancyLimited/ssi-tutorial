import { BaseAgent } from './agent.base';
import { Request, Response } from 'express';
import { apiFetch } from '../../utils/network-call';
import { getProofRequest, sendProofRequest } from '../../api_v2';
import { agentType } from '../../server';
import { PredicateProps } from '../../types';

export class ProofController extends BaseAgent {
  static async sendProofRequest(req: Request, res: Response) {
    const { proofRequestlabel, connectionId, version } = req.body;
    console.log('credDefId: ', BaseAgent.credentialDefinitionId);
    const attributes = {
      name: {
        names: ['department'],
        restrictions:
          agentType === '--issuer'
            ? [{ cred_def_id: `${BaseAgent.credentialDefinitionId}` }]
            : [],
      },
    };
    const predicates: PredicateProps = {
      name: {
        name: 'age',
        p_type: '>=',
        p_value: 20,
        restrictions:
          agentType === '--issuer'
            ? [{ cred_def_id: `${BaseAgent.credentialDefinitionId}` }]
            : [],
      },
    };
    if (!proofRequestlabel) {
      return res.status(400).send({ error: 'proofRequestlabel is required' });
    }
    if (!connectionId) {
      return res.status(400).send({ error: 'connectionId is required' });
    }

    try {
      const result = await apiFetch(sendProofRequest, 'POST', {
        connection_id: connectionId,
        presentation_request: {
          indy: {
            name: proofRequestlabel,
            requested_attributes: attributes,
            requested_predicates: predicates,
            version: version,
          },
        },
      });
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(500).send({ error: 'sending proof request failed' });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  static async getProofRecords(req: Request, res: Response) {
    const { proofRecordId } = req.query;

    try {
      const result = await apiFetch(getProofRequest(proofRecordId), 'GET');
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(500).send({ error: 'fetching proof request failed' });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  static async getProofData(req: Request, res: Response) {
    const { proofRecordId } = req.params;

    console.log('Proof recordId: ', proofRecordId);
    if (!proofRecordId) {
      return res.status(400).send({ error: 'proofRecordId is required' });
    }

    try {
      const result = await apiFetch(getProofRequest(proofRecordId), 'GET');
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(500).send({ error: 'fetching proof request failed' });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
}
