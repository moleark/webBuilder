import * as React from 'react';
import { VPage, Page, LMR, tv, EasyTime, Tuid } from "tonva";
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
        let right = isMe && <div onClick={() => this.openVPage(VEdit)}><span className="iconfont icon-xiugai1 mr-2" style={{ fontSize: "26px", color: "white" }}></span></div>
        let divUser = this.controller.cApp.renderUser(author.id);
        let tvImage = tv(image, (values) => {
            return <div className="border p-2"><img className="w-3c h-3c" src={values.path} /></div>;
        }, undefined,
            () => null);
        return <Page header={this.t('postdetailed')} headerClassName={consts.headerClass} right={right}>
            <div className="p-3">
                <div className="small text-muted p-1">{this.t('title')}</div>
                <div className="mb-1 h6 px-3 py-2 bg-white">{caption}</div>
                <LMR className="mb-3 px-3 small text-black-50" right={date}>
                    {divUser}
                </LMR>
                <div className="small text-muted p-1">{this.t('describe')}</div>
                <LMR className="mb-3 bg-white px-3 h6" right={tvImage}>
                    <div className="py-2">{discription}</div>
                </LMR>
                <div className="small text-muted p-1">{this.t('content')}</div>
                <pre className="mb-3 px-3 py-4 bg-white h6 border">{content}</pre>
                <div>
                    <button className="col-12 btn btn-sm btn-primary" onClick={() => onShowRelease()}>
                        {this.t('publish')}
                    </button>
                </div>
            </div>
        </Page>;
    })
}
