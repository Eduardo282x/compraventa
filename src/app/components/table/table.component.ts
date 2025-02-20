import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, effect, inject } from '@angular/core';
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
import { MatSelectModule } from '@angular/material/select';
import { ISucursales } from '../../interfaces/sucursales.interface';
import { SucursalesService } from '../../services/sucursales.service';

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
    FormatDatePipe,
    MatSelectModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent extends BaseComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() columns: IColumns<any>[] = [];
  @Input() dataTable: any[] = [];
  @Input() includeBtnAdd: boolean = true;
  @Input() secondBtn: string | null = null;
  @Input() includeSelectorSucursal: boolean = false;
  @Input() title: string = '';
  @Input() iconTitle: string = '';

  @Output() sendData = new EventEmitter<ISendDataTable>();
  @Output() emitSucursal = new EventEmitter<number>();

  // ref = inject(ChangeDetectorRef)
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  sucursal: ISucursales[] = [];
  sucursalService = inject(SucursalesService);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    super();
    effect(() => {
      this.sucursal = this.sucursalService.getSucursales();
    })
  }

  ngOnInit(): void {
    this.displayedColumns = this.columns.map(col => col.nameColumn);
    // this.dataSource = new MatTableDataSource([]);
    if(this.includeSelectorSucursal){
      this.sucursalService.getSucursalesAPI();
    }
  }

  styleHead(styles: string | undefined): string {
    return `!bg-gray-300 font-bold text-xl ${styles}`
  }

  changeSucursal(sucId: number) {
    this.emitSucursal.emit(sucId)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataTable']) {
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

    if (this.dataTable && this.dataTable.length > 0) {
      const filterColumn = this.columns.filter((col: IColumns<any>) => col.type == 'string');
      const filtersKey = filterColumn.map((col: IColumns<any>) => col.nameColumn);

      const filterSearch = filtersKey.map((col: string) => {
        return (
          this.dataTable.filter((fil) => {
            const splitWord = col.split('.');
            if (splitWord.length == 1) {
              return (fil[splitWord[0]].toString().toLowerCase().includes(filterValue.toLowerCase()))
            }
            if (splitWord.length == 2) {
              return (fil[splitWord[0]][splitWord[1]].toString().toLowerCase().includes(filterValue.toLowerCase()))
            }
            if (splitWord.length == 3) {
              return (fil[splitWord[0]][splitWord[1]][splitWord[2]].toString().toLowerCase().includes(filterValue.toLowerCase()))
            }
            return (fil[col].toString().toLowerCase().includes(filterValue.toLowerCase()))
          }
          )
        )
      }).flat();

      const reduceFilter = new Set(filterSearch);
      const result = [...reduceFilter];
      console.log(result);
      
      this.dataSource.data = result;
    }
    // this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setClassName(numberExpired: string): string {
    if (Number(numberExpired) <= 1) return 'text-center px-4 py-2 rounded-full bg-red-600';
    if (Number(numberExpired) <= 3) return 'text-center px-4 py-2 rounded-full bg-orange-600';
    if (Number(numberExpired) <= 6) return 'text-center px-4 py-2 rounded-full bg-yellow-600';
    return 'text-black';
  }

  redirectLink(rowLink: any): void {
    this.router.navigate([rowLink.link]);
  }

  openDialog(): void {
    this.sendData.emit({ data: null, action: 'add' })
  }

  secondBtnAction(action: TypeActions): void {
    this.sendData.emit({ data: null, action: action })
  }

  editDataDialog(data: any, actionColumn: string): void {
    this.sendData.emit({ data: data, action: actionColumn as TypeActions })
  }
}