import _ from "lodash";
import { CUqBase } from "CBase";
import { VTag } from "./VTag";
import { Tag } from "tonva";

export class CTag extends CUqBase {
    ResearchField: Tag;
    Business: Tag;
    postResearchField: string = "";
    protected async internalStart(param: any) {
    }

    searchPostResearchField = async () => {
        let list = await this.uqs.webBuilder.SearchPostResearchField.table({ _post: 1 });
        list.forEach(element => {
            this.postResearchField = this.postResearchField + element.value + "|"
        });
        if (this.postResearchField.length > 0) {
            this.postResearchField = this.postResearchField.substring(0, this.postResearchField.length - 1);
        }
    }


    showTag = async () => {
        await this.searchPostResearchField();
        let { ResearchField, Business } = this.uqs.webBuilder;
        this.ResearchField = ResearchField;
        this.Business = Business;
        await ResearchField.loadValues();
        await Business.loadValues();
        this.openVPage(VTag);
    };

    saveTag = (data: any) => {
        let param = { _post: 1, _tag: data.cresearch };
        this.uqs.webBuilder.AddPostResearchField.submit(param);
    }

}
