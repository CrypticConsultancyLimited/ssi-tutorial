const acapy_admin_url = process.env.ACAPY_ADMIN_URL || 'http://localhost:8021';

const route = (url: string) => `${acapy_admin_url}${url}`

export const getWalletDids = (method: any) => route(`/wallet-did?method=${method}`); 
export const createConnection = `${acapy_admin_url}/connections/create-invitation`;
export const getConnection = (conn_id: any) => `${acapy_admin_url}/connections/${conn_id}`;
export const createSchema = `${acapy_admin_url}/schemas`;
export const getSchema = (schema_id: any) => route(`/schemas/${schema_id}`);
export const createCredentialDefinition = route(`/credential-definitions`);
export const getCredentialDefinition = (credDefId: any) => route(`/credential-definitions/${credDefId}`);
export const issueCredential = route(`/issue-credential/send`);
export const getIssuedCredential = (credentialId: any) => route(`/issue-credential/records/${credentialId}`);
export const sendProofRequest = route(`/present-proof/send-request`);
export const sendProofRequest_2 = route(`/present-proof-2.0/send-request`);
export const getProofRequest = (proofRecordId: any) => route(`/present-proof/records/${proofRecordId}`);
export const sendMessage = (connectionId: any) => route(`/connections/${connectionId}/send-message`);