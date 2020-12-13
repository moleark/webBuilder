import * as React from 'react';
import { CPage } from './CPage';
import { consts } from 'consts';
import { observer } from 'mobx-react';
import { VPage, Page, List, EasyTime } from 'tonva';

export class VMain extends VPage<CPage> {
    async open() {
    }

    render(): JSX.Element {
        return <this.page />
    }

    private page = observer(() => {
        let { onAdd, searchWebPage } = this.controller;
        let right = <div onClick={onAdd}>
            <span className="iconfont icon-jiahao1 mr-2 cursor-pointer" style={{ fontSize: "26px", color: "white" }}></span>
        </div>
        return <Page header={this.t('page')} headerClassName={consts.headerClass} right={right} >
            <List items={searchWebPage} item={{ render: this.renderItem }} />
        </Page>;
    });

    private renderItem = (item: any, index: number) => {
        return <this.itemRow {...item} />
    }

    private itemRow = observer((item: any) => {
        let { user, cApp, showPreviewPage } = this.controller;
        let { author, name, $update, titel } = item;
        let divUser: any;
        if (author)
            divUser = user.id === author.id ? <span className="text-warning">[自己]</span> : cApp.renderUser(author.id);
        return (
            <div className="p-1 cursor-pointer d-flex flex-column" onClick={() => showPreviewPage(item)}>
                <div className="ml-3 small">
                    <b>{name}</b>
                </div>
                <div className=" d-flex">
                    <div className="small py-1 col-7 ">{titel}</div>
                    <div className="col-5 text-right my-1">
                        <span className=" small mr-1"><EasyTime date={$update} /></span> <span className=" small text-truncate">{divUser}</span>
                    </div>
                </div>
            </div>
        )
    });
}