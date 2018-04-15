import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Http,Response,Headers} from '@angular/http';
import{tweet} from '../domain/tweet';
import{account} from '../domain/account';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  name:String;
  location:String;;
  web:String;;
  bio:String;
  photo:String;

  tweets: tweet[];
  following:account[];
  followers:account[];

  title:String;
  activeAccount: string;
  apiRoot:string = 'http://localhost:25333/KwetterApplicatie/api/';
  constructor(private http:Http,private router:Router) { }

  ngOnInit() {
    this.title = localStorage.getItem("account");
    this.getProfileInfo();
    this.getFollowing();
    this.getFollowers();
  }
    onLogout() {
        localStorage.removeItem('account');
        this.router.navigate(['/kwetter-cmp']);
  }

  getProfileInfo(){
  if(localStorage.getItem("account") && localStorage.getItem("jwt")) {
        var headers = new Headers();
        headers.set('jwt', localStorage.getItem('jwt'))
      
        let apiURL = `${this.apiRoot}account/${this.title}`;
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
      
        let apiURL = `${this.apiRoot}account/following/${this.title}`;
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
      
        let apiURL = `${this.apiRoot}account/followers/${this.title}`;
        this.http.get(apiURL, {headers: headers})
        .subscribe((res : Response) =>{
          console.log(res.json());
          this.followers=res.json();
          
        });
      }
  }

}
