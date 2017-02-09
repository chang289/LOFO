import { Component, Input } from '@angular/core'
import { protoUser } from '../model/protoUser'


@Component({
    moduleId: module.id,
    selector: 'register',
    templateUrl: 'register.component.html',
})

export class RegisterComponent {

    //@Input
    user: protoUser
}