import * as React from 'react';
import { nav, Image, VPage, Prop, IconText, FA, PropGrid, LMR, Page } from 'tonva';
import { CMe } from './CMe';
import { consts } from 'consts';

export class VMe extends VPage<CMe> {
    async open(param?: any) {

    }
    render() {
        return <Page logout={true} headerClassName={consts.headerClass}>
            我的
        </Page>;
    }


   
}
