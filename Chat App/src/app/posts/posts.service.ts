import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { Subject, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/posts/';

@Injectable({providedIn: 'root'})
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<{posts: Post[], postsCount: number}>();

    constructor(private http: HttpClient, private router: Router) {}

    getPosts(postsPerPage?: number, currentPage?: number) {
        const queryParms = `?pagesize=${postsPerPage}&page=${currentPage}`;
        this.http
            .get<{message: string, posts: any, maxPosts: number}>(BACKEND_URL + queryParms)
            .pipe(map(data => {
                return {
                    posts: data.posts.map(post => {
                        console.log(post);
                        return {
                            id: post._id,
                            title: post.title,
                            content: post.content,
                            imagePath: post.imagePath,
                            creator: post.creator
                        };
                    }),
                    maxPosts: data.maxPosts
                };
            }))
            .subscribe(transformedPostData => {
                this.posts = transformedPostData.posts;
                this.postsUpdated.next({posts: [...this.posts], postsCount: transformedPostData.maxPosts});
            });
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    getPost(id: string) {
        return this.http.get<{
            _id: string,
            title: string,
            content: string,
            imagePath: string,
            creator: string
        }>(BACKEND_URL + id);
    }

    addPost(title: string, content: string, image: File) {
        const postData = new FormData();
        postData.append('title', title);
        postData.append('content', content);
        postData.append('image', image, title);
        this.http.post<{message: string, post: Post}>(BACKEND_URL, postData)
            .subscribe(res => {
                // console.log('res', res);
                // const post: Post = {id: res.post.id, title, content, imagePath: res.post.imagePath};
                // this.posts.push(post);
                // console.log(post);
                // this.postsUpdated.next([...this.posts]);
                this.router.navigate(['/']);
            });
    }

    updatePost(id: string, title: string, content: string, image: File | string) {
        // const post: Post = { id, title, content, imagePath: image };
        let postData: any;
        if (typeof image === 'string') {
            postData = {id, title, content, imagePath: image};
        } else {
            postData = new FormData();
            postData.append('id', id);
            postData.append('title', title);
            postData.append('content', content);
            postData.append('image', image, title);
        }

        this.http.put(BACKEND_URL + id, postData)
            .subscribe(res => {
                // const updatedPosts = [...this.posts];
                // const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
                // const post: Post = {
                //     id,
                //     title,
                //     content,
                //     imagePath: ''
                //   };
                // updatedPosts[oldPostIndex] = post;
                // this.posts = updatedPosts;
                // this.postsUpdated.next([...this.posts]);
                this.router.navigate(['/']);
            });
    }

    deletePost(id: string) {
        return this.http.delete(BACKEND_URL + id);
            // .subscribe(() => {
            //     const updatedPosts = this.posts.filter(post => post.id !== id);
            //     this.posts = updatedPosts;
            //     this.postsUpdated.next([...this.posts]);
            // });
    }
}

