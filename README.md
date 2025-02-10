# 🔐 Self-Sovereign Identity (SSI) Tutorial

### Table of content

- [🎯 What is SSI](#-self-sovereign-identity-ssi-tutorial)
- [🔑 Key Concepts](#-key-concepts-of-ssi)
- [✨ Benefits](#-key-benefits-of-ssi)
- [🔄 Trust Triangle](#-the-trust-triangle)
- [💡 How SSI Works](#-how-ssi-works-in-real-life)
  - [🏛️ Issuer](#1-issuer)
  - [👤 Holder](#2-holder-you)
  - [✅ Verifier](#3-verifier-the-checker)
- [⚙️ Technical Workflow](#️-technical-workflow-of-ssi-entities)
- [🚀 Demonstration Setup Guide](#-demonstration-setup-guide)
   - [Framework Comparison](#-framework-comparison)
   - [Similarities](#-similarities)
   - [Differences](#-differences)
   - [Testing Setup](#-testing-the-setup)
- [📚 API Overview](#-api-overview)
- [🎉 Conclusion](#conclusion)
- [📧 Contact](#-contact)

![SSI Banner](demo/credo/assets/what-is-ssi.png)

<br>

> 💫 **Self-Sovereign Identity (SSI)** is a digital identity model that allows individuals to own, control, and share their personal information without relying on a central authority. In SSI, users can create and manage their identities using decentralized technologies, such as blockchain, which enhances privacy, security, and user autonomy.

<br>

## 🔑 Key Concepts of SSI

<div align="center">

| Concept                                                     | Traditional Way                                                                              | SSI Way                                                           | Benefits                                                                                                                     |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **🎯 Decentralization** <br> _"You're in Control"_          | Need Facebook/Google accounts to log into websites. Companies control your digital identity. | You control your own digital identity, like your physical wallet. | • No dependency on companies <br> • Full control over your identity <br> • Single identity for all services                  |
| **📜 Verifiable Credentials** <br> _"Digital Certificates"_ | Physical certificates and ID cards in your wallet.                                           | Digital versions of certificates that can't be forged.            | • Can't be faked or altered <br> • Instant sharing <br> • Selective disclosure <br> • Digital signatures from issuers        |
| **🆔 DIDs** <br> _"Your Digital Identity Number"_           | Email address or phone number owned by companies.                                            | Your own unique digital ID that belongs only to you.              | • You own it completely <br> • Not controlled by companies <br> • Can't be taken away <br> • Permanent digital address       |
| **💼 Wallets** <br> _"Your Digital Identity Vault"_         | Physical wallet with ID cards, certificates, and licenses.                                   | Secure app storing digital credentials.                           | • Digital storage of IDs <br> • Enhanced security <br> • Selective sharing <br> • User control                               |
| **🤝 Trust triangle** <br> _"The Circle of Trust"_          | Trust based on physical documents issued by authorities.                                     | Digital credentials verified instantly through cryptography.      | • Instant verification <br> • Cryptographically secure <br> • No need to contact issuer <br> • Selective information sharing |

</div>

<br>

## ✨ Key Benefits of SSI

<div align="center">

| 📄 Physical Documents            | 📱 Digital SSI               |
| -------------------------------- | ---------------------------- |
| Can be lost or stolen            | Securely backed up           |
| Show all information             | Share only what's needed     |
| Manual verification needed       | Instant verification         |
| Multiple documents to carry      | All-in-one digital solution  |
| Can be forged                    | Cryptographically secure     |
| Physical presence often required | Remote verification possible |

</div>

<br>

## 🔄 The Trust Triangle

![Trust-Triangle](demo/credo/assets/SSI-Trust-Triangle.jpg)

<br>

> 🤝 The Trust Triangle is a foundational concept in Self-Sovereign Identity that illustrates the relationships between the three key parties involved in identity verification:

<br>

### Key Participants

<div style="padding: 20px;">

1. 🏛️ **The Issuer**
   > The trusted authority that issues verifiable credentials to the holder. This could be an educational institution, government agency, or any organization that can validate the information.

<br>

2. 👤 **The Holder**
   > The individual or entity that owns the identity and holds the credentials. They have full control over their personal information and can choose what to share.

<br>

3. ✅ **The Verifier**
   > The party that needs to verify the holder's credentials. This could be a service provider, employer, or any entity that requires proof of identity or qualifications.

</div>

<div style="background-color: #f6f8fa; padding: 20px; border-radius: 6px; margin: 20px 0;">

💫 **Key Insight**: The Trust Triangle emphasizes that trust is established through the relationships between these three parties, allowing for secure and private interactions without the need for a central authority.

</div>

<br>

## 💡 How SSI Works in Real Life

<div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

### 1. 🏛️ Issuer

<div style="border-left: 4px solid #007bff; padding-left: 20px; margin: 15px 0;">
Think of this as a university, government, or any organization that issues official documents
</div>

#### What They Do:

- Creates official digital documents (like a digital version of your degree)
- Ensures each document follows a standard format
- Adds their official digital signature
- Makes sure their documents can be verified by others

#### Real-Life Example:

> Just like a university issues paper degrees, in SSI they:

- Create digital degrees that can't be forged
- Include all necessary information (grades, date, major)
- Sign it digitally (like a traditional university seal)

</div>

<br>

<div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

### 2. 👤 Holder (You)

<div style="border-left: 4px solid #28a745; padding-left: 20px; margin: 15px 0;">
This is you - the person who receives and owns the credentials
</div>

#### What You Can Do:

- Have a digital wallet on your phone (like Apple Wallet, but for your ID documents)
- Receive official documents from organizations
- Store them securely in your digital wallet
- Share only what you want, when you want

#### Real-Life Example:

> Just like your physical wallet, but better:

- Store your university degree, driver's license, and certificates digitally
- Choose what to share (show age without revealing address)
- No risk of losing physical documents

</div>

<br>

<div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

### 3. ✅ Verifier (The Checker)

<div style="border-left: 4px solid #dc3545; padding-left: 20px; margin: 15px 0;">
Think of this as an employer or any organization that needs to verify your credentials
</div>

#### What They Do:

- Ask for specific information they need
- Verify your digital documents instantly
- Trust the documents without calling the issuer
- Only see what you choose to share

#### Real-Life Example:

> When applying for a job:

- Employer asks for proof of degree
- You share just the relevant details from your digital degree
- They can verify it's real instantly
- No need to call the university to check

</div>

## ⚙️ Technical Workflow of SSI Entities

![technical-work-flow](demo/credo/assets/technical-work-flow.png)

### 🔧 Initial Setup

<div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

1. 🆔 **DID Creation and Registration**
   <div style="border-left: 4px solid #007bff; padding-left: 20px; margin: 15px 0;">

   - Issuer creates and registers institutional DID on ledger
   - Holder creates personal DID for identity management
   - Verifier establishes organizational DID for verification purposes
   </div>

2. 📋 **Schema Registration (by Issuer)**
   <div style="border-left: 4px solid #28a745; padding-left: 20px; margin: 15px 0;">

   - A schema defines the structure of the credentials that can be issued. It includes attributes such as name, version, and the specific data fields that will be included in the credential.
   - Issuer registers schema on the ledger
   - Example attributes: `name`, `date`, `degree_type`, `institution`
   </div>

3. 📝 **Credential Definition Setup (by Issuer)**
   <div style="border-left: 4px solid #dc3545; padding-left: 20px; margin: 15px 0;">
   
   - A credential definition links a schema to a specific credential type and includes additional metadata, such as the issuer's DID and the credential's unique identifier. This allows for the creation of verifiable credentials based on the registered schema.
   - Issuer publishes credential definition to ledger.
   </div>
</div>

### 🔄 Credential Issuance and Verification

<div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

#### A. 📤 Credential Issuance Flow

1. **Connection Establishment**
   <div style="border-left: 4px solid #17a2b8; padding-left: 20px; margin: 15px 0;">

   - Issuer and holder create secure DID connection
   - Exchange connection protocols
   - Establish encrypted channel
   </div>

2. **Credential Creation**
   <div style="border-left: 4px solid #6f42c1; padding-left: 20px; margin: 15px 0;">

   - Issuer prepares credential data
   - Maps data to schema structure
   - Generates cryptographic signatures
   - Issues credential to holder's wallet
   </div>

#### B. 💼 Credential Storage

1. **Holder's Wallet**
   <div style="border-left: 4px solid #fd7e14; padding-left: 20px; margin: 15px 0;">

   - Securely stores received credentials
   - Maintains proof requests history
   - Handles key management
   </div>

#### C. ✅ Verification Flow

1. **Proof Request**
   <div style="border-left: 4px solid #20c997; padding-left: 20px; margin: 15px 0;">

   - Verifier sends proof request
   - Specifies required attributes
   - Defines predicates (if any)
   </div>

2. **Proof Generation**
   <div style="border-left: 4px solid #e83e8c; padding-left: 20px; margin: 15px 0;">

   - Holder receives proof request
   - Selects appropriate credentials
   - Generates zero-knowledge proofs
   - Creates proof presentation
   </div>

3. **Verification Process**
   <div style="border-left: 4px solid #6c757d; padding-left: 20px; margin: 15px 0;">
   
   - Verifier receives proof presentation
   - Validates cryptographic signatures
   - Checks revocation status
   - Verifies credential claims
   </div>
</div>

## 🚀 Demonstration Setup Guide

<div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

We will use two different frameworks (Credo and ACAPY) to demonstrate the SSI workflow. Use any one of them. 


### 🔄 Framework Comparison

#### ACApy (Aries Cloud Agent Python)
- **Language**: Python
- **Focus**: Enterprise-grade SSI solutions
- **Key Features**:
  - Robust credential management
  - Advanced protocol support
  - Extensive configuration options
  - Two API versions (v1 and v2)
- **[Detailed Setup Guide](demo/acapy/README.md)**

#### Credo (Aries Framework JavaScript)
- **Language**: JavaScript/TypeScript
- **Focus**: Modern web and mobile SSI solutions
- **Key Features**:
  - Easy web integration
  - Mobile-friendly
  - Modern JavaScript ecosystem
- **[Detailed Setup Guide](demo/credo/README.md)**

<br>

### 🎯 Similarities
1. **Core Functionality**
   - DID management
   - Credential issuance
   - Proof verification
   - Connection protocols

2. **Standards Compliance**
   - W3C DID specifications
   - Verifiable Credentials
   - DIDComm protocols

3. **Security Features**
   - Secure messaging
   - Encryption standards
   - Key management

<br>

### 🔄 Differences

| Feature | ACApy | Credo |
|---------|-------|-------|
| **Language** | Python | JavaScript |
| **API Versions** | v1 and v2 | Single version |
| **Setup Complexity** | More complex | Simpler |
| **Target Use** | Enterprise | Web/Mobile |


<br>

### 🎯 Common Issues & Solutions in Setup

1. **Connection Issues**
   - Ensure ngrok is running and URL is correctly set
   - Check if ports are not in use
   - Verify network connectivity

2. **Wallet Errors**
   - Clear previous wallet data if exists
   - Check permissions and storage

3. **Ledger Connection**
   - Verify genesis URL is accessible
   - Check network connectivity

</div>


### 🧪 Testing the Setup

<div style="border-left: 4px solid #28a745; padding-left: 20px; margin: 15px 0;">

#### 1. 🔗 Create Connection

- Generate invitation from issuer interface
- Scan the generated QR code by Bifold wallet (Holder's wallet)

#### 2. 📜 Issue Credential

- Issuer will send a credential offer to your connected wallet (Bifold wallet)

#### 3. ✅ Accept Credential

- Open the credential offer and accept credential from the wallet

#### 4. 🔍 Verify Credential
- An issuer also can act as a verifier. Because sometimes issuer needs to verify your issued credential.
- In this setup, issuer will send you a credential proof request after credential issuance.
- Share your credential in the proof request.

Or, if you want to use different verifier:
- Generate invitation from verifier agent
- Scan the generated QR code by Bifold wallet (Holder's wallet)
- Send proof request to the holder
- Share proof from the Bifold wallet
- Verify received proof

### 🎥 

![Demo](demo/acapy/assets/trust-triangle-demo.gif)

For better view: [Youtube link](https://www.youtube.com/watch?v=yzG49VHNaTs&ab_channel=ArifShahriar) 

## 🚀 API Overview

This API provides endpoints for managing agents, credentials, and interactions in an SSI ecosystem. Below are the key routes defined in `server.ts`.

ACAPY provides two API versions (v1 and v2) with different features and capabilities.

### API Versions for ACAPY

#### 🔷 Version 1 (v1)
The legacy API version, still widely used and supported. (Will be removed in the upcoming acapy versions)
```bash
# Base URL format
http://localhost:{port}/v1/
```

#### 🔷 Version 2 (v2)
The newer API version with enhanced features and improved consistency.
```bash
# Base URL format
http://localhost:{port}/v2/
```


## 🗂️ **API Routes**

| **✨ SSI Feature**                    | **🔍 Purpose**                                        | **🔗 API Endpoint**              |
| ------------------------------------- | ----------------------------------------------------- | -------------------------------- |
| **🌐 Get Wallet DIDs**                | Retrieve the DIDs associated with the user's wallet.  | `GET /wallet-dids`               |
| **📚 Register Schema**                | Create a new schema for credentials.                  | `POST /create-schema`            |
| **📝 Register Credential Definition** | Create a new credential definition based on a schema. | `POST /credential-definition`    |
| **🛠️ Create Connection Invitation**   | Create an invitation for a connection.                | `POST /create-invitation`        |
| **📈 Get All Connections**            | Retrieve details about existing connections.          | `GET /connections`               |
| **📧 Send Message**                   | Send a message to a connection.                       | `POST /send-message`             |
| **📉 Issue Credential**               | Issue a new credential to a connection.               | `POST /issue-credential`         |
| **📜 Get All Issued Credentials**     | Retrieve details of issued credentials.               | `GET /issued-credentials`        |
| **📏 Send Proof Request**             | Send a proof request to a connection.                 | `POST /send-proof-request`       |
| **📂 Get All Proof Records**          | Retrieve proof records associated with a connection.  | `GET /proof-records`             |
| **💰 Retrieve Proof Data**            | Retrieve proof data for a specific proof record.      | `GET /proof-data/:proofRecordId` |

---

## **GET /wallet-dids**

**🔍 Description:** Retrieve the DIDs associated with the user's wallet.  
**📂 Query Parameters:**

- `method`: The method to use for fetching DIDs.

**📥 Response:** Returns a list of DIDs. ✅

---

## **POST /create-invitation**

**🔍 Description:** Create an invitation for a connection.  
**📂 Request Body:**

- `label`: A label for the invitation.
- `alias`: An alias for the invitation.
- `domain`: The domain associated with the invitation.

**📥 Response:** Returns the invitation details. 📨

---

## **GET /connections**

**🔍 Description:** Retrieve connection details.  
**📂 Query Parameters:**

- `connectionId`: The ID of the connection.
- `outOfBandId`: The out-of-band ID for the connection.

**📥 Response:** Returns connection details. 🔗

---

## **POST /create-schema**

**🔍 Description:** Create a new schema for credentials.  
**📂 Request Body:**

- `did`: The DID of the issuer.
- `name`: The name of the schema.
- `version`: The version of the schema.
- `attributes`: An array of attributes for the schema.

**📥 Response:** Returns the created schema details. 📋

---

## **GET /schemas**

**🔍 Description:** Retrieve schema details.  
**📂 Query Parameters:**

- `schemaId`: The ID of the schema to retrieve.

**📥 Response:** Returns the schema details. 🗃️

---

## **POST /credential-definition**

**🔍 Description:** Create a new credential definition.  
**📂 Request Body:**

- `did`: The DID of the issuer.
- `schemaId`: The ID of the schema.
- `tag`: A tag for the credential definition.

**📥 Response:** Returns the created credential definition details. 🛠️

---

## **GET /credential-definitions**

**🔍 Description:** Retrieve credential definition details.  
**📂 Query Parameters:**

- `credentialDefinitionId`: The ID of the credential definition.

**📥 Response:** Returns the credential definition details. 🏷️

---

## **POST /issue-credential**

**🔍 Description:** Issue a new credential to a connection.  
**📂 Request Body:**

- `connectionId`: The ID of the connection.
- `name`: The name of the credential holder.
- `email`: The email of the credential holder.
- `age`: The age of the credential holder.

**📥 Response:** Returns the issued credential details. 🎓

---

## **GET /issued-credentials**

**🔍 Description:** Retrieve issued credentials.  
**📂 Query Parameters:**

- `credentialId`: The ID of the credential to retrieve.

**📥 Response:** Returns the issued credential details. 🔖

---

## **POST /send-proof-request**

**🔍 Description:** Send a proof request to a connection.  
**📂 Request Body:**

- `proofRequestlabel`: A label for the proof request.
- `connectionId`: The ID of the connection.
- `version`: The version of the proof request.

**📥 Response:** Returns the result of the proof request. 🔐

---

## **GET /proof-records**

**🔍 Description:** Retrieve proof records.  
**📂 Query Parameters:**

- `proofRecordId`: The ID of the proof record to retrieve.

**📥 Response:** Returns the proof record details. 🧾

---

## **GET /proof-data/:proofRecordId**

**🔍 Description:** Retrieve proof data for a specific proof record.  
**📂 Path Parameters:**

- `proofRecordId`: The ID of the proof record.

**📥 Response:** Returns the proof data. 📊

---

## **POST /send-message**

**🔍 Description:** Send a message to a connection.  
**📂 Request Body:**

- `connectionId`: The ID of the connection.
- `message`: The message content.

**📥 Response:** Returns the result of the message sending. ✉️

## Conclusion

By leveraging the principles of SSI, users can maintain control over their personal information while interacting securely with various services.

For further information, please refer to the documentation of the underlying libraries and technologies used in this implementation.

## ![cat](demo/credo/assets/cat.gif) Further reading

https://github.com/animo/awesome-self-sovereign-identity

## 🎯 **Contributions & Feedback**

Feel free to contribute to this project! If you have any issues or suggestions, please open an issue. 🛠️🚀

---

## 📧 Contact

For questions or support, reach out to **Cryptic Consultancy Limited**! ![pistol](demo/credo/assets/pistol.png)
- You can mail us through [contact@cryptic-consultancy.co.uk](mailto:contact@cryptic-consultancy.co.uk)
---

Made with ❤️ for the SSI community!
