import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authListenerSub: Subscription;
  authenticated = false;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authenticated = this.authService.getAuthStatus();
    this.authListenerSub = this.authService.getAuthStatusListener().subscribe(status => {
      this.authenticated = status;
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSub.unsubscribe();
  }

}
