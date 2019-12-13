import { CAppBase, IConstructor, nav } from "tonva";
import { VMain } from 'ui/main';
import { CUqBase } from "./CBase";
import { CMe } from "./me/CMe";
import { CTask } from "task/CTask";
import { UQs } from "uqs";

export class CApp extends CAppBase {
    get uqs(): UQs { return this._uqs };

    cMe: CMe;
    cTask: CTask;

    protected newC<T extends CUqBase>(type: IConstructor<T>): T {
        return new type(this);
    }

    protected async internalStart() {
        this.cMe = this.newC(CMe);
        this.cTask = this.newC(CTask);
        this.showMain();
    }

    showMain(initTabName?: string) {
        this.openVPage(VMain, initTabName);
    }
}
