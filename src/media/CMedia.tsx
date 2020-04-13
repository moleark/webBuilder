import * as React from "react";
import _ from "lodash";
import { CUqBase } from "../CBase";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { VMain } from "./VMain";
import { QueryPager } from "tonva";
import { VShowImg } from "./VShowImg";
import { VEdit } from "./VEdit";
import { VChangeNames } from "./VChangeNames";
import { VCat } from "./VCat";
import { VPickCat } from "./VPickCat";
import { VCatImage } from "./VCatImage";
import { VSlideShow } from "./VSlideShow";

export class CMedia extends CUqBase {
    @observable pageMedia: QueryPager<any>;
    @observable current: any;
    @observable pageCat: any;

    @observable pageImageCat: QueryPager<any>;
    @observable pageCatImage: QueryPager<any>;

    protected async internalStart(param: any) { }

    searchMadiaKey = async (key: string) => {
        this.pageMedia = new QueryPager(this.uqs.webBuilder.SearchImage, 15, 30);
        this.pageMedia.first({ key: key });
    };


    //添加任务
    saveItem = async (id: any, param: any) => {
        let pa = { caption: param.caption, path: param.path, author: this.user.id, isValid: 1 };
        let ret = await this.uqs.webBuilder.Image.save(id, pa);
        if (id) {
            let item = this.pageMedia.items.find(v => v.id === id);
            if (item !== undefined) {
                _.merge(item, param);
                item.$update = new Date();
            }
            this.current = item;
        } else {
            param.id = ret.id;
            param.$create = new Date();
            param.$update = new Date();
            this.pageMedia.items.unshift(param);
            this.current = param;
        }
        this.searchMadiaKey("");
    };

    onAddClick = () => {
        this.current = undefined;
        this.openVPage(VEdit);
    };

    onimgNames = async (id: number) => {
        this.current = await this.uqs.webBuilder.Image.load(id);
        await this.searchImageCat(id);
        this.openVPage(VChangeNames);
    }

    render = observer(() => {
        return this.renderView(VMain);
    });

    showMedia = async (id: number) => {
        await this.searchImageCat(id);
        this.current = await this.uqs.webBuilder.Image.load(id);
        this.openVPage(VShowImg);
    };

    loadList = async () => {
        this.searchMadiaKey("");
    };

    onRem = async (id: number) => {
        this.current = await this.uqs.webBuilder.Image.save(id, { isValid: 0 });
        this.searchMadiaKey("");
    }


    showPickCat = async () => {
        await this.searchCat("0");
        this.openVPage(VPickCat);
    }

    onPickCat = async (image: any, cat: any) => {
        await this.uqs.webBuilder.ImageCat.add({ image: image, arr1: [{ cat: cat }] });
        await this.searchImageCat(image);
    }

    searchImageCat = async (image: any, ) => {
        this.pageImageCat = new QueryPager(this.uqs.webBuilder.SearchImageCat, 15, 30);
        this.pageImageCat.first({ image: image });
        this.closePage();
    };

    delImageCat = async (cat: any) => {
        await this.uqs.webBuilder.ImageCat.del({ image: this.current.id, arr1: [{ cat: cat }] });
        this.pageImageCat = new QueryPager(this.uqs.webBuilder.SearchImageCat, 15, 30);
        this.pageImageCat.first({ image: this.current.id });
    };


    showCat = async () => {
        await this.searchCat("0");
        this.openVPage(VCat)
    }

    searchCat = async (parent: string) => {
        this.pageCat = new QueryPager(this.uqs.webBuilder.SearchCat, 15, 30);
        this.pageCat.first({ parent: parent });
    };

    showCatImage = async (cat: any) => {
        await this.searchCatImage("", cat);
        this.openVPage(VCatImage, cat);
    }

    searchCatImage = async (key: any, cat: any) => {
        this.pageCatImage = new QueryPager(this.uqs.webBuilder.SearchCatImage, 15, 30);
        this.pageCatImage.first({ key: key, cat: cat });
    };


    showSlideShow = () => {
        this.openVPage(VSlideShow);
    }

    searchSlideShow = () => {

    }

    addSlideShow = () => {

    }

    delSlideShow = () => {

    }

    pubSlideShow = () => {

    }




    tab = () => {
        return <this.render />;
    };
}
