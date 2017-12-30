import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BrickDataProvider } from '../../providers/brick-data/brick-data';



/**
 * Generated class for the CustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer',
  templateUrl: 'customer.html',
})
export class CustomerPage {

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public brickData: BrickDataProvider
  ) {
    this.brickData.customers$.take(1).subscribe(customers => {
      console.log(customers);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerPage');
  }

  addCustomer() {
    this.navCtrl.push('CustomerEditPage');
  }

  updateCustomer(docId : string) {
    this.navCtrl.push('CustomerEditPage', { docId: docId});
  }

}
