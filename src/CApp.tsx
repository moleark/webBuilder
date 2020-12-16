import { UQs } from "./uqs";
import { CMe } from "./me/CMe";
import { VMain } from "ui/main";
import { CUqBase } from "./CBase";
import { CPage } from "page/CPage";
import { CPosts } from "./posts/CPosts";
import { CMedia } from "./media/CMedia";
import { CAppBase, IConstructor, UserCache } from "tonva";
import { CTemplets } from "./templets/CTemplets";
import { GLOABLE, setting } from "configuration";
import { CTag } from "tag/CTag";
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
        await this.uqs.webBuilder.hit.submit({});
        await this.uqs.webBuilder.SearchRecommendProduct.query({ post: 30 })
        await this.getBusiness();

        //根据网址判断是什么APP
        if (setting.BusinessScope === 3) {
            GLOABLE.PAGEPREVIEWROOTURL = "https://bio-vanguard.com/blog/";
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

    getBusiness = async () => {
        let business = await this.uqs.webBuilder.SearchBusinessScope.obj({});
        if (business) {
            setting.BusinessScope = business.businessScope.id;
        }
    }

    renderUser(userId: number) {
        let val = this.userCache.getValue(userId);
        switch (typeof val) {
            case 'undefined':
            case 'number':
                return userId;
        };
        return val.name;
    }

    useUser(userId: number) {
        this.userCache.use(userId);
    }
}
