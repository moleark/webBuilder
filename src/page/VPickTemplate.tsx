import * as React from 'react';
import { VPage, Page, LMR, List, SearchBox } from "tonva";
import { observer } from 'mobx-react';
import { CPage } from './CPage';

export class VPickTemplate extends VPage<CPage> {

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
            placeholder={this.t('templete')} />;

        return <Page header={this.t('selecttemplate')} back="close" right={right} onScrollBottom={this.onScrollBottom} >
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
        let divUser = this.controller.cApp.renderUser(author.id);
        return <LMR className="px-3 py-2 text-muted border bg-white" right={divUser}>
            <b>{caption}</b>
        </LMR>;
    });
}
