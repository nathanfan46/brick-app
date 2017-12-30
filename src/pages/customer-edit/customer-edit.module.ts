import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerEditPage } from './customer-edit';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CustomerEditPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerEditPage),
    TranslateModule.forChild()
  ],
})
export class CustomerEditPageModule {}
