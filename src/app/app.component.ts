import { Component, OnInit, ElementRef } from '@angular/core';
import { PostService } from './post.service';
import { Post } from './post';
import {  interval } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'app';
  posts: Post[];
  display = 'none';
  postJson = {};
  constructor(private postService: PostService, private _eref: ElementRef) {}
  ngOnInit() {
    this.postService.getPost().subscribe((posts) => {
      this.posts = posts;
    });
    interval(10000)
    .pipe(
        flatMap(() => this.postService.getPost())
    )
    .subscribe(posts => {
      this.posts = posts;
    });

  }

  showModal(post: Post) {
    this.display = 'block';
    this.postJson = JSON.stringify(post);
  }

  onSearchChange(searchBy: string) {
    this.posts =  this.posts.filter((post) => {
     return  post.title.startsWith(searchBy);
    });
  }

 closeModalDialog() {
  this.display = 'none'; // set none css after close dialog
 }


ClickedOut(event) {
  if (event.target.className === 'modal') {
    this.display = 'none';
  }
}
}

