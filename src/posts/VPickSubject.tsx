import * as React from "react";
import { observer } from "mobx-react";
import { VPage, Page, List } from "tonva";
import { consts } from "consts";
import { CPosts } from "./CPosts";
import { observable } from "mobx";

export class VPickSubject extends VPage<CPosts> {

    @observable pageSubject: any;
    async open(param: any) {
        this.pageSubject = param;
        this.openPage(this.page);
    }

    private page = observer(() => {
        return (
            <Page header={"栏目"} headerClassName={consts.headerClass} >
                <List before={""} none="无" items={this.pageSubject} item={{ render: this.renderItem }} />
            </Page>
        );
    });

    private renderItem = (model: any, index: number) => {
        let { onPickSubject, searchSubject } = this.controller;
        let { name, id } = model;
        return (
            <div className="pl-2 pl-sm-3 pr-2 pr-sm-3 pt-2 pb-3 d-flex">
                <div className="d-flex flex-fill mx-2" onClick={() => onPickSubject(model)} >
                    <span>{name}</span>
                </div>
                <div onClick={() => searchSubject(id)} >
                    <div className="small d-flex cursor-pointer text-primary text-right w-7c ">
                        <button className="btn btn-outline-info mx-2 px-3">
                            下一级
                        </button>
                    </div>
                </div>
            </div >
        );
    };
}