import * as React from "react";
import { CMedia } from './CMedia';
import { VPage, Page, EasyTime, Tuid, User, FA, LMR, UserView, tv } from "tonva";
import { observer } from "mobx-react";
import { consts } from "consts";
import { VEdit } from "./VEdit";

export class VShowImg extends VPage<CMedia> {
    async open() {
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { current } = this.controller;
        console.log(current, 'current')
        let { caption, path, author, image, template, discription, $create, $update } = current;
        console.log($update)
        let date = <span><EasyTime date={$update} /></span>;
        let isMe = Tuid.equ(author, this.controller.user.id);           // onClick={() => this.openVPage(VEdit)}
        let right = isMe && <button className="btn btn-sm btn-success mr-2 align-self-center"><FA name="pencil-square-o" /></button>;
        let renderAuthor = (user: User) => {
            return <span>{isMe ? '[我]' : user.nick || user.name}</span>;
        };
        return <Page header="图片详情" headerClassName={consts.headerClass} right={right}>
            <div className="p-3">
                <div className="small text-muted p-1">标题</div>
                <div className="mb-1 h6 px-3 py-2 bg-white">{caption}</div>
                <LMR className="mb-3 px-3 small text-black-50" right={date}>
                    <UserView id={author} render={renderAuthor} />
                </LMR>
                <div className="small text-muted p-1">链接描述</div>
                {/* <LMR className="mb-3 bg-white px-3 h6" right={tvImage}>
                    <div className="py-2">{discription}</div>
                </LMR> */}
                <div className="small text-muted p-1">内容</div>
                {/* <pre className="mb-3 px-3 py-4 bg-white h6 border">{content}</pre> */}
                <div className="small text-muted p-1">布局模板</div>
                <div className="mb-3 px-3 py-2 bg-white h6">
                    {tv(template, (values) => <>{values.caption}</>, undefined, () => <small className="text-muted" >[无]</small>)}
                </div>
            </div>
        </Page>;
    })
}