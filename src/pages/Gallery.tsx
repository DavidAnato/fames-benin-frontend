import React, { useState, useEffect } from 'react';
import { fetchAlbumList, Album } from '../fetch/galleryFetch';
import Images from '../components/gallery/images';
import MiniHero from '../components/miniHero';
import AnimatedElement from '../function/AnimatedElement';
import { useTranslation } from 'react-i18next'; // Ajout de l'import manquant

const Gallery: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | undefined>(undefined);
  const { t } = useTranslation(); // Utilisation de `useTranslation` pour la traduction

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
    const fetchAlbums = async () => {
      try {
        const albumList = await fetchAlbumList();
        console.log(albumList);
        setAlbums(albumList);
      } catch (error) {
        console.error('Failed to fetch albums:', error);
      }
    };

    fetchAlbums();
  }, []);

  return (
    <section className="py-5 min-h-screen pt-[7.5rem]">

      <MiniHero content={t('Gallery')} />
      <AnimatedElement>
      <div className="flex justify-center items-center space-x-3 mb-5 px-5">
        <button
          className="flex btn btn-accent h-10 w-10 btn-sm rounded-full px-3"
          onClick={() => {
            const container = document.querySelector('.scrollable-container');
            if (container) {
              container.scrollBy({ left: -200, behavior: 'smooth' });
            }
          }}
        >
          <i className="fas fa-chevron-left text-xl"></i>
        </button>
        <div
          className="flex overflow-x-auto space-x-3 scrollable-container rounded-full"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          <button
            className={`flex btn btn-accent lg:btn-md btn-sm rounded-full px-3 ${selectedAlbumId === undefined ? 'font-bold' : 'btn-outline'}`}
            onClick={() => setSelectedAlbumId(undefined)}
          >
            <span className="px-2">
              <i className="fas fa-th-large text-xl mr-2"></i>{t("All")}
            </span>
          </button>
          {albums.map((album) => (
            <button
              key={album.id}
              className={`flex btn btn-accent lg:btn-md btn-sm rounded-full p-1  ${selectedAlbumId === album.id.toString() ? 'font-bold' : 'btn-outline'}`}
              style={{ padding: '4px' }}
              onClick={() => setSelectedAlbumId(album.id.toString())}
            >
              <img
                src={album.cover_image}
                alt={album.title}
                className="w-auto h-full rounded-full"
              />
              <span className="pr-3">{album.title}</span>
            </button>
          ))}
        </div>
        <button
          className="flex btn btn-accent h-10 w-10 btn-sm rounded-full px-3"
          onClick={() => {
            const container = document.querySelector('.scrollable-container');
            if (container) {
              container.scrollBy({ left: 200, behavior: 'smooth' });
            }
          }}
        >
          <i className="fas fa-chevron-right text-xl"></i>
        </button>
      </div>
      </AnimatedElement>
      <Images albumId={selectedAlbumId} />
    </section>
  );
};

export default Gallery;
