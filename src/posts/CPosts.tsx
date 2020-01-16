import * as React from "react";
import _ from 'lodash';
import { CUqBase } from "../CBase";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import { VMain } from "./VMain";
import { VShow } from "./VShow";
import { VEdit } from "./VEdit";
import { Context, PageItems, Query, nav } from "tonva";
import { VPickImage } from "./VPickImage";
import { VPickTemplate } from "./VPickTemplate";
import { VRelease } from "./VRelease ";
import { IdCache } from "tonva/uq/tuid/idCache";

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
    @observable current: any;
    @observable flg: boolean = true;

    protected async internalStart(param: any) {
    }

    /* 贴文查询*/
    searchPostsKey = async (key: string, author:any) => {
        this.pagePosts = new PagePosts(this.uqs.webBuilder.SearchPost);
        let a = this.flg ? nav.user : 0;
        this.pagePosts.first({ key: key, author: a });
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
        this.searchPostsKey("", nav.user);
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
        if (this.flg) {
            this.searchPostsKey("", nav.user);
        } else {
            this.searchPostsKey("", 0);
        }
        this.items = await this.uqs.webBuilder.Post.search('', 0, 100);

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
        this.openVPage(VRelease);
    }

    publishPost = async (param: any) => {
        this.searchPostsKey("", 0);
        await this.uqs.webBuilder.PublishPost.submit({ _post: this.current.id, _operator: nav.user, tags: [{ tagName: param[0] }, { tagName: param[1] }, { tagName: param[2] }, { tagName: param[3] }] })
        this.closePage(2)
    }

    onPreviewPost = (id: number) => {
        window.open('https://c.jkchemical.com/webBuilder/post/' + id, '_blank')
    }

    tab = () => {
        return <this.render />;
    }
}