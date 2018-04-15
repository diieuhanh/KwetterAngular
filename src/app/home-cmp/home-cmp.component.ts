import { Component, OnInit } from '@angular/core'
import { Subject } from 'rxjs/Subject';
import { FormControl,
    FormGroup,
    FormBuilder } from '@angular/forms';
import 'rxjs/Rx';
    
import{tweet} from '../domain/tweet';
import{account} from '../domain/account';
import {Http,Response,Headers} from '@angular/http';
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-home-cmp',
  templateUrl: './home-cmp.component.html',
  styleUrls: ['./home-cmp.component.css']
})
export class HomeCmpComponent implements OnInit {

  name:String;
  location:String;;
  web:String;;
  bio:String;
  photo:String;

  tweets: tweet[];
  following:account[];
  followers:account[];

 activeAccount: string;
  apiRoot:string = 'http://localhost:25333/KwetterApplicatie/api/';
  title="kwetter";

  constructor(private http: Http,private router:Router) {
    
  }

  ngOnInit() {
     if(localStorage.getItem("account") && localStorage.getItem("jwt")){
        this.name = localStorage.getItem("account")
    this.getProfileInfo();
    this.getFollowing();
    this.getFollowers();
    this.getAllTweets()
     }

  }

  doSearch(term:string) {
    if(localStorage.getItem("account") && localStorage.getItem("jwt")) {
      var headers = new Headers();
      headers.set('jwt', localStorage.getItem('jwt'))
    
        let promise = new Promise((resolve, reject) => {
          let apiURL = `${this.apiRoot}tweet/search/${term}`;
          this.http.get(apiURL, {headers: headers})
              .toPromise()
              .then(
                  res => { // Success
                    this.tweets = res.json()
                    resolve();
                  },
                  msg => { // Error
                    reject(msg);
                  }
              );
        });
    }
  }

  public getAllTweets() {
    if(localStorage.getItem("account") && localStorage.getItem("jwt")) {
      this.activeAccount = localStorage.getItem("account");

      var headers = new Headers();
      headers.set('jwt', localStorage.getItem('jwt'))

      this.http.get(this.apiRoot + 'tweet/', {headers: headers})
      .map((res: Response) => res.json())
      .subscribe(x => this.tweets = x);
    }
  }
    onLogout() {
        localStorage.removeItem('account');
        this.router.navigate(['/kwetter-cmp']);
  }
getProfileInfo(){
  if(localStorage.getItem("account") && localStorage.getItem("jwt")) {
        var headers = new Headers();
        headers.set('jwt', localStorage.getItem('jwt'))
      
        let apiURL = `${this.apiRoot}account/${this.name}`;
        this.http.get(apiURL, {headers: headers})
        .subscribe((res : Response) =>{
          const account = res.json();
          console.log(res.json());
          this.name = account.name;
          this.location = account.location;
          this.web = account.web;
          this.bio = account.bio;
          this.photo= account.photo;
          this.tweets= account.tweetCollection;
        
        });
      }
  }
    getFollowing(){
    if(localStorage.getItem("account") && localStorage.getItem("jwt")) {
        var headers = new Headers();
        headers.set('jwt', localStorage.getItem('jwt'))
      
        let apiURL = `${this.apiRoot}account/following/${this.name}`;
        this.http.get(apiURL, {headers: headers})
        .subscribe((res : Response) =>{
          console.log(res.json());
          this.following=res.json();
          
        });
      }
    }
      getFollowers(){
    if(localStorage.getItem("account") && localStorage.getItem("jwt")) {
        var headers = new Headers();
        headers.set('jwt', localStorage.getItem('jwt'))
      
        let apiURL = `${this.apiRoot}account/followers/${this.name}`;
        this.http.get(apiURL, {headers: headers})
        .subscribe((res : Response) =>{
          console.log(res.json());
          this.followers=res.json();
          
        });
      }
  }

}