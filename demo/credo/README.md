## 🚀 Demonstration Setup Guide for Credo

Credo (formerly Aries Framework JavaScript) is a TypeScript/JavaScript framework for building Self-Sovereign Identity (SSI) solutions. It provides:
- 🌐 Modern web-based SSI implementation
- 🔐 Secure credential management
- 📱 Mobile-first architecture
- 🤝 Agent-to-agent communication
- 📜 Verifiable credential issuance and verification

<div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

### 📁 Directory Structure

```
/
├── demo/
│   ├── acapy/
│   │
│   └── credo/
│
└── interface/
```

### ⚙️ Prerequisites

<div style="border-left: 4px solid #007bff; padding-left: 20px; margin: 15px 0;">

- Node.js (v18)
- Yarn package manager
- Git

</div>

### 🔧 Credo Agent Setup (demo/credo)

Install Ngrok first and get authtoken from their website.

```bash
# To start ngrok on port 4001 and 4002, edit the ngrok.yml
nano /home/{your-user-name}/.ngrok2/ngrok.yml
```
Edit the ngrok.yml file as following:
```
authtoken: your-ngrok-authtoken
version: "2"
tunnels:
    first:
        addr: 4001
        proto: http
    second:
        addr: 4002
        proto: http
```

Save the file by pressing ctrl+O and exit the nano by ctrl+x.
Now start the ngrok:
```ngrok start --all```

Then:

```bash
# Clone the ssi-tutorial repository 
git clone -b credo-acapy https://github.com/CrypticConsultancyLimited/ssi-tutorial.git

# Navigate to credo directory
cd ssi-tutorial/demo/credo

# Install dependencies
yarn install

# Environment Setup
cp .env.example .env

# Configure .env file
ISSUER_DID=your_issuer_did
ISSUER_SEED=your_issuer_seed
VERIFIER_DID=your_verifier_did
VERIFIER_SEED=your_verifier_seed
# You can use ISSUER_DID, ISSUER_SEED, VERIFIER_DID, VERIFIER_SEED as same as in .env.sample file

ISSUER_API_PORT=4000
VERIFIER_API_PORT=4002
ISSUER_AGENT_PUBLIC_ENDPOINT={ngrok url of port 4001 without brackets}
VERIFIER_AGENT_PUBLIC_ENDPOINT={ngrok url of port 4002 without brackets}
```

### 💻 Interface Setup

```bash
# Navigate to interface directory
cd interface

# Install dependencies
yarn install

# Environment Setup
cp .env.example .env

# Configure .env file
NEXT_PUBLIC_API_URL=http://localhost:4000

# Start the development server
yarn dev
```

### 📱Mobile Wallet Setup

Download Bifold app from the following link: <a href="https://drive.google.com/uc?export=download&id=10Qv5FNXOsp6-kyafJefXYYSe_v5bpfuq">Click here</a>

Install the app on your phone and login to the app creating a 6 digit pin. You can use this wallet for:

- Beign connected with other entities (Issuer / Verifier).
- Sending message to other parties.
- Storing credentials.
- Presenting proof.
- Making your own invitation qr to share with other parties.
- And many more (Explore yourself ... 😉)

<br>

## 🎮 Running the Demo

#### 1️⃣ Start Credo Agents

```bash
# In demo/credo directory
# Start issuer agent
yarn issuer

# In a new terminal
# Start verifier agent
yarn verifier
```

#### 2️⃣ Launch Interface

```bash
# In interface directory
yarn dev
```

- **[Testing Guide](../../README.md#-testing-the-setup)**

</div>
