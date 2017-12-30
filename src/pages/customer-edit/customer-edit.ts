import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { Customer, BrickDataProvider } from '../../providers/brick-data/brick-data';

// import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the CustomerEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-edit',
  templateUrl: 'customer-edit.html',
})
export class CustomerEditPage {
  public docId;
  public customer: FormGroup;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public brickData: BrickDataProvider,
    public formBuilder: FormBuilder
  ) {
    this.docId = navParams.data.docId;
  }

  ngOnInit() {
    this.customer = this.formBuilder.group({
      name: ['', [<any>Validators.required]],
      phone: '',
      notes: ''
    });

    if(this.docId) {
      const customer$ = this.brickData.getCustomer$(this.docId);
      customer$.take(1).subscribe(customer => {
        console.log(customer);
        this.customer.patchValue(customer);
      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerEditPage');
  }

  save(model: Customer, isValid: boolean) {
    // console.log(model, isValid);
    if(this.docId) {
      model.id = this.docId;
      this.brickData.updateCustomer(model);
    } else {
      this.brickData.addCustomer(model);
    }
    
    if(this.navCtrl.canGoBack()) {
      this.navCtrl.pop();
    }
  }

}
