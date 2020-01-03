import * as React from 'react';
import { VPage, Page, LMR, tv, EasyTime, UserView, FA, User, Tuid } from "tonva";
import { CPosts } from "./CPosts";
import { VEdit } from './VEdit';
import { observer } from 'mobx-react';
import { consts } from 'consts';

export class VShow extends VPage<CPosts> {
    async open() {
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { current, onShowRelease } = this.controller;
        let { caption, content, author, image, template, discription, $create, $update } = current;
        let date = <span><EasyTime date={$update} /></span>;
        let isMe = Tuid.equ(author, this.controller.user.id);
        let right = isMe && <button className="btn btn-sm btn-success mr-2 align-self-center" onClick={() => this.openVPage(VEdit)}><FA name="pencil-square-o" /></button>;
        let renderAuthor = (user: User) => {
            return <span>{isMe ? '[我]' : user.nick || user.name}</span>;
        };
        let tvImage = tv(image, (values) => {
            return <div className="border p-2"><img className="w-3c h-3c" src={values.path} /></div>;
        }, undefined,
            () => null);
        return <Page header="帖文内容" headerClassName={consts.headerClass} right={right}>
            <div className="p-3">
                <div className="small text-muted p-1">标题</div>
                <div className="mb-1 h6 px-3 py-2 bg-white">{caption}</div>
                <LMR className="mb-3 px-3 small text-black-50" right={date}>
                    <UserView id={author} render={renderAuthor} />
                </LMR>
                <div className="small text-muted p-1">链接描述</div>
                <LMR className="mb-3 bg-white px-3 h6" right={tvImage}>
                    <div className="py-2">{discription}</div>
                </LMR>
                <div className="small text-muted p-1">内容</div>
                <pre className="mb-3 px-3 py-4 bg-white h6 border">{content}</pre>
                <div className="small text-muted p-1">布局模板</div>
                <div className="mb-3 px-3 py-2 bg-white h6">
                    {tv(template, (values) => <>{values.caption}</>, undefined, () => <small className="text-muted" >[无]</small>)}
                </div>
                <div><button className="col-12 btn btn-sm btn-primary" onClick={() => onShowRelease()}>发布</button></div>
            </div>
        </Page>;
    })
}
