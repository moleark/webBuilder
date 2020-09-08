import * as React from 'react';
import { VPage, Page, List } from 'tonva';
import { observer } from 'mobx-react';
import { consts } from 'consts';
import { CPosts } from './CPosts';
import { observable } from 'mobx';

export class VSelectSubjectEdit extends VPage<CPosts> {

    @observable pageSubject: any;
    @observable name: any;
    @observable parent: any;
    @observable type: number;
    async open(param: any) {
        this.pageSubject = param.pageSubject;
        this.name = param.name;
        this.parent = param.parent;
        this.type = param.type
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
        let { id, name } = model
        let type = this.type
        let { showSelectSubjectEdit } = this.controller;
        return (
            <div className="pl-2 pl-sm-3 pr-2 pr-sm-3 pt-2 pb-3 d-flex">
                <div className="d-flex flex-fill mx-2" >
                    <span>{model.name}</span>
                </div>
                <div onClick={() => this.controller.cApp.cMe.onSubjectEdit({ type, id, name })}> <button className="btn btn-outline-info mx-2 px-3">加到侧栏列表</button></div>
                <div onClick={() => showSelectSubjectEdit({ type: type + 1, id, name })} >
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