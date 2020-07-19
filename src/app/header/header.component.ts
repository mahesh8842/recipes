import { Component, OnInit, OnDestroy } from '@angular/core';
import { datastorageservice } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  collapsed = true;
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(private datStoreService: datastorageservice,
            private authservice:AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authservice.user.subscribe(user => {
      this.isAuthenticated = !!user;
    }
      );
  }
  onsavedata() {
    this.datStoreService.storerecipes();
  }
  onfetchdata() {
    this.datStoreService.fetchdata().subscribe();
  }
  onlogout() {
    this.authservice.Logout();
}

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
