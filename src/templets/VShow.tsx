import * as React from 'react';
import { VPage, Page, LMR, tv, EasyTime, UserView, FA, User, Tuid } from "tonva";
import { CTemplets } from "./CTemplets";
import { VEdit } from './VEdit';
import { observer } from 'mobx-react';
import { consts } from 'consts';

export class VShow extends VPage<CTemplets> {
    async open() {
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { current: templet } = this.controller;
        if (templet === undefined) {
            return <Page>...</Page>;
        }
        let { caption, content, author, $create, $update, contentModule } = templet;
        let date = <span><EasyTime date={$update} /></span>;
        let isMe = Tuid.equ(author, this.controller.user.id);
        let right = isMe && <div onClick={() => this.openVPage(VEdit, templet)}><span className="iconfont icon-xiugai1 mr-2" style={{ fontSize: "26px", color: "white" }}></span></div>
        let divUser = this.controller.cApp.renderUser(author.id);
        return <Page header="模板内容" headerClassName={consts.headerClass} right={right} >
            <div className="p-3">
                <div className="mb-1 h5 px-3 py-2 bg-white">{caption}</div>
                <LMR className="mb-3 px-3 small text-black-50" right={date}>
                    {divUser}
                </LMR>
                <div className="small text-muted p-1">PC模板</div>
                <pre className="mb-3 px-3 py-4 bg-white border">{content}</pre>
                <div className="small text-muted p-1">移动端模板</div>
                <pre className="mb-3 px-3 py-4 bg-white">{contentModule}</pre>
            </div>
        </Page>;
    })
}
