import express from 'express';

import { ConnectionController } from '../../controllers/v2/connection.controller';
import { AgentBasicController } from '../../controllers/v2/agent.basic.controller';
import { CredentialController } from '../../controllers/v2/credential.controller';
import { ProofController } from '../../controllers/v2/proof.controller';
const router = express.Router();

// Agent's Basic functionality
router.get('/wallet-dids', AgentBasicController.getWalletDids);
router.post('/create-schema', AgentBasicController.createSchema);
router.get('/schemas', AgentBasicController.getSchema);
router.post(
  '/credential-definition',
  AgentBasicController.createCredentialDefinition
);
router.get(
  '/credential-definitions',
  AgentBasicController.getCredentialDefinition
);
router.post('/send-message', AgentBasicController.sendMessage);

// Connection routes
router.post('/create-invitation', ConnectionController.createInvitation);
router.get('/connections', ConnectionController.getConnection);

// Credential routes
router.post('/issue-credential', CredentialController.issueCredential);
router.get('/issued-credentials', CredentialController.issuedCredential);

// Proof-request routes
router.post('/send-proof-request', ProofController.sendProofRequest);
router.get('/proof-records', ProofController.getProofRecords);
router.get('/proof-data/:proofRecordId', ProofController.getProofData);

export default router;
