export enum EConnection {
    "ethernet",
    "bluetooth",
    "cellular",
    "mixed",
    "none",
    "other",
    "unknown",
    "wifi",
    "wimax"
}

export enum EffectiveConnectionType {
    "2g",
    "3g",
    "4g",
    "slow-2g",
}

export type TConnection = EConnection | undefined;

export type TDownlink = number | undefined;
