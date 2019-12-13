import * as React from "react";
import { CUqBase } from "../CBase";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { VMain } from "./VMain";
import { Content } from "./model/content"


export class CTask extends CUqBase {
    protected async internalStart(param: any) {

    }

    //添加任务
    createTask = async (param: any) => {
        console.log(param)
        let model = {
            name: "any",
            content: param.content
        }
        await this.uqs.webBuilder.Content.save(undefined, model);
    }

    render = observer(() => {

        return this.renderView(VMain)

    })

    tab = () => {
        return <this.render />;
    }
}