import { SailsIOClient } from "./sails.io.client";
export declare const Verb: {
    CREATED: string;
    UPDATED: string;
    ADDED: string;
    DESTROYED: string;
    REMOVED: string;
};
export declare class SailsEvent {
    private JWR;
    private ack?;
    constructor(JWR: SailsIOClient.JWR.Event, ack?: Function | undefined);
    isCreated(): boolean;
    isUpdated(): boolean;
    isDestroyed(): boolean;
    isAdded(): boolean;
    isRemoved(): boolean;
    getVerb(): string;
    getData(): object;
    getId(): string | number;
    hasAck(): boolean;
    acknowledge(...params: any[]): boolean;
}
