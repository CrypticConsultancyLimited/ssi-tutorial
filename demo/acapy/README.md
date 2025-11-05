## 🚀 Demonstration Setup Guide

<div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

### 📁 Directory Structure

```
/
├── acapy/           # Cloned from OpenWallets – external to this repo
├── ssi-tutorial/    # This repository
│   ├── demo/
│   │   ├── acapy/
│   │   └── credo/
│   └── interface/
```

---

## 📘 What is ACA-Py?

ACA-Py (Aries Cloud Agent Python) is a Python-based framework for building Self-Sovereign Identity (SSI) agents. It provides:

* 🔐 Secure credential management
* 🤝 Agent-to-agent communication
* 📜 Verifiable credential issuance and verification
* 🎯 Hyperledger Indy support
* 🔄 DIDComm messaging capabilities

---

### ⚙️ Prerequisites

<div style="border-left: 4px solid #007bff; padding-left: 20px; margin: 15px 0;">

* Docker (>= v24.0.1)
* Node.js (>= v16)
* Python (>= 3.12)
* Yarn (>= v1.22.22)
* Git
* Ngrok

</div>

---

### 🧪 ACA-Py Agent Setup (`acapy/` – cloned separately)

> Clone the official ACA-Py repo from OpenWallet in a **separate directory** from this repository.

```bash
# Clone OpenWallets official ACA-Py repository
git clone -b 0.12.3 https://github.com/openwallet-foundation/acapy.git

# Navigate to demo folder
cd acapy/demo

# Update asyncpg version to avoid compatibility issues
sed -i 's/asyncpg.*/asyncpg~=0.28.0/' requirements.txt
```

#### Install dependencies

```bash
# Install requirements
python3 -m pip install -r requirements.txt

# If using Python >= 3.12 and Debian Based Systems (Like Ubuntu), avoid environment errors:
python3 -m pip install -r requirements.txt --break-system-packages
```

#### Start the agent

```bash
# Start Ngrok for port 8020
ngrok http 8020

# Run demo agent. ACAPY agent will automatically detect the ngrok url and use it as the public endpoint.
LEDGER_URL=https://test.bcovrin.vonx.io ./run_demo faber

# or you can set manual endpoint yourself:
LEDGER_URL=https://test.bcovrin.vonx.io AGENT_ENDPOINT=https://{ngrok_url} ./run_demo faber
```

> 💡 **Troubleshooting tip:**
> If the above fails with a network error, **try switching to mobile data or a different Wi-Fi**.

---

### 🖥️ Server Setup (`ssi-tutorial/demo/acapy`)

```bash
# Clone this repository
git clone -b credo-acapy https://github.com/CrypticConsultancyLimited/ssi-tutorial.git

cd ssi-tutorial/demo/acapy

# Environment setup
cp .env.sample .env
# Then edit `.env` with correct variables

# Install dependencies
yarn install

# Start server as issuer or verifier
yarn issuer
# or
yarn verifier
```

---

### 💻 Interface Setup (`ssi-tutorial/interface`)

```bash
cd ssi-tutorial/interface

cp .env.sample .env
# Update API URL in `.env`:

# For API v2 (recommended)
NEXT_PUBLIC_API_URL=http://{your_ip_address}:4000/v2

# For API v1 (not recommended)
# NEXT_PUBLIC_API_URL=http://{your_ip_address}:4000/v1

# Install dependencies
yarn install

# Start development server
yarn dev
```

---

### 📱 Mobile Wallet Setup

Download the **Bifold app** from:

👉 [`Click here to download`](https://drive.google.com/uc?export=download&id=10Qv5FNXOsp6-kyafJefXYYSe_v5bpfuq)

After installing:

* Create a 6-digit PIN to log in
* You can:

  * Connect with issuers/verifiers
  * Send message to other parties
  * Store credentials
  * Present proofs
  * Make your own invitation QR Code and share it with other parties
  * And more 🚀 (Explore Yourself)

---

### 🧪 [Testing Guide](../../README.md#-testing-the-setup)

---

### 💡 Best Practices

1. **Version Selection**

   * Use API **v2** for all new projects
   * Only use **v1** for legacy systems
   * **Never mix versions** in a single flow
2. **Error Handling**

   * V2 provides more detailed error responses
   * Implement clear error logging per version
   * Log sersion-specific issues separately
