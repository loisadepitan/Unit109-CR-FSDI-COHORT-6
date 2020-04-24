import { ShareService } from './../services/share.service';
import { DataService } from './../services/data.service';
import { Component } from '@angular/core';
import { Message } from '../models/message';
import { Friend } from '../models/friend';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  post: Message = new Message();
  myFriends: Friend[] = [];

  constructor(private sharedSrvc: ShareService, private dataSrvc: DataService) {
    this.dataSrvc.getAllFriends().subscribe(list => {
      console.log("all friends", list);
      this.myFriends = [];

      //filter friends obj that belongs to me
      //for(var i = 0; i< list.length; i++){
      // if(list[i].belongsTo == this.shared.userName){
      // this.myFriends.push(list[i]);
      // }
      //}

      this.myFriends = list.filter(f => f.belongsTo == this.sharedSrvc.userName);// filter function


    });
  }


  sendMessage() {
    this.post.from = this.sharedSrvc.userName;
    this.dataSrvc.saveMessage(this.post);
    this.post = new Message();
  }

}
