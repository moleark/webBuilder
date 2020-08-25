import * as React from 'react';
import { VPage, Page, List } from 'tonva';
import { observer } from 'mobx-react';
import { consts } from 'consts';
import { CPosts } from './CPosts';
import { observable } from 'mobx';

export class VSubjectEdit extends VPage<CPosts> {

    @observable pageSubject: any;
    @observable name: any;
    @observable parent: any;
    async open(param: any) {
        this.pageSubject = param.pageSubject;
        this.name = param.name;
        this.parent = param.parent;
        this.openPage(this.page);
    }

    private page = observer(() => {
        let right = <div onClick={() => this.controller.showSubjectAdd({ parent: this.parent, name: "", id: -1 })}>
            <span className="mx-sm-2 iconfont icon-jiahao1 cursor-pointer" style={{ fontSize: "1.7rem", color: "white" }}></span>
        </div>;

        return (
            <Page header={this.name} headerClassName={consts.headerClass} right={right}>
                <List before={""} none="无" items={this.pageSubject} item={{ render: this.renderItem }} />
            </Page>
        );
    });

    private renderItem = (model: any, index: number) => {
        let { showSubjectEdit } = this.controller;
        return (
            <div className="pl-2 pl-sm-3 pr-2 pr-sm-3 pt-2 pb-3 d-flex">
                <div className="d-flex flex-fill mx-2" >
                    <span>{model.name}</span>
                </div>
                <div onClick={() => showSubjectEdit(model)} >
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