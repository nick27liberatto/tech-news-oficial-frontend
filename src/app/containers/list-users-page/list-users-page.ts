import { Component, Inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-users-page',
  imports: [CommonModule],
  templateUrl: './list-users-page.html',
  styleUrl: './list-users-page.scss'
})
export class ListUsersPage {
  users:User[] = [];
  constructor(private userService:UserService){
    let filtro:string = "";
    this.userService.search(filtro).subscribe(user => {
      return this.users = user;
    });
  }
}
