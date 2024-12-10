import { AnonCredsCredentialFormatService, AnonCredsModule, AnonCredsProofFormatService } from "@credo-ts/anoncreds";
import { Agent, AutoAcceptCredential, AutoAcceptProof, ConnectionsModule, CredentialsModule, DidsModule, ProofsModule, V2CredentialProtocol, V2ProofProtocol } from "@credo-ts/core";
import { IndyVdrAnonCredsRegistry, IndyVdrIndyDidRegistrar, IndyVdrIndyDidResolver, IndyVdrModule } from "@credo-ts/indy-vdr";
import { anoncreds } from '@hyperledger/anoncreds-nodejs';
import { ariesAskar } from '@hyperledger/aries-askar-nodejs';
import { AskarModule, AskarMultiWalletDatabaseScheme } from '@credo-ts/askar';
import { indyVdr } from "@hyperledger/indy-vdr-nodejs";
import { bcovrinTest } from "./network";


export function baseAgentModule() {
    return {
        connections: new ConnectionsModule({
            autoAcceptConnections: true,
        }),
        anoncreds: new AnonCredsModule({
            registries: [new IndyVdrAnonCredsRegistry()],
            anoncreds
        }),
        indyVdr: new IndyVdrModule({
            indyVdr,
            networks: [bcovrinTest],
          }),
        dids: new DidsModule({
            resolvers: [new IndyVdrIndyDidResolver()],
            registrars: [new IndyVdrIndyDidRegistrar()],
        }),
        askar: new AskarModule({
            ariesAskar,
            multiWalletDatabaseScheme: AskarMultiWalletDatabaseScheme.ProfilePerWallet,
        }),
        
        credentials: new CredentialsModule({
            autoAcceptCredentials: AutoAcceptCredential.ContentApproved,
            credentialProtocols: [
                new V2CredentialProtocol({
                    credentialFormats: [
                        new AnonCredsCredentialFormatService(),
                    ],
                }),
            ],
        }),
        proofs: new ProofsModule({
            autoAcceptProofs: AutoAcceptProof.ContentApproved,
            proofProtocols: [
                new V2ProofProtocol({
                    proofFormats: [
                        new AnonCredsProofFormatService(),],
                }),
            ],
        })
    } as const
}

export type AgentModules = Agent<ReturnType<typeof baseAgentModule>>;
