import _ from 'lodash';
import * as React from 'react';
import { VMain } from './VMain';
import { observable } from 'mobx';
import { CUqBase } from '../CBase';
import { observer } from 'mobx-react';
import { VShowPage } from './VShowPage';
import { VEditPage } from './VEditPage';
import { VPickTemplate } from "./VPickTemplate";
import { Query, PageItems, nav, Context } from 'tonva';
import { VResacModule } from './VRedactModule';

// 网页
class WebPage extends PageItems<any> {

    private searchPageQuery: Query;

    constructor(searchQuery: Query) {
        super();
        this.firstSize = this.pageSize = 8;
        this.searchPageQuery = searchQuery;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchPageQuery.page(param, pageStart, pageSize);
        return ret;
    }

    protected setPageStart(item: any): any {
        this.pageStart = item === undefined ? 0 : item.id;
    }
}

// 模板
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

export class CPage extends CUqBase {
    @observable pageTemplate: PageTemplate;
    @observable webPage: WebPage;
    @observable items: any[];
    @observable itemsModule: any[];
    @observable currentModule: any;
    @observable current: any;

    protected async internalStart(param: any) {
    }

    /* 网页查询*/
    searchPageKey = async (key: string, author: any) => {
        this.webPage = new WebPage(this.uqs.webBuilder.SearchWebPage);
        this.webPage.first({ key: key, author: author });
    }

    // 模板查询
    searchTemplateKey = async (key: string) => {
        this.pageTemplate = new PageTemplate(this.uqs.webBuilder.SearchTemplate);
        this.pageTemplate.first({ key: key });
    }

    // 保存网页
    saveItem = async (id: number, param: any) => {
        param.author = this.user.id;
        let ret = await this.uqs.webBuilder.WebPage.save(id, param);
        if (id) {
            let item = this.webPage.items.find(v => v.id === id);
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
            this.webPage.items.unshift(param);
            this.current = param;
        }
        this.searchPageKey("", 0);
    }

    // 保存模块
    saveItemModule = async (id: number, param: any) => {
        param.author = this.user.id;
        let ret = await this.uqs.webBuilder.Branch.save(id, param);
        if (id) {
            let item = this.itemsModule.find(v => v.id === id);
            if (item !== undefined) {
                _.merge(item, param);
                item.$update = new Date();
            }
            this.currentModule = item;
        }
        else {
            param.id = ret.id;
            param.$create = new Date();
            param.$update = new Date();
            this.itemsModule.unshift(param);
            this.currentModule = param;
        }
        this.searchPageKey("", 0);
    }

    render = observer(() => {
        return this.renderView(VMain)
    })

    onAdd = () => {
        this.current = undefined;
        this.openVPage(VEditPage);
    }

    onRedact = () => {
        this.currentModule = undefined;
        this.openVPage(VResacModule);
    }

    onPickedTemplate = (id: number) => {
        this.closePage();
        this.returnCall(this.uqs.webBuilder.Template.boxId(id));
    }

    pickTemplate = async (context: Context, name: string, value: number): Promise<any> => {
        this.searchTemplateKey("");
        return await this.vCall(VPickTemplate);
    }

    loadList = async () => {
        this.searchPageKey('', 0);
        this.items = await this.uqs.webBuilder.WebPage.search('', 0, 100);
        this.itemsModule = await this.uqs.webBuilder.Branch.search('', 0, 100);
        
        // this.itemsModule = await this.uqs.webBuilder.SearchBranch.query({ _page: this.current.id });
        
        
    }



    showDetail = async (id: number) => {
        this.current = await this.uqs.webBuilder.WebPage.load(id);
       
        this.itemsModule = await this.uqs.webBuilder.SearchBranch.query({ _page: id });
        console.log(this.itemsModule,'this.current')
        this.openVPage(VShowPage);
    }

    onMyContent = async () => {
        //  await this.uqs.webBuilder.Branch.search('', 0, 100);
        // for (var i = 0; i < a.length; i++) {
        //     if (a[i].displayed == 1) {
        //          await this.uqs.webBuilder.Branch.search(a[i].displayed, 0, 100)
        //     }
        // }
    }


    showDetailModule = async (id: number) => {
        this.currentModule = await this.uqs.webBuilder.Branch.load(id);
        this.openVPage(VResacModule);
    }

    onAddMap = async () => {
        await this.uqs.webBuilder.WebPageBranch.add({ webPage: this.current.id, arr1: [{ branch: this.currentModule.id, sort: 1 }] });
        let a  = await this.uqs.webBuilder.SearchBranch.query({ _page: 8 });
        console.log(a,'aa');
    }
    //：{ key1: key1值, arr1:[{key2: key2值}] 

    tab = () => {
        return <this.render />;
    }
}