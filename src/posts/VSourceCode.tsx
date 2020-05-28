import * as React from 'react';
import { VPage, Page } from "tonva";
import { CPosts } from "./CPosts";
import { observer } from 'mobx-react';
import { consts } from 'consts';

export class VSourceCode extends VPage<CPosts> {
    async open(param: any) {
        this.openPage(this.page, param);
    }

    private page = observer((param: any) => {
        let { current } = this.controller;
        return <Page header={this.t('sourcecode')} headerClassName={consts.headerClass}  >
            <div className="w-100 h-100"  >
                <textarea className="w-100 h-100">{current.content}</textarea>
            </div>
        </Page>;
    })
}
