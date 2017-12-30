import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Option, BrickDataProvider } from '../../providers/brick-data/brick-data';

/**
 * Generated class for the OptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-option',
  templateUrl: 'option.html',
})
export class OptionPage {
  public newOptions: Array<Option> = [];

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public brickData: BrickDataProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OptionPage');
  }

  addOption() {
    let option = { name: '' } as Option;
    this.newOptions.push(option);
  }

  saveOption(option: Option) {
    this.brickData.addOption(option);
    for(let i = 0; i < this.newOptions.length; i++) {
      if(option === this.newOptions[i]) {
        this.newOptions.splice(i, 1);
      }
    }
  }

  deleteOption(docId: string) {
    this.brickData.deleteOption(docId);
  }

}
