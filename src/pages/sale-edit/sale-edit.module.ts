import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaleEditPage } from './sale-edit';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SaleEditPage,
  ],
  imports: [
    IonicPageModule.forChild(SaleEditPage),
    TranslateModule.forChild()
  ],
})
export class SaleEditPageModule {}
