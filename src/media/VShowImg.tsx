import * as React from "react";
import { CMedia } from './CMedia';
import { VPage, Page, EasyTime, Tuid, User, FA, LMR, UserView, tv } from "tonva";
import { observer } from "mobx-react";
import { consts } from "consts";

export class VShowImg extends VPage<CMedia> {
    async open() {
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { current } = this.controller;
        let { caption, path, author, image, template, discription, $create, $update } = current;
        let date = <span><EasyTime date={$update} /></span>;
        let isMe = Tuid.equ(author, this.controller.user.id);
        let right = isMe && <button className="btn btn-sm btn-success mr-2 align-self-center"><FA name="pencil-square-o" /></button>;
        let divUser = this.controller.cApp.renderUser(author.id);
        return <Page header="编辑图片" headerClassName={consts.headerClass} right={right}>
            <div className="p-3">
                <div className="small text-muted p-1">标题</div>
                <div className="mb-1 h6 px-3 py-2 bg-white">{caption}</div>
                <LMR className="mb-3 px-3 small text-black-50" right={date}>
                    {divUser}
                </LMR>
                <div className="small text-muted p-1">链接描述</div>
                <div className="small text-muted p-1">内容</div>
                <div className="small text-muted p-1">布局模板</div>
                <div className="mb-3 px-3 py-2 bg-white h6">
                    {tv(template, (values) => <>{values.caption}</>, undefined, () => <small className="text-muted" >[无]</small>)}
                </div>
            </div>
        </Page>;
    })
}