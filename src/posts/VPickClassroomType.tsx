import * as React from "react";

import { observer } from "mobx-react";
import { VPage, Page, List } from "tonva";
import { CPosts } from "./CPosts";
import { consts } from "consts";
import { observable } from "mobx";

export class VPickClassroomType extends VPage<CPosts> {

    @observable lidddts: any;

    async open(param: any) {
        this.lidddts = param;
        this.openPage(this.page);
    }

    private page = observer(() => {
        return (
            <Page header={this.t('类型')} headerClassName={consts.headerClass} >
                <List before={""} none="无" items={this.lidddts} item={{ render: this.renderItem }} />
            </Page>
        );
    });

    private renderItem = (model: any, index: number) => {

        return <div className="pl-2 pl-sm-3 pr-2 pr-sm-3 pt-2 pb-3 d-flex" onClick={() => this.controller.onPickClassroomType(model)}>
            <div className="d-flex flex-fill mx-2">
                <span>{model.name}</span>
            </div>
        </div >

    };
}