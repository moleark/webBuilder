import _ from 'lodash';
import * as React from 'react';
import { observable } from 'mobx';
import { CUqBase } from '../CBase';
import { observer } from 'mobx-react';
import { Query, PageItems, nav, Context } from 'tonva';
import { VBranch } from './VBranch';
import { VShowBranch } from './VShowBranch';
import { VEditBranch } from './VEditBranch';

// 网页
class PageBranch extends PageItems<any> {

    private searchPageBranchQuery: Query;

    constructor(searchQuery: Query) {
        super();
        this.firstSize = this.pageSize = 8;
        this.searchPageBranchQuery = searchQuery;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchPageBranchQuery.page(param, pageStart, pageSize);
        return ret;
    }

    protected setPageStart(item: any): any {
        this.pageStart = item === undefined ? 0 : item.id;
    }
}


export class CBranch extends CUqBase {
    @observable pageBranch: PageBranch;
    @observable items: any[];
    @observable current: any;
    protected async internalStart(param: any) {
    }

    // 保存
    saveItem = async (id: number, param: any) => {
        param.author = this.user.id;
        let ret = await this.uqs.webBuilder.Branch.save(id, param);
        if (id) {
            let item = this.items.find(v => v.id === id);
            console.log(item.target,'item')
            console.log(param,'param')
            // let item = this.pageBranch.items.find(v => v.id === id);
            if (item !== undefined) {
                let a =_.merge(item, param);
                item.$update = new Date();
            }
            this.current = item;
            this.closePage();
        }
        else {
            param.id = ret.id;
            param.$create = new Date();
            param.$update = new Date();
            console.log(this.items,'this.loadList')
            this.items.unshift(param);
            this.current = param;
        }
        // this.searchPageKey("", 0);
    }

    render = observer(() => {
        return this.renderView(VBranch)
    })

    onAddBranch = () => {
        this.current = undefined;
        this.openVPage(VEditBranch);
    }

    loadList = async () => {
        // this.searchPageKey("", 0);
        this.items = await this.uqs.webBuilder.Branch.search('', 0, 100);
    }

    showDetail = async (id: number) => {
        this.current = await this.uqs.webBuilder.Branch.load(id);
        this.openVPage(VShowBranch);
    }


    tab = () => {
        return <this.render />;
    }
}