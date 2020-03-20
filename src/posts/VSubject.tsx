import * as React from "react";
import { observer } from "mobx-react";
import { VPage, Page, List } from "tonva";
import { consts } from "consts";
import { CPosts } from "./CPosts";

export class VSubject extends VPage<CPosts> {

    async open() {
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { pageSubject } = this.controller;
        return (
            <Page header={"帖文栏目"} headerClassName={consts.headerClass} >
                <List before={""} none="无" items={pageSubject} item={{ render: this.renderItem }} />
            </Page>
        );
    });

    private renderItem = (model: any, index: number) => {
        let { showSubjectPost } = this.controller;
        let { name } = model;
        return (
            <div className="pl-2 pl-sm-3 pr-2 pr-sm-3 pt-2 pb-3 d-flex">
                <div className="d-flex flex-fill mx-2" >
                    <span>{name}</span>
                </div>
                <div onClick={() => showSubjectPost(model)} >
                    <div className="small d-flex cursor-pointer text-primary text-right w-7c ">
                        <button className="btn btn-outline-info mx-2 px-3">
                            贴  文
                        </button>
                    </div>
                </div>
            </div >
        );
    };
}