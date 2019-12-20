import { Tuid, Map, Query, Action, Sheet } from "tonva";

export interface UqOrder {
    //a: Tuid;
    //b: Tuid;
    SetCart: Action;
}

export interface WebBuilder {
    Content: Tuid;
    Template: Tuid;
    Image: Tuid;
    Post: Tuid;
    SearchPost: Query;
    SearchTemplate: Query;
    SearchImage: Query;
    AgentPost: Map;
    WebPost: Map;
    AssistPost: Map;
    CustomerPost: Map;
}

export interface UQs {
    order: UqOrder;
    webBuilder: WebBuilder
}
