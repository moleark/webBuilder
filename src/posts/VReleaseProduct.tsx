import * as React from 'react';
import { VPage, Page } from "tonva";
import { CPosts } from "./CPosts";
import { observer } from 'mobx-react';
import { consts } from 'consts';

export class VReleaseProduct extends VPage<CPosts> {
    async open(param: any) {
        this.openPage(this.page, param);
    }

    private page = observer((param: any) => {
        return <Page header={this.t('productpublish')} headerClassName={consts.headerClass} >

        </Page>;
    })
}
