import * as React from 'react';
import { observer } from 'mobx-react';
import { CBranch } from './CBranch';
import { VPage, Page, FA, List, Tuid, User, UserView, EasyTime, LMR } from 'tonva';
import { consts } from 'consts';

export class VBranch extends VPage<CBranch> {
    async open() {
        this.openPage(this.page);
    }

    render(): JSX.Element {
        return <this.page />
    }

    private page = observer(() => {
        let { onAddBranch, items } = this.controller;
        let right = <div className="d-flex">
            <button
                className="btn btn-success btn-sm ml-4 mr-2 align-self-center"
                onClick={onAddBranch}
            >
                <FA name="plus" />
            </button></div>;
        return <Page header="子模块" headerClassName={consts.headerClass} right={right} >
            <List items={items} item={{ render: this.renderItem, onClick: this.itemClick }} />
        </Page>;

    })
    private itemClick = (item: any) => {
        this.controller.showDetail(item.id);
    }

    private renderItem = (item: any, index: number) => {
        return <this.itemRow {...item} />
    }

    private itemRow = observer((item: any) => {
        let {  author, content } = item;
        let isMe = Tuid.equ(author, this.controller.user.id);
        let renderAuthor = (user: User) => {
            return <span>{isMe ? '' : user.nick || user.name}</span>;
        };
        let right = <div className="small text-muted text-right w-6c ">
            <div className="small pt-1"><UserView id={author} render={renderAuthor} /></div>
        </div>;

        return <LMR className="p-2 border" right={right}>
            <b>{content}</b>
        </LMR>;
    });
}