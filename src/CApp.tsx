import * as React from 'react';
import { UQs } from "./uqs";
import { CMe } from "./me/CMe";
import { VMain } from "ui/main";
import { CUqBase } from "./CBase";
import { CPage } from "page/CPage";
import { CPosts } from "./posts/CPosts";
import { CMedia } from "./media/CMedia";
import { CAppBase, IConstructor, UserCache, UserView, tv } from "tonva";
import { CTemplets } from "./templets/CTemplets";
import { setting } from "configuration";
import { CTag } from "tag/CTag";
import { observer } from 'mobx-react';
import { res } from 'res';

export class CApp extends CAppBase {
    get uqs(): UQs {
        return this._uqs;
    }

    cMe: CMe;
    cPosts: CPosts;
    cMedia: CMedia;
    cTemplets: CTemplets;
    cPage: CPage;
    cTag: CTag;

    private userCache: UserCache<any>;

    protected newC<T extends CUqBase>(type: IConstructor<T>): T {
        return new type(this);
    }

    protected async internalStart() {
        //根据网址判断是什么APP
        if (document.domain === setting.appUrlDomain) {
            setting.previewUrl = "https://web.jkchemical.com";
        } else {
            setting.previewUrl = "https://tv.jkchemical.com/jk-web";
        }

        this.setRes(res);

        let userLoader = async (userId: number): Promise<any> => {
            let model = await this.uqs.hr.SearchEmployeeByid.query({ _id: userId });
            return model?.ret?.[0];
        }
        this.userCache = new UserCache(userLoader);

        this.cMe = this.newC(CMe);
		this.cPosts = this.newC(CPosts);
		await this.cPosts.start();
        this.cMedia = this.newC(CMedia);
        this.cTemplets = this.newC(CTemplets);
        this.cPage = this.newC(CPage);
        this.cTag = this.newC(CTag);
        this.showMain();
    }

    showMain(initTabName?: string) {
        this.openVPage(VMain, initTabName);
    }

    renderUser(userId: number) {
        return <this._renderUser userId={userId} />;
    }

    private _renderUser = observer((props: { userId: number }): JSX.Element => {
		let {userId} = props;
        let val = this.userCache.getValue(userId);
        switch (typeof val) {
		case 'undefined':
		case 'number':
			return <span className="author">{userId}</span> 
		};
        return <span className="author">{val.name}</span>;
	});
	
	useUser(userId: number) {
		this.userCache.use(userId);
	}
}
