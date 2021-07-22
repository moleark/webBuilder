import { Tuid, Map, Query, Action, Sheet, Book, Tag } from "tonva";

export interface UqHr {
    employee: Tuid;
    WebUserEmployee: Map;
    SearchTeam: Query;
}

export interface UqProduct {
    ProductCategory: Tuid;
    ProductX: Tuid;
    SearchProduct: Query;
    GetRootCategory: Query;
    GetChildrenCategory: Query;
}

export interface UqCustomer {
    SearchDomain: Query;
}

export interface WebBuilder {
    Content: Tuid;
    Template: Tuid;
    Image: Tuid;
    Post: Tuid;

    // AddPost: Action;  用原生API代替

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

    PostProductCatalog: Map;
    AddPostProductCatalog: Action;
    AddPostProductCatalogExplain: Action;
    SearchProductCategoryPost: Query;

    Subject: Tuid;
    SubjectDefault: Map;
    PostSubject: Map;
    SearchSubject: Query;
    AddPostSubject: Action;
    DelPostSubject: Action;
    SearchSubjectPost: Query;
    SearchPostSubject: Query;

    SearchPostCatalog: Query;
    SearchPostCatalogExplain: Query;
    PostProductCatalogExplain: Map;

    SearchAchievementOfTeamDetail: Query;
    SearchAchievementOfTeamNew: Query;

    ImageCat: Map;
    SearchImageCat: Query;
    SearchCatImage: Query;
    SearchCat: Query;

    SlideShow: Map;
    UpdateSlideShow: Action;
    DeleteSlideShow: Action;
    SearchSlideShow: Query;

    IMGCat: Tuid;

    SearchBusinessScope: Query;
    ClassroomType: Tuid;
    PostClassroomType: Map;

    PostDomain: Map;
    AddPostDomain: Action;
    SearchPostDomain: Query;
    SearchDomainPost: Query;

    WebPageWebsite: Map;
    Website: Tuid;
    hotPosts: Query;
    InformationPost: Map;
    SearchInformationPost: Query;
    AddInformationPost: Action;
    hit: Action;
    SearchProductCategoryPostCount: Query;
    SearchDomainPostCount: Query;

    PostProduct: Map;
    ProductDescriptionPost: Map;
    getProdoctDescription: Query;
    SearchPostProduct: Query;
    SearchRecommendProduct: Query;
    hitOfManual: Action;

    SearchSubjectDefault: Query;
    DelSubjectDefault: Action;

    PostStatus: Map;
    PostPage: Map;
}

export interface UQs {
    hr: UqHr;
    webBuilder: WebBuilder;
    product: UqProduct;
    customer: UqCustomer;
}
