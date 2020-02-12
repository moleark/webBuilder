import * as React from "react";
import _ from "lodash";
import { CUqBase } from "../CBase";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { VMain } from "./VMain";
import { VShow } from "./VShow";
import { QueryPager } from "tonva";

export class CTemplets extends CUqBase {
    @observable pageTemplate: QueryPager<any>;
    @observable items: any[];
    @observable current: any;

    protected async internalStart(param: any) {}

    /* 模板查询*/
    searchTemplateKey = async (key: string) => {
        this.pageTemplate = new QueryPager(
            this.uqs.webBuilder.SearchTemplate,
            15,
            30
        );
        this.pageTemplate.first({ key: key });
    };

    //保存
    saveItem = async (id: number, param: any) => {
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
        } else {
            param.id = ret.id;
            param.$create = new Date();
            param.$update = new Date();
            this.items.unshift(param);
            this.current = param;
        }
        this.searchTemplateKey("");
    };

    render = observer(() => {
        return this.renderView(VMain);
    });

    loadList = async () => {
        this.searchTemplateKey("");
        this.items = await this.uqs.webBuilder.Template.search("", 0, 100);
    };

    showDetail = async (id: number) => {
        this.current = await this.uqs.webBuilder.Template.load(id);
        this.openVPage(VShow);
    };

    tab = () => {
        return <this.render />;
    };
}
