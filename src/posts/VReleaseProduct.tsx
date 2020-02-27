import * as React from 'react';
import { VPage, Page } from "tonva";
import { CPosts } from "./CPosts";
import { observer } from 'mobx-react';
import { consts } from 'consts';

export class VReleaseProduct extends VPage<CPosts> {
    async open() {
        this.openPage(this.page);
    }

    private page = observer(() => {
        return <Page header={this.t('postdetailed')} headerClassName={consts.headerClass} >
        </Page>;
    })
}
