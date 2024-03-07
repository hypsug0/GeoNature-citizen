import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IAssetsConfig, IConfig } from './config.model';

@Injectable({
    providedIn: 'root',
})
export class AppConfigService {
    private appConfig: IConfig;
    private assetsConfig: IAssetsConfig;
    private http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
    }

    loadAppConfig(): Subscription {
        return this.http
            .get('./assets/config.json')
            .pipe(
                mergeMap((config: IAssetsConfig) => {
                    this.assetsConfig = config;
                    return this.http.get(`${config.API_ENDPOINT}/config`);
                })
            )
            .subscribe((res: IConfig) => {
                this.appConfig = res;
            });
    }

    get frontendConfig(): IConfig {
        console.log('get frontendConfig', this.appConfig);
        return this.appConfig;
    }

    get apiUrl(): string {
        console.log('get apiUrl', this.assetsConfig.API_ENDPOINT);
        return this.assetsConfig.API_ENDPOINT;
    }
}
