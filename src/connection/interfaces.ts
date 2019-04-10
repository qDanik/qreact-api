import { EffectiveConnectionType, TConnection, TDownlink } from "./types";

export interface NetworkInformation extends EventTarget {
    type?: TConnection;
    effectiveType: EffectiveConnectionType;
    downlinkMax?: number;
    downlink: number;
    rtt: number;
    saveData: boolean;
    onchange: any;
}

export interface IConnection {
    getStatus(): boolean;
    getType(): TConnection;
    getEffectiveType(): EffectiveConnectionType;
    getDownlink(): TDownlink;
    getDownlinkMax(): TDownlink;
    getRtt(): number;
    getSaveData(): boolean;
    setCallback(callback: any): this;
}
