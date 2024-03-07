import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { IConfig } from './config.model';
import { ToastrService } from 'ngx-toastr';

export const configFactory = (config: ConfigService) => {
    console.log('config', config);
    return config.loadAppConfig();
};
//  config.loadAppConfig();

@Injectable({
    providedIn: 'root',
})
export class ConfigService {
    constructor(private http: HttpClient, private _toaster: ToastrService) {}

    // keep track of config
    private config = new BehaviorSubject<IConfig>({} as IConfig);
    config$: Observable<IConfig> = this.config.asObservable();

    private static _config: IConfig;

    static get Config(): IConfig {
        return this._config;
    }

    private _createConfig(config: any, withError: boolean): void {
        // cast all keys as are
        const _config = { ...(<IConfig>config) };

        // is severd
        _config.isServed = true;

        // // with error
        _config.withError = withError;

        // set static member
        ConfigService._config = _config;

        // next
        this.config.next(config);
    }
    public Config: IConfig;

    loadAppConfig(): Observable<boolean> {
        return this.http.get('./assets/config.json').pipe(
            catchError((error) => {
                this._toaster.error(
                    'Config file is missing. It should be located in assets/config.json'
                );
                return throwError(error);
            }),
            mergeMap((config: any) => {
                console.log('CONFIG', config);
                const configBaseUrl = isDevMode()
                    ? 'http://localhost:5002/api'
                    : config.API_ENDPOINT;
                if (configBaseUrl) {
                    return this.http
                        .get(`${configBaseUrl}/config`, {
                            headers: { 'not-to-handle': 'true' },
                        })
                        .pipe(
                            map((response) => {
                                // set to public property
                                this._createConfig(response, false);
                                return true;
                            }),
                            catchError((error) => {
                                // if in error, return set fall back from Config
                                console.error(error);
                                return of(false);
                            })
                        );
                } else {
                    this._toaster.error(
                        "Missing 'API_ENDPOINT' in config.json"
                    );
                    //return throwError("Missing 'API_ENDPOINT' in config.json");
                    return of(false);
                }
            })
        );
    }
}
