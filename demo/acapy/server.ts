import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import allRoutes from './routes/agent.all.routes'


dotenv.config();

export const agentType = process.argv[2];

const port =
  agentType === "--issuer"
    ? parseInt(process.env.ISSUER_API_PORT || "4000")
    : parseInt(process.env.VERIFIER_API_PORT || "4002");

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', allRoutes);


app.listen(port, async () => {
  console.log(`Server running on http://localhost:${port}`);
});
