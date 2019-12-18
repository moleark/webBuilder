import * as React from "react";
import { consts } from "consts";
import { observer } from "mobx-react";
import { VPage, Page, FA, List, LMR, EasyTime, tv, UserView, User, Tuid } from "tonva";
import { CPosts } from "./CPosts";
import { VEdit } from "./VEdit";

export class VMain extends VPage<CPosts> {
    async open() {
    }

    render(): JSX.Element {
        return <this.page />
    }

    private page = observer(() => {
        let { items, onAdd } = this.controller;
        let right = <button
            className="btn btn-success btn-sm mr-2 align-self-center"
            onClick={onAdd}>
            <FA name="plus" />
        </button>;
        return <Page header="帖文" headerClassName={consts.headerClass} right={right}>
            <List items={items} item={{ render: this.renderItem, onClick: this.itemClick }} />
        </Page>;
    });

    private itemClick = (item: any) => {
        this.controller.showDetail(item.id);
    }

    private renderItem = (item: any, index: number) => {
        return <this.itemRow {...item} />
    }

    private itemRow = observer((item: any) => {
        let { image, caption, discription, author, $create, $update } = item;
        let isMe = Tuid.equ(author, this.controller.user.id);
        let renderAuthor = (user: User) => {
            return <span>{isMe ? '' : user.nick || user.name}</span>;
        };
        let right = <div className="small text-muted text-right w-6c ">
            <div className="small pt-1"><UserView id={author} render={renderAuthor} /></div>
            <div className="small"><EasyTime date={$update} /></div>
        </div>;
        let tvImage = tv(image, (values) => {
            return <div className="border text-center p-2 mr-4"><img className="w-3c h-3c" src={values.path} /></div>;
        }, undefined,               //w-6c h-4c mr-2 text-black-50 justify-content-center d-flex align-items-center 
            () => <div className="border text-center h-4c mr-4 p-3 py-3"><FA className="w-3 h-3c text-center" name="camera" size="2x" /></div>);
        return <LMR className="px-3 py-2 border" left={tvImage} right={right}>
            <b className="h7">{caption}</b>
            <div className="small py-1 text-muted ">{discription}</div>
        </LMR>;
    });
}