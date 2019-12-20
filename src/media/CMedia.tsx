import * as React from "react";
import _ from 'lodash';
import { CUqBase } from "../CBase";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { VMain } from "./VMain";
import { PageItems, Query } from "tonva";
import { VShowImg } from "./VShowImg";
import { VEdit } from "./VEdit";
//import { Content } from "./model/content"


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

export class CMedia extends CUqBase {
    @observable pageMedia: PageMedia;
    @observable items: any[];
    @observable current: any;

    protected async internalStart(param: any) {

    }

    searchMadiaKey = async (key: string) => {
        this.pageMedia = new PageMedia(this.uqs.webBuilder.SearchImage);
        this.pageMedia.first({ key: key });
    }

    //添加任务
    saveItem = async (id: any, param: any) => {
        param.author = this.user.id;
        let ret = await this.uqs.webBuilder.Image.save(id, param);
        if (id) {
            let item = this.items.find(v => v.id === id);
            if (item !== undefined) {
                _.merge(item, param);
                item.$update = new Date();
            }
            this.current = item;
        }
        else {
            param.id = ret.id;
            param.$create = new Date();
            param.$update = new Date();
            this.items.unshift(param);
            this.current = param;
        }
        this.searchMadiaKey("");
    }

    onAddClick = () => {
        this.current = undefined;
        this.openVPage(VEdit);
    }

    render = observer(() => {
        return this.renderView(VMain)
    })

    showMedia = async (id: number) => {
        this.current = await this.uqs.webBuilder.Image.load(id);
        this.openVPage(VShowImg);
    }

    loadList = async () => {
        this.items = await this.uqs.webBuilder.Image.search('', 0, 100);
        this.searchMadiaKey("");
    }

    tab = () => {
        return <this.render />;
    }
}