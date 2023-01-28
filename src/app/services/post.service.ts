import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url = 'https://jsonplaceholder.typicode.com/posts';


  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get(this.url).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  createPost(post: any) {
    return this.http.post(this.url, JSON.stringify(post))
  }

  updatePost(post: any) {
    return this.http.put(this.url + '/' + post.id, JSON.stringify(post));
  }

  deletePost(post: any) {
    return this.http.delete(this.url + '/' + post.id).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      //client side error
      console.error('client error:', error.error.message);
    } else {
      // backend error
      console.error(`backend error: status code: ${error.status} error: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

}
