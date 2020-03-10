import * as React from 'react';
import { VPage, Page, LMR, List, SearchBox } from "tonva";
import { CPosts } from "./CPosts";
import { observer } from 'mobx-react';
import { consts } from 'consts';

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
            placeholder={this.t('selectpicture')} />;

        let none = <div className="my-3 mx-2 text-warning">
            <span className="text-primary" > {this.t('nopicture')}！</span>
        </div>;
        return <Page headerClassName={consts.headerClass} header={this.t('selectpicture')} back="close" right={right} onScrollBottom={this.onScrollBottom}>
            <List
                before={''}
                none={none}
                items={pageMedia}
                item={{ render: this.renderItem, onClick: this.itemClick }}
            />
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
        let right = this.controller.cApp.renderUser(author.id);
        return <LMR className="px-3 py-2 b-1 border-bottom" right={right}>
            <b>{caption}</b>
            <div className="small">{path}</div>
        </LMR>;
    });
}
