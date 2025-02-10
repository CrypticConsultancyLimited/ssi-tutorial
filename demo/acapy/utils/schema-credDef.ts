import { createCredentialDefinition, createSchema } from "../api_v2";
import { apiFetch } from "./network-call";

export const registerSchema = async (): Promise<string> => {
  console.log('Registering schema to the ledger ....\n');
  try {
    const attributes = [
      "name",
      "age",
      "email",
      "department"
    ];
    const name = 'Identity_Schema';
    const version = `1.0.${Date.now()}`;
    const result = await apiFetch(createSchema, 'POST', {attributes, schema_name: name, schema_version: version});
    console.log('Schema Id: ', result.schema_id);
    if(result){
      return result.schema_id;
    }else{
      return "";
    }
  } catch (error) {
    console.log('Error to register schema: ', error);
    return "";
  }
}

export const registerCredentialDefinition = async (schemaId: string): Promise<string> => {

  if (!schemaId) {
    return "";
  }

  const tag = 'University-Certificate';

  console.log('Registering credential definition to the ledger.... \n');

  try {
    const result = await apiFetch(createCredentialDefinition, 'POST', {schema_id: schemaId, tag});

    if(result){
      console.log('Credential Definition Id: ', result.credential_definition_id);
      return result.credential_definition_id;
    }else{
      return "";
    }
  } catch (error) {
    console.log('Error to register credential definition:', error);
    return "";    
  }
}