import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BaseComponent } from '../../pages/base/base.component';
import { FormatDatePipe } from '../../pipes/FormatDate.pipe';
import { IColumns, ISendDataTable, TypeActions } from '../../interfaces/table.interface';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    FormatDatePipe
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent extends BaseComponent implements OnInit, AfterViewInit, OnChanges{

  @Input() columns: IColumns<any>[] = [];
  @Input() dataTable: any[] = [];
  @Input() includeBtnAdd: boolean = true;
  @Input() title: string = '';
  @Input() iconTitle: string = '';

  @Output() sendData = new EventEmitter<ISendDataTable>();

  // ref = inject(ChangeDetectorRef)
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.displayedColumns = this.columns.map(col => col.nameColumn);
    // this.dataSource = new MatTableDataSource([]);
  }

  styleHead(styles: string | undefined): string {
    return `!bg-gray-300 font-bold text-xl ${styles}`
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['dataTable']){
      this.dataSource = new MatTableDataSource(this.dataTable);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Elementos por pagina';
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  redirectLink(rowLink: any): void {
    this.router.navigate([rowLink.link]);
  }

  openDialog(): void {
    this.sendData.emit({data: null,action: 'add'})
  }

  editDataDialog(data: any, actionColumn: string): void {
    this.sendData.emit({data: data, action: actionColumn as TypeActions})
  }
}