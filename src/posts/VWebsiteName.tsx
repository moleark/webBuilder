import * as React from 'react';
import { View } from 'tonva';
import { CPosts } from './CPosts';
export class VWebsiteName extends View<CPosts> {
    render(item: any) {
        let { web, agent, assist, openweb, bvweb } = item;
        return (
            <div className="small py-1 nowrap" style={{ overflow: "hidden" }}>
                {/* {(web + agent + assist + openweb) > 0 ? <span className=" text-muted">发布：</span> : <></>}
                {agent === 1 ? <span style={{ borderRadius: "15%/48%" }} className="bg-success mr-1 text-white px-1">{this.t('agent')}</span> : <></>}
                {assist === 1 ? <span style={{ borderRadius: "15%/48%" }} className="bg-warning mr-1 text-white px-1">{this.t('sales')}</span> : <></>}
                {openweb === 1 ? <span style={{ borderRadius: "15%/48%" }} className="bg-info mr-1 text-white px-1">{this.t('publicSite')}</span> : <></>}
                {web === 1 ? <span style={{ borderRadius: "15%/48%" }} className="bg-primary text-white px-1">{this.t('internationSite')}</span> : <></>}
                {bvweb === 1 ? <span style={{ borderRadius: "15%/48%" }} className="bg-primary text-white px-1">{this.t('BV网站')}</span> : <></>} */}

                {assist === 1 ? <span className="bg-warning rounded-pill mr-1 text-white px-1">{this.t('sales')}</span> : <></>}
                {agent === 1 ? <span className="bg-success rounded-pill mr-1 text-white px-1">{this.t('agent')}</span> : <></>}
                {openweb === 1 ? <span className="bg-info rounded-pill mr-1 text-white px-1">{this.t('publicSite')}</span> : <></>}
                {web === 1 ? <span className="bg-primary rounded-pill text-white px-1">{this.t('internationSite')}</span> : <></>}
                {bvweb === 1 ? <span className="bg-primary rounded-pill text-white px-1">{this.t('BV网站')}</span> : <></>}
            </div>
        )
    }
}
