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
//import { Content } from "./model/content"

export class CMedia extends CUqBase {
    @observable pageMedia: QueryPager<any>;
    @observable items: any[];
    @observable current: any;

    protected async internalStart(param: any) {}

    searchMadiaKey = async (key: string) => {
        this.pageMedia = new QueryPager(
            this.uqs.webBuilder.SearchImage,
            15,
            30
        );
        this.pageMedia.first({ key: key });
    };

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
        } else {
            param.id = ret.id;
            param.$create = new Date();
            param.$update = new Date();
            this.items.unshift(param);
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
        // console.log(a,'aid')
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
        this.items = await this.uqs.webBuilder.Image.search("", 0, 100);
        this.searchMadiaKey("");
    };

    tab = () => {
        return <this.render />;
    };
}
