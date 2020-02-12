import { AppConfig } from "tonva";
import logo from "../src/static/images/logo.png";
export const appConfig: AppConfig = {
    appName: "百灵威系统工程部/webBuilder",
    version: "1.0.8",
    tvs: {},
    oem: "百灵威"
};

export const setting = {
    appName: "内容管理",
    url: "http://agent.jkchemical.com",
    carturl: "http://shop.jkchemical.com",
    downloadAppurl: "http://agent.jkchemical.com/download/jk-agent.apk",
    sharelogo: "https://agent.jkchemical.com/sharelogo.png",
    logo: logo,
    pageHeaderCss: "bg-primary py-1",
    appUrlDomain: "cs.jkchemical.com",
    previewUrl: "https://web.jkchemical.com"
    // sales: undefined as Sales,
};

// 生产配置
const GLOABLE_PRODUCTION = {
    CHINA: 44,
    CHINESE: 196,
    SALESREGION_CN: 1
};

// 测试环境配置
const GLOABLE_TEST = {
    CHINA: 43,
    CHINESE: 197,
    SALESREGION_CN: 4
};

// export { GLOABLE_PRODUCTION as GLOABLE };
export { GLOABLE_TEST as GLOABLE };
