import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { posts } from './post.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }
  createPost(data:posts[])
  {
    // console.log(this.signupForm.value)  ;
    this.http.post('https://practice-project-9f015-default-rtdb.firebaseio.com/posts.json',data).subscribe((res)=>{
      console.log("added successfully");
    })
  }
  fetchPost()
  {
 
      return this.http.get<{ [key: string]: posts }>('https://practice-project-9f015-default-rtdb.firebaseio.com/posts.json')
      .pipe(
        map((resData) => {
          const postsArray: posts[] = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              postsArray.push({ ...resData[key], id: key });
            }
          }
          return postsArray;  // Make sure to return the transformed data
        })
      )
    
  }
  deletePosts()
  {
    // console.log(this.signupForm.value)  ;
    return this.http.delete('https://practice-project-9f015-default-rtdb.firebaseio.com/posts.json')
  }
}
