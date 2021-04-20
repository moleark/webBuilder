import * as React from "react";
import { consts } from "consts";
import { observer } from "mobx-react";
import { VPage, Page, FA, List, EasyTime, tv, SearchBox } from "tonva";
import { CPosts } from "./CPosts";
import classNames from "classnames";
import { observable } from "mobx";
import { setting } from "configuration";
import { VWebsiteName } from "./VWebsiteName";

export class VMain extends VPage<CPosts> {
    @observable private isMes: boolean = true;
    @observable private status: number = 1;

    async open() { }

    render(): JSX.Element {
        return <this.page />;
    }

    private onMeAll = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.isMes = evt.currentTarget.value === 'me';
        this.controller.setMe(this.isMes, this.status)
    }

    private onStatus = (val: number) => {
        this.status = val;
        this.controller.setMe(this.isMes, this.status)
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

    private renderStatus() {
        let isSelect = "text-primary col-md-2";
        let notSelect = "col-md-2";
        return <div className="d-flex text-center small justify-content-between cursor-pointer px-4 pt-4 pb-2" >
            <div className={this.status === 1 ? isSelect : notSelect} onClick={() => this.onStatus(1)}><strong>编辑中</strong></div>
            <div className={this.status === 2 ? isSelect : notSelect} onClick={() => this.onStatus(2)}><strong>待审核</strong></div>
            <div className={this.status === 3 ? isSelect : notSelect} onClick={() => this.onStatus(3)}><strong>被驳回</strong></div>
            <div className={this.status === 4 ? isSelect : notSelect} onClick={() => this.onStatus(4)}><strong>待发布</strong></div>
            <div className={this.status === 5 ? isSelect : notSelect} onClick={() => this.onStatus(5)}><strong>已发布</strong></div>
        </div>
    }

    private page = observer(() => {
        let { pagePosts, onAdd, searchPostsKey, showProductCatalog, showSubject, onScrollBottom,
            showDomain, showModel, showApproval, searchAuthor } = this.controller;
        let search = <div className="d-flex w-100">
            <div className='pt-2 ml-2' style={{ width: '4rem' }}>{this.t('post')}</div>
            {this.renderMeAllToggle()}
            <SearchBox className='w-100 pt-1' size="sm" onSearch={(key: string) => searchPostsKey(key, searchAuthor)} placeholder={this.t('searchpost')} />
            <div onClick={onAdd}>
                <span className="mx-sm-2 iconfont icon-jiahao1 cursor-pointer mr-2" style={{ fontSize: "1.7rem", color: "white" }}></span>
            </div>
        </div>;

        let none = (
            <div className="my-3 mx-2">
                <span className="text-muted small">[{this.t('noposts')}]</span>
            </div>
        );

        let tools: any;
        if (setting.BusinessScope === 1) {
            tools = <>
                {divModel(showProductCatalog, "text-success", "icon-chanpinmulu", this.t('productcatalog'))}
                {divModel(() => showSubject({ name: (this.t('postsubject')), id: "10000" + setting.BusinessScope }),
                    "text-primary", "icon-mokuai", this.t('postsubject'))}
                {divModel(() => showDomain({ name: (this.t('researchdomain')), id: 0 }), "text-danger", "icon-yanjiulingyu", this.t('researchdomain'))}
                {divModel(() => showModel(), "text-info", "icon-mobanguanli", this.t('weekpost'))}
                {divModel(() => showApproval(), "text-warning", "icon-iconfontyijiantuiguang", this.t('checkpending'))}
            </>
        } else {
            tools = <>
                {divModel(showProductCatalog, "text-success", "icon-chanpinmulu", this.t('productcatalog'))}
                {divModel(() => showSubject({ name: (this.t('postsubject')), id: "10000" + setting.BusinessScope }),
                    "text-primary", "icon-mokuai", this.t('postsubject'))}
                {divModel(() => showDomain({ name: (this.t('researchdomain')), id: 0 }), "text-danger", "icon-yanjiulingyu", this.t('researchdomain'))}
            </>
        }
        return <Page header={search} headerClassName={consts.headerClass} onScrollBottom={onScrollBottom}>
            <div className="d-flex justify-content-around py-4 small text-center px-2"
                style={{ background: "linear-gradient(rgba(23,106,184,.5),rgba(23,162,184,.5),rgba(23,184,184,.5))" }}>
                {tools}
            </div>
            {this.renderStatus()}
            <List before={""} none={none} items={pagePosts} item={{ render: this.renderItem }} />
        </Page>
    });


    private renderItem = (item: any, index: number) => {
        return <this.itemRow {...item} />;
    };

    private itemRow = observer((item: any) => {
        let { user, showDetail, rendertagCatalogname, rendertagSubjectname, rendertagDomain } = this.controller;
        if (!user) return;
        let { image, caption, discription, author, $update, $create
            , hits, sumHits, emphasis, id } = item;

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

        let tagCatalogname = rendertagCatalogname(id);
        let tagSubjectname = rendertagSubjectname(id)
        let tagDomainname = rendertagDomain(id)

        let showImport = emphasis === 1 ?
            <FA className="text-danger ml-3" name="star" /> : "";
        let publicWebUI = this.renderVm(VWebsiteName, item);
        return (
            <div className="pl-2 pl-sm-3 pr-2 pr-sm-3 pt-2 pb-3 d-flex">
                <div className="d-flex flex-fill cursor-pointer" onClick={() => showDetail(id)} >
                    <div className="mr-1 w-5c w-min-5c h-5c h-min-5c d-flex align-items-center">
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
                                {sumHits && sumHits > 0 && <>阅读<b>{sumHits}</b>次</>}
                                {<span className="px-1"></span>}{sumHits >= hits && hits > 0 && <>周<b>{hits}</b>次</>}
                            </div>
                        </div>
                        {publicWebUI}
                        <div>
                            {tagCatalogname}
                            {tagSubjectname}
                            {tagDomainname}
                        </div>
                    </div>
                </div>
            </div>
        );
    });
}
function divModel(action: any, textColor: string, icon: string, title: any) {
    let textCo = 'mb-2 ' + textColor;
    let icons = 'iconfont ' + icon;
    return <div className="m-1 cursor-pointer" onClick={action} >
        <div className="py-3 my-1 ">
            <div className={textCo}><i style={{ fontSize: "2rem" }} className={icons}></i></div>
            <div className="mx-3 px-2 font-weight-bold">{title}</div>
        </div>
    </div >;
}
