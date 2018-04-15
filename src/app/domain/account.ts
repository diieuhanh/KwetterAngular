import { tweet } from "./tweet";

export class account {
    public name: string;
    public bio: string;
    public city: string;
    public web: string;
    public password: string;
    public photo: string;
    public followers: string[];
    public following: string[];
    public tweets: tweet[];
    public authToken: string;
    
    constructor(name: string, city: string, web: string, bio: string, photo:string, followers: string[], following: string[], tweets: tweet[])
    {
        this.name = name;
        this.city = city;
        this.web = web;
        this.bio = bio;
        this.photo=photo;
        this.followers = followers;
        this.following = following;
        this.tweets = tweets;
    }

    public setToken(authToken: string) {
        this.authToken = authToken;
    }
}