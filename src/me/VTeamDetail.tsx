import * as React from 'react';
import { Page, VPage, ItemSchema, StringSchema, ImageSchema, UiSchema, UiImageItem, UiTextItem, Edit, nav, userApi, List, LMR, tv } from 'tonva';
import { CMe } from './CMe';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { consts } from 'consts';

export class VTeamDetail extends VPage<CMe> {

    async open(id:any) {
        this.openPage(this.page);
    }
  

    private page = observer(() => {
        return <Page header={this.t('privatedetail')} headerClassName={consts.headerClass}>
           <LMR className="px-3 py-2 border bg-white" >
                <div className='pb-2'>创建的post：</div>
                <div>发布的post：</div>
                <div>post浏览量：</div>
            </LMR>
        </Page>;
        
    })
   
}