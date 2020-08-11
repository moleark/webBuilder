import * as React from 'react';
import { VPage, Page, tv, List, SearchBox } from "tonva";
import { CPosts } from "./CPosts";
import { observer } from 'mobx-react';
import { consts } from 'consts';

export class VPickProduct extends VPage<CPosts> {
    async open() {
        this.openPage(this.page);
    }

    private page = observer(() => {
        let { pageProduct, searchProduct } = this.controller;
        let none = <div className="my-3 mx-2 text-warning">
        </div>;
        let right = <SearchBox className="w-80 mt-1"
            size='sm'
            onSearch={(key: string) => searchProduct(key)}
            placeholder={this.t('pleaseselect')} />;
        return <Page headerClassName={consts.headerClass} header={this.t('selectproduct')} right={right} >
            <List
                before={''}
                none={none}
                items={pageProduct}
                item={{ render: this.renderItem, onClick: this.itemClick }}
            />
        </Page>
    })

    private itemClick = async (item: any) => {
        await this.controller.onPickedProduct(item.id.id);
        this.closePage();
    };

    private renderItem = (item: any, index: number) => {
        return <this.itemRow {...item} />
    };

    private itemRow = observer((item: any) => {
        let { descriptionC, description, CAS, brand, origin, purity } = item;
        return <div>
            <div className="w-100 mx-3 py-3">
                <div><b>{descriptionC}</b></div>
                <div className="pt-2">{description}</div>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 " >
                    <div className="col d-flex align-items-center">
                        <small>品牌：{tv(brand, val => val.name)}</small>
                    </div>
                    <div className="col d-flex align-items-center">
                        <small>产品编号：{origin}</small>
                    </div>
                    <div className="col d-flex align-items-center">
                        <small>CAS:{CAS}</small>
                    </div>
                    <div className="col d-flex align-items-center">
                        <small>纯度:{purity}</small>
                    </div>
                </div>
            </div>
        </div >
    });
}
