import * as React from 'react';
import { VPage, Page, LMR, tv, EasyTime, UserView, FA, User, Tuid } from "tonva";
import { CTemplets } from "./CTemplets";
import { VEdit } from './VEdit';
import { observer } from 'mobx-react';

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
        let right = isMe && <button className="btn btn-sm btn-success mr-2 align-self-center" onClick={() => this.openVPage(VEdit, templet)}><FA name="pencil-square-o" /></button>;
        let renderAuthor = (user: User) => {
            return <span>{isMe ? '[我]' : user.nick || user.name}</span>;
        };
        return <Page header="模板内容" right={right}>
            <div className="p-3">
                <div className="mb-1 h5 px-3 py-2 bg-white">{caption}</div>    
                <LMR className="mb-3 px-3 small text-black-50" right={date}>
                    <UserView id={author} render={renderAuthor} />
                </LMR>                
                <div className="small text-muted p-1">PC模板</div>
                <pre className="mb-3 px-3 py-4 bg-white border">{content}</pre>       
                <div className="small text-muted p-1">移动端模板</div>
                <pre className="mb-3 px-3 py-4 bg-white">{contentModule}</pre>
            </div>
        </Page>;
    })
}
