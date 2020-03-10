import * as React from "react";
import _ from "lodash";
import { CUqBase } from "../CBase";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { VMain } from "./VMain";
import { QueryPager } from "tonva";
import { VShowImg } from "./VShowImg";
import { VEdit } from "./VEdit";
import { VChangeNames } from "./VChangeNames";

export class CMedia extends CUqBase {
    @observable pageMedia: QueryPager<any>;
    @observable current: any;

    protected async internalStart(param: any) { }

    searchMadiaKey = async (key: string) => {
        this.pageMedia = new QueryPager(this.uqs.webBuilder.SearchImage, 15, 30);
        this.pageMedia.first({ key: key });
    };

    //添加任务
    saveItem = async (id: any, param: any) => {
        let pa = { caption: param.caption, path: param.path, author: this.user.id, isValid: 1 };
        let ret = await this.uqs.webBuilder.Image.save(id, pa);
        if (id) {
            let item = this.pageMedia.items.find(v => v.id === id);
            if (item !== undefined) {
                _.merge(item, param);
                item.$update = new Date();
            }
            this.current = item;
        } else {
            param.id = ret.id;
            param.$create = new Date();
            param.$update = new Date();
            this.pageMedia.items.unshift(param);
            this.current = param;
        }
        this.searchMadiaKey("");
    };

    onAddClick = () => {
        this.current = undefined;
        this.openVPage(VEdit);
    };

    onimgNames = async (id: number) => {
        this.current = await this.uqs.webBuilder.Image.load(id);
        this.openVPage(VChangeNames);
    }

    render = observer(() => {
        return this.renderView(VMain);
    });

    showMedia = async (id: number) => {
        this.current = await this.uqs.webBuilder.Image.load(id);
        this.openVPage(VShowImg);
    };

    loadList = async () => {
        this.searchMadiaKey("");
    };

    onRem = async (id: number) => {
        this.current = await this.uqs.webBuilder.Image.save(id, {isValid: 0});
        this.searchMadiaKey("");
    }

    tab = () => {
        return <this.render />;
    };
}
