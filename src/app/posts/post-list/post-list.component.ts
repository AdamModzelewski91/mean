import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component,  OnInit, computed, signal } from '@angular/core';

import { MatExpansionModule } from '@angular/material/expansion';
import { PostsService } from '../service/posts.service';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    MatExpansionModule,
    NgFor,
    NgIf,
    MatButtonModule,
    CommonModule,
    RouterLink,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})

export class PostListComponent implements OnInit{
  posts = computed(() => this.postsService.posts());

  totalPosts = computed(() => this.postsService.posts().postCount);

  isLoading = signal(false);

  postsPerPage = signal(2);

  currentPage = signal(0);

  pageSizeOptions = signal([1,2,5,10])

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.postsService.getPosts(this.postsPerPage(), this.currentPage() + 1)
  }

  onDelete(id: string) {
    this.postsService.deletePost(id).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage(), this.currentPage() + 1);
    });
  }

  onChangedPage(pageData: PageEvent) {
    this.postsPerPage.set(pageData.pageSize);
    this.currentPage.set(pageData.pageIndex)
    this.postsService.getPosts(this.postsPerPage(), this.currentPage() + 1)
  }
}
