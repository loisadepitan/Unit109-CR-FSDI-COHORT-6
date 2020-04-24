import { Message } from './../models/message';
import { Component } from '@angular/core';

import { DataService } from '../services/data.service';

import { ShareService } from '../services/share.service';
import { Friend } from '../models/friend';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  myFriends: Friend[] = [];
  allMessages: Message[] = [];
  friendFilter = "Everyone";
  constructor(private data: DataService, public shared: ShareService) {
    // get data
    data.getAllMessages().subscribe(list => {
      console.log("messages", list);
      this.allMessages = list.filter(m => m.to == "Everyone"
        || m.to == shared.userName
        || m.from == shared.userName);
    });
    data.getAllFriends().subscribe(list => {
      this.myFriends = list.filter(f => f.belongsTo == shared.userName);
    });

  }
  getMessagesToDisplay() {
    if (this.friendFilter == "Everyone") return this.allMessages;

    return this.allMessages.filter(m => m.from == this.friendFilter
      || (m.from == this.shared.userName && m.to == this.friendFilter));
  }
}