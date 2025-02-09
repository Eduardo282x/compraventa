import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BaseComponent } from '../../base/base.component';
import { RouterModule } from '@angular/router';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { ClientLoginComponent } from '../clientLogin/clientLogin.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-ecommerce-header',
  imports: [MatIconModule, MatButtonModule, ReactiveFormsModule, RouterModule, MatButtonModule, MatBottomSheetModule],
  templateUrl: './ecommerceHeader.component.html',
  styleUrl: './ecommerceHeader.component.css',
})

export class EcommerceHeaderComponent extends BaseComponent implements OnInit {

  clientInfo = JSON.parse(localStorage.getItem('clientToken') as string);
  authService = inject(AuthService);

  private _bottomSheet = inject(MatBottomSheet);

  ecommerceHeaderForm = new FormGroup({
    product: new FormControl('')
  });

  ngOnInit(): void {
    this.authService.clientInfo.set(this.clientInfo);
  }

  openBottomSheet(): void {
    this._bottomSheet.open(ClientLoginComponent);
  }

  onSubmit() {
    const {product} = this.ecommerceHeaderForm.value;

    this.router.navigate(
      ['/comercio'],
      { queryParams: { producto: `${product}` } }
    );
  }

}
