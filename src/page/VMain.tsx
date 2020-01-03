import * as React from 'react';
import { CPage } from './CPage';
import { consts } from 'consts';
import { observer } from 'mobx-react';
import { VPage, Page, FA, List, Tuid, User, UserView, EasyTime, LMR } from 'tonva';

export class VMain extends VPage<CPage> {
    async open() {
    }

    render(): JSX.Element {
        return <this.page />
    }

    private page = observer(() => {
        let { onAdd, webPage } = this.controller;
        let right = <div className="d-flex">
            <button
                className="btn btn-success btn-sm ml-4 mr-2 align-self-center"
                onClick={onAdd}
            >
                <FA name="plus" />
            </button></div>;
        return <Page header="网页" headerClassName={consts.headerClass} right={right} >
            <List items={webPage} item={{ render: this.renderItem, onClick: this.itemClick }} />
        </Page>;
    });

    private itemClick = (item: any) => {
        this.controller.showDetail(item.id);
    }

    private renderItem = (item: any, index: number) => {
        return <this.itemRow {...item} />
    }

    private itemRow = observer((item: any) => {
        let { author, name, $update, titel } = item;
        let isMe = Tuid.equ(author, this.controller.user.id);
        let renderAuthor = (user: User) => {
            return <span>{isMe ? '' : user.nick || user.name}</span>;
        };
        let right = <div className="small text-muted text-right w-6c ">
            <div className="small pt-1"><UserView id={author} render={renderAuthor} /></div>
            <div className="small"><EasyTime date={$update} /></div>
        </div>;

        return <LMR className="p-2 border" right={right}>
            <b>{name}</b>
            <div className="small py-1 text-muted ">{titel}</div>
        </LMR>;
    });
}