import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { posts } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-reactive-form1',
  templateUrl: './reactive-form1.component.html',
  styleUrl: './reactive-form1.component.css'
})
export class ReactiveForm1Component {
  signupForm!:FormGroup;
  genders=['Male','Female']
  loadedPosts:posts[]=[];
  isFetching:boolean=false;
  constructor(private http:HttpClient,private postservice:PostService){}
  ngOnInit()
  {
    this.signupForm=new FormGroup({
      'username':new FormControl(null,Validators.required),
      'email':new FormControl(null,[Validators.required,Validators.email]),
      'gender':new FormControl('Male'),
      'hobbies':new FormArray([])
    })
    this.isFetching=true;
    this.postservice.fetchPost().subscribe(posts => {
      this.isFetching=false;
      console.log(posts);
      this.loadedPosts = posts
    });
  }
  onSubmit()
  {
    // console.log(this.signupForm.value)  ;
    // this.http.post('https://practice-project-9f015-default-rtdb.firebaseio.com/posts.json',this.signupForm.value).subscribe((res)=>{
    //   console.log("added successfully");
      this.postservice.createPost(this.signupForm.value)
    // })
  }
  onAddHobbies()
  {
    const control = new FormControl(null,Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }
  onPageLoad()
  {
    this.isFetching=true;
    this.postservice.fetchPost().subscribe(posts => {
      this.isFetching=false;
      console.log(posts);
      this.loadedPosts = posts
    });
  }
  clearPosts()
  {
      this.postservice.deletePosts().subscribe(()=>{
        this.loadedPosts=[]
      })
  }
  
  }

