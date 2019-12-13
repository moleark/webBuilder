import { Tuid, Map, Query, Action, Sheet } from "tonva";

export interface UqOrder {
    //a: Tuid;
    //b: Tuid;
    SetCart: Action;
}

export interface UqContent {
    Content: Tuid
}

export interface UQs {
    order: UqOrder;
    webBuilder: UqContent
}
