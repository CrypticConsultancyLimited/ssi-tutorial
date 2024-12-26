const acapy_admin_url = process.env.ACAPY_ADMIN_URL || 'http://localhost:8021';

const route = (url: string) => `${acapy_admin_url}${url}`;

//TODO: dids and invitation
export const getWalletDids = (method: any) =>
  route(`/wallet/did?method=${method}`);

export const createConnection = route(`/out-of-band/create-invitation`);
export const getConnection = (conn_id: any) => route(`/connections/${conn_id}`);

// schema and credential definition
export const createSchema = route(`/schemas`);
export const getSchema = (schema_id: any) => route(`/schemas/${schema_id}`);
export const createCredentialDefinition = route(`/credential-definitions`);
export const getCredentialDefinition = (credDefId: any) =>
  route(`/credential-definitions/${credDefId}`);

// issue credential
export const issueCredential = route(`/issue-credential-2.0/send`);
export const getIssuedCredential = (credentialId: any) =>
  route(`/issue-credential-2.0/records/${credentialId}`);

// send proof request
export const sendProofRequest = route(`/present-proof-2.0/send-request`);
export const getProofRequest = (proofRecordId: any) =>
  route(`/present-proof-2.0/records/${proofRecordId}`);

export const sendMessage = (connectionId: any) =>
  route(`/connections/${connectionId}/send-message`);
