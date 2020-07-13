import * as React from "react";
import { observer } from "mobx-react";
import { VPage, Page, List } from "tonva";
import { consts } from "consts";
import { CPosts } from "./CPosts";
import { observable } from "mobx";

export class VSubject extends VPage<CPosts> {
    @observable name: any;
    @observable pageSubject: any;
    async open(param: any) {
        this.pageSubject = param.pageSubject;
        this.name = param.name
        this.openPage(this.page);
    }

    private page = observer(() => {
        return (
            <Page header={this.name} headerClassName={consts.headerClass} >
                <List before={""} none="无" items={this.pageSubject} item={{ render: this.renderItem }} />
            </Page>
        );
    });

    private renderItem = (model: any, index: number) => {
        let { showSubjectPost, showSubject } = this.controller;
        let { name, counts, child } = model;
        return (
            <div className="pl-2 pl-sm-3 pr-2 pr-sm-3 pt-2 pb-3 d-flex">
                <div className="d-flex flex-fill mx-2" >
                    <span className="pt-2 mr-2">{name}</span>
                </div>
                <div onClick={() => showSubjectPost(model)} >
                    <div className="small d-flex cursor-pointer text-primary text-center w-7c ">
                        {counts > 0 && <span className="header-login">{counts}</span>}
                    </div>
                </div>
                <div onClick={() => showSubject(model)} >
                    <div className="small d-flex cursor-pointer text-primary text-right w-7c ">
                        {child > 0 && <button className="btn btn-outline-info mx-2 px-3">下一级</button>}
                    </div>
                </div>
            </div >
        );
    };
}