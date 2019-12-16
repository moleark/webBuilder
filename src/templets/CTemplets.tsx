import * as React from "react";
import _ from 'lodash';
import { CUqBase } from "../CBase";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { VMain } from "./VMain";
import { VShow } from "./VShow";
//import { Content } from "./model/content"


export class CTemplets extends CUqBase {
    @observable items: any[];
    @observable current: any;

    protected async internalStart(param: any) {
        console.log('aaa');
    }

    //添加任务
    saveItem = async (id:number, param: any) => {
        param.author = this.user.id;
        let ret = await this.uqs.webBuilder.Template.save(id, param);
        if (id) {
            let item = this.items.find(v => v.id === id);
            this.current = item;
            if (item !== undefined) {
                _.merge(item, param);
                item.$update = new Date();
            }
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

    loadList = async () => {
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