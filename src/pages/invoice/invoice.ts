import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import moment from 'moment-timezone';

import { BrickDataProvider } from '../../providers/brick-data/brick-data';
import { Observable } from 'rxjs/Observable';

declare var cordova:any;

/**
 * Generated class for the InvoicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invoice',
  templateUrl: 'invoice.html',
})
export class InvoicePage {
  public invoices$: Observable<any>;
  public searchText: string;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public brickData: BrickDataProvider
  ) {
    this.invoices$ = this.brickData.sales$.combineLatest(this.brickData.customers$)
    .map(data => {
      const [sales, customers] = data;
      let customer_dict = {};
      customers.forEach(customer => {
        customer_dict[customer.id] = customer;
      })

      let dict = {};
      sales.forEach(sale => {
        let key = sale.customerid;
        if(!dict[key]) {
          dict[key] = [];
        }

        dict[key].push(sale);
      })

      let invoice_dict = {};
      for(let key in dict) {
        let bulk_dict = {};
        let bulk_sales = dict[key];
        bulk_sales.forEach(sale => {
          let year = sale.date.getFullYear();
          let month = sale.date.getMonth()+1;

          if(sale.invoicedate) {
            console.log(sale.invoicedate);
            year = sale.invoicedate.getFullYear();
            month = sale.invoicedate.getMonth()+1;
          }

          let bulk_key = year + '-' + month;
          if(!bulk_dict[bulk_key]) {
            bulk_dict[bulk_key] = [];
          }

          bulk_dict[bulk_key].push(sale);
        })

        let bulk_invoices = [];
        for(let bulk_key in bulk_dict) {
          let sales = bulk_dict[bulk_key];
          let amount = sales.reduce((sum, sale) =>  parseFloat(sum) + parseFloat(sale.amount), 0);
          // console.log(sales);
          // console.log(amount);
          sales = sales.sort((a,b) => {
            if(b.date.getTime() == a.date.getTime() && b.creaetdate && a.creaetdate) {
              return a.creaetdate.getTime() - b.creaetdate.getTime();
            } else {
              return a.date.getTime() - b.date.getTime();
            }
          });
          bulk_invoices.push({month: bulk_key, sales: sales, amount: amount});
        }

        invoice_dict[key] = { customerid: key, invoices: bulk_invoices};
      }

      let invoices = []
      for(let key in invoice_dict) {
        let monthly_invoices = invoice_dict[key].invoices;
        // let customer$ = this.brickData.getCustomer$(key);
        let customer = customer_dict[key];
        invoices.push({ customer: customer, customername: customer.name, invoices: monthly_invoices});

      }
      console.log(invoices);
      return invoices;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoicePage');
  }

  trackByFn(index, item) {
    return index;
  }

  printInvoice(invoice: any, customer: any) {
    // this.navCtrl.push("InvoicePrintPage", {invoice: invoice})
    console.log(JSON.stringify(customer));
    const before = Date.now();
    let today = moment().format('YYYY-MM-DD');
    let options = {
      documentSize: 'A4',
      type: 'share',
      fileName: 'myFile.pdf'
    };

    console.log(JSON.stringify(invoice));
    document.addEventListener('deviceready', () => {
      console.log('DEVICE READY FIRED AFTER', (Date.now() - before), 'ms');
      // let html = `
      // <html>
      //   <h1>客戶:  ${invoice.amount}</h1><table>`;

      // invoice.sales.forEach(sale => {
      //   html += `<tr><td>AB</td><td>BB</td></tr>`;
      // })

      // html += `</table></html>`;

      let html = `
      <!doctype html>
      <html>
      <head>
          <meta charset="utf-8">
          <title>Brick App Invoice Template</title>
          
          <style>
          .invoice-box {
              max-width: 800px;
              margin: auto;
              padding: 30px;
              border: 1px solid #eee;
              box-shadow: 0 0 10px rgba(0, 0, 0, .15);
              font-size: 16px;
              line-height: 24px;
              font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
              color: #555;
          }
          
          .invoice-box table {
              width: 100%;
              line-height: inherit;
              text-align: left;
          }
          
          .invoice-box table td {
              padding: 5px;
              vertical-align: top;
          }

          .invoice-box table tr td:nth-child(1) {
              text-align: left;
              width: 20%;
          }

          .invoice-box table tr td:nth-child(2) {
              text-align: left;
              width: 35%;
          }

          .invoice-box table tr td:nth-child(3) {
              text-align: left;
              width: 15%;
          }

          .invoice-box table tr td:nth-child(4) {
              text-align: right;
              width: 10%;
          }

          .invoice-box table tr td:nth-child(5) {
              text-align: right;
              width: 10%;
          }
          
          .invoice-box table tr td:nth-child(6) {
              text-align: right;
              width: 10%;
          }
          
          .invoice-box table tr.top table td {
              padding-bottom: 20px;
          }
          
          .invoice-box table tr.top table td.title {
              font-size: 45px;
              line-height: 45px;
              color: #333;
          }

          .invoice-box table tr.top table td:nth-child(2) {
              text-align: right;
          }
          
          .invoice-box table tr.information table td {
              padding-bottom: 40px;
          }

          .invoice-box table tr.information table td:nth-child(2) {
              text-align: right;
          }
          
          .invoice-box table tr.heading td {
              background: #eee;
              border-bottom: 1px solid #ddd;
              font-weight: bold;
          }
          
          .invoice-box table tr.details td {
              padding-bottom: 20px;
          }
          
          .invoice-box table tr.item td{
              border-bottom: 1px solid #eee;
          }
          
          .invoice-box table tr.item.last td {
              border-bottom: none;
          }
          
          .invoice-box table tr.total td:nth-child(2) {
              border-top: 2px solid #eee;
              font-weight: bold;
          }
          
          @media only screen and (max-width: 600px) {
              .invoice-box table tr.top table td {
                  width: 100%;
                  display: block;
                  text-align: center;
              }
              
              .invoice-box table tr.information table td {
                  width: 100%;
                  display: block;
                  text-align: center;
              }
          }
          
          /** RTL **/
          .rtl {
              direction: rtl;
              font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
          }
          
          .rtl table {
              text-align: right;
          }
          
          .rtl table tr td:nth-child(2) {
              text-align: left;
          }
          </style>
      </head>
      
      <body>
          <div class="invoice-box">
              <table cellpadding="0" cellspacing="0">
                  <tr class="top">
                      <td colspan="6">
                          <table>
                              <tr>
                                  <td class="title">
                                      收款清單
                                  </td>
                                  <td>
                                      月份: ${invoice.month}<br>
                                      建立日期: ${today}
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
                  
                  <tr class="information">
                      <td colspan="6">
                          <table>
                              <tr>
                                  <td>
                                      陳學全<br>
                                      (02)2242-0824<br>
                                      (02)2242-0825<br>
                                      0926-372-587
                                  </td>
                                  <td>
                                      ${customer.name}<br>
                                      ${customer.notes}<br>
                                      ${customer.phone}
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
                  
                  <tr class="heading">
                      <td>
                          出貨日期
                      </td>

                      <td>
                          出貨地點
                      </td>

                      <td>
                          備註
                      </td>

                      <td>
                          數量
                      </td>

                      <td>
                          單價
                      </td>
                      
                      <td>
                          價格
                      </td>
                  </tr>`;

      invoice.sales.forEach(sale => {
        html += `<tr class="item">
                      <td>
                          ${moment(sale.date).format('YYYY-MM_DD')}
                      </td>

                      <td>
                          ${sale.address}
                      </td>

                      <td>
                          ${sale.options}
                      </td>

                      <td>
                          ${sale.quantity}
                      </td>

                      <td>
                          ${sale.unitprice}
                      </td>
                      
                      <td>
                          ${sale.amount}
                      </td>
                  </tr>`;
      })
                  
      html +=     `
                  <tr class="total">
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      
                      <td>
                         總合: ${invoice.amount}
                      </td>
                  </tr>
              </table>
          </div>
      </body>
      </html>
      `;

      //generate the pdf.
      cordova.plugins.pdf.fromData(html, options)
      .then(()=>{})
      .catch((err)=>console.error(err))
    })
  }

}
