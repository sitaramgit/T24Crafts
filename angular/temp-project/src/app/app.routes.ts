import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'users', pathMatch: 'full' },
    {
        path: 'users', loadComponent: () => import('./user/users-list/users-list.component').then(m => m.UsersListComponent)
    },
    {
        path: 'add-user', loadComponent: () => import('./user/add-user/add-user.component').then(m => m.AddUserComponent)
    },
    {
        path: 'edit-user/:id', loadComponent: () => import('./user/edit-user/edit-user.component').then(m => m.EditUserComponent)
    }
    ,{
        path: 'table', loadComponent: () => import('./table-data/table-data.component').then(m => m.TableDataComponent)
    }
];
