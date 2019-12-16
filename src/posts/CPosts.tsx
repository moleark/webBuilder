import * as React from "react";
import _ from 'lodash';
import { CUqBase } from "../CBase";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { VMain } from "./VMain";
import { VShow } from "./VShow";
import { VEdit } from "./VEdit";
import { Context } from "tonva";
import { VPickImage } from "./VPickImage";
import { VPickTemplate } from "./VPickTemplate";

export class CPosts extends CUqBase {
    @observable items: any[];
    @observable current: any;

    protected async internalStart(param: any) {
        console.log('aaa');
    }

    //添加任务
    saveItem = async (id:number, param: any) => {
        param.author = this.user.id;
        let ret = await this.uqs.webBuilder.Post.save(id, param);
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

    onAdd = () => {
        this.current = undefined;
        this.openVPage(VEdit);
    }

    loadList = async () => {
        this.items = await this.uqs.webBuilder.Post.search('', 0, 100);
    }

    showDetail = async(id:number) => {
        this.current = await this.uqs.webBuilder.Post.load(id);
        this.openVPage(VShow);
    }

    pickImage = async(context:Context, name:string, value:number):Promise<any> => {
        return await this.vCall(VPickImage);
    }

    onPickedImage = (id:number) => {
        this.closePage();
        this.returnCall(this.uqs.webBuilder.Image.boxId(id));
    }

    pickTemplate = async(context:Context, name:string, value:number):Promise<any> => {
        return await this.vCall(VPickTemplate);
    }

    onPickedTemplate = (id:number) => {
        this.closePage();
        this.returnCall(this.uqs.webBuilder.Template.boxId(id));
    }

    tab = () => {
        return <this.render />;
    }
}