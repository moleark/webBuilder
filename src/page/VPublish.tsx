import * as React from 'react';
import { VPage, Page, List, FA } from 'tonva';
import { consts } from 'consts';
import { CPage } from './CPage';
import { observer } from 'mobx-react';

export class VPublish extends VPage<CPage>  {
    async open() {
        this.openPage(this.page);
    }

    private page = observer(() => {

        let right = <button className="mr-2 btn btn-sm btn-success">
            <FA name="pencil-square-o" /> {this.t('保存')}
        </button>;
        return <Page header={this.t('publish')} headerClassName={consts.headerClass} right={right} >
            <List items={this.controller.pageWebsite} item={{ render: this.renderItem }} />
        </Page >
    })

    private renderItem = (item: any, index: number) => {
        let { name } = item;
        return <div className="px-2 py-2 d-flex p-1 cursor-pointer">
            <b>{name}</b>
        </div>
    }

}