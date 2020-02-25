import _ from "lodash";
import { CUqBase } from "CBase";
import { observable } from "mobx";
import { VTag } from "./VTag";

export class CTag extends CUqBase {
    @observable values1: any;
    protected async internalStart(param: any) {
        let { Test1 } = this.uqs.webBuilder;
        this.values1 = await Test1.loadValues();
    }

    showTag = async () => {
        let { Test1 } = this.uqs.webBuilder;
        this.values1 = await Test1.loadValues();
        this.openVPage(VTag);
    };
}
