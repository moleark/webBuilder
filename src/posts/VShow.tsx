import * as React from 'react';
import { VPage, Page, LMR, tv, EasyTime, Tuid, FA } from "tonva";
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
        let { id, caption, content, author, image, template, discription, $create, $update } = current;
        let date = <span><EasyTime date={$update} /></span>;
        let isMe = Tuid.equ(author, this.controller.user.id);
        let right = isMe && <div onClick={() => this.openVPage(VEdit)}>
            <span className="iconfont icon-xiugai1 mr-2 text-white" style={{ fontSize: '1.7rem' }}></span>
        </div>;

        let divUser = this.controller.cApp.renderUser(author.id);
        let tvImage = tv(image, (values) => {
            return <div className="border rounded p-2 mr-3"><img className="w-4c h-4c" src={values.path} /></div>;
        }, undefined,
            () => null);
        return <Page header={this.t('postdetailed')} headerClassName={consts.headerClass} right={right}>
            <div className="px-3">
                <LMR className="my-3 small text-black-50" right={date}>
                    {divUser}
                </LMR>
                <LMR left={tvImage} right={<div className="ml-2 text-right">
                    <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => this.controller.onPreviewPost(id)}
                    >
                        <FA name="tv" />
                    </button>
                </div>
                }>
                    <div><b>{caption}</b></div>
                    <div>{discription}</div>
                </LMR>
                <pre className="my-3 px-3 py-4 bg-white border rounded">{content}</pre>
                <div className="text-center">
                    <button className="btn btn-primary w-12c" onClick={() => onShowRelease()}>
                        {this.t('publish')}
                    </button>
                </div>
            </div>
        </Page>;
    })
}
