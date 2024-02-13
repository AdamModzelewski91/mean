import { Component, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';
import { PostsService } from '../service/posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatCardModule, MatButtonModule, NgIf, MatProgressSpinnerModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss'
})
export class PostCreateComponent implements OnInit{
  private mode = signal<string>('create') ;

  private postId = signal<string | null>(null);

  post = signal<Post | undefined>(undefined);

  isLoading = signal(false);

  constructor(private postsService: PostsService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode.set('edit');
        this.postId.set(paramMap.get('postId'));
        this.isLoading.set(true);
        this.postsService.getPost(this.postId()).subscribe(postData => {
          this.isLoading.set(false);
          this.post.set({
            id: postData._id,
            ...postData
          })
        })
      } else {
        this.mode.set('create');
        this.postId.set(null);
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) return;

    this.isLoading.set(true);
    if (this.mode() === 'create') {
      this.postsService.addPost({
        id: '',
        title: form.value.title,
        content: form.value.content,
      })
    } else {
      this.postsService.updatePost({
        id: this.postId() || '',
        title: form.value.title,
        content: form.value.content,
      })
    }
    form.resetForm();
  }
}

