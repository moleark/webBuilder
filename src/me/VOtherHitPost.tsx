import * as React from "react";
import { observer } from "mobx-react";
import { VPage, Page, List, FA, tv, SearchBox } from "tonva";
import { CMe } from "./CMe";
export class VOtherHitPost extends VPage<CMe> {

    async open() {
        this.openPage(this.page)
    }

    render(): JSX.Element {
        return <this.page />;
    }

    private page = observer(() => {
        let { cApp } = this.controller;
        let { informationpagePosts, informationsearchPostsKey, onScrollBottoms, } = cApp.cPosts
        let none = (
            <div className="my-3 mx-2">
                <span className="text-muted small">[{this.t('noposts')}]</span>
            </div>
        );
        let right = (
            <div className="d-flex align-items-center mr-1">
                <SearchBox allowEmptySearch size="sm" onSearch={(key: string) => informationsearchPostsKey(key, "")} placeholder={this.t('searchpost')} />
            </div>
        );
        return <Page header={this.t('selectpost')} back="close" right={right} onScrollBottom={onScrollBottoms}>
            <List before={""} none={none} items={informationpagePosts} item={{ render: this.renderItem }} />
        </Page>;
    });
    private renderItem = (item: any, index: number) => {
        return <this.itemRow {...item} />;
    };

    private itemRow = observer((item: any) => {
        let { user, cApp } = this.controller;
        if (!user) return;
        let { image, caption, discription, author, emphasis, web, agent, assist, openweb } = item;
        let divUser: any;
        if (author && author.id) {
            divUser = user.id === author.id ?
                <span className="text-warning">[自己]</span>
                :
                cApp.renderUser(author.id);
        }
        let showImport = emphasis === 1 ?
            <FA className="text-danger ml-3 " name="star" /> : null;
        let publicWebUI = cApp.cPosts.renderPublicWeb(item);
        return (
            <div className="pl-2 pl-sm-3 pr-2 pr-sm-3 pt-2 pb-3 d-flex">
                <div className="d-flex flex-fill cursor-pointer"
                    onClick={(e) => this.controller.onPickedPost(item.id)}
                >
                    <div className="mr-1 w-5c w-min-5c h-5c h-min-5c">
                        {tv(
                            image,
                            values => <div className="w-100 h-100 bg-center-img h-max-6c border rounded"
                                style={{ backgroundImage: 'url(' + values.path + ')' }}></div>,
                            undefined,
                            () => (
                                <div className="d-flex align-items-center h-100 justify-content-center bg-light border rounded">
                                    <FA className="text-info" name="camera" size="lg" />
                                </div>
                            )
                        )}
                    </div>
                    <div className="d-flex flex-column w-100">
                        <div className="ml-1"><b>{caption}</b></div>
                        <div className="small ml-1 text-muted py-2 flex-fill">{discription}</div>
                        <div className="small d-flex ml-1">
                            <div className="flex-fill">
                                {divUser}
                                {showImport}
                            </div>
                        </div>
                        {publicWebUI}
                    </div>
                </div>
            </div>
        );
    });
}
