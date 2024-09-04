import React, { useEffect, useState } from 'react';
import { fetchImageList, GalleryImage as GalleryImageType } from '../../fetch/galleryFetch';
import AnimatedElement from '../../function/AnimatedElement';

interface ImagesProps {
  albumId?: string;
}

const Images: React.FC<ImagesProps> = ({ albumId }) => {
  const [images, setImages] = useState<GalleryImageType[]>([]);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [columns, setColumns] = useState<number>(0);

  useEffect(() => {
    setColumns(getColumns());
  }, []);

  const fetchInitialData = async () => {
    try {
      setIsLoading(true);
      const { results, next } = await fetchImageList(null, albumId);
      setImages(shuffleArray(results));
      setNextPageUrl(next);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setImages([]);
    fetchInitialData();
  }, [albumId]);

  const loadMoreImages = async () => {
    if (nextPageUrl && !isLoading) {
      try {
        setIsLoading(true);
        const { results, next } = await fetchImageList(nextPageUrl);
        setImages(prevImages => [...prevImages, ...shuffleArray(results)]);
        setNextPageUrl(next);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch more images:', error);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    const loadMoreElement = document.getElementById('loadMoreImages');
  
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].boundingClientRect.top < window.innerHeight + 100 && nextPageUrl && !isLoading) {
          loadMoreImages();
        }
      },
      { rootMargin: '100px' }
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

  useEffect(() => {
    const handleResize = () => {
      const newColumns = getColumns();
      if (newColumns !== columns) {
        setColumns(newColumns);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [columns]);

  const getColumns = () => {
    if (window.innerWidth >= 1280) return 5;
    if (window.innerWidth >= 1024) return 4;
    if (window.innerWidth >= 768) return 3;
    return 2;
  };

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  const showNextImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex < images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const showPrevImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Initialiser les colonnes avec des tableaux vides
  const columnImages: GalleryImageType[][] = Array.from({ length: columns }, () => []);

  images.forEach((image) => {
    // Trouver la colonne avec le moins d'images
    let minColumnIndex = 0;
    let minColumnLength = columnImages[0].length;

    columnImages.forEach((col, index) => {
      if (col.length < minColumnLength) {
        minColumnIndex = index;
        minColumnLength = col.length;
      }
    });

    // Ajouter l'image à la colonne avec le moins d'images
    columnImages[minColumnIndex].push(image);
  });

  return (
    <div className="mx-auto px-5">
      {images.length === 0 && !isLoading && (
        <div className="flex justify-center mt-4">
          <span>No images available.</span>
        </div>
      )}
      <div className="flex gap-4">
        {columnImages.map((col, colIndex) => (
          <div key={colIndex} className="flex-1">
            {col.map((image, _index) => (
              <AnimatedElement key={image.id}>
                <div className="break-inside-avoid mb-4">
                  <img
                    loading="lazy"
                    className="w-full h-auto block border-base-content bg-base-300 rounded-btn border border-opacity-5 object-cover cursor-pointer"
                    alt={image.title}
                    src={image.image || ''}
                    onClick={() => openModal(images.indexOf(image))}
                  />
                </div>
              </AnimatedElement>
            ))}
          </div>
        ))}
      </div>
      <div id='loadMoreImages'></div>
      {isLoading && (
        <div className="flex justify-center mt-4">
          <span className="loading loading-lg loading-spinner "></span>
        </div>
      )}
      {selectedImageIndex !== null && (
        <div className="fixed image-modal inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" onClick={closeModal}>
          <button className="absolute top-4 right-4 text-white text-2xl" onClick={closeModal}>&times;</button>
          <button className="absolute left-4 text-white text-2xl" onClick={(e) => { e.stopPropagation(); showPrevImage(); }}>
            <i className="fas fa-chevron-left"></i>
          </button>
            <img
              className="max-w-full max-h-full cursor-zoom-in rounded-xl"
              src={images[selectedImageIndex].image}
              alt={images[selectedImageIndex].title}
              onClick={(e) => {
                e.stopPropagation();
                const imgElement = e.currentTarget;
                if (imgElement.style.transform === 'scale(2)') {
                  imgElement.style.transform = 'scale(1)';
                  imgElement.style.cursor = 'zoom-in';
                } else {
                  imgElement.style.transform = 'scale(2)';
                  imgElement.style.cursor = 'zoom-out';
                }
              }}
            />
          <button className="absolute right-4 text-white text-2xl" onClick={(e) => { e.stopPropagation(); showNextImage(); }}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  );
};

const shuffleArray = (array: GalleryImageType[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default Images;
