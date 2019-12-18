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


class PageTemplate extends PageItems<any> {

    private searchTemplateQuery: Query;

    constructor(searchQuery: Query) {
        super();
        this.firstSize = this.pageSize = 11;
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

export class CPosts extends CUqBase {

    @observable pageTemplate: PageTemplate;

    @observable items: any[];
    @observable templetItems: any[];
    @observable imgItems: any[];
    @observable current: any;

    protected async internalStart(param: any) {
    }
    /**
     * 查询客户——用在客户首页
     */
    searchTemplateKey = async (key: string) => {
        this.pageTemplate = new PageTemplate(this.uqs.webBuilder.SearchTemplate);
        this.pageTemplate.first({ key: key });
    }

    // 保存Post
    saveItem = async (id: number, param: any) => {
        param.author = this.user.id;
        let ret = await this.uqs.webBuilder.Post.save(id, param);
        if (id) {
            let item = this.items.find(v => v.id === id);
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
            this.items.unshift(param);
            this.current = param;
        }
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
        this.items = await this.uqs.webBuilder.Post.search('', 0, 100);
        this.templetItems = await this.uqs.webBuilder.Template.search('', 0, 100);
        this.imgItems = await this.uqs.webBuilder.Image.search('', 0, 100);
    }

    showDetail = async (id: number) => {
        this.current = await this.uqs.webBuilder.Post.load(id);
        this.openVPage(VShow);
    }

    pickImage = async (context: Context, name: string, value: number): Promise<any> => {
        return await this.vCall(VPickImage);
    }

    onPickedImage = (id: number) => {
        this.closePage();
        this.returnCall(this.uqs.webBuilder.Image.boxId(id));
    }

    pickTemplate = async (context: Context, name: string, value: number): Promise<any> => {
        return await this.vCall(VPickTemplate);
    }

    onPickedTemplate = (id: number) => {
        this.closePage();
        this.returnCall(this.uqs.webBuilder.Template.boxId(id));

    }

    tab = () => {
        return <this.render />;
    }
}