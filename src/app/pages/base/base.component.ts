import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-base',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './base.component.html',
  styleUrl: './base.component.css',
})
export class BaseComponent {
  routerActive = inject(ActivatedRoute);
  router = inject(Router);
  location = inject(Location);
  dialog = inject(MatDialog);

  logout(): void {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login'])
  }

  goBack(): void {
    this.location.back();
  }

}