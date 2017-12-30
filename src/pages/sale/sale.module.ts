import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalePage } from './sale';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SalePage,
  ],
  imports: [
    IonicPageModule.forChild(SalePage),
    TranslateModule.forChild()
  ],
})
export class SalePageModule {}
