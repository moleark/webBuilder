import * as React from 'react';
import { View } from 'tonva';
import { CPosts } from './CPosts';
export class VWebsiteName extends View<CPosts> {
    render(item: any) {
        let { web, agent, assist, openweb, bvweb } = item;
        return (
            <div className="small py-1 nowrap" style={{ overflow: "hidden" }}>
                {assist === 1 ? <span className="bg-warning rounded-pill mr-1 text-white px-1">{this.t('sales')}</span> : <></>}
                {agent === 1 ? <span className="bg-success rounded-pill mr-1 text-white px-1">{this.t('agent')}</span> : <></>}
                {openweb === 1 ? <span className="bg-info rounded-pill mr-1 text-white px-1">{this.t('publicSite')}</span> : <></>}
                {web === 1 ? <span className="bg-primary rounded-pill text-white px-1">{this.t('internationSite')}</span> : <></>}
                {bvweb === 1 ? <span className="bg-primary rounded-pill text-white px-1">{this.t('BV网站')}</span> : <></>}
            </div>
        )
    }
}
