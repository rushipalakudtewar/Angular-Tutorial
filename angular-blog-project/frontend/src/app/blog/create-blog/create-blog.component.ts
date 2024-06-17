import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogService } from '../services/blog.service';
import { BlogListComponent } from '../blog-list/blog-list.component';
import { AlertService } from '../../shared/alert.service';

@Component({
  selector: 'app-create-blog',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent {

  @Input() selectedBlog: any = {};
  createBlogForm!: FormGroup;
  isEditOption: boolean = false;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private blogService: BlogService, private bloglist: BlogListComponent,private alertService:AlertService) {
    this.createBlogForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      tags: this.fb.array([this.fb.control('', Validators.required)])
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedBlog']) {
      this.patchFormValues();
    }
  }

  private patchFormValues(): void {
    this.createBlogForm.patchValue({
      title: this.selectedBlog?.title || '',
      content: this.selectedBlog?.content || ''
    });

    const tagsArray = this.createBlogForm.get('tags') as FormArray;
    while (tagsArray.length !== 0) {
      tagsArray.removeAt(0);
    }

    if (this.selectedBlog?.tags) {
      this.selectedBlog.tags.forEach((tag: string) => {
        tagsArray.push(this.fb.control(tag, Validators.required));
      });
    } else {
      this.addTag();
    }

    this.isEditOption = !!this.selectedBlog?._id;
  }

  get tags(): FormArray {
    return this.createBlogForm.get('tags') as FormArray;
  }

  addTag(): void {
    this.tags.push(this.fb.control('', Validators.required));
  }

  removeTag(index: number): void {
    this.tags.removeAt(index);
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  createdBlog() {
    if (this.createBlogForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('title', this.createBlogForm.get('title')?.value);
    formData.append('content', this.createBlogForm.get('content')?.value);
    formData.append('tags', JSON.stringify(this.createBlogForm.get('tags')?.value));

    if (this.selectedFile) {
      formData.append('blogimage', this.selectedFile, this.selectedFile.name);
    }

    if (this.isEditOption) {
      this.blogService.updateBlog(this.selectedBlog._id, formData).subscribe({
        next: (res: any) => {
          this.alertService.showSuccess(res.message);
          this.bloglist.getBlogs();
        },
        error: (err: any) => {
          this.alertService.showSuccess(err.error.message);

        }
      });
    } else {
      this.blogService.createBlog(formData).subscribe({
        next: (res: any) => {
          this.alertService.showSuccess(res.message);
          this.bloglist.getBlogs();
          this.resetForm();
        },
        error: (err: any) => {
          this.alertService.showError(err.error.message);
        }
      });
    }
  }

  resetForm(): void {
    this.createBlogForm.reset();
    const tagsArray = this.createBlogForm.get('tags') as FormArray;
    while (tagsArray.length !== 0) {
      tagsArray.removeAt(0);
    }
    tagsArray.push(this.fb.control('', Validators.required));
    this.selectedFile = null;
    this.isEditOption = false;
  }
}
