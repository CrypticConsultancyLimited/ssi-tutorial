## 🚀 Demonstration Setup Guide

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

## What is ACAPY?
ACAPY is a Python-based framework for building Self-Sovereign Identity (SSI) solutions. It provides:
- 🔐 Secure credential management
- 🤝 Agent-to-agent communication
- 📜 Verifiable credential issuance and verification
- 🎯 Support for Hyperledger Indy ledger
- 🔄 DIDComm messaging capabilities

### ⚙️ Prerequisites

<div style="border-left: 4px solid #007bff; padding-left: 20px; margin: 15px 0;">

- Docker (>=v24.0.1)
- Node.js (>=v16)
- Python (>=3.12)
- Yarn (>=v1.22.22)
- Git
- Ngrok

</div>

### 🔧 ACAPY Agent Setup (demo/acapy)

```bash
# add 8020 port to ngrok
ngrok http 8020

# Clone ACAPY repository
git clone -b 0.12.3 https://github.com/openwallet-foundation/acapy.git

# Navigate to demo folder of ACAPY directory
cd acapy/demo

# Install requirements
pip3 install -r requirements.txt

# Run ACAPY demo agent
LEDGER_URL=http://dev.greenlight.bcovrin.vonx.io ./run_demo faber

# ACAPY agent will automatically detect the ngrok url and use it as the public endpoint. Or you can manually set the endpoint in the command line.

LEDGER_URL=http://dev.greenlight.bcovrin.vonx.io AGETN_ENDPOINT=https://{your ngrok url} ./run_demo faber

# This will:
# 1. Start docker container with ACAPY agent
# 2. Create and publish did to the ledger
# 3. Register schema to the ledger
# 4. Register credential definition to the ledger
# 5. Create a connection invitation 
```

### Server setup

``` bash
# Navigate to ssi-tutorial/demo/acapy
cd ssi-tutorial/demo/acapy

# Install dependencies
yarn install

# Start server as issuer/verifier
yarn start --issuer
# or
yarn start --verifier

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

# If you use API version V2 (highly recommended), then: 
NEXT_PUBLIC_API_URL=http://{ your ip address }:4002/v2

# If you use API version V1 (not recommended), then: 
NEXT_PUBLIC_API_URL=http://{ your ip address }:4002/v1


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
yarn start --issuer

# In a new terminal
# Start verifier agent
yarn start --verifier
```

#### 2️⃣ Launch Interface

```bash
# In interface directory
yarn dev
```

- **[Testing Guide](../../README.md#-testing-the-setup)**

### 💡 Best Practices

1. **Version Selection:**
   - Use v2 for new projects
   - Stick to v1 if working with legacy systems
   - Don't mix versions in the same flow

2. **Error Handling:**
   - V2 provides more detailed error messages
   - Implement proper error handling for both versions
   - Log version-specific issues separately

