import * as React from 'react';
import { VPage, Page, LMR, tv, EasyTime, UserView, FA, User, Tuid, List } from "tonva";
import { CPosts } from "./CPosts";
import { observer } from 'mobx-react';

export class VPickImage extends VPage<CPosts> {
    private pickedId = 7;

    async open() {
        this.openPage(this.page);
    }

    private page = () => {
        let { imgItems } = this.controller;
        return <Page header="选择图片" back="close">
            {/* item={{ render: this.renderItem, onClick: this.itemClick }} */}
            <List items={imgItems} item={{ render: this.renderItem, onClick: this.itemClick}}/>
            {/* <div className="p-3">
                <button className="btn btn-primary" onClick={() => this.controller.onPickedImage(this.pickedId)}>
                    点我返回图片id={this.pickedId}
                </button>
            </div> */}
        </Page>
    }

    private itemClick = (item: any) => {
        this.controller.onPickedImage(item.id);
    };

    private renderItem = (item: any, index: number) => {
        return <this.itemRow {...item} />
    };

    private itemRow = observer((item: any) => {
        console.log(item,'onPickedImage')
        let { caption, author, $update } = item;
        let isMe = Tuid.equ(author, this.controller.user.id);
        let renderAuthor = (user: User) => {
            return <span>{isMe ? '' : user.nick || user.name}</span>;
        };
        let right = <div className="small text-muted text-right">
            <div><UserView id={author} render={renderAuthor} /></div>
            {/* <div><EasyTime date={$update} /></div> */}
        </div>;
        return <LMR className="px-3 py-2 b-1" right={right}>
            <b>{caption}</b>
        </LMR>;
    });
}
