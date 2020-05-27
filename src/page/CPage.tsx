import _ from "lodash";
import * as React from "react";
import { VMain } from "./VMain";
import { observable } from "mobx";
import { CUqBase } from "../CBase";
import { observer } from "mobx-react";
import { VShowPage } from "./VShowPage";
import { VEditPage } from "./VEditPage";
import { VPickTemplate } from "./VPickTemplate";
import { Context, QueryPager } from "tonva";
import { VResacModule } from "./VRedactModule";
import { VPickBranch } from "./VPinkBranch";

export class CPage extends CUqBase {
    @observable pageTemplate: QueryPager<any>;
    @observable searchBranch: QueryPager<any>;
    @observable searchwebPage: QueryPager<any>;
    @observable items: any[];
    @observable itemsModule: any[];
    @observable currentModule: any;
    @observable current: any;
    @observable lock: boolean = false;

    protected async internalStart(param: any) { }

    /* 网页查询*/
    searchPageKey = async (key: string, author: any) => {
        this.searchwebPage = new QueryPager(
            this.uqs.webBuilder.SearchWebPage,
            15,
            30
        );
        this.searchwebPage.first({ key: key, author: author });
    };

    // 模板查询
    searchTemplateKey = async (key: string) => {
        this.pageTemplate = new QueryPager(
            this.uqs.webBuilder.SearchTemplate,
            15,
            30
        );
        this.pageTemplate.first({ key: key });
    };

    // 子模板查询
    searchBranchKey = async (key: string) => {
        this.searchBranch = new QueryPager(
            this.uqs.webBuilder.SearchBranch,
            15,
            30
        );
        this.searchBranch.first({ key: key });
    };

    // 保存网页
    saveItem = async (id: number, param: any) => {
        param.author = this.user.id;
        let ret = await this.uqs.webBuilder.WebPage.save(id, param);
        if (id) {
            let item = this.items.find(v => v.id === id);
            if (item !== undefined) {
                _.merge(item, param);
                item.$update = new Date();
            }
            this.current = item;
            this.closePage();
        } else {
            param.id = ret.id;
            param.$create = new Date();
            param.$update = new Date();
            this.items.unshift(param);
            this.current = param;
        }
        this.searchPageKey("", 0);
    };

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
        } else {
            param.id = ret.id;
            param.$create = new Date();
            param.$update = new Date();
            this.itemsModule.unshift(param);
            this.currentModule = param;
        }
        this.searchBranchKey("");
    };

    render = observer(() => {
        return this.renderView(VMain);
    });

    // 添加网页
    onAdd = () => {
        this.current = undefined;
        this.openVPage(VEditPage);
    };

    // 添加子模块
    onRedact = () => {
        this.currentModule = undefined;
        this.openVPage(VResacModule);
    };

    onPickedTemplate = (id: number) => {
        this.closePage();
        this.returnCall(this.uqs.webBuilder.Template.boxId(id));
    };

    onPreviewPage = (id: number) => {
        window.open(
            "https://cs.jkchemical.com/webBuilder/webpage/" + id,
            "_blank"
        );
    };

    // 网页模板
    pickTemplate = async (
        context: Context,
        name: string,
        value: number
    ): Promise<any> => {
        this.searchTemplateKey("");
        return await this.vCall(VPickTemplate);
    };

    loadList = async () => {
        this.searchPageKey("", 0);
        this.items = await this.uqs.webBuilder.WebPage.search("", 0, 100);
    };

    // 公共关联模块
    onCommonalityModule = async () => {
        this.searchBranchKey("");
        this.openVPage(VPickBranch);
    };

    ondisplay = () => {
        if (this.lock) {
            this.lock = false;
        } else {
            this.lock = true;
        }
    };

    // 删除私有模块
    onRemove = async (id: number) => {
        await this.uqs.webBuilder.WebPageBranch.del({
            webPage: this.current.id,
            arr1: [{ branch: id }]
        });
        let result = await this.uqs.webBuilder.SearchPrivateBranch.query({
            _page: this.current.id
        });
        this.itemsModule = result.ret;
    };

    // 选择公共模块
    onPickedBranch = async (id: number) => {
        await this.uqs.webBuilder.WebPageBranch.add({ webPage: this.current.id, arr1: [{ branch: id, sort: 0 }] });
        let result = await this.uqs.webBuilder.SearchPrivateBranch.query({
            _page: this.current.id
        });
        this.itemsModule = result.ret;
        this.closePage();
    };

    // 显示网页详情
    showDetail = async (id: number) => {
        this.current = await this.uqs.webBuilder.WebPage.load(id);
        let result = await this.uqs.webBuilder.SearchPrivateBranch.query({
            _page: id
        });
        this.itemsModule = result.ret;
        console.log(this.itemsModule.length, "this.itemsModule");

        this.openVPage(VShowPage);
    };

    // 显示模块详情
    showDetailModule = async (itme: any) => {
        this.currentModule = itme;
        this.openVPage(VResacModule);
    };

    // 添加子模块
    onAddMap = async () => {
        await this.uqs.webBuilder.WebPageBranch.add({
            webPage: this.current.id,
            arr1: [
                { branch: this.currentModule.id, sort: this.currentModule.sort }
            ]
        });
    };
    //：{ key1: key1值, arr1:[{key2: key2值}]

    tab = () => {
        return <this.render />;
    };
}
