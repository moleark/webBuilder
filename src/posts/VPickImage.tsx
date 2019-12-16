import * as React from 'react';
import { VPage, Page, LMR, tv, EasyTime, UserView, FA, User, Tuid } from "tonva";
import { CPosts } from "./CPosts";

export class VPickImage extends VPage<CPosts> {
    private pickedId = 7;

    async open() {
        this.openPage(this.page);
    }

    private page = () => {
        return <Page header="选择图片" back="close">
            <div className="p-3">
                <button className="btn btn-primary" onClick={()=>this.controller.onPickedImage(this.pickedId)}>
                    点我返回图片id={this.pickedId}
                </button>
            </div>
        </Page>
    }
}
