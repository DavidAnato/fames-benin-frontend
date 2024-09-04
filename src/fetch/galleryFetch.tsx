import { apiRequest } from '../utils/api';

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface Album {
  id: number;
  title: string;
  description: string;
  created_at: Date;
  cover_image: string;
  images: GalleryImage[];
  tags: GalleryTag[];
}

export interface GalleryImage {
  id: number;
  title: string;
  description: string;
  image: string;
  created_at: Date;
  tags: GalleryTag[];
}

export interface GalleryTag {
  id: number;
  name: string;
}

export interface Comment {
  id: number;
  album_id: number;
  text: string;
  created_at: Date;
}

export interface Like {
  id: number;
  album_id: number;
  user_id: number;
}

export const fetchAlbumList = async (): Promise<Album[]> => {
  try {
    const response = await apiRequest({
      method: 'get',
      url:'galleries/albums/',
    });
    return response.data as Album[];
  } catch (error) {
    console.error('Failed to fetch album list:', error);
    throw error;
  }
};

export const fetchAlbumDetail = async (id: number): Promise<Album> => {
  try {
    const response = await apiRequest({
      method: 'get',
      url: `galleries/albums/${id}/`,
    });
    return response.data as Album;
  } catch (error) {
    console.error(`Failed to fetch album detail for id ${id}:`, error);
    throw error;
  }
};

export const fetchCommentList = async (albumId: number, pageUrl: string | null = null): Promise<PaginatedResponse<Comment>> => {
  try {
    const response = await apiRequest({
      method: 'get',
      url: pageUrl || `galleries/albums/${albumId}/comments/`,
    });
    return response.data as PaginatedResponse<Comment>;
  } catch (error) {
    console.error(`Failed to fetch comment list for album id ${albumId}:`, error);
    throw error;
  }
};

export const fetchCommentDetail = async (id: number): Promise<Comment> => {
  try {
    const response = await apiRequest({
      method: 'get',
      url: `galleries/comments/${id}/`,
    });
    return response.data as Comment;
  } catch (error) {
    console.error(`Failed to fetch comment detail for id ${id}:`, error);
    throw error;
  }
};

export const createLike = async (albumId: number, userId: number): Promise<Like> => {
  try {
    const response = await apiRequest({
      method: 'post',
      url: 'galleries/likes/',
      data: {
        album_id: albumId,
        user_id: userId,
      },
    });
    return response.data as Like;
  } catch (error) {
    console.error('Failed to create like:', error);
    throw error;
  }
};

export const fetchImageList = async (pageUrl: string | null = null, albumId?: string): Promise<PaginatedResponse<GalleryImage>> => {
  try {
    const response = await apiRequest({
      method: 'get',
      url: pageUrl || (albumId ? `galleries/albums/${albumId}/images/` : 'galleries/images/'),
    });
    return response.data as PaginatedResponse<GalleryImage>;
  } catch (error) {
    console.error('Failed to fetch image list:', error);
    throw error;
  }
};