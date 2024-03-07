export interface IAssetsConfig {
    API_ENDPOINT: string;
}

export interface IConfig {
    API_CITY: string;
    API_TAXHUB: string;
    DEFAULT_CENTER_LAT: number;
    DEFAULT_CENTER_LONG: number;
    FRONTEND: IFrontend;
    REWARDS_ENABLED: boolean;
    URL_APPLICATION: string;
    VERIFY_OBSERVATIONS_ENABLED: boolean;
    appName: string;
    isServed?: boolean;
    withError?: boolean;
}

export interface IFrontend {
    ABOUT: boolean;
    DEFAULT_PROVIDER: string;
    DISPLAY_BADGES: boolean;
    DISPLAY_FOOTER: boolean;
    DISPLAY_SIDEBAR: boolean;
    DISPLAY_STATS: boolean;
    DISPLAY_TOPBAR: boolean;
    EMAIL_CONTACT: boolean;
    LOCALIZE: ILocalize;
    MAP: IMap;
    META: IMeta;
    MULTILINGUAL: boolean;
    NEW_OBS_FORM_MODAL_VERSION: boolean;
    PROD_MOD: boolean;
    REWARDS: boolean;
    URL_APPLICATION: string;
    VERIFY_OBSERVATIONS_ENABLED: boolean;
    details_espece_url: string;
    imageUpload: IImageUpload;
    program_list_observers_names: boolean;
    program_list_sort: string;
    registration_message: string;
    taxonAutocompleteFields: string[];
    taxonAutocompleteInputThreshold: number;
    taxonDisplayImageWhenUnique: boolean;
    taxonDisplaySciName: boolean;
    taxonSelectInputThreshold: number;
}

export interface ILocalize {
    locate_control_title: ILocateControlItem;
    platform_intro: ILocateControlItem;
    platform_participate: ILocateControlItem;
    platform_teaser: ILocateControlItem;
    program_add_an_observation: ILocateControlItem;
    program_allow_email_contact: ILocateControlItem;
    program_label: ILocateControlItem;
    program_share_an_observation: ILocateControlItem;
    programs_label: ILocateControlItem;
    termsOfUse: ILocateControlItem;
}

export interface ILocateControlItem {
    en: string;
    fr: string;
}

export interface IMap {
    BASEMAP: IBasemap[];
    CENTER: number[];
    NEW_OBS_POINTER: string;
    OBS_POINTER: string;
    ZOOM_LEVEL: number;
    ZOOM_LEVEL_RELEVE: number;
}

export interface IBasemap {
    attribution: string;
    layer: string;
    maxZoom: number;
    name: string;
    subdomains: string;
}

export interface IMeta {
    keywords: string;
}

export interface IImageUpload {
    maxHeight: number;
    maxWidth: number;
    quality: number;
}
