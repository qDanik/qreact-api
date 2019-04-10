import { IConnection, NetworkInformation } from "./interfaces";
import { EffectiveConnectionType, TConnection, TDownlink } from "./types";

export class Connection implements IConnection {

    private readonly status: boolean;

    private connect: NetworkInformation;

    public constructor(callback = null) {
        const { connection, onLine } = window.navigator;
        this.status = onLine;
        this.connect = connection;

        if (callback) {
            this.setCallback(callback);
        }
    }

    public getStatus(): boolean {
        return  this.status;
    }

    public getType(): TConnection {
        return this.connect.type;
    }

    public getEffectiveType(): EffectiveConnectionType {
        return this.connect.effectiveType;
    }

    public getDownlink(): TDownlink {
        return this.connect.downlink;
    }

    public getDownlinkMax(): TDownlink {
        return this.connect.downlinkMax;
    }

    public getRtt(): number {
        return this.connect.rtt;
    }

    public getSaveData(): boolean {
        return this.connect.saveData;
    }

    public setCallback(callback: any): this {
        this.connect.onchange = callback;

        return this;
    }

}
