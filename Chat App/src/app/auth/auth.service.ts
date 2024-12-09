import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/user';

@Injectable({providedIn: 'root'})
export class AuthService {
    private token: string;
    private isAuthenticated = false;
    private authStatusListener = new Subject<boolean>();
    private tokenTimer: any;
    private userId: string;
    constructor(private http: HttpClient, private router: Router) {}

    createUser(email: string, password: string) {
        const authData: AuthData = {email, password};
        this.http.post(BACKEND_URL + '/signup', authData)
            .subscribe(response => {
                this.router.navigate(['/']);
            }, error => {
                this.authStatusListener.next(false);
            });
    }

    login(email: string, password: string) {
        const authData: AuthData = {email, password};
        this.http.post<{token: string, expiresIn: number, userId: string}>(BACKEND_URL + '/login', authData)
            .subscribe(response => {
                // console.log(response);
                this.token = response.token;
                if (this.token) {
                    const expiry = response.expiresIn;
                    this.userId = response.userId;
                    this.setAuthTimer(expiry);
                    const now = new Date();
                    const expirationDate = new Date(now.getTime() + expiry * 1000);
                    this.saveAuthData(this.token, expirationDate, this.userId);
                    this.isAuthenticated = true;
                    this.authStatusListener.next(true);
                    this.router.navigate(['/']);
                }
            }, error => {
                this.authStatusListener.next(false);
            });
    }

    autoAuthUser() {
        const authInfo = this.getAuthData();
        if (authInfo) {
            const now = new Date();
            const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
            if (expiresIn > 0) {
                this.token = authInfo.token;
                this.userId = authInfo.userId;
                this.isAuthenticated = true;
                this.authStatusListener.next(true);
                this.setAuthTimer(expiresIn / 1000);
            }
        }
    }

    logout() {
        clearTimeout(this.tokenTimer);
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        this.clearAuthData();
        this.userId = null;
        this.router.navigate(['/login']);
    }

    private setAuthTimer(duration: number) {
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration * 1000);
    }

    getToken() {
        return this.token;
    }

    getAuthStatus() {
        return this.isAuthenticated;
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    getUserId() {
        return this.userId;
    }

    private saveAuthData(token: string, expirationDate: Date, userId) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
        localStorage.setItem('userId', userId);
    }

    private clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('userId');
    }

    private getAuthData() {
        const token = localStorage.getItem('token');
        const expiration = localStorage.getItem('expiration');
        if (!token || !expiration) {
            return;
        }
        const userId = localStorage.getItem('userId');
        return {
            token,
            userId,
            expirationDate: new Date(expiration)
        };
    }
}
