import { Component, inject,OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormsModule} from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  userObj: User = new User();
  cityList$: Observable<string[]> = new Observable<string[]>();
  stateList$: Observable<string[]> = new Observable<string[]>();
  userList: User[] = [];
  http = inject(HttpClient);

  ngOnInit(): void {
    this.cityList$ = this.http.get<string[]>(`http://localhost:3000/cityList`);
    this.stateList$ = this.http.get<string[]>(
      `http://localhost:3000/stateList`
    );
    this.getUsers();
  }

  getUsers() {
    this.http
      .get<User[]>(`http://localhost:3000/users`)
      .subscribe((res: User[]) => {
        this.userList = res;
      });
  }
  onSaveUser() {
    // this.http
    //   .post<User>(`http://localhost:3000/createUser`, this.userObj)
    //   .subscribe((res: User) => {
    //     alert('New User Created..')
    //   });
    this.http.get<User>(`http://localhost:3000/createUser`).subscribe((res: User) => {
      alert('New User Created..');
      this.userList.push(this.userObj)
    });
  }
  edit() {
    
  }
  remove(id:number) {
    const isConfirm = confirm('Are You Sure')
    if (isConfirm) {
      this.http.delete<User>(`http://localhost:3000/deleteUser/${id}`).subscribe((res:User) => {
        alert('User Details Deleted');
        this.userList = this.userList.filter((user) => {
          user.userId !== id;
        })
      });
    }
  }
}
export class User {
  userId: number;
  userName: string;
  fName: string;
  lName: String;
  city: string;
  state: string;
  zipcode: string;
  constructor() {
    this.userId = 0;
    this.city = '';
    this.fName = '';
    this.lName = '';
    this.state = '';
    this.userName = '';
    this.zipcode = '';
  }
 }
