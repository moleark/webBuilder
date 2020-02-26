import * as React from "react";
import { consts } from "consts";
import { observer } from "mobx-react";
import {
    VPage,
    Page,
    FA,
    List,
    EasyTime,
    tv,
    UserView,
    User,
    Tuid,
    SearchBox
} from "tonva";
import { CPosts } from "./CPosts";
import classNames from "classnames";

export class VMain extends VPage<CPosts> {
    async open() { }

    render(): JSX.Element {
        return <this.page />;
    }

    onBtn = () => {
        if (this.controller.flg) {
            this.controller.flg = false;
            this.controller.loadList();
        } else {
            this.controller.flg = true;
            this.controller.loadList();
        }
    };

    private page = observer(() => {
        let { pagePosts, onAdd, searchPostsKey } = this.controller;
        let right = (
            <>
                <SearchBox
                    className="mt-1 w-100"
                    size="sm"
                    onSearch={(key: string) => searchPostsKey(key, "")}
                    placeholder="请输入您要查找的标题"
                />
                <div onClick={onAdd}>
                    <span
                        className="ml-3 iconfont icon-jiahao1 mr-2 cursor-pointer"
                        style={{ fontSize: "26px", color: "white" }}
                    ></span>
                </div>
            </>
        );
        let none = (
            <div className="my-3 mx-2">
                <span className="text-muted small">[无贴文]</span>
            </div>
        );

        return (
            <Page
                header="帖文"
                headerClassName={consts.headerClass}
                right={right}
                onScrollBottom={this.onScrollBottom}
            >
                <div className="px-3 py-2 d-flex justify-content-center">
                    <div
                        className="d-flex cursor-pointer justify-content-center"
                        onClick={e => this.onBtn()}
                    >
                        <strong className={classNames("small text-right")}>
                            我的
                        </strong>
                        <div
                            className="mx-2"
                            style={{
                                width: "40px",
                                height: "18px",
                                backgroundColor: "rgb(211, 209, 209)",
                                borderRadius: "20px"
                            }}
                        >
                            {this.controller.flg ? (
                                <div
                                    style={{
                                        border: "1px solid #007bff",
                                        width: "20px",
                                        height: "18px",
                                        backgroundColor: "#007bff",
                                        borderRadius: "100%"
                                    }}
                                ></div>
                            ) : (
                                    <div
                                        style={{ border: "1px solid #007bff", width: "20px", height: "18px", backgroundColor: "#007bff", borderRadius: "100%" }}
                                    ></div>
                                )}
                        </div>
                        <strong className={classNames("small")}>全部</strong>
                        <strong
                            onClick={this.controller.cApp.cTag.showTag}
                            className={classNames("small")}
                        >
                            标签
                        </strong>
                    </div>
                </div>
                <List
                    before={""}
                    none={none}
                    items={pagePosts}
                    item={{ render: this.renderItem }}
                />
            </Page>
        );
    });

    private onScrollBottom = async () => {
        await this.controller.pagePosts.more();
    };

    private renderItem = (item: any, index: number) => {
        return <this.itemRow {...item} />;
    };

    private itemRow = observer((item: any) => {
        if (!this.controller.user) return;
        let { image, caption, discription, author, $update, $create } = item;
		let isMe = Tuid.equ(author, this.controller.user.id);
		/*
        let renderAuthor = (user: User) => {
            return <span>{isMe ? "" : user.nick || user.name}</span>;
		};
		*/
		let $c:Date = $create, $u:Date = $update;
		let now = Date.now(), create=$c.getTime(), update=$u.getTime();
		let updated: boolean;
		if (update === create) {
			updated = false;
		}
		else if (now - create < 24*3600*1000) {
			updated = true;
		}
		else {
			let cYear = $c.getFullYear(), cMonth = $c.getMonth(), cDate = $c.getDate();
			let uYear = $u.getFullYear(), uMonth = $u.getMonth(), uDate = $u.getDate();
			updated = cYear !== uYear || cMonth !== uMonth || cDate !== uDate;
		}
		//let divUser = <UserView id={author} render={renderAuthor} />;
		let divUser = this.controller.cApp.renderUser(author);
        return (
            <div className="pl-2 pl-sm-3 pr-2 pr-sm-3 pt-2 pb-3 d-flex">
                <div
                    className="col-10 d-flex px-0"
                    onClick={() => this.controller.showDetail(item.id)}
                >
					<div className="mr-3 w-5c w-min-5c h-5c h-min-5c">
                    {tv(
                        image,
                        values => <img
                                        className="w-100 h-100"
                                        src={values.path}
                                    />,
                        undefined, //w-6c h-4c mr-2 text-black-50 justify-content-center d-flex align-items-center
                        () => (
							<div className="d-flex align-items-center h-100
								justify-content-center bg-light border rounded">
                                <FA
                                    className="text-info"
									name="camera"
									size="lg"
                                />
                            </div>
                        )
                    )}
					</div>
                    <div className="cursor-pointer d-flex flex-column">
						<div><b>{caption}</b></div>
                        <div className="small pt-1 text-muted flex-fill">{discription}</div>
						<div className="small pt-1">{divUser}</div>
                    </div>
                </div>
                <div className="small col-2 text-muted px-0 d-flex flex-column">
					<div className="flex-fill text-right">
						<div className=" d-none d-sm-block">
							<EasyTime date={$create} />
						</div>
						{
							updated === true && <div className=" d-none d-sm-block">
								<FA name="pencil-square-o"/> <EasyTime date={$update} />
							</div>
						}
					</div>

					<div className="text-right">
						<button
							className="btn btn-sm btn-outline-primary"
							onClick={() => this.controller.onPreviewPost(item.id)}
						>
							<span className="d-none d-sm-inline">&ensp;</span>预览<span className="d-none d-sm-inline">&ensp;</span>
						</button>
					</div>
                </div>
            </div>
        );
    });
}
