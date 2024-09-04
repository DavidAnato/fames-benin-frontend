import React, { useEffect, useState } from 'react';
import { fetchNewsPosts, fetchNewsCategories, fetchNewsTags, fetchNewsPostsByCategory, fetchNewsPostsByTag, NewsPost, NewsCategory, NewsTag } from '../fetch/newsFetch';
import { useTranslation } from 'react-i18next';
import AnimatedElement from '../function/AnimatedElement';
import { Link } from 'react-router-dom';
import MiniHero from '../components/miniHero';

// const BASE_URL = process.env.API_URL;
const News: React.FC = () => {
  const { t } = useTranslation();
  const [newsPosts, setNewsPosts] = useState<NewsPost[]>([]);
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [tags, setTags] = useState<NewsTag[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allOption, setAllOption] = useState<boolean>(true);

  const fetchInitialData = async () => {
    try {
      setIsLoading(true);
      const { results, next } = await fetchNewsPosts();
      setNewsPosts(results);
      setNextPageUrl(next);
      const categories = await fetchNewsCategories();
      const tags = await fetchNewsTags();
      setCategories(categories);
      setTags(tags);
      setAllOption(true)
      setIsLoading(false);
      window.scrollTo(0, 0);
      setSelectedCategory(null);
      setSelectedTags([]);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setIsLoading(false);
    }
  };

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
    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.length >= 3) {
        try {
          setIsLoading(true);
          const { results, next } = await fetchNewsPosts(`news/posts/?search=${searchQuery}`);
          setNewsPosts(results);
          setNextPageUrl(next);
          setIsLoading(false);
          setAllOption(false);
          // window.scrollTo(0, 0);
        } catch (error) {
          console.error('Failed to fetch search results:', error);
          setIsLoading(false);
        }
      } else if (searchQuery.length === 0) {
        fetchInitialData();
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  const handleCategoryChange = async (categoryId: number) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
      await fetchInitialData();
    } else {
      setSelectedCategory(categoryId);
      setSelectedTags([]);
      const { results, next } = await fetchNewsPostsByCategory(categoryId.toString());
      setNewsPosts(results);
      setNextPageUrl(next);
      window.scrollTo(0, 0);
      setAllOption(false);
    }
  };

  const handleTagChange = async (tagId: number) => {
    const updatedSelectedTags = selectedTags.includes(tagId)
      ? selectedTags.filter(id => id !== tagId)
      : [...selectedTags, tagId];
    setSelectedTags(updatedSelectedTags);
    setSelectedCategory(null);
    
    if (updatedSelectedTags.length === 0) {
      await fetchInitialData();
    } else {
      const { results, next } = await fetchNewsPostsByTag(updatedSelectedTags.join(','));
      setNewsPosts(results);
      setNextPageUrl(next);
      window.scrollTo(0, 0);
      setAllOption(false);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchQuery.trim() === '') {
      await fetchInitialData();
    } else {
      const { results, next } = await fetchNewsPosts(`news/posts/?search=${searchQuery}`);
      setNewsPosts(results);
      setNextPageUrl(next);
    }
  };

  const loadMorePosts = async () => {
    if (nextPageUrl && !isLoading) {
      try {
        setIsLoading(true);
        const { results, next } = await fetchNewsPosts(nextPageUrl);
        setNewsPosts(prevPosts => [...prevPosts, ...results]);
        setNextPageUrl(next);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch more news posts:', error);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    const loadMoreElement = document.getElementById('loadMore');
  
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextPageUrl && !isLoading) {
          loadMorePosts();
        }
      },
      { threshold: 0.1 }
    );
  
    if (loadMoreElement) {
      observer.observe(loadMoreElement);
    }
  
    return () => {
      if (loadMoreElement) {
        observer.unobserve(loadMoreElement);
      }
    };
  }, [nextPageUrl, isLoading]);
  
  return (
    <section className="py-10 min-h-screen pt-[7.5rem]">
      <MiniHero content="News" />
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row">
          <aside className="w-full lg:w-1/4 mb-8 lg:mb-0 lg:mr-8 sticky top-[8em] lg:self-start z-10 rounded-2xl backdrop-blur-sm">
          <AnimatedElement>
            <form onSubmit={handleSearchSubmit} className="w-full relative mb-4">
              <input
                type="text"
                className="w-full p-3 px-5 rounded-2xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder={t('news.searchPlaceholder')}
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button type="submit" className="text-gray-400 absolute inset-y-0 right-5 flex items-center pr-1">
                <i className="fas fa-search text-gray-400"></i>
              </button>
            </form>
            
            <details className="collapse bg-base-100 collapse-arrow border-base-300 border lg:hidden">
                <summary className="collapse-title text-xl font-medium">
                    {t('news.filters')}
                    <i className="fas fa-filter ml-2"></i>
                </summary>
                <div className="collapse-content">
                    <Link 
                    to="/news" 
                    key='all' 
                    className="cursor-pointer flex items-center mb-2"
                    onClick={() => {
                        fetchInitialData();
                        setAllOption(true);
                    }}
                    >
                    <i className="fas fa-newspaper mr-2"></i>
                    <span className={allOption ? 'font-bold' : ''}>All News</span>
                    </Link>
                    <div className="form-control w-full max-w-xs mb-4">
                    <label className="label">
                        <span className="label-text">
                        {t('news.filterByCategory')}
                        <i className="fas fa-tags ml-2"></i>
                        </span>
                    </label>
                    <div className="bg-white p-4 rounded-lg shadow">
                        {categories.map((category) => (
                        <label key={category.id} className="cursor-pointer flex items-center mb-2">
                            <input
                            type="radio"
                            name="category"
                            className="radio mr-2"
                            checked={selectedCategory === category.id}
                            onChange={() => handleCategoryChange(category.id)}
                            />
                            <span className={selectedCategory === category.id ? 'font-bold' : ''}>{category.name}</span>
                        </label>
                        ))}
                    </div>
                    </div>
                    <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">
                        {t('news.filterByTag')}
                        <i className="fas fa-hashtag ml-2"></i>
                        </span>
                    </label>
                    <div className="bg-white p-4 rounded-lg shadow">
                        {tags.map((tag) => (
                        <label key={tag.id} className="cursor-pointer flex items-center mb-2">
                            <input
                            type="checkbox"
                            className="checkbox mr-2"
                            checked={selectedTags.includes(tag.id)}
                            onChange={() => handleTagChange(tag.id)}
                            />
                            <span className={selectedTags.includes(tag.id) ? 'font-bold' : ''}>{tag.name}</span>
                        </label>
                        ))}
                    </div>
                    </div>
                </div>
            </details>
            <div className="hidden lg:block bg-base-100 border-base-300 border p-4 rounded-lg">
                <h2 className="text-xl font-medium mb-4">
                    {t('news.filters')}
                    <i className="fas fa-filter ml-2"></i>
                </h2>
                <Link 
                to="/news" 
                key='all' 
                className="cursor-pointer flex items-center mb-2"
                onClick={() => {
                    fetchInitialData();
                    setAllOption(true);
                }}
                >
                <i className="fas fa-newspaper mr-2"></i>
                <span className={allOption ? 'font-bold' : ''}>All News</span>
                </Link>
                <div className="form-control w-full max-w-xs mb-4">
                <label className="label">
                    <span className="label-text">
                    {t('news.filterByCategory')}
                    <i className="fas fa-tags ml-2"></i>
                    </span>
                </label>
                <div className="bg-white p-4 rounded-lg shadow">
                    {categories.map((category) => (
                    <label key={category.id} className="cursor-pointer flex items-center mb-2">
                                               <input
                        type="radio"
                        name="category"
                        className="radio mr-2"
                        checked={selectedCategory === category.id}
                        onChange={() => handleCategoryChange(category.id)}
                        />
                        <span className={selectedCategory === category.id ? 'font-bold' : ''}>{category.name}</span>
                    </label>
                    ))}
                </div>
                </div>
                <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">
                    {t('news.filterByTag')}
                    <i className="fas fa-hashtag ml-2"></i>
                    </span>
                </label>
                <div className="bg-white p-4 rounded-lg shadow">
                    {tags.map((tag) => (
                    <label key={tag.id} className="cursor-pointer flex items-center mb-2">
                        <input
                        type="checkbox"
                        className="checkbox mr-2"
                        checked={selectedTags.includes(tag.id)}
                        onChange={() => handleTagChange(tag.id)}
                        />
                        <span className={selectedTags.includes(tag.id) ? 'font-bold' : ''}>{tag.name}</span>
                    </label>
                    ))}
                </div>
                </div>
            </div>
          </AnimatedElement>

          </aside>
          <div className="w-full lg:w-3/4">
            {newsPosts.length === 0 && !isLoading ? (
              <div className="flex justify-center items-center h-50">
                <p className="text-xl font-medium">{t('news.noNews')}</p>
              </div>
            ) : (
              <div className="grid justify-items-stretch gap-6">
                {newsPosts.map((post) => (
                  <AnimatedElement key={post.id}>
                      <div className="card hover:bg-base-300 transition-colors">
                          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row">
                              <figure className="w-full sm:w-1/3 md:w-full lg:w-1/3 mx-auto object-cover p-6">
                                  <Link to={`/news/${post.slug}`}>
                                      <img loading="lazy" className="border-base-content bg-base-300 rounded-btn border border-opacity-5" alt={post.title} src={post.image} />
                                  </Link>
                              </figure>
                              <div className="card-body w-full sm:w-2/3 md:w-full lg:w-2/3">
                                  <div className="text-justify">
                                      <Link to={`/news/${post.slug}`}>
                                          <h2 className="card-title">{post.title}</h2>
                                      </Link>
                                      <button 
                                          className="mr-2" 
                                          onClick={() => handleCategoryChange(post.category.id)}
                                      >
                                          {post.category.name}
                                      </button>
                                      <p className="text-xs opacity-60 ">{new Date(post.created_at).toLocaleDateString()}</p>
                                  </div>
                                  <p className="text-xs opacity-60 text-justify">
                                      {post.content.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 350)}...
                                  </p>
                                  <div className="mt-2">
                                      {post.tags.map(tag => (
                                          <button 
                                              key={tag.id} 
                                              className="btn btn-xs btn-outline btn-success mr-2 rounded-full" 
                                              onClick={() => handleTagChange(tag.id)}
                                          >
                                              {tag.name}
                                          </button>
                                      ))}
                                  </div>
                                  {/* <div className="flex items-center mt-4">
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
                                  </div> */}
                              </div>
                          </div>
                      </div>
                  </AnimatedElement>
                ))}
              </div>
            )}
            <div id='loadMore' className="flex justify-center mt-4">
              {isLoading && (
                <span className="loading loading-spinner loading-lg"></span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;