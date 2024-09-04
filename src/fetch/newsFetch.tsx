import { apiRequest } from '../utils/api';

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface NewsPost {
    slug: string;
    id: number;
    title: string;
    content: string;
    category: NewsCategory;
    tags: NewsTag[];
    created_at: Date;
    image: string;
    author: {
        profile_picture: any;
        picture_url: any;
        first_name: any;
        last_name: any;
    };
    likes_count: number;
    comments_count : number;
}

export interface NewsCategory {
    id: number;
    name: string;
}

export interface NewsTag {
    id: number;
    name: string;
}

export interface Comment {
    id: number;
    post: string;
  author: {
      id: number;
      profile_picture: any;
      picture_url: any;
      first_name: any;
      last_name: any;
  };
  content: string;
  created_at: string;
}

export const fetchNewsPosts = async (pageUrl: string | null = null): Promise<PaginatedResponse<NewsPost>> => {
  try {
    const response = await apiRequest({
      method: 'get',
      url: pageUrl || 'news/posts/',
    });
    return response.data as PaginatedResponse<NewsPost>;
  } catch (error) {
    console.error('Failed to fetch news posts:', error);
    throw error;
  }
};

export const fetchNewsPostDetail = async (slug: string): Promise<NewsPost> => {
  try {
    const response = await apiRequest({
      method: 'get',
      url: `news/posts/${slug}`,
    });
    return response.data as NewsPost;
  } catch (error) {
    console.error(`Failed to fetch news post detail for slug ${slug}:`, error);
    throw error;
  }
};

export const fetchNewsCategories = async (): Promise<NewsCategory[]> => {
  try {
    const response = await apiRequest({
      method: 'get',
      url: 'news/categories/',
    });
    return response.data as NewsCategory[];
  } catch (error) {
    console.error('Failed to fetch news categories:', error);
    throw error;
  }
};

export const fetchNewsTags = async (): Promise<NewsTag[]> => {
  try {
    const response = await apiRequest({
      method: 'get',
      url: 'news/tags/',
    });
    return response.data as NewsTag[];
  } catch (error) {
    console.error('Failed to fetch news tags:', error);
    throw error;
  }
};

export const fetchNewsPostsByCategory = async (category: string, pageUrl: string | null = null): Promise<PaginatedResponse<NewsPost>> => {
  try {
    const response = await apiRequest({
      method: 'get',
      url: pageUrl || `news/posts/by-category/${category}`,
    });
    return response.data as PaginatedResponse<NewsPost>;
  } catch (error) {
    console.error(`Failed to fetch news posts for category ${category}:`, error);
    throw error;
  }
};

export const fetchNewsPostsByTag = async (tag: string, pageUrl: string | null = null): Promise<PaginatedResponse<NewsPost>> => {
  try {
    const response = await apiRequest({
      method: 'get',
      url: pageUrl || `news/posts/by-tag/${tag}`,
    });
    return response.data as PaginatedResponse<NewsPost>;
  } catch (error) {
    console.error(`Failed to fetch news posts for tag ${tag}:`, error);
    throw error;
  }
};

export const fetchCommentsByPostId = async (postId: string): Promise<Comment[]> => {
  try {
    const response = await apiRequest({
      method: 'get',
      url: `news/posts/${postId}/comments/`,
    });
    return response.data as Comment[];
  } catch (error) {
    console.error(`Failed to fetch comments for post ${postId}:`, error);
    throw error;
  }
};

export const createCommentForPost = async (commentData: { post: string; author: string; content: string }): Promise<Comment> => {
  try {
    const response = await apiRequest({
      method: 'post',
      url: `news/posts/comments/create/`,
      data: {
        post: commentData.post,
        author: commentData.author,
        content: commentData.content,
      },
    });
    return response.data as Comment;
  } catch (error) {
    console.error(`Failed to create comment for post ${commentData.post}:`, error);
    throw error;
  }
};

export const deleteComment = async (commentId: number): Promise<void> => {
  try {
    await apiRequest({
      method: 'delete',
      url: `news/posts/comments/${commentId}/`,
    });
  } catch (error) {
    console.error(`Failed to delete comment with id ${commentId}:`, error);
    throw error;
  }
};

export const likePost = async (likeData: { user: string; post: string }): Promise<void> => {
  try {
    await apiRequest({
      method: 'post',
      url: `news/posts/likes/posts/`,
      data: {
        user: likeData.user,
        post: likeData.post,
      },
    });
  } catch (error) {
    console.error(`Failed to like post ${likeData.post} by user ${likeData.user}:`, error);
    throw error;
  }
};

export const userLikedPost = async (userId: number, postId: number): Promise<boolean> => {
  try {
    const response = await apiRequest({
      method: 'get',
      url: `news/posts/likes/${userId}/${postId}/`,
    });
    return response.data.has_liked;
  } catch (error) {
    console.error(`Failed to check if user ${userId} liked post ${postId}:`, error);
    throw error;
  }
};
