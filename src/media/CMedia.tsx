import * as React from "react";
import _ from 'lodash';
import { CUqBase } from "../CBase";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { VMain } from "./VMain";
//import { Content } from "./model/content"


export class CMedia extends CUqBase {
    @observable items: any[];
    @observable current: any;

    protected async internalStart(param: any) {

    }

    //添加任务
    saveItem = async (id:any, param: any) => {
        param.author = this.user.id;
        let ret = await this.uqs.webBuilder.Image.save(id, param);
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
        this.items = await this.uqs.webBuilder.Image.search('', 0, 100);
    }

    tab = () => {
        return <this.render />;
    }
}