import * as React from 'react';
import { consts } from 'consts';
import { CBranch } from "./CBranch";
import { observer } from 'mobx-react';
import { VEditBranch } from './VEditBranch';
import { VPage, Page, LMR, tv, EasyTime, UserView, FA, User, Tuid } from "tonva";

export class VShowBranch extends VPage<CBranch> {
    async open() {
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { current } = this.controller;
        let { content, author, $create, $update,titel } = current;
        let date = <span><EasyTime date={$update} /></span>;
        let isMe = Tuid.equ(author, this.controller.user.id);
        let right = isMe && <button className="btn btn-sm btn-success mr-2 align-self-center" onClick={() => this.openVPage(VEditBranch)}><FA name="pencil-square-o" /></button>;
        let renderAuthor = (user: User) => {
            return <span>{isMe ? '[我]' : user.nick || user.name}</span>;
        };
        return <Page header="子模块详情" headerClassName={consts.headerClass} right={right}>
            <div className="p-3">
                <LMR className="mb-3 px-3 small text-black-50" right={date}>
                    <UserView id={author} render={renderAuthor} />
                </LMR>
                <div className="small text-muted p-1">内容</div>
                <pre className="mb-3 px-3 py-4 bg-white h4 border">{content}</pre>
            </div>
        </Page>;
    })
}