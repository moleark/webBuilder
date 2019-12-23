import * as React from "react";
import _ from 'lodash';
import { CUqBase } from "../CBase";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { VMain } from "./VMain";
import { VShow } from "./VShow";
import { VEdit } from "./VEdit";
import { Context, PageItems, Query } from "tonva";
import { VPickImage } from "./VPickImage";
import { VPickTemplate } from "./VPickTemplate";
import { VRelease } from "./VRelease ";

// 贴文模板
class PageTemplate extends PageItems<any> {
    private searchTemplateQuery: Query;
    constructor(searchQuery: Query) {
        super();
        this.firstSize = this.pageSize = 14;
        this.searchTemplateQuery = searchQuery;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchTemplateQuery.page(param, pageStart, pageSize);
        return ret;
    }
    protected setPageStart(item: any): any {
        this.pageStart = item === undefined ? 0 : item.id;
    }
}

// 贴文
class PagePosts extends PageItems<any> {

    private searchPostsQuery: Query;

    constructor(searchQuery: Query) {
        super();
        this.firstSize = this.pageSize = 8;
        this.searchPostsQuery = searchQuery;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchPostsQuery.page(param, pageStart, pageSize);
        return ret;
    }

    protected setPageStart(item: any): any {
        this.pageStart = item === undefined ? 0 : item.id;
    }
}

// 图片
class PageMedia extends PageItems<any> {
    private searchMediaQuery: Query;
    constructor(searchQuery: Query) {
        super();
        this.firstSize = this.pageSize = 14;
        this.searchMediaQuery = searchQuery;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchMediaQuery.page(param, pageStart, pageSize);
        return ret;
    }
    protected setPageStart(item: any): any {
        this.pageStart = item === undefined ? 0 : item.id;
    }
}

export class CPosts extends CUqBase {
    @observable pageTemplate: PageTemplate;
    @observable pagePosts: PagePosts;
    @observable pageMedia: PageMedia;
    @observable items: any[];
    // @observable imgItems: any[];
    @observable current: any;

    protected async internalStart(param: any) {
    }

    /* 贴文查询*/
    searchPostsKey = async (key: string) => {
        this.pagePosts = new PagePosts(this.uqs.webBuilder.SearchPost);
        this.pagePosts.first({ key: key });
    }

    /* posts模板查询*/
    searchTemplateKey = async (key: string) => {
        this.pageTemplate = new PageTemplate(this.uqs.webBuilder.SearchTemplate);
        this.pageTemplate.first({ key: key });
    }

    searchMadiaKey = async (key: string) => {
        this.pageMedia = new PageMedia(this.uqs.webBuilder.SearchImage);
        this.pageMedia.first({ key: key });
    }
    // 保存Post
    saveItem = async (id: number, param: any) => {
        param.author = this.user.id;
        let ret = await this.uqs.webBuilder.Post.save(id, param);

        if (id) {
            let item = this.pagePosts.items.find(v => v.id === id);
            if (item !== undefined) {
                _.merge(item, param);
                item.$update = new Date();
            }
            this.current = item;
            this.closePage();
        }
        else {
            param.id = ret.id;
            param.$create = new Date();
            param.$update = new Date();
            this.pagePosts.items.unshift(param);
            this.current = param;
        }
        this.searchPostsKey("");
    }

    render = observer(() => {
        return this.renderView(VMain)
    })

    onAdd = () => {
        this.current = undefined;
        this.openVPage(VEdit);
    }

    renderLabel() {
        return this.renderView(VPickTemplate);
    }

    loadList = async () => {
        this.searchPostsKey("");
        this.items = await this.uqs.webBuilder.Post.search('', 0, 100);
        // this.imgItems = await this.uqs.webBuilder.Image.search('', 0, 100);
    }

    showDetail = async (id: number) => {
        this.current = await this.uqs.webBuilder.Post.load(id);
        this.openVPage(VShow);
    }

    pickImage = async (context: Context, name: string, value: number): Promise<any> => {
        this.searchMadiaKey("");
        return await this.vCall(VPickImage);
    }

    onPickedImage = (id: number) => {
        this.closePage();
        this.returnCall(this.uqs.webBuilder.Image.boxId(id));
    }

    pickTemplate = async (context: Context, name: string, value: number): Promise<any> => {
        this.searchTemplateKey("");
        return await this.vCall(VPickTemplate);
    }

    onPickedTemplate = (id: number) => {
        this.closePage();
        this.returnCall(this.uqs.webBuilder.Template.boxId(id));
    }

    onShowRelease = async () => {
        // let agent = {
        //     key1: 1,
        //     arr1: [{ operator: "2" }],
        // }                                      
        this.openVPage(VRelease);
        //let a = await this.uqs.webBuilder.AgentPost.add({ post: 1, operator: "2" });
        // console.log(a, 'a')
    }

    tab = () => {
        return <this.render />;
    }
}