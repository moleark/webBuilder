import * as React from "react";
import { consts } from "consts";
import { observer } from "mobx-react";
import { VPage, Page, FA, List, EasyTime, tv, SearchBox } from "tonva";
import { CPosts } from "./CPosts";
import classNames from "classnames";
import { observable } from "mobx";
import { setting } from "configuration";

export class VMain extends VPage<CPosts> {
    @observable private isMes: boolean = true;

    async open() { }

    render(): JSX.Element {
        return <this.page />;
    }

    private onMeAll = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.isMes = evt.currentTarget.value === 'me';
        this.controller.setMe(this.isMes)
    }

    private renderMeAllToggle() {
        let cnButton = ['btn', 'btn-outline-warning', 'btn-sm', 'text-nowrap'];
        return <div className="px-sm-2 d-flex align-items-center">
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <label className={classNames(cnButton, { active: this.isMes })}>
                    <input type="radio" name="options" value="me" defaultChecked={true} onChange={this.onMeAll} />
                    <span className="d-inline d-sm-none">{this.t('me-sm')}</span>
                    <span className="d-none d-sm-inline">{this.t('me')}</span>
                </label>
                <label className={classNames(cnButton, { active: !this.isMes })}>
                    <input type="radio" name="options" value="all" defaultChecked={false} onChange={this.onMeAll} />
                    <span className="d-inline d-sm-none">{this.t('all-sm')}</span>
                    <span className="d-none d-sm-inline">{this.t('all')}</span>
                </label>
            </div>
        </div>
    }

    private page = observer(() => {
        let { pagePosts, onAdd, searchPostsKey, showProductCatalog, showSubject, onScrollBottom, showDomain, showModel, InformationCente, searchAuthor } = this.controller;
        let right = (
            <div className="d-flex align-items-center">
                {this.renderMeAllToggle()}
                <SearchBox size="sm" onSearch={(key: string) => searchPostsKey(key, searchAuthor)} placeholder={this.t('searchpost')} />
                <div onClick={onAdd}>
                    <span className="mx-sm-2 iconfont icon-jiahao1 cursor-pointer" style={{ fontSize: "1.7rem", color: "white" }}></span>
                </div>
            </div>
        );
        let none = (
            <div className="my-3 mx-2">
                <span className="text-muted small">[{this.t('noposts')}]</span>
            </div>
        );


        let ProductCatalog = < div className="m-1 p-3 cursor-pointer" onClick={showProductCatalog} >
            <div className="py-3 my-1">
                <div className="mb-2 text-success"><i style={{ fontSize: "2rem" }} className="iconfont icon-chanpinmulu"></i></div>
                <div className="mx-3 p-2 font-weight-bold">产品目录</div>
            </div>
        </div >;
        let Subject = <div className="m-1 p-3 cursor-pointer" onClick={() => showSubject({ name: "帖文栏目", id: "10000" + setting.BusinessScope })} >
            <div className="py-3 my-1 ">
                <div className="mb-2 text-primary"><i style={{ fontSize: "2rem" }} className="iconfont icon-mokuai"></i></div>
                <div className="mx-3 px-2 font-weight-bold">帖文栏目</div>
            </div>
        </div>;
        let Domain = <div className="m-1 p-3 cursor-pointer" onClick={() => showDomain({ name: '研究领域', id: 0 })} >
            <div className="py-3 my-1 ">
                <div className="mb-2 text-danger"><i style={{ fontSize: "2rem" }} className="iconfont icon-yanjiulingyu"></i></div>
                <div className="mx-3 px-2 font-weight-bold">研究领域</div>
            </div>
        </div>;
        let Model = <div className="m-1 p-3 cursor-pointer" onClick={() => showModel()} >
            <div className="py-3 my-1 ">
                <div className="mb-2 text-info"><i style={{ fontSize: "2rem" }} className="iconfont icon-mobanguanli"></i></div>
                <div className="mx-3 px-2 font-weight-bold">一周范文</div>
            </div>
        </div>;
        let Information = <div className="m-1 p-3 cursor-pointer" onClick={() => InformationCente()} >
            <div className="py-3 my-1 ">
                <div className="mb-2 text-warning"><i style={{ fontSize: "2rem" }} className="iconfont icon-zixun"></i></div>
                <div className="mx-3 px-2 font-weight-bold">资讯中心</div>
            </div>
        </div>;

        let tools: any;
        if (setting.BusinessScope === 1) {
            tools = <>{ProductCatalog}{Subject}{Domain}{Model}{Information}</>
        } else {
            tools = <>{ProductCatalog}{Subject}{Domain}</>
        }

        return (
            <Page header={this.t('post')} headerClassName={consts.headerClass} right={right} onScrollBottom={onScrollBottom}>
                <div className="d-flex justify-content-around py-4 small text-center" style={{ background: "linear-gradient(rgba(23,106,184,.5),rgba(23,162,184,.5),rgba(23,184,184,.5))" }}>
                    {tools}
                </div>
                <List before={""} none={none} items={pagePosts} item={{ render: this.renderItem }} />
            </Page >
        );
    });


    private renderItem = (item: any, index: number) => {
        return <this.itemRow {...item} />;
    };

    private itemRow = observer((item: any) => {
        let { user, showDetail } = this.controller;
        if (!user) return;
        let { image, caption, discription, author, $update, $create
            , hits, sumHits, web, agent, assist, openweb, emphasis } = item;
        let $c: Date = $create, $u: Date = $update;
        let updated: boolean = false;
        if ($c && $u) {
            let now = Date.now(), create = $c.getTime(), update = $u.getTime();
            if (update - create > 3600 * 1000 && now - create < 24 * 3600 * 1000) {
                updated = true;
            }
            else {
                let cYear = $c.getFullYear(), cMonth = $c.getMonth(), cDate = $c.getDate();
                let uYear = $u.getFullYear(), uMonth = $u.getMonth(), uDate = $u.getDate();
                updated = cYear !== uYear || cMonth !== uMonth || cDate !== uDate;
            }
        }
        let divUser: any;
        if (author && author.id) {
            divUser = user.id === author.id ?
                <span className="text-warning">[自己]</span>
                :
                this.controller.cApp.renderUser(author.id);
        }
        // let divUser = user.id === author.id ?
        //     <span className="text-warning">[自己]</span>
        //     :
        //     this.controller.cApp.renderUser(author.id);

        let showImport = emphasis === 1 ?
            <FA className="text-danger ml-3 " name="star" /> : "";
        return (
            <div className="pl-2 pl-sm-3 pr-2 pr-sm-3 pt-2 pb-3 d-flex">
                <div className="d-flex flex-fill cursor-pointer" onClick={() => showDetail(item.id)} >
                    <div className="mr-1 w-5c w-min-5c h-5c h-min-5c">
                        {tv(
                            image,
                            values => <div className="w-100 h-100 bg-center-img h-max-6c border rounded"
                                style={{ backgroundImage: 'url(' + values.path + ')' }}></div>,
                            undefined,
                            () => (
                                <div className="d-flex align-items-center h-100
								justify-content-center bg-light border rounded">
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
								&ensp;<EasyTime date={$create} />
                                {updated === true && <>&ensp;<FA name="pencil-square-o" /><EasyTime date={$update} /></>}
                                {showImport}
                            </div>
                            <div className="author">
                                {sumHits && sumHits > 0 && <>阅读<b>{sumHits}</b>次</>}{<span className="px-1"></span>}{sumHits >= hits && hits > 0 && <>周<b>{hits}</b>次</>}
                            </div>
                        </div>
                        <div className="small pt-1 nowrap" style={{ overflow: "hidden" }}>
                            {(web + agent + assist + openweb) > 0 ? <span className=" text-muted">发布：</span> : <></>}
                            {agent === 1 ? <span style={{ borderRadius: "15%/48%" }} className="bg-success mr-1 text-white px-1">{this.t('agent')}</span> : <></>}
                            {assist === 1 ? <span style={{ borderRadius: "15%/48%" }} className="bg-warning mr-1 text-white px-1">{this.t('sales')}</span> : <></>}
                            {openweb === 1 ? <span style={{ borderRadius: "15%/48%" }} className="bg-info mr-1 text-white px-1">{this.t('publicSite')}</span> : <></>}
                            {web === 1 ? <span style={{ borderRadius: "15%/48%" }} className="bg-primary text-white px-1">{this.t('internationSite')}</span> : <></>}
                            {/* {web === 1 ? <span style={{ borderRadius: "15%/48%" }} className="bg-primary text-white px-1">{this.t('privateSite')}</span> : <></>} */}
                        </div>
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
