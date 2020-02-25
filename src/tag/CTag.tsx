import _ from "lodash";
import { CUqBase } from "CBase";
import { observable } from "mobx";
import { VTag } from "./VTag";
import { Tag } from "tonva";

export class CTag extends CUqBase {
    Test1: Tag;
    protected async internalStart(param: any) {
		let { Test1 } = this.uqs.webBuilder;
		this.Test1 = Test1;
        await Test1.loadValues();
    }

    showTag = async () => {
        let { Test1 } = this.uqs.webBuilder;
		this.Test1 = Test1;
        await Test1.loadValues();
        this.openVPage(VTag);
    };
}
