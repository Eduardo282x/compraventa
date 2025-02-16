import { ChangeDetectorRef, Component, effect, inject, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { columns, dataFormUsuarios, formDataUsuarios } from './user.data';
import { IColumns, ISendDataTable } from '../../interfaces/table.interface';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../components/table/table.component';
import { FormComponent } from '../../components/form/form.component';
import { SucursalesService } from '../../services/sucursales.service';
import { IUser } from '../../interfaces/users.interface';
import { ISucursales } from '../../interfaces/sucursales.interface';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent extends BaseComponent implements OnInit {
  columns: IColumns<any>[] = columns;
  dataTable: any[] = [];
  title: string = 'Usuarios';

  sucursalService = inject(SucursalesService);
  usersService = inject(UsersService);
  ref = inject(ChangeDetectorRef)

  constructor() {
    super();
    effect(() => {
      this.dataTable = this.usersService.getUsers();

      const copyDataForm = [...dataFormUsuarios];
      const findFormRoles = copyDataForm.find(form => form.formControl === 'rolId');
      if (findFormRoles) {
        findFormRoles.option = this.usersService.getRoles().map(rol => {
          return {
            label: rol.rol,
            value: rol.id
          }
        })
      }
      const findFormSucursal = copyDataForm.find(form => form.formControl === 'sucId');
      if (findFormSucursal) {
        findFormSucursal.option = this.sucursalService.getSucursales().map((suc: ISucursales) => {
          return {
            label: suc.nombre,
            value: suc.sucId
          }
        })
      }

      formDataUsuarios.dataForm = copyDataForm;
      this.ref.detectChanges();
    })
  }

  ngOnInit(): void {
    this.usersService.getUsersAPI();
    this.usersService.getRolesAPI();
    this.sucursalService.getSucursalesAPI();
  }

  defectColumnAction(dataComponent: ISendDataTable): void {
    if (dataComponent.action == 'add') {
      this.openDialog();
    }
    if (dataComponent.action == 'edit') {
      this.editDataDialog(dataComponent.data);
    }
    if (dataComponent.action == 'delete') {
      this.deleteData(dataComponent.data);
    }
  }

  openDialog(): void {
    const setValues = [...dataFormUsuarios];
    setValues.map(form => {
      form.value = form.typeInput === 'text' ? '' : false
    });

    formDataUsuarios.dataForm = setValues;

    const dialogRef = this.dialog.open(FormComponent, {
      data: formDataUsuarios,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.usersService.postUsersAPI(result);
    })
  }

  editDataDialog(data: any): void {
    const setValues = [...dataFormUsuarios];
    setValues.map(form => {
      form.value = data[form.formControl]
    });

    formDataUsuarios.dataForm = setValues;
    
    const dialogRef = this.dialog.open(FormComponent, {
      data: formDataUsuarios,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });

    dialogRef.afterClosed().subscribe(result => {
      result.id = data.id;
      this.usersService.putUsersAPI(result);
    })
  }

  deleteData(data: IUser): void {
    this.usersService.deleteUsersAPI(data.id.toString());
  }
}
