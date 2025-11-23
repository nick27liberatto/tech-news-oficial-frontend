import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-settings-page',
  imports: [RouterLink, MatSlideToggleModule],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.scss'
})
export class SettingsPage { }
