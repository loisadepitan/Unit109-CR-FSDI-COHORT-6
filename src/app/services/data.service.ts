import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { Observable } from 'rxjs';
import {
AngularFirestoreCollection,
AngularFirestore
} from "angularfire2/firestore";
import { map } from "rxjs/operators";
import { firestore } from "firebase";
import { Friend } from '../models/friend';

@Injectable({
providedIn: 'root'
})
export class DataService {

messages: Observable<Message[]>;
messageCollection : AngularFirestoreCollection<Message>; // pipeline to Firebase collection (table)

friends: Observable<Friend[]>;
friendsCollection:AngularFirestoreCollection<Friend>; // pipeline to Firebase collection



constructor(private fb: AngularFirestore) { // fb is a variable name
this.messageCollection = fb.collection<Message>("posts"); // open the pipeline
this.friendsCollection = fb.collection<Friend>("friends");//open the pipeline
}

public saveMessage(message: Message){
var item = Object.assign({}, message);
//console.log("Saving", message);
this.messageCollection.add(item);

}

retrieveMessagesFromDB(){
this.messages = this.messageCollection.valueChanges();
}
public getAllMessages(){
this.retrieveMessagesFromDB(); // fill the array
return this.messages; // return the observable array
}
public saveFriend(friend: Friend){
var item = Object.assign({}, friend);
this.friendsCollection.add(item);
}
public retrieveFriendsFromDB(){
this.friends = this.friendsCollection.valueChanges();
}
public getAllFriends(){
this.retrieveFriendsFromDB();
return this.friends;
}

}