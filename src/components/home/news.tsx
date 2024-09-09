import { useTranslation } from 'react-i18next'; // Importer le hook pour la traduction
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchNewsPosts, NewsPost } from '../../fetch/newsFetch';
import AnimatedElement from '../../function/AnimatedElement';

const News = () => {
  const { t } = useTranslation(); // Utiliser le hook pour accéder aux fonctions de traduction
  const [recentArticles, setRecentArticles] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const recentArticlesResponse = await fetchNewsPosts();
        setRecentArticles(recentArticlesResponse.results.slice(0, 3));
      } catch (err) {
        setError('Failed to fetch recent articles');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return null;
  if (error) return null;
  if (recentArticles.length === 0) return null;

  return (
    <section className="py-10 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-5">{t('news.title')}</h2>
        <div className="flex flex-col md:flex-row items-center justify-center mb-8">
          <p className="text-lg text-center md:text-left">
            {t('news.description')}
          </p>
        </div>
        <div className={`grid grid-cols-1 ${recentArticles.length === 1 ? 'md:grid-cols-1' : recentArticles.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-4 mt-8 max-w-4xl mx-auto`}>
          {recentArticles.map((article, index) => (
            <AnimatedElement key={article.id || `article-${index}`}>
              <div className="card bg-base-100 shadow-xl">
                <Link to={`/news/${article.slug}`}>
                  <figure>
                    <img src={article.image} alt={article.title} className="h-60 w-full object-cover" />
                  </figure>
                </Link>
                <div className="card-body">
                  <Link to={`/news/${article.slug}`}>
                    <h2 className="card-title text-justify">
                      {article.title}
                    </h2>
                  </Link>
                  <p className='text-justify' >{article.content.replace(/<\/?[^>]+(>|$)/g, "").length > 200 
                    ? `${article.content.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 300)}…` 
                    : article.content.replace(/<\/?[^>]+(>|$)/g, "")}
                  </p>
                  <div className="card-actions justify-end">
                    <Link to={`/news/${article.slug}`} className="btn btn-success">
                      <i className="fas fa-book-open mr-2"></i>
                      {t('news.readMore')}
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>
        <div className="text-center mt-8">
        </div>
      </div>
    </section>
  );
}

export default News;
