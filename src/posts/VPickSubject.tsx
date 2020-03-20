import * as React from "react";
import { observer } from "mobx-react";
import { VPage, Page, List } from "tonva";
import { consts } from "consts";
import { CPosts } from "./CPosts";

export class VPickSubject extends VPage<CPosts> {

    async open() {
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { pageSubject } = this.controller;
        return (
            <Page header={"栏目"} headerClassName={consts.headerClass} >
                <List before={""} none="无" items={pageSubject} item={{ render: this.renderItem }} />
            </Page>
        );
    });

    private renderItem = (model: any, index: number) => {
        let { onPickSubject } = this.controller;
        let { name } = model;
        return (
            <div className="pl-2 pl-sm-3 pr-2 pr-sm-3 pt-2 pb-3 d-flex">
                <div className="d-flex flex-fill mx-2" onClick={() => onPickSubject(model)} >
                    <span>{name}</span>
                </div>
            </div >
        );
    };
}