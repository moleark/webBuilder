import { UQs } from "./uqs";
import { CMe } from "./me/CMe";
import { VMain } from 'ui/main';
import { CUqBase } from "./CBase";
import { CPage } from "page/CPage";
import { CPosts } from "./posts/CPosts";
import { CMedia } from "./media/CMedia";
import { CAppBase, IConstructor } from "tonva";
import { CTemplets } from "./templets/CTemplets";

export class CApp extends CAppBase {
    get uqs(): UQs { return this._uqs };

    cMe: CMe;
    cPosts: CPosts;
    cMedia: CMedia;
    cTemplets: CTemplets;
    cPage: CPage;

    protected newC<T extends CUqBase>(type: IConstructor<T>): T {
        return new type(this);
    }

    protected async internalStart() {
        this.cMe = this.newC(CMe);
        this.cPosts = this.newC(CPosts);
        this.cMedia = this.newC(CMedia);
        this.cTemplets = this.newC(CTemplets);
        this.cPage = this.newC(CPage);
        this.showMain();
    }

    showMain(initTabName?: string) {
        this.openVPage(VMain, initTabName);
    }
}
