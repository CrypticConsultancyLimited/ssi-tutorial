import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Using api version 1
import all_routes_v1 from './routes/v1/agent.all.routes';
import all_routes_v2 from './routes/v2/agent.all.routes';
import { registerCredentialDefinition, registerSchema } from './utils/schema-credDef';

import BaseAgentV1 from './controllers/v1/agent.base';
import BaseAgentV2 from './controllers/v2/agent.base';

dotenv.config();

export const agentType = process.argv[2];

const port =
  agentType === '--issuer'
    ? parseInt(process.env.ISSUER_API_PORT || '4000')
    : parseInt(process.env.VERIFIER_API_PORT || '4002');

const app = express();
app.use(express.json());
app.use(cors());

async function initialize() {
  try {
    const schemaId = await registerSchema();
    if (schemaId) {
      const credDefId = await registerCredentialDefinition(schemaId);
      if (credDefId) {
        BaseAgentV1.credentialDefinitionId = credDefId;
        BaseAgentV2.credentialDefinitionId = credDefId;
      }
    }

    // Start the server **only after** credDefId is assigned
    // app.use('/v1', all_routes_v1);
    app.use('/v2', all_routes_v2);

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error during initialization:', error);
  }
}

initialize();
