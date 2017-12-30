import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OptionPage } from './option';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    OptionPage,
  ],
  imports: [
    IonicPageModule.forChild(OptionPage),
    TranslateModule.forChild()
  ],
})
export class OptionPageModule {}
