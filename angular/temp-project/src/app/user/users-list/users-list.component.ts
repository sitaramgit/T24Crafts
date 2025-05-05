import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-users-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  public users: any[] = []
  constructor(private userSer: UserService, private route: Router){}
  ngOnInit() {
    this.userSer.getUsers().subscribe((userRes) => {
      console.log(userRes);
      this.users = userRes;
    })
  }

  editTodo(id: number) {
    // alert(`Edit Todo with ID: ${id}`);
    this.route.navigate(['edit-user', id]);
  }

  deleteTodo(id: number) {
    alert(`Delete Todo with ID: ${id}`);
  }

  viewTodo(id: number) {
    alert(`View Todo with ID: ${id}`);
  }
  

}
