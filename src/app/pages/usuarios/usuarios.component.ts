import { ChangeDetectorRef, Component, effect, inject, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { columns } from './user.data';
import { IColumns, ISendDataTable } from '../../interfaces/table.interface';
import { IChangeStatusUser } from '../../interfaces/users.interface';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../components/table/table.component';

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

  usersService = inject(UsersService);
  ref = inject(ChangeDetectorRef)

  constructor() {
    super();
    effect(() => {
      this.dataTable = this.usersService.getUsers();
      this.ref.detectChanges();
    })
  }

  ngOnInit(): void {
    this.usersService.getUsersAPI();
  }

  defectColumnAction(dataComponent: ISendDataTable): void {
    if (dataComponent.action == 'add') {
      this.openDialog();
    }
    if (dataComponent.action == 'edit') {
      this.editDataDialog(dataComponent.data);
    }
    if (dataComponent.action == 'states') {
      this.activeUser(dataComponent.data);
    }
    if (dataComponent.action == 'delete') {
      this.deleteData(dataComponent.data);
    }
  }

  openDialog(): void {
    this.router.navigate(['/usuario/agregar'])
  }

  activeUser(data: any): void {
    const user: IChangeStatusUser = {
      idUsers: data.users_ID,
      active: !data.users_status
    }
    this.usersService.updateUsersStatusAPI(user);
  }

  editDataDialog(data: any): void {
    localStorage.setItem('userEdit', JSON.stringify(data));
    this.router.navigate(['/usuario/editar'])
  }

  deleteData(data: any): void {
    this.usersService.deleteUsersAPI(data.users_ID.toString());
  }
}
