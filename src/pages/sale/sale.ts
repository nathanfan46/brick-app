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
  public customer_sales$: Observable<any>;
  public month_sales$: Observable<any>;
  public searchText: string;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public brickData: BrickDataProvider
  ) {
    this.customer_sales$ = this.brickData.sales$.withLatestFrom(this.brickData.customers$).map(data => {
      const [sales, customers] = data;
      let customer_dict = {};
      customers.forEach(customer => {
        customer_dict[customer.id] = customer;
      })

      let dict = {};
      sales.forEach(sale => {
        if(!dict[sale.customerid]) {
          dict[sale.customerid] = [];
        }

        let salewithcustomer = { customername: customer_dict[sale.customerid].name, ...sale};  
        dict[sale.customerid].push(salewithcustomer);
      })

      let group_sales = []
      for(let key in dict) {
        let customername = customer_dict[key].name;
        let customer$ = this.brickData.getCustomer$(key);
        let sales = dict[key];
        sales = sales.sort((a,b) => {
          if(b.date.getTime() == a.date.getTime() && b.creaetdate && a.creaetdate) {
            return b.creaetdate.getTime() - a.creaetdate.getTime();
          } else {
            return b.date.getTime() - a.date.getTime();
          }
        });
        let group_sale = { customer$: customer$, customername: customername, sales: sales};
        group_sales.push(group_sale);
      }
      console.log(group_sales);
      return group_sales;
      
    });

    this.month_sales$ = this.brickData.sales$.withLatestFrom(this.brickData.customers$).map(data => {
      const [sales, customers] = data;
      let customer_dict = {};
      customers.forEach(customer => {
        customer_dict[customer.id] = customer;
      })

      let dict = {};
      sales.forEach(sale => {
        let year = sale.date.getFullYear();
        let month = sale.date.getMonth()+1;
        let key = year + '-' + month;
        let customer$ = this.brickData.getCustomer$(sale.customerid);
        
        let salewithcustomer = { customer$: customer$, customername: customer_dict[sale.customerid].name, ...sale };
        if(!dict[key]) {
          dict[key] = [];
        }

        dict[key].push(salewithcustomer);
      })

      let group_sales = []
      for(let key in dict) {
        let sales = dict[key];
        sales = sales.sort((a,b) => {
          if(b.date.getTime() == a.date.getTime() && b.creaetdate && a.creaetdate) {
            return b.creaetdate.getTime() - a.creaetdate.getTime();
          } else {
            return b.date.getTime() - a.date.getTime();
          }
        });
        let group_sale = { month: key, sales: sales };
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

  onInput(event: any) {

  }

  onCancel(event: any) {

  }

}
