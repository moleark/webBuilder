import * as React from "react";
import { consts } from "consts";
import { observer } from "mobx-react";
import { VPage, Page, FA, List, EasyTime, tv, SearchBox } from "tonva";
import { CPosts } from "./CPosts";
import classNames from "classnames";
import { observable } from "mobx";

export class VMain extends VPage<CPosts> {
	@observable private isMe:boolean = true;

    async open() { }

    render(): JSX.Element {
        return <this.page />;
    }

    //onBtn = () => {
		/*
        if (this.controller.flg) {
            this.controller.flg = false;
            this.controller.loadList();
        } else {
            this.controller.flg = true;
            this.controller.loadList();
		}
		*/
		//this.controller.isMe = !this.controller.isMe;
		//this.controller.loadList();
	//};
	
	private onMeAll = (evt: React.ChangeEvent<HTMLInputElement>) => {
		this.isMe = evt.currentTarget.value === 'me';
		//this.controller.changeMeAll();
		this.controller.setMe(this.isMe)
	}

	private renderMeAllToggle() {

        let cnButton = 'btn btn-outline-success btn-sm text-nowrap';
		return <div className="px-2 d-flex align-items-center">
			<div className="btn-group btn-group-toggle" data-toggle="buttons">
				<label className={classNames(cnButton, {active: this.isMe})}>
					<input type="radio" name="options" value="me" defaultChecked={true} onChange={this.onMeAll} /> {this.t('me')}
				</label>
				<label className={classNames(cnButton, {active: !this.isMe})}>
					<input type="radio" name="options" value="all" defaultChecked={false} onChange={this.onMeAll}/> {this.t('all')}
				</label>
			</div>
		</div>
	}

    private page = observer(() => {
        let { pagePosts, onAdd, searchPostsKey } = this.controller;
        let right = (
            <div className="d-flex align-items-center">
				{this.renderMeAllToggle()}
                <SearchBox
                    className=""
                    size="sm"
                    onSearch={(key: string) => searchPostsKey(key, "")}
                    placeholder={this.t('searchpost')}
                />
                <div onClick={onAdd}>
                    <span
                        className="mx-2 iconfont icon-jiahao1 cursor-pointer"
                        style={{ fontSize: "1.7rem", color: "white" }}
                    ></span>
                </div>
            </div>
        );
        let none = (
            <div className="my-3 mx-2">
                <span className="text-muted small">[{this.t('noposts')}]</span>
            </div>
        );
        return (
            <Page
                header={this.t('post')}
                headerClassName={consts.headerClass}
                right={right}
                onScrollBottom={this.onScrollBottom}
            >
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
		let {user} = this.controller;
        if (!user) return;
        let { image, caption, discription, author, $update, $create, web, agent,assist,openweb } = item;

		let $c:Date = $create, $u:Date = $update;
		let updated: boolean = false;
		if ($c && $u) {
			let now = Date.now(), create=$c.getTime(), update=$u.getTime();
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
		}

		let divUser = user.id === author.id?
			<span className="text-warning">[自己]</span>
			: 
			this.controller.cApp.renderUser(author.id);
        return (
            <div className="pl-2 pl-sm-3 pr-2 pr-sm-3 pt-2 pb-3 d-flex">
                <div
                    className="d-flex flex-fill cursor-pointer"
                    onClick={() => this.controller.showDetail(item.id)}
                >
					<div className="mr-3 w-5c w-min-5c h-5c h-min-5c">
                    {tv(
                        image,
						values => <div className="w-100 h-100 bg-center-img h-max-6c border rounded" 
							style={{backgroundImage: 'url(' + values.path + ')'}}></div>,
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
                    <div className="d-flex flex-column">
						<div><b>{caption}</b></div>
                        <div className="small pt-1 flex-fill">{discription}</div>
						<div className="small pt-1 text-muted">
							{divUser}
							&ensp;<EasyTime date={$create} />
							{updated === true && <>&ensp;<FA name="pencil-square-o"/><EasyTime date={$update} /></>}       
						</div>
                        <div className="small pt-1" style={{  overflow: "hidden" }}>
                            {(web+agent+assist+openweb)>0?<span  className="mr-1 text-muted">发布：</span>:<></>}
                            {web===1?<span className="mr-1 text-primary">内部网</span>:<></>}
                            {agent===1?<span className="mr-1 text-primary">轻代理</span>:<></>}
                            {assist===1?<span className="mr-1 text-primary">销售员</span>:<></>}
                            {openweb===1?<span className="mr-1 text-primary">公开网</span>:<></>}
                        </div>
                    </div>
                </div>
                <div className="small text-muted px-0 d-flex flex-column">
					<div className="flex-fill text-right">
						<div className=" d-none d-sm-block">
							
						</div>
						{
						}
					</div>

					<div className="text-right">
						<button
							className="btn btn-sm btn-outline-primary"
							onClick={() => this.controller.onPreviewPost(item.id)}
						>
							<FA name="tv" />
						</button>
					</div>
                </div>
            </div>
        );
    });
}
/*
<span className="d-none d-sm-inline">&ensp;</span>
{this.t('preview')}
<span className="d-none d-sm-inline">&ensp;</span>
                    <div
                        className="d-flex cursor-pointer justify-content-center"
                        onClick={e => this.onBtn()}
                    >
                        <strong className={classNames("small text-right")}>
                            {this.t('me')}
                        </strong>
                        <div
                            className="mx-2"
                            style={{ width: "40px", height: "18px", backgroundColor: "rgb(211, 209, 209)",  borderRadius: "20px" }}
                        >
                            {this.controller.isMe ? (
                                <div
                                    style={{ border: "1px solid #007bff",  width: "20px", height: "18px", backgroundColor: "#007bff", borderRadius: "100%"}}
                                ></div>
                            ) : (
                                    <div
                                        style={{ border: "1px solid #007bff", width: "20px", height: "18px", backgroundColor: "#007bff", borderRadius: "100%" }}
                                    ></div>
                                )}
                        </div>
                        <strong className={classNames("small")}>
                            {this.t('all')}
                        </strong>
                    </div>

*/
