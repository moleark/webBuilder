import * as React from 'react';
import { VPage, Page, Tuid, FA } from "tonva";
import { CPosts } from "./CPosts";
import { VEdit } from './VEdit';
import { observer } from 'mobx-react';
import { consts } from 'consts';
import { VSourceCode } from './VSourceCode';
import copy from 'copy-to-clipboard';

/* eslint-disable */
export class VShow extends VPage<CPosts> {
    async open() {
        this.openPage(this.page);
    }

    private copyClick = (e: any, path: any) => {
        let el = e.target as HTMLElement;
        let innerHTML = el.innerHTML;
        copy(path);
        el.innerHTML = '<div class="text-center text-danger w-100"> <span style="color:transparent">-</span> url ' + this.t('copysuccess') + '<span style="color:transparent">-</span> </div>';
        setTimeout(() => {
            el.innerHTML = innerHTML;
        }, 1000);
    }

    private page = observer(() => {
        let { current, onShowRelease, onGrade } = this.controller;
        let { id, author } = current;
        let leftPath = "https://web.jkchemical.com/post/" + id;
        //let date = <span><EasyTime date={$update} /></span>;
        let isMe = Tuid.equ(author, this.controller.user.id);
        let meright = isMe && <>
            <button className="mr-2 btn btn-sm btn-success" onClick={() => this.openVPage(VEdit)}>
                <FA name="pencil-square-o" /> {this.t('editor')}
            </button>
            <button className="mr-2 btn btn-sm btn-info" onClick={() => onShowRelease()}>
                <FA name="external-link" /> {this.t('publish')}
            </button>
        </>;

        let right = isMe ? <div className="d-flex align-items-center">
            <button className="mr-2 btn btn-sm btn-success" onClick={(e) => this.copyClick(e, leftPath)}>
                {this.t('copy')}
            </button>
            <button className="mr-2 btn btn-sm btn-success" onClick={() => this.openVPage(VSourceCode)}>
                <FA name="code px-1" />{this.t('sourcecode')}
            </button>
            {meright}
        </div>
            :
            <div className="d-flex align-items-center">
                <button className="mr-2 btn btn-sm btn-success" onClick={(e) => this.copyClick(e, leftPath)}>
                    {this.t('copy')}
                </button>
                <button className="mr-2 btn btn-sm btn-success" onClick={() => onGrade()}>
                    {this.t('estimate')}
                </button>
                <button className="mr-2 btn btn-sm btn-success" onClick={() => this.openVPage(VSourceCode)}>
                    <FA name="code px-1" />{this.t('sourcecode')}
                </button>
                {meright}
            </div>

        return <Page header={this.t('preview')} headerClassName={consts.headerClass} right={right} >
            <iframe
                ref={this.refIframe}
                src={"https://web.jkchemical.com/post/" + id}
                className="w-100 position-relative" frameBorder={0}>
            </iframe>

        </Page>;
    });

    private refIframe = (ifrm: HTMLIFrameElement) => {
        if (!ifrm) return;
        let article = ifrm.parentElement.parentElement;
        let header = (article.querySelector('section.tv-page-header') as HTMLElement);
        ifrm.style.height = (window.innerHeight - header.clientHeight) + 'px';
        article.parentElement.style.overflowY = 'hidden';
    }
}
