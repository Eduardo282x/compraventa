import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { BaseResponse } from '../../interfaces/base.interface';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss',
})
export class SnackbarComponent implements OnInit {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: BaseResponse,
  ){}

  ngOnInit(): void {
    // console.log(this.data);
  }
}
