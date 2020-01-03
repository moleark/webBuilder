import * as React from 'react';
import { consts } from 'consts';
import { CPage } from "./CPage";
import { observer } from 'mobx-react';
import { VEditPage } from './VEditPage';
import { VPage, Page, LMR, tv, EasyTime, UserView, FA, User, Tuid } from "tonva";

export class VShowPage extends VPage<CPage> {
    async open() {
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { current } = this.controller;
        let { titel, name, author, template, discription, $create, $update } = current;
        let date = <span><EasyTime date={$update} /></span>;
        let isMe = Tuid.equ(author, this.controller.user.id);
        let right = isMe && <button className="btn btn-sm btn-success mr-2 align-self-center" onClick={() => this.openVPage(VEditPage)}><FA name="pencil-square-o" /></button>;
        let renderAuthor = (user: User) => {
            return <span>{isMe ? '[我]' : user.nick || user.name}</span>;
        };
        return <Page header="网页内容" headerClassName={consts.headerClass} right={right}>
            <div className="p-3">
                <div className="small text-muted p-1">标题</div>
                <div className="mb-1 h6 px-3 py-2 bg-white">{titel}</div>
                <LMR className="mb-3 px-3 small text-black-50" right={date}>
                    <UserView id={author} render={renderAuthor} />
                </LMR>
                <div className="small text-muted p-1">链接描述</div>
                <LMR className="mb-3 bg-white px-3 h6">
                    <div className="py-2">{discription}</div>
                </LMR>
                <div className="small text-muted p-1">名字</div>
                <pre className="mb-3 px-3 py-4 bg-white h4 border">{name}</pre>
                <div className="small text-muted p-1">布局模板</div>
                <div className="mb-3 px-3 py-2 bg-white h6">
                    {tv(template, (values) => <>{values.caption}</>, undefined, () => <small className="text-muted" >[无]</small>)}
                </div>
            </div>
        </Page>;
    })
}