import * as React from 'react';
import { VPage, Page, LMR, tv, EasyTime, UserView, FA, User, Tuid, List, SearchBox } from "tonva";
import { CPosts } from "./CPosts";
import { observer } from 'mobx-react';
import { consts } from 'consts';

export class VPickTemplate extends VPage<CPosts> {

    async open() {
        this.openPage(this.page);
    }

    render(): JSX.Element {
        return <this.page />
    }

    private page = observer(() => {
        let { pageTemplate, searchTemplateKey } = this.controller;
        
        let right = <SearchBox className="w-80 mt-2 mr-2"
            size='sm'
            onSearch={(key: string) => searchTemplateKey(key)}
            placeholder="模板" />;

        return <Page headerClassName={consts.headerClass} header="选择模板" back="close" right={right} onScrollBottom={this.onScrollBottom} >
            <List items={pageTemplate} item={{ render: this.renderItem, onClick: this.itemClick }} />
        </Page>
    });

    private onScrollBottom = async () => {
        await this.controller.pageTemplate.more();
    }

    private itemClick = (item: any) => {
        this.controller.onPickedTemplate(item.id);
    };

    private renderItem = (item: any, index: number) => {
        return <this.itemRow {...item} />
    };

    private itemRow = observer((item: any) => {
        let { caption, author } = item;
        let isMe = Tuid.equ(author, this.controller.user.id);
        let renderAuthor = (user: User) => {
            return <span>{isMe ? '' : user.nick || user.name}</span>;
        };
        let right = <div className="small text-muted text-right ">
            <div><UserView id={author} render={renderAuthor} /></div>
        </div>;
        return <LMR className="px-3 py-2 text-muted border-bottom bg-white" right={right}>
            <b>{caption}</b>
        </LMR>;
    });
}
