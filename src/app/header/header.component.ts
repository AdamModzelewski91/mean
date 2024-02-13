import { Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { MatToolbar} from '@angular/material/toolbar'
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { AuthService } from '../auth/service/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbar, RouterLink, RouterLinkActive, MatButtonModule, LoginComponent, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  isAuth = computed(()=> this.authService.getToken())

  constructor(private authService: AuthService) {}

}
