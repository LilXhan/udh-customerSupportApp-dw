import { Component, Input } from '@angular/core';
import { User } from '../../../auth/interfaces';

@Component({
  selector: 'shared-title',
  templateUrl: './title.component.html',
  styleUrl: './title.component.css'
})
export class TitleComponent {
 
  @Input()
  public nameUser: string = '';
  @Input()
  public title: string = '';

  @Input()
  public userPermissions: any = {};

  returnRol(): string {
    if (this.userPermissions.is_superuser) {
      return 'Admin'
    } else if (this.userPermissions.is_staff) {
      return 'Agente'
    } else if (this.userPermissions.is_authenticated) {
      return 'Usuario'
    }
    return 'Not authenticated'
  }

}
