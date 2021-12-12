import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from './shared/services/auth-state.service';
import { TokenService } from './shared/services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
