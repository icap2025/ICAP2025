import ImageCarousel from "./ImageCarousel2";

const Carousel = () => {
    const carouselItems = [
        {
          imageUrl: '/programming.png',
          title: 'Central Auditorium, SUST',
          location: 'Campus sust,Sylhet'
        },
        {
          imageUrl: '/logo.svg',
          title: 'Campus Mural',
          location: 'Arts Building, SUST'
        },
        {
          imageUrl: '/programming.png',
          title: 'Campus Landscape',
          location: 'SUST Main Campus'
        },
        {
          imageUrl: '/logo.svg',
          title: 'Campus Mural',
          location: 'Arts Building, SUST'
        },
        {
          imageUrl: '/programming.png',
          title: 'Campus Landscape',
          location: 'SUST Main Campus'
        }
      ];
  
    return (
      <div className="">
        <ImageCarousel slides={carouselItems} />
      </div>
    );
  };

export default Carousel;
