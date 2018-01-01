import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/withLatestFrom';
import * as firebase from 'firebase';

export interface Customer{ id: string, name: string, phone: string, notes: string };
export interface Sale{ id: string, customerid: string, date: any, invoicedate: any, creaetdate: any, address: string, unitprice: number, quantity: number, amount: number, options: string };
export interface Option{ id: string, name: string };
/*
  Generated class for the BrickDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BrickDataProvider {
  public customersCollection: AngularFirestoreCollection<Customer>;
  public customers$: Observable<Customer[]>;

  public salesCollection: AngularFirestoreCollection<Sale>;
  public sales$: Observable<Sale[]>;

  public optionsCollection: AngularFirestoreCollection<Option>;
  public options$: Observable<Option[]>;

  constructor(
    public http: HttpClient,
    public afs: AngularFirestore
  ) {
    // console.log('Hello BrickDataProvider Provider');
    this.customersCollection = afs.collection<Customer>('customers');
    this.customers$ = this.customersCollection.valueChanges().shareReplay(1);

    this.salesCollection = afs.collection<Sale>('sales');
    this.sales$ = this.salesCollection.valueChanges().shareReplay(1);

    this.optionsCollection = afs.collection<Option>('options');
    this.options$ = this.optionsCollection.valueChanges().shareReplay(1);
  }

  // addCustomer(name: string, phone?: string, notes?:string) {
  //   const id = this.afs.createId();
  //   const customer: Customer = { id, name, phone, notes };
  //   this.customersCollection.add(customer);
  // }

  getCustomer$(docId: string) {
    // console.log(docId);
    const customerDoc = this.afs.doc<Customer>(`customers/${docId}`);
    const customer$: Observable<Customer> = customerDoc.valueChanges();

    return customer$;
  }

  addCustomer(customer: Customer) {
    const id = this.afs.createId();
    customer.id = id;
    // this.customersCollection.add(customer);
    this.customersCollection.doc(id).set(customer);
  }

  updateCustomer(customer: Customer) {
    const customerDoc = this.customersCollection.doc(customer.id); //this.afs.doc<Customer>(`customers/${customer.id}`);
    customerDoc.update(customer);
  }

  getSale$(docId: string) {
    console.log(docId);
    const saleDoc = this.afs.doc<Sale>(`sales/${docId}`);
    const sale$: Observable<Sale> = saleDoc.valueChanges();

    return sale$;
  }

  addSale(sale: Sale) {
    const id = this.afs.createId();
    sale.id = id;
    const createdate = firebase.firestore.FieldValue.serverTimestamp();
    sale.creaetdate = createdate;
    // this.customersCollection.add(customer);
    this.salesCollection.doc(id).set(sale);
  }

  updateSale(sale: Sale) {
    const saleDoc = this.salesCollection.doc(sale.id);
    saleDoc.update(sale);
  }

  getOption$(docId: string) {
    console.log(docId);
    const optionDoc = this.afs.doc<Option>(`options/${docId}`);
    const option$: Observable<Option> = optionDoc.valueChanges();

    return option$;
  }

  addOption(option: Option) {
    const id = this.afs.createId();
    option.id = id;
    // this.customersCollection.add(customer);
    this.optionsCollection.doc(id).set(option);
  }

  updateOption(option: Option) {
    const optionDoc = this.optionsCollection.doc(option.id);
    optionDoc.update(option);
  }

  deleteOption(docId: string) {
    this.optionsCollection.doc(docId).delete();
  }

}
