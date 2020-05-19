import * as React from 'react';
import { VPage, Page, List } from "tonva";
import { CPosts } from "./CPosts";
import { observer } from 'mobx-react';
import { consts } from 'consts';
import { observable } from 'mobx';

export class VPickDomain extends VPage<CPosts> {

    @observable pageSubject: any;
    async open(param: any) {
        this.pageSubject = param;
        this.openPage(this.page);
    }

    private page = observer(() => {
        return (
            <Page header={"领域"} headerClassName={consts.headerClass} >
                <List before={""} none="无" items={this.pageSubject} item={{ render: this.renderItem }} />
            </Page>
        );
    });

    private renderItem = (model: any, index: number) => {
        let { onPickDomain, pickDomain } = this.controller;
        let { name, id } = model;
        return (
            <div className="pl-2 pl-sm-3 pr-2 pr-sm-3 pt-2 pb-3 d-flex">
                <div className="d-flex flex-fill mx-2" onClick={() => onPickDomain(model)} >
                    <span>{name}</span>
                </div>
                <div onClick={() => pickDomain(id)} >
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