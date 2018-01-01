import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SaleSearchPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'SaleSearchPipe',
})
export class SaleSearchPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, args?:any) {
    let searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter(sale => {
        if(sale.customername && sale.address) {
          return (sale.customername.search(searchText) !== -1 || sale.address.search(searchText) !== -1)
        } else if(sale.customername) {
          return sale.customername.search(searchText) !== -1
        } else {
          return true;
        }
      });
    }
  }
}
