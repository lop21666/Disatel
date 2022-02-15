import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, Platform, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-travajar-vehiculo-op',
  templateUrl: './travajar-vehiculo-op.page.html',
  styleUrls: ['./travajar-vehiculo-op.page.scss'],
})
export class TravajarVehiculoOpPage implements OnInit {

  @Input() vehiculo;
  @Input() orden;
  viewEntered;
  atras: boolean;

  constructor(private loadingController: LoadingController, private platform: Platform, private modalController: ModalController) { }

  ionViewDidEnter() {
    this.viewEntered = true;
    console.log(this.vehiculo, this.orden);
  }

  ionViewWillLeave(){
    this.viewEntered = false;
  }

  ngOnInit() {
      this.loadingController.dismiss();
  }

  async back(){
    this.atras = true;
    this.platform.backButton.subscribeWithPriority(10, () => {
    this.modalController.dismiss(this.atras);
    });
    this.modalController.dismiss(this.atras);
  }

}
