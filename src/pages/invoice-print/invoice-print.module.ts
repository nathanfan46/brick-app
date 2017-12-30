import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvoicePrintPage } from './invoice-print';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    InvoicePrintPage,
  ],
  imports: [
    IonicPageModule.forChild(InvoicePrintPage),
    TranslateModule.forChild()
  ],
})
export class InvoicePrintPageModule {}
