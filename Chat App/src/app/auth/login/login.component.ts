import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
    isLoading = false;
    authStatusSub: Subscription;

    constructor(public authService: AuthService) {}

    ngOnInit() {
        this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
            authStatus => {
                this.isLoading = false;
            }
        );
    }

    onLogin(form: NgForm) {
        // console.log(form.value);
        if (form.valid) {
            this.isLoading = true;
            this.authService.login(form.value.email, form.value.password);
        }
    }

    ngOnDestroy() {
        this.authStatusSub.unsubscribe();
    }
}
