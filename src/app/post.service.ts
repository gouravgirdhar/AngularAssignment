import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from './post';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) { }

  getPost (): Observable<Post[]> {
    return this.httpClient.get('https://hn.algolia.com/api/v1/search_by_date?tags=story')
    .pipe(map(data => {
      return data['hits'];
    }
      ));
  }
}
