import * as React from "react";
import _ from 'lodash';
import { CUqBase } from "../CBase";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { VMain } from "./VMain";
import { VShow } from "./VShow";
import { PageItems, Query } from "tonva";

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

export class CTemplets extends CUqBase {
    @observable pageTemplate: PageTemplate;
    @observable items: any[];
    @observable current: any;

    protected async internalStart(param: any) {
    }

    /* 模板查询*/
    searchTemplateKey = async (key: string) => {
        this.pageTemplate = new PageTemplate(this.uqs.webBuilder.SearchTemplate);
        this.pageTemplate.first({ key: key });
    }

    //保存
    saveItem = async (id:number, param: any) => {
        param.author = this.user.id;
        let ret = await this.uqs.webBuilder.Template.save(id, param);
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
        this.searchTemplateKey("");
    }

    render = observer(() => {
        return this.renderView(VMain)
    })

    loadList = async () => {
        this.searchTemplateKey("");
        this.items = await this.uqs.webBuilder.Template.search('', 0, 100);
    }

    showDetail = async(id:number) => {
        this.current = await this.uqs.webBuilder.Template.load(id);
        this.openVPage(VShow);
    }

    tab = () => {
        return <this.render />;
    }
}