import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { User } from '../services/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  /*
  uid: string;
  nome: string;
  email: string;
  pws: string;
  ativo: boolean = true;
  */
  constructor(
    private bd: AngularFireDatabase
  ) { }


  save(usuario: Usuario, uid:string) {
    return this.bd.object("usuarios/" + uid).set(usuario);
  }

  getAll() {
    return this.bd.list<Usuario>("usuarios").snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
  }

  get(uid:string){
    return this.bd.object<Usuario>("usuarios/"+uid).snapshotChanges()
  }

}
