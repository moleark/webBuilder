import * as React from 'react';
import { CMe } from './CMe';
import { VPage, Page, List } from 'tonva';
import { observer } from 'mobx-react';
import { consts } from 'consts';

export class VPostsDetails extends VPage<CMe> {
    async open(){
        this.openPage(this.page);
    }

    private page = observer(()=>{
        return <Page header="我的贴文" headerClassName={consts.headerClass}>
            <div>aaaaa</div>
            {/* <List items={pagePosts} item={{ render: this.renderItem }} /> */}
        </Page>
    })
}