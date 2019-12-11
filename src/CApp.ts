import { CAppBase, IConstructor } from "tonva";
import { VMain } from 'ui/main';
import { CUqBase } from "./CBase";
import { CMe } from "./me/CMe";

export class CApp extends CAppBase {

    cMe: CMe;

    protected newC<T extends CUqBase>(type: IConstructor<T>): T {
        return new type(this);
    }

    protected async internalStart() {
        this.cMe = this.newC(CMe);
        this.showMain();
    }

    showMain(initTabName?: string) {
        this.openVPage(VMain, initTabName);
    }
}
