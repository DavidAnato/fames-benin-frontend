import image1 from '../../assets/images/galeries/image1.png';
import image2 from '../../assets/images/galeries/image2.png';
import image3 from '../../assets/images/galeries/image3.png';
import image4 from '../../assets/images/galeries/image4.png';
import image5 from '../../assets/images/galeries/image5.png';
import image6 from '../../assets/images/galeries/image6.png';
import AnimatedElement from '../../function/AnimatedElement';
const photos = [
  { src: image1 },
  { src: image2 },
  { src: image4 },
  { src: image3 },
  { src: image5 },
  { src: image6 },
];

const Galleries = () => {

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-5">Photo Galleries</h2>
        <div className="flex flex-col md:flex-row items-center justify-center mb-8">
          <p className="text-lg text-center md:text-left">
            Discover moments captured during various activities and events involving our members. Browse through our galleries.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 md:grid">
          {/* hidden */}
          <div className="flex flex-col gap-4">
            {photos.filter((_, index) => index % 3 === 0).map((photo, index) => (
              <AnimatedElement>
              <div key={index} className="relative w-full rounded overflow-hidden">
                <img src={photo.src} className="w-full h-auto object-cover" />
              </div>
              </AnimatedElement>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {photos.filter((_, index) => index % 3 === 1).map((photo, index) => (
              <AnimatedElement>
              <div key={index} className="relative w-full rounded overflow-hidden">
                <img src={photo.src} className="w-full h-auto object-cover" />
              </div>
              </AnimatedElement>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {photos.filter((_, index) => index % 3 === 2).map((photo, index) => (
              <AnimatedElement>
              <div key={index} className="relative w-full rounded overflow-hidden">
                <img src={photo.src} className="w-full h-auto object-cover" />
              </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
        <AnimatedElement>
          <div className="carousel rounded-box md:hidden" style={{ height: '250px' }}>
            {photos.map((photo, index) => (
              <div key={index} className="carousel-item">
                <img src={photo.src} alt={`Gallery image ${index + 1}`} />
              </div>
            ))}
          </div>
        </AnimatedElement>
        <div className="text-center mt-8">
          <button className="btn btn-accent">
            Show Gallery
          </button>
        </div>
      </div>
    </section>
  );
}

export default Galleries;
