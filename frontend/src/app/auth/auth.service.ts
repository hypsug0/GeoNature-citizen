import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { share, map, catchError, tap } from 'rxjs/operators';

import { MainConfig } from '../../conf/main.config';
import {
    LoginUser,
    RegisterUser,
    JWT,
    TokenRefresh,
    LoginPayload,
    LogoutPayload,
} from './models';

@Injectable()
export class AuthService {
    private headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
    });

    redirectUrl: string;
    authenticated$ = new BehaviorSubject<boolean>(this.hasRefreshToken());
    authorized$ = new BehaviorSubject<boolean>(
        this.hasAccessToken() && this.tokenExpiration(this.getAccessToken()) > 1
    );
    timeoutID: any = null;

    constructor(private http: HttpClient, private router: Router) {}

    login(user: LoginUser): Observable<LoginPayload> {
        const url = `${MainConfig.API_ENDPOINT}/login`;
        return this.http
            .post<LoginPayload>(url, user, { headers: this.headers })
            .pipe(
                map((user) => {
                    if (user) {
                        this.authenticate(user);
                    }
                    return user;
                })
            );
    }

    register(user: RegisterUser): Observable<any> {
        const url = `${MainConfig.API_ENDPOINT}/registration`;
        return this.http.post(url, user).pipe(
            map((user) => {
                if (user) {
                    //this.authenticate(user);
                }
                return user;
            })
        );
    }

    authenticate(user: any): void {
        localStorage.setItem('access_token', user.access_token);
        this.authorized$.next(true);
        localStorage.setItem('refresh_token', user.refresh_token);
        this.authenticated$.next(true);
        localStorage.setItem('username', user.username);
        localStorage.setItem('userAvatar', user.userAvatar);
    }

    clearLocalStorage(): void {}

    logout(): Promise<any> {
        console.debug('logout');
        const url = `${MainConfig.API_ENDPOINT}/logout`;
        // console.debug(`url ${url}`);
        this.authorized$.next(false);
        // console.debug(`this.authorized$ ${this.authorized$}`);
        return this.http
            .post<LogoutPayload>(url, {
                headers: this.headers,
            })
            .pipe(
                tap({
                    next: (data) => console.log('logoutData', data),
                    error: (error) => console.error('logoutError', error),
                }),
                catchError((error) => {
                    console.error(`[logout] error "${error}"`);
                    localStorage.clear();
                    // this.authenticated$.next(false);
                    this.authenticated$.next(false);
                    return this.router.navigateByUrl('/home');
                    // return this.router.navigate(['/home']);
                })
            )
            .toPromise();
    }

    ensureAuthorized(): Observable<LoginUser> {
        const url = `${MainConfig.API_ENDPOINT}/user/info`;
        return this.http.get<LoginUser>(url, { headers: this.headers });
    }

    performTokenRefresh(): Observable<TokenRefresh> {
        const url = `${MainConfig.API_ENDPOINT}/token_refresh`;
        const refresh_token = this.getRefreshToken();
        const headers = this.headers.set(
            'Authorization',
            `Bearer ${refresh_token}`
        );
        return this.http.post<TokenRefresh>(url, null, {
            headers: headers,
        });
    }

    selfDeleteAccount(_access_token): Promise<any> {
        const url = `${MainConfig.API_ENDPOINT}/user/delete`;
        return this.http.delete(url, { headers: this.headers }).toPromise();
    }

    isLoggedIn(): Observable<boolean> {
        return this.authorized$.pipe(share());
    }

    getRefreshToken(): string {
        return localStorage.getItem('refresh_token');
    }

    getAccessToken(): string {
        return localStorage.getItem('access_token');
    }

    private hasRefreshToken(): boolean {
        return !!localStorage.getItem('refresh_token');
    }

    private hasAccessToken(): boolean {
        return !!localStorage.getItem('access_token');
    }

    decodeToken(token: string): JWT {
        if (!token) return;
        const parts: any[] = token.split('.');
        if (parts.length != 3) return;
        try {
            return {
                header: JSON.parse(atob(parts[0])),
                payload: JSON.parse(atob(parts[1])),
            };
        } catch (error) {
            console.error(error);
            return;
        }
    }

    tokenExpiration(token: string): number {
        if (!token) return;
        const jwt = this.decodeToken(token);
        if (!jwt) return;
        const now: number = new Date().getTime();
        const delta: number = (jwt.payload.exp * 1000 - now) / 1000.0;
        return delta;
    }

    confirmEmail(token): Observable<any> {
        let url: string = `${MainConfig.API_ENDPOINT}/user/confirmEmail/${token}`;
        return this.http.get(url);
    }
}
