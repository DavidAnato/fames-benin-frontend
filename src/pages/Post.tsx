import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { fetchNewsPostDetail, fetchNewsPosts, fetchCommentsByPostId, createCommentForPost, deleteComment, likePost, userLikedPost, NewsPost, Comment } from '../fetch/newsFetch';
import useAuthStore from '../store/authStore';
import WebPushMessage from '../components/authComponents/message';
import AnimatedElement from '../function/AnimatedElement';
import parse from 'html-react-parser';
import { useTranslation } from 'react-i18next';

const BASE_URL = process.env.API_URL;
const Post: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<NewsPost | null>(null);
  const [recentArticles, setRecentArticles] = useState<NewsPost[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [commentsLoading, setCommentsLoading] = useState<boolean>(false);
  const [commentsError, setCommentsError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState<string>('');
  const { user } = useAuthStore();
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const { t } = useTranslation(); // Utiliser le hook pour accéder aux fonctions de traduction

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const elementId = hash.substring(1);
      const element = document.getElementById(elementId);
      if (element) {
        const yOffset = -70;
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [postResponse, recentArticlesResponse] = await Promise.all([
          fetchNewsPostDetail(slug || ''),
          fetchNewsPosts(),
        ]);

        setPost(postResponse);
        const filteredResults = recentArticlesResponse.results.filter(article => article.slug !== slug);
        setRecentArticles(filteredResults.slice(0, 2));
      } catch (err) {
        setError('Failed to fetch post or recent articles');
        setTimeout(() => setError(null), 10000); // Clear error after 10 seconds
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  useEffect(() => {
    const fetchComments = async () => {
      if (commentsLoading) return;  // Prevent double fetch
      try {
        if (post) {
          setCommentsLoading(true);
          const results = await fetchCommentsByPostId(post.id.toString());
          setComments(results);
        }
      } catch (err) {
        setCommentsError('Failed to fetch comments');
        setTimeout(() => setCommentsError(null), 10000); // Clear comments error after 10 seconds
      } finally {
        setCommentsLoading(false);
      }
    };

    if (post) {
      setComments([]); // Reset comments when post changes
      fetchComments();
    }
  }, [post]);

  useEffect(() => {
    const checkIfUserLikedPost = async () => {
      if (post && user) {
        try {
          const liked = await userLikedPost(user.id, post.id);
          setHasLiked(liked);
          console.log("User liked status:", liked); // Ajoutez ce console.log pour vérifier
        } catch (error) {
          console.error('Failed to check if user liked post:', error);
        }
      }
    };

    checkIfUserLikedPost();
  }, [post, user]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    if (!newComment.trim()) return;

    try {
      const commentData = {
        post: post!.id.toString(),
        author: user.id,
        content: newComment,
      };
      const createdComment = await createCommentForPost(commentData);
      setComments(prevComments => [{ 
        ...createdComment, 
        author: { 
          ...createdComment.author, 
          id: user.id,
          last_name: user.last_name, 
          first_name: user.first_name 
        } 
      }, ...prevComments]);
      setNewComment('');
    } catch (error) {
      console.error('Failed to create comment:', error);
    }
  };

  const handleCommentDelete = async (commentId: number) => {
    try {
      await deleteComment(commentId);
      setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };

  const handleLikePost = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (hasLiked) return;

    setHasLiked(true);
    try {
      await likePost({ user: user.id, post: post!.id.toString() });
      setPost(prevPost => prevPost ? { ...prevPost, likes_count: prevPost.likes_count + 1 } : prevPost);
    } catch (error) {
      console.error('Failed to like post:', error);
      setHasLiked(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
  if (error) return <WebPushMessage msg={error} type='error'></WebPushMessage>
  if (!post) {
    return (
      <div className="flex items-center justify-center h-screen">
        <AnimatedElement>
          <span className="text-center py-4 text-red-500">Post not found</span>
        </AnimatedElement>
      </div>
    );
  }
  // const { t } = useTranslation(); // Utiliser le hook pour accéder aux fonctions de traduction

  return (
    <AnimatedElement>
      <div className="px-8 py-10 pt-[9rem] lg:flex grid gap-32">
        <aside className="hidden lg:block w-1/4 pr-10 sticky self-start top-[8em]">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{t("RecentArticles")}</h2>
          <div className="space-y-4 overflow-y-auto h-[70vh]">
            {recentArticles.map((article, index) => (
              <Link to={`/news/${article.slug}`} key={article.id || `article-${index}`} className="card hover:bg-base-200 border transition-colors pt-4">
                <figure className="w-full overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                </figure>
                <div className="card-body p-4">
                  <h3 className="card-title text-lg ">{article.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </aside>
        <div className="w-full lg:w-2/4">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{post.title}</h1>
          <span className="inline-block bg-success text-white text-sm font-medium px-3 py-1 rounded-full items-center gap-1">
            <i className="fas fa-tag mr-2"></i>
            {post.category.name}
          </span>
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-auto rounded-lg shadow-lg my-4"
          />

          {/* Post Meta Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {post.author.profile_picture ? (
                  <img
                    src={`${BASE_URL}${post.author.profile_picture}`}
                    alt={post.author.first_name}
                    className="w-10 h-10 rounded-full mr-2"
                  />
                ) : post.author.picture_url ? (
                  <img
                    src={post.author.picture_url}
                    alt={post.author.first_name}
                    className="w-10 h-10 rounded-full mr-2"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-2 flex items-center justify-center">
                    <i className="fas fa-user text-gray-400"></i>
                  </div>
                )}
                <span>{post.author.first_name} {post.author.last_name}</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-calendar-alt text-gray-400"></i>
                <span>{new Date(post.created_at).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button onClick={handleLikePost} className={`btn rounded-xl bg-transparent hover:bg-transparent border-none shadow-none ${hasLiked ? 'text-accent' : 'text-info hover:scale-150 hover:rotate-12'}`}>
                  <i className="fas fa-thumbs-up text-2xl"></i>
                </button>
                <span>
                  {post.likes_count === 0 ? t('NoLikes') : post.likes_count === 1 ? t('OneLike') : `${post.likes_count} ${t('Likes')}`}</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-comments text-gray-400"></i>
                <span>
  {post.comments_count === 0 
    ? t('NoComments') 
    : post.comments_count === 1 
      ? t('OneComment') 
      : `${post.comments_count} ${t('Comments')}`}
</span>
              </div>
            </div>
          </div>

          <p
            className="text-gray-800 text-justify"
          >
            {parse(post.content)}
          </p>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{t("Tags")}</h2>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-block bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1"
                >
                  <i className="fas fa-hashtag text-gray-600"></i>
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        </div>
        <aside className="lg:w-1/4 w-full pl-4 lg:sticky self-start top-[8em] ">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{t("Comments")}</h2>
          <form onSubmit={handleCommentSubmit} className="my-4 text-end">
            <textarea
              className="textarea textarea-bordered w-full"
              rows={2}
              placeholder={t('addComment')}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-accent px-4 py-2  rounded-lg"
            >
        {t('addCommentButton')} {/* Utilisez aussi la traduction ici */}
        </button>
          </form>
          <div className="space-y-4 lg:overflow-y-auto lg:h-[70vh]">
            {comments.map((comment, index) => (
              <div key={comment.id || `comment-${index}`} className="p-4 bg-gray-100 rounded-xl shadow">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-2 flex items-center justify-center">
                    {comment.author.profile_picture ? (
                      <img
                        src={`${BASE_URL}${comment.author.profile_picture}`}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : comment.author.picture_url ? (
                      <img
                        src={comment.author.picture_url}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <i className="fas fa-user text-gray-400"></i>
                    )}
                  </div>
                  <span className="font-semibold">{comment.author.first_name} {comment.author.last_name ? comment.author.last_name : ''}</span>
                  {user && user.id === comment.author.id && (
                    <button
                      className="ml-auto text-red-500 text-sm"
                      onClick={() => handleCommentDelete(comment.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  )}
                </div>
                <p className="text-gray-800 p-2 rounded-lg border shadow">{comment.content}</p>
                <p className="text-xs text-gray-500 text-end">{new Date(comment.created_at).toLocaleDateString()}</p>
              </div>
            ))}
            {commentsLoading && <span className='loading loading-spinner' ></span>}
            {commentsError && <div className="text-center py-4 text-red-500">{commentsError}</div>}
          </div>
        </aside>
      </div>
    </AnimatedElement>
  );
};

export default Post;
