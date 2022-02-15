import { Injectable } from '@angular/core';
import { DisatelService } from './disatel.service';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class DataSyncService {

  rutas = [];

  constructor( private storage: Storage, private disatelService: DisatelService ) {
    this.cargarStorage();
  }

  async cargarStorage() {
    this.rutas = await this.storage.get('rutas') || [];
  }


  async saveApi( ruta ) {
    await this.cargarStorage();
    this.rutas.push( ruta );
    this.storage.set('rutas', this.rutas);
  }

}
