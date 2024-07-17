import image1 from '../../assets/images/galeries/image1.png';
import image2 from '../../assets/images/galeries/image2.png';
import image3 from '../../assets/images/galeries/image3.png';
import AnimatedElement from '../../function/AnimatedElement';

const News = () => {
  return (
    <section className="py-10 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-5">Latest News</h2>
        <div className="flex flex-col md:flex-row items-center justify-center mb-8">
          <p className="text-lg text-center md:text-left">
            Stay updated with the latest news and announcements from FAMES BENIN. Here you will find the most recent updates and important information.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <AnimatedElement>
            <div className="card bg-base-100 shadow-xl">
              <figure>
                <img src={image1} alt="News 1" className="h-48 w-full object-cover" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  News Title 1
                </h2>
                <p>Brief description of the news content. This section provides a summary of the news article.</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-success">Read More</button>
                </div>
              </div>
            </div>
          </AnimatedElement>
          <AnimatedElement>
            <div className="card bg-base-100 shadow-xl">
              <figure>
                <img src={image2} alt="News 2" className="h-48 w-full object-cover" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  News Title 2
                </h2>
                <p>Brief description of the news content. This section provides a summary of the news article.</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-success">Read More</button>
                </div>
              </div>
            </div>
          </AnimatedElement>
          <AnimatedElement>
            <div className="card bg-base-100 shadow-xl">
              <figure>
                <img src={image3} alt="News 3" className="h-48 w-full object-cover" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  News Title 3
                </h2>
                <p>Brief description of the news content. This section provides a summary of the news article.</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-success">Read More</button>
                </div>
              </div>
            </div>
          </AnimatedElement>
        </div>
        <div className="text-center mt-8">
        </div>
      </div>
    </section>
  );
}

export default News


