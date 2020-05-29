import * as React from 'react';
import { VPage, Page } from "tonva";
import { observer } from 'mobx-react';
import { consts } from 'consts';
import { CPage } from './CPage';

/* eslint-disable */
export class VShow extends VPage<CPage> {

    private name: string;
    async open(param: any) {
        this.name = param;
        this.openPage(this.page);
    }

    private page = observer(() => {
        return <Page header={this.t('preview')} headerClassName={consts.headerClass}  >
            <iframe
                ref={this.refIframe}
                src={"https://web.jkchemical.com/" + this.name}
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
