import { Tuid, Map, Query, Action, Sheet, Book, Tag } from "tonva";

export interface UqHr {
    employee: Tuid;
    SearchEmployeeByid: Query;
    SearchTeam: Query;
}

export interface UqProduct {
    ProductX: Tuid;
    SearchProduct: Query;

}

export interface WebBuilder {
    Content: Tuid;
    Template: Tuid;
    Image: Tuid;
    Post: Tuid;
    AddPost: Action;
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
    SearchPostPublishForProduct: Query;
    PostPublishProduct: Map;
    AddPostEvaluate: Action;
    SearchPostEvaluate: Query;
    ResearchField: Tag;
    Business: Tag;
    AddPostResearchField: Action;
    SearchPostResearchField: Query;
    SearchAchievement: Query;
}

export interface UQs {
    hr: UqHr;
    webBuilder: WebBuilder;
    product: UqProduct;
}
