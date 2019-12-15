import * as React from 'react';
import { VPage, Page, LMR, tv, EasyTime, UserView, FA, User, Tuid } from "tonva";
import { CPosts } from "./CPosts";

export class VPickTemplate extends VPage<CPosts> {
    private pickedId = 10;

    async open() {
        this.openPage(this.page);
    }

    private page = () => {
        return <Page header="选择模板" back="close">
            <div className="p-3">
                <button className="btn btn-primary"
                    onClick={()=>this.controller.onPickedTemplate(this.pickedId)}>点我返回模板id={this.pickedId}</button>
            </div>
        </Page>
    }
}
