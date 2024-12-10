import { Agent, BasicMessageEventTypes, BasicMessageRole, BasicMessageStateChangedEvent, ConnectionEventTypes, ConnectionStateChangedEvent, CredentialEventTypes, CredentialStateChangedEvent, DidRecord, HttpOutboundTransport, InitConfig, KeyType, ProofEventTypes, ProofStateChangedEvent, TypedArrayEncoder, WsOutboundTransport } from "@credo-ts/core";
import express, { Express } from 'express';
import { AgentModules, baseAgentModule } from "./module";
import { agentDependencies, HttpInboundTransport } from '@credo-ts/node';
import * as crypto from 'crypto'
import { AnonCredsProofRequestRestriction, AnonCredsRequestedAttribute, AnonCredsRequestedPredicate, AnonCredsSchema } from "@credo-ts/anoncreds";
import { AcceptInvitationOptions, AttributeElement, CreateInvitationOptions, GetConnectionsOptions, SendProofRequest } from "./types";

export class BaseAgent {
    public port: number
    public label: string
    protected readonly config: InitConfig;
    protected endpoints: string[];
    protected agent: AgentModules;
    protected isInitialized: boolean = false;

    public constructor({
        port,
        label,
        publicEndpoint,
    }: {
        port: number,
        label: string,
        publicEndpoint: string,
    }) {
        this.port = port
        this.label = label
        this.endpoints = [publicEndpoint]

        this.config = {
            label: label,
            endpoints: this.endpoints,
            walletConfig: {
                key: crypto.randomBytes(32).toString('hex'),
                id: `wallet-${this.label}-${crypto.randomUUID()}`,

            }
        } satisfies InitConfig
        this.agent = new Agent({
            config: this.config,
            dependencies: agentDependencies,
            modules: baseAgentModule(),

        })

        this.agent.registerInboundTransport(new HttpInboundTransport({ port }));
        this.agent.registerOutboundTransport(new HttpOutboundTransport());
        this.agent.registerOutboundTransport(new WsOutboundTransport());
    }

    public async init() {
        try {
            await this.agent.initialize();
            this.isInitialized = true;

            this.agent.events.on<ProofStateChangedEvent>(ProofEventTypes.ProofStateChanged, async (event) => {
                console.log(`Proof Record State: ${event.payload.proofRecord.state}`);
            })

            this.agent.events.on(
                BasicMessageEventTypes.BasicMessageStateChanged,
                async (event: BasicMessageStateChangedEvent) => {
                    if (event.payload.basicMessageRecord.role === BasicMessageRole.Receiver) {
                        console.log(`Received message: ${event.payload.basicMessageRecord.content}`);
                    }
                },
            );
            this.agent.events.on<CredentialStateChangedEvent>(
                CredentialEventTypes.CredentialStateChanged,
                async (event) => {
                    console.log(`Credential Record State: ${event.payload.credentialRecord.state}`);
                },
            );

            this.agent.events.on<ConnectionStateChangedEvent>(ConnectionEventTypes.ConnectionStateChanged, async (event) => {
                console.log(`Connection Record State: ${event.payload.connectionRecord.state}`)
            });

        } catch (e) {
            throw new Error(`Error initializing agent: ${e}`)
        }
    }
    public async getWalletDids(method?: string): Promise<DidRecord[]> {
        return this.agent.dids.getCreatedDids({
            method: method
        })
    }
    public async importDid(did: string, seed: string) {
        if (!did) {
            throw new Error('Did is required')
        }
        if (!seed) {
            throw new Error('Seed is required')
        }
        const seedBfr = TypedArrayEncoder.fromString(seed);
        await this.agent.dids.import({
            did: did,
            privateKeys: [
                {
                    keyType: KeyType.Ed25519,
                    privateKey: seedBfr
                }
            ]
        })

    }
    public async createInvitation(options: CreateInvitationOptions) {
        const invitation = await this.agent.oob.createInvitation({
            label: options.label,
            alias: options.alias,
        })
        const invitationUrl = invitation.outOfBandInvitation.toUrl({ domain: options.domain || this.endpoints[0]});
        return { invitationUrl, invitation };
    }
    public async acceptInvitation(options: AcceptInvitationOptions) {
        const record = await this.agent.oob.receiveInvitationFromUrl(options.invitationUrl, {
            label: options.label,
            alias: options.alias,
            imageUrl: options.imageUrl,
        });
        return record;
    }
    public async getConnections(options: GetConnectionsOptions) {
        if (options.connectionId) {
            const record =  await this.agent.connections.findById(options.connectionId)
            return record ? [record] : []
        }
        if (options.outOfBandId) {
            return await this.agent.connections.findAllByOutOfBandId(options.outOfBandId)
        }
        return await this.agent.connections.getAll()
    }
    public async createSchema(did: string, schema: AnonCredsSchema) {
        return await this.agent.modules.anoncreds.registerSchema({
            schema,
            options: {
                endorserMode: 'internal',
                endorserDid: did,
            }
        })
    }
    public async getSchema(schemaId?: string) {
        if (schemaId) {
            return await this.agent.modules.anoncreds.getCreatedSchemas({
                schemaId
            })
        }
        return await this.agent.modules.anoncreds.getCreatedSchemas({})
    }
    public async createCredentialDefinition(did: string, schemaId: string, tag?: string) {
        return await this.agent.modules.anoncreds.registerCredentialDefinition({
            credentialDefinition: {
                schemaId,
                issuerId: did,
                tag: tag || 'latest',
            },
            options: {
                endorserMode: 'internal',
                endorserDid: did,
                supportRevocation: false,
            },
        })
    }
    public async getCredentialDefinition(credentialDefinitionId?: string) {
        if (credentialDefinitionId) {
            return await this.agent.modules.anoncreds.getCreatedCredentialDefinitions({
                credentialDefinitionId
            })
        }
        return await this.agent.modules.anoncreds.getCreatedCredentialDefinitions({})
    }
    public async issueAnonCredsCredential(connectionId: string, credentialDefinitionId: string, attributes: AttributeElement[]) {
        return await this.agent.credentials.offerCredential({
            connectionId,
            protocolVersion: 'v2',
            credentialFormats: {
                anoncreds: {
                    credentialDefinitionId,
                    attributes
                }
            }
        })
    }
    public async getIssuedCredenitalRecords(credentialExchangeRecordId?: string) {
        if (credentialExchangeRecordId) {
            return await this.agent.credentials.findAllByQuery({
                credentialIds: [credentialExchangeRecordId]
            })
        }
        return await this.agent.credentials.findAllByQuery({})
    }
    public async sendProofRequest({ proofRequestlabel, connectionId, version, attributes, predicates }: SendProofRequest) {
        return await this.agent.proofs.requestProof({
            connectionId,
            protocolVersion: 'v2',
            proofFormats: {
                anoncreds: {
                    name: proofRequestlabel,
                    version: version || '1.0.0',
                    requested_attributes: attributes,
                    requested_predicates: predicates,
                }
            }
        })
    }

    public async getProofRecords(proofRecordId?: string) {
        if (proofRecordId) {
            return await this.agent.proofs.findAllByQuery({
                proofIds: [proofRecordId]
            })
        }
        return await this.agent.proofs.findAllByQuery({})
    }
    public async getProofData(proofRecordId: string) {
        return await this.agent.proofs.getFormatData(proofRecordId)
    }
    public async sendMessage(connectionId: string, message: string) {
        return await this.agent.basicMessages.sendMessage(connectionId, message)
    }

    private generateRandomString(length: number) {
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            result += charset[randomIndex];
        }
        return result;
    }

}
