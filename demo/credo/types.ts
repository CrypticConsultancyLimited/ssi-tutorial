import { AnonCredsRequestedAttribute, AnonCredsRequestedPredicate } from "@credo-ts/anoncreds";

export type CreateInvitationOptions = {
    label?: string;
    alias?: string;
    domain?: string;
}

export type AcceptInvitationOptions = {
    invitationUrl: string;
    label?: string;
    alias?: string;
    imageUrl?: string;
}

export type GetConnectionsOptions = {
    connectionId?: string;
    outOfBandId?: string;
}
export type SendProofRequest = {
    proofRequestlabel: string,
    connectionId: string,
    version?: string,
    attributes?: Record<string, AnonCredsRequestedAttribute>
    predicates?: Record<string, AnonCredsRequestedPredicate>
}

export type AttributeElement = {
    name: string,
    value: string
}

export type PredicateProps = {
    name: {
      name: string;
      p_type: ">=" | ">" | "<=" | "<";
      p_value: number;
      restriction: {
        cred_def_id: string;
      }[];
    };
  };