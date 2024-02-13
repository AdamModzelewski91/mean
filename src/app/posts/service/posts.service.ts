import { Injectable, OnInit, computed, effect, signal } from '@angular/core';
import { Post } from '../post.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  posts = signal<{posts: Post[], postCount: number}>({posts: [], postCount: 0});

  constructor(private http: HttpClient, private router: Router) { }

  getPosts(postsPerPage: number, currentPage: number): void{
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{message: string, posts: any, maxPosts: number}>('http://localhost:3000/posts' + queryParams)
      .pipe(
        map(postData => {
          return {
            posts: postData.posts.map((post: any) => {
              return {
                id: post._id,
                ...post
              }
            }),
            maxPosts: postData.maxPosts,
          }
        })
      ).subscribe(posts => this.posts.set({posts: posts.posts, postCount: posts.maxPosts}));
  }

  getPost(id: string | null) {
    return this.http.get<{_id: string, title: string, content: string}>("http://localhost:3000/posts/" + id);
  }

  addPost(post: Post) {
    this.http.post<{message: string, postId: string}>("http://localhost:3000/posts", post)
      .subscribe((resData) => {
        this.router.navigate(['/']);
      });
  }

  updatePost(post: Post) {
    this.http.put("http://localhost:3000/posts/"+ post.id, post)
      .subscribe(response => {
        this.router.navigate(['/']);
      })
  }

  deletePost(postId: string) {
    return this.http.delete("http://localhost:3000/posts/" + postId)
  }
}
