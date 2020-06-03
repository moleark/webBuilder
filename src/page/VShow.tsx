import * as React from 'react';
import { VPage, Page, Tuid, FA } from "tonva";
import { observer } from 'mobx-react';
import { consts } from 'consts';
import { CPage } from './CPage';
import { VShowPage } from './VShowPage';

/* eslint-disable */
export class VShow extends VPage<CPage> {

    private name: string;
    async open(param: any) {
        this.name = param;
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { current, showPublish, user } = this.controller;
        let isMe = Tuid.equ(current.author, user.id);
        let right = isMe && <>
            <button className="mr-2 btn btn-sm btn-success" onClick={() => this.openVPage(VShowPage)}>
                <FA name="pencil-square-o" /> {this.t('editor')}
            </button>
            <button className="mr-2 btn btn-sm btn-info" onClick={showPublish}>
                <FA name="external-link" /> {this.t('publish')}
            </button>
        </>;

        return <Page header={this.t('preview')} headerClassName={consts.headerClass} right={right} >
            <iframe
                ref={this.refIframe}
                src={"https://web.jkchemical.com/" + this.name}
                className="w-100 position-relative" frameBorder={0}>
            </iframe>
        </Page >;
    });

    private refIframe = (ifrm: HTMLIFrameElement) => {
        if (!ifrm) return;
        let article = ifrm.parentElement.parentElement;
        let header = (article.querySelector('section.tv-page-header') as HTMLElement);
        ifrm.style.height = (window.innerHeight - header.clientHeight) + 'px';
        article.parentElement.style.overflowY = 'hidden';
    }
}
