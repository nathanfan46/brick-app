import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import moment from 'moment-timezone';

import { Sale, BrickDataProvider } from '../../providers/brick-data/brick-data';
/**
 * Generated class for the SaleEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sale-edit',
  templateUrl: 'sale-edit.html',
})
export class SaleEditPage {
  public docId;
  public sale: FormGroup;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder,
    public brickData: BrickDataProvider
  ) {
    this.docId = navParams.data.docId;
  }

  ngOnInit() {
    this.sale = this.formBuilder.group({
      customerid: ['', [<any>Validators.required]],
      date: [null, [<any>Validators.required]],
      invoicedate: null,
      createdate: null,
      address: ['', [<any>Validators.required]],
      unitprice: [null, [<any>Validators.required]],
      quantity: [null, [<any>Validators.required]],
      amount: [null, [<any>Validators.required]],
      options: ''
    });

    this.sale.controls.date.valueChanges.subscribe(date => {
      if(this.sale.controls.invoicedate.value == null) {
        this.sale.controls.invoicedate.setValue(date);
      }
    })

    this.sale.controls.unitprice.valueChanges.subscribe(unitprice => {
      let amount = unitprice * this.sale.controls.quantity.value;
      this.sale.controls.amount.setValue(amount.toFixed(0));
    })

    this.sale.controls.quantity.valueChanges.subscribe(quantity => {
      let amount = quantity * this.sale.controls.unitprice.value;
      this.sale.controls.amount.setValue(amount.toFixed(0));
    })

    if(this.docId) {
      const sale$ = this.brickData.getSale$(this.docId);
      sale$.take(1).subscribe(sale => {
        console.log(sale);
        sale.date = moment(sale.date).format('YYYY-MM-DD');
        if(sale.invoicedate) {
          sale.invoicedate = moment(sale.invoicedate).format('YYYY-MM-DD');
        }
        this.sale.patchValue(sale);
      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SaleEditPage');
  }

  save(model: Sale, isValid: boolean) {
    // console.log(model, isValid);
    model.date = new Date(model.date);
    if(model.invoicedate) {
      model.invoicedate = new Date(model.invoicedate);
    }

    console.log(model.date);

    if(this.docId) {
      model.id = this.docId;
      this.brickData.updateSale(model);
    } else {
      this.brickData.addSale(model);
    }
    
    if(this.navCtrl.canGoBack()) {
      this.navCtrl.pop();
    }
  }

}
