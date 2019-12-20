import * as React from 'react';
import { VPage, Page, LMR, tv, EasyTime, UserView, FA, User, Tuid, List, SearchBox } from "tonva";
import { CPosts } from "./CPosts";
import { observer } from 'mobx-react';

export class VPickImage extends VPage<CPosts> {
    async open() {
        this.openPage(this.page);
    }

    render(): JSX.Element {
        return <this.page />
    }

    private page = observer(() => {
        let { pageMedia, searchMadiaKey } = this.controller;
        let right = <SearchBox className="w-80 mt-2 mr-2"
            size='sm'
            onSearch={(key: string) => searchMadiaKey(key)}
            placeholder="请输入您要查找的图片标题" />;
        return <Page header="选择图片" back="close" right={right} onScrollBottom={this.onScrollBottom}>
            <List items={pageMedia} item={{ render: this.renderItem, onClick: this.itemClick }} />
        </Page>
    })

    private itemClick = (item: any) => {
        this.controller.onPickedImage(item.id);
    };

    private onScrollBottom = async () => {
        await this.controller.pageMedia.more();
    };

    private renderItem = (item: any, index: number) => {
        return <this.itemRow {...item} />
    };

    private itemRow = observer((item: any) => {
        let { caption, author, path } = item;
        let isMe = Tuid.equ(author, this.controller.user.id);
        let renderAuthor = (user: User) => {
            return <span>{isMe ? '' : user.nick || user.name}</span>;
        };
        let right = <div className="small text-muted text-right">
            <div><UserView id={author} render={renderAuthor} /></div>
        </div>;
        return <LMR className="px-3 py-2 b-1 border" right={right}>
            <b>{caption}</b>
            <div className="small">{path}</div>
        </LMR>;
    });
}
