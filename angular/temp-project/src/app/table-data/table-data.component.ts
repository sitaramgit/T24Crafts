import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-table-data',
  imports: [CommonModule, RouterModule],
  templateUrl: './table-data.component.html',
  styleUrl: './table-data.component.css'
})
export class TableDataComponent {
  data = [
    {
      name: 'sitaram',
      email: 'abc@gmail.com',
      status: 'success',
      role: 'manager'
    },
    {
      name: 'raju',
      email: 'raju@gmail.com',
      status: 'pending',
      role: 'lead'
    },
    {
      name: 'lokesh',
      email: 'lokesh@gmail.com',
      status: 'success',
      role: 'manager'
    }
  ]

}
