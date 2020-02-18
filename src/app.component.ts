import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

import { Item } from './assets/model/item.schema';
import { AppService } from './app.service';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public readonly title = 'todo app';
  itemList: Item[];
  currentId: number;

  constructor(private appservice: AppService) {}

  ngOnInit(): void {
    console.log('component initialized');
    this.appservice.getItems().subscribe((items: Item[]) => (this.itemList = items));
  }

  addItem(): void {
    let item = new Item();
    item.name = 'Item ' + this.itemList.length;
    this.appservice.addItem(item).subscribe((items: Item[]) => (this.itemList = items));
  }

  deleteItem(): void {
    const item = this.itemList[this.itemList.length - 1];
    this.appservice.deleteItem(item).subscribe((items: Item[]) => (this.itemList = items));
  }

  todoSubmit(value: { todo: string; }) {
    if (value.todo  ) {
      // update database with new element
      let elem = new Item();
      elem.name = value.todo;
      elem.finished = false;
      this.itemList.push(elem);

      // this.appservice.addItem(elem).subscribe((items) => (this.todoArray = items));
    } else {
      alert('Field required **');
    }
    console.log(this.itemList);
  }

  removeItem(todo: Item) {
    for (let i = 0; i < this.itemList.length ; i++) {
      if (todo === this.itemList[i]) {
        this.itemList.splice(i, 1);
        // this.appservice.deleteItem(this.todoArray[i]).subscribe((items) => (this.todoArray = items));
      }
    }
  }

  toggleCheck(todo: Item) {
    // change finished value in element
    // for (let i = 0; i < this.itemList.length ; i++) {
    for (const i in this.itemList) {
      if (todo === this.itemList[i]) {
        this.itemList[i].finished = !todo.finished;
      }
    }
    console.log(this.itemList);
  }

}

