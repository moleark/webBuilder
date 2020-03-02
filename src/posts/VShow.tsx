import * as React from 'react';
import { VPage, Page, LMR, tv, EasyTime, Tuid, FA } from "tonva";
import { CPosts } from "./CPosts";
import { VEdit } from './VEdit';
import { observer } from 'mobx-react';
import { consts } from 'consts';
import { VSourceCode } from './VSourceCode';
import { VGrade } from './VGrade';

export class VShow extends VPage<CPosts> {
    async open() {
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { current, onShowRelease } = this.controller;
        let { id, author, $update } = current;
        let date = <span><EasyTime date={$update} /></span>;
        let isMe = Tuid.equ(author, this.controller.user.id);

        let meright = isMe && <>
            <button className="mr-2 btn btn-sm btn-success" onClick={() => this.openVPage(VEdit)}>
                <FA name="pencil-square-o" /> {this.t('editor')}
            </button>
            <button className="mr-2 btn btn-sm btn-info" onClick={() => onShowRelease()}>
                <FA name="external-link" /> {this.t('publish')}
            </button>
        </>;

        let right = <div className="d-flex align-items-center">
            <button className="mr-2 btn btn-sm btn-success" onClick={() => this.openVPage(VGrade)}>
                {/* <FA name="code px-1" /> */}
                评分
            </button>
            <button className="mr-2 btn btn-sm btn-success" onClick={() => this.openVPage(VSourceCode)}>
                <FA name="code px-1" />{this.t('sourcecode')}
            </button>
            {meright}
        </div>;

		/*
        let eidet = isMe && <span className="cursor-pointer iconfont icon-xiugai1 mr-2 text-white" onClick={() => this.openVPage(VEdit)} style={{ fontSize: '1.7rem' }}></span>;
        let right = <div>
            {eidet}
            <span className="cursor-pointer mx-3 text-white" style={{ fontSize: '1.5rem' }} onClick={() => onShowRelease()}>
                <FA name="send-o" />
            </span>
		</div>;
		*/
        /**
        let divUser = this.controller.cApp.renderUser(author.id);
        let tvImage = tv(image, (values) => {
        return <div className="border rounded p-2 mr-3"><img className="w-4c h-4c" src={values.path} /></div>;
        }, undefined,
        () => null);
        **/
        return <Page header={this.t('preview')} headerClassName={consts.headerClass} right={right}>
            <div className="w-100 h-100">
                <iframe src={"https://web.jkchemical.com/post/" + id} className="border-0 w-100 h-100 overflow-hidden"></iframe>
            </div>
        </Page>;
    })
}

/**
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
**/