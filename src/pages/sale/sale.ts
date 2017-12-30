import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import moment from 'moment-timezone';

import { BrickDataProvider } from '../../providers/brick-data/brick-data';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the SalePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sale',
  templateUrl: 'sale.html',
})
export class SalePage {
  public category: string = "by_company";
  public oo: string = "January";
  public customer_sales$: Observable<any>;
  public month_sales$: Observable<any>;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public brickData: BrickDataProvider
  ) {
    this.customer_sales$ = this.brickData.sales$.map(sales => {
      let dict = {};
      sales.forEach(sale => {
        if(!dict[sale.customerid]) {
          dict[sale.customerid] = [];
        }

        dict[sale.customerid].push(sale);
      })

      let group_sales = []
      for(let key in dict) {
        let customer$ = this.brickData.getCustomer$(key);
        let group_sale = { customer$: customer$, sales: dict[key]};
        group_sales.push(group_sale);
      }
      console.log(group_sales);
      return group_sales;
      
    });

    this.month_sales$ = this.brickData.sales$.map(sales => {
      let dict = {};
      sales.forEach(sale => {
        let year = sale.date.getFullYear();
        let month = sale.date.getMonth()+1;
        let key = year + '-' + month;
        let customer$ = this.brickData.getCustomer$(sale.customerid);
        let salewithcustomer = { customer$: customer$, ...sale };
        if(!dict[key]) {
          dict[key] = [];
        }

        dict[key].push(salewithcustomer);
      })

      let group_sales = []
      for(let key in dict) {
        let group_sale = { month: key, sales: dict[key]};
        group_sales.push(group_sale);
      }
      console.log(group_sales);
      return group_sales;
    })
  }

  trackByFn(index, item) {
    return index;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalePage');
  }

  addSale() {
    this.navCtrl.push('SaleEditPage');
  }

  updateSale(docId : string) {
    this.navCtrl.push('SaleEditPage', {docId : docId});
  }

  formatdate(date: any) {
    return moment(date).format('YYYY-MM-DD');
  }

  customerName(customerid: string): Observable<any> {
    return this.brickData.getCustomer$(customerid).map(customer => customer.name);
  }

}
