import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController, Platform } from '@ionic/angular';
import { DisatelService } from 'src/app/services/disatel.service';
import { AlertService } from 'src/app/services/alert.service';
import { ObservacionesPage } from '../observaciones/observaciones.page';
import { TrabajarVehiculoPage } from '../trabajar-vehiculo/trabajar-vehiculo.page';
import { VerSIMPage } from '../ver-sim/ver-sim.page';
import { VerDatosPage } from '../ver-datos/ver-datos.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DataSyncService } from '../../services/data-sync.service';
import { Storage } from '@ionic/storage';
import { ModalObservacionesPage } from '../modal-observaciones/modal-observaciones.page';

@Component({
  selector: 'app-datos-solicitud',
  templateUrl: './datos-solicitud.page.html',
  styleUrls: ['./datos-solicitud.page.scss'],
})
export class DatosSolicitudPage implements OnInit {

  @Input() ordenEsecifica;
  viewEntered = false;
  recharge;
  longitude;
  latitude;
  fechaHora;
  datosUsuario;
  observaciones = '';
  // Estados de la orden
  canceladaFallida = false;
  presentarUbicacion = false;

  constructor(private platform: Platform, private modalController: ModalController, public loadingController: LoadingController,
              private disatelService: DisatelService, private geolocation: Geolocation, private dataSyncService: DataSyncService,
              private alertService: AlertService, private storage: Storage) { }

  async ngOnInit() {
  }

  async ionViewDidEnter() {
      this.viewEntered = true;
      if(this.ordenEsecifica.status_codigo === 4){
        this.presentarUbicacion = true;
        this.canceladaFallida = false;
      }else if(this.ordenEsecifica.status_codigo === 6){
        this.canceladaFallida = true;
        this.presentarUbicacion = false;
      }
  }

  ionViewWillLeave(){
    this.viewEntered = false;
  }

  async back(){
    this.recharge = false;
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalController.dismiss(this.recharge);
    });
    this.modalController.dismiss(this.recharge);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
  }

  getDate(){
    let todayDate;
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    todayDate = dd + '/' + mm + '/' + yyyy;
    return todayDate;
  }

  getHour(){
    const hoy = new Date();
    const hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    return hora;
  }

  async mostrarModalObservaciones( observaciones ) {
    await this.presentLoading();
    const modal = await this.modalController.create({
      component: ObservacionesPage,
      backdropDismiss: false,
      componentProps: { observaciones }
    });
    await modal.present();
  }

  async mostrarModalVehiculo( vehiculo, orden ) {
    await this.presentLoading();
    const modal = await this.modalController.create({
      component: TrabajarVehiculoPage,
      backdropDismiss: false,
      componentProps: { vehiculo, orden}
    });
    await modal.present();

    const value: any = await modal.onDidDismiss();
    console.log(value);
}

async mostrarModalSim( sim ) {
  await this.presentLoading();
  const modal = await this.modalController.create({
    component: VerSIMPage,
    backdropDismiss: false,
    componentProps: { sim }
  });
  await modal.present();
}

async mostrarModalEquipo( equipo ) {
  await this.presentLoading();
  const modal = await this.modalController.create({
    component: VerDatosPage,
    backdropDismiss: false,
    componentProps: { equipo }
  });
  await modal.present();
}

getPosition(){
  this.geolocation.getCurrentPosition().then(async (resp) => {
    this.latitude = await resp.coords.latitude;
    this.longitude = await resp.coords.longitude;
    console.log(resp);
  }).catch((error) => {
    this.alertService.presentToast(error, 'danger', 3000);
  });
}

async ubicacion(){
  await this.presentLoading();
  this.getPosition();
  const modal = await this.modalController.create({
    component: ModalObservacionesPage,
    backdropDismiss: false
  });
  await modal.present();
  const value: any = await modal.onDidDismiss();
  if(value){
    this.observaciones = value.data;
  }
  this.fechaHora = await this.getDate() + ' ' + this.getHour();
  this.guardarPosicion();
}

async guardarPosicion(){
  this.datosUsuario = await this.storage.get('datos');
  this.dataSyncService.saveApi(`https://${this.datosUsuario.dominio}//ROOT/API/API_ot_ejecutar.php?request=presente&ot=
                                ${this.ordenEsecifica.codigo}
                                &usuario=${this.datosUsuario.codigo}&observaciones=${this.observaciones}&fecha_hora=${this.fechaHora}
                                &longitud=${this.longitude}&latitud=${this.latitude}`);
                                this.canceladaFallida = true;
                                this.presentarUbicacion = false;

  this.ordenEsecifica.status_codigo = await 6;
  this.storage.set(this.ordenEsecifica.codigo, this.ordenEsecifica );
}


async cancelarOrden(){
  this.datosUsuario = await this.storage.get('datos');
  this.dataSyncService.saveApi(`https://${this.datosUsuario.dominio}//ROOT/API/API_ot_ejecutar.php?request=presente&ot=
                                ${this.ordenEsecifica.codigo}
                                &usuario=${this.datosUsuario.codigo}&observaciones=${this.observaciones}&fecha_hora=${this.fechaHora}
                                &longitud=${this.longitude}&latitud=${this.latitude}`);
                                this.canceladaFallida = true;
                                this.presentarUbicacion = false;

  this.ordenEsecifica.status_codigo = await 6;
  this.storage.set(this.ordenEsecifica.codigo, this.ordenEsecifica );
}



}
