import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

// import { AboutPage } from '../about/about';
// import { ContactPage } from '../contact/contact';
// import { HomePage } from '../home/home';

// import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = "InvoicePage";
  tab2Root = "SalePage";
  tab3Root = "OptionPage";
  tab4Root = "CustomerPage";

  constructor() {
    // translate.setDefaultLang('en');
    // translate.use('en')
  }
}
