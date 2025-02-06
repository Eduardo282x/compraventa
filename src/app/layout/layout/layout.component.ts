import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { MatButtonModule } from '@angular/material/button';
import { BaseComponent } from '../../pages/base/base.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, MatButtonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent extends BaseComponent implements OnInit {

  ngOnInit(): void {
    const userDate = localStorage.getItem('userToken');
    if(!userDate){
      this.router.navigate(['/login'])
    }
  }
}
