import * as React from "react";
import { VPage, Page, List, tv } from "tonva";
import { observer } from "mobx-react";
import { consts } from "consts";
import { CMe } from './CMe';
import { observable } from "mobx";

export class VSidebarSubject extends VPage<CMe> {
    @observable name: any;
    async open() {
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { selectSubject, pageSidebar } = this.controller;
        let right = <span onClick={selectSubject} className="mx-2 iconfont icon-jiahao1 cursor-pointer" style={{ fontSize: "1.7rem", color: "white" }}></span>
        return <Page header={this.t('sidesubject')} headerClassName={consts.headerClass} right={right}>
            <List before={""} none="无" items={pageSidebar} item={{ render: this.renderItem }} />
        </Page>;
    })
    private renderItem = (item: any, index: number) => {
        return <this.itemRow {...item} />;
    };
    private itemRow = observer((item: any) => {
        return (<div className="pl-2 pl-sm-3 pr-2 pr-sm-3 py-3 d-flex justify-content-between">
            <div className='text-muted'>
                {tv(item.subject, v => v.name)}
            </div>
            <div>
                <span className="text-primary iconfont icon-shanchu pr-1" onClick={() => this.controller.delSubjectEdit(item.subject)}>
                </span>
            </div>
        </div>)
    })
}