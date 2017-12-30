import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerPage } from './customer';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CustomerPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerPage),
    TranslateModule.forChild()
  ],
})
export class CustomerPageModule {}
