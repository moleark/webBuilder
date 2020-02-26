import { Tuid, Map, Query, Action, Sheet, Book, Tag } from "tonva";

export interface UqHr {
    employee: Tuid;
    SearchEmployeeByid: Query;
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
    PublishPost: Action;
    WebPage: Tuid;
    SearchWebPage: Query;
    Branch: Tuid;
    WebPageBranch: Map;
    SearchPrivateBranch: Query;
    SearchBranch: Query;
    PageBrowsing: Book;
    SearchTotalBrowsing: Query;
    Test1: Tag;
}

export interface UQs {
    hr: UqHr;
    webBuilder: WebBuilder;
}
