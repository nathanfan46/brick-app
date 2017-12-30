import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var cordova:any;
/**
 * Generated class for the InvoicePrintPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invoice-print',
  templateUrl: 'invoice-print.html',
})
export class InvoicePrintPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    const before = Date.now();
    let options = {
      documentSize: 'A4',
      type: 'share',
      fileName: 'myFile.pdf'
    };

    document.addEventListener('deviceready', () => {
      console.log('DEVICE READY FIRED AFTER', (Date.now() - before), 'ms');

      //generate the pdf.
      cordova.plugins.pdf.fromData( '<html> <h1>  Hello World  </h1> </html>', options )
      .then(()=>{})
      .catch((err)=>console.error(err))
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoicePrintPage');
  }

}
