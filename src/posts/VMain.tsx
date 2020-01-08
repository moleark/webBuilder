import * as React from "react";
import { consts } from "consts";
import { observer } from "mobx-react";
import { VPage, Page, FA, List, LMR, EasyTime, tv, UserView, User, Tuid, SearchBox } from "tonva";
import { CPosts } from "./CPosts";
import classNames from 'classnames';

export class VMain extends VPage<CPosts> {

    async open() {
    }

    render(): JSX.Element {
        return <this.page />
    }

    onBtn = () => {

        if (this.controller.flg) {
            this.controller.flg = false;
            this.controller.loadList();

        } else {
            this.controller.flg = true;
            this.controller.loadList();
        }
    }

    private page = observer(() => {
        let { pagePosts, onAdd, searchPostsKey } = this.controller;
        let right = <>
            <SearchBox className="mt-1 w-100"
                size='sm'
                onSearch={(key: string) => searchPostsKey(key, "")}
                placeholder="请输入您要查找的标题" />
            <button
                className="btn btn-success btn-sm ml-4 mr-2 align-self-center"
                onClick={onAdd}>
                <FA name="plus" />
            </button></>;
        return <Page header="帖文" headerClassName={consts.headerClass} right={right} onScrollBottom={this.onScrollBottom} >
            <div className="px-3 py-2 d-flex justify-content-center">
                <div className="d-flex justify-content-center" onClick={(e) => this.onBtn()}>
                    <strong className={classNames("small text-right")}>我的</strong>
                    <div className="mx-2"
                        style={{ width: '40px', height: '18px', backgroundColor: 'rgb(211, 209, 209)', borderRadius: '20px', }}>
                        {
                            this.controller.flg ?
                                <div
                                    style={{ border: '1px solid #007bff', width: '20px', height: '18px', backgroundColor: '#007bff', borderRadius: '100%', }}>
                                </div>
                                :
                                <div
                                    style={{ border: '1px solid #007bff', marginLeft: "20px", width: '20px', height: '18px', backgroundColor: '#007bff', borderRadius: '100%', }}>
                                </div>
                        }
                    </div>
                    <strong className={classNames("small")}>全部</strong>
                </div>
            </div>
            <List items={pagePosts} item={{ render: this.renderItem, onClick: this.itemClick }} />
        </Page>;
    });

    private onScrollBottom = async () => {
        await this.controller.pagePosts.more();
    }

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
            return <div className="border text-center p-1 mr-4"><img className="w-3c h-3c" src={values.path} /></div>;
        }, undefined,               //w-6c h-4c mr-2 text-black-50 justify-content-center d-flex align-items-center
            () => <div className="border text-center mr-4 p-1"><FA className="w-3 p-2 h-3c text-center" name="camera" size="2x" /></div>);
        return <LMR className="p-2 border" left={tvImage} right={right}>
            <b>{caption}</b>
            <div className="small py-1 text-muted ">{discription}</div>
        </LMR>;
    });
}