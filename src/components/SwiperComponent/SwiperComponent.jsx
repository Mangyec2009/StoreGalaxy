"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";

const SwiperComponent = () => {
  const slides = [
    { id: 1, title: "Slide 1", image: "https://alifshop.tj/_next/image?url=https%3A%2F%2Fs3.eu-central-1.amazonaws.com%2Falifcore.storage%2Fmedia%2Fimages%2Fsettings%2F41%2Fbanner-1734094484848.jpg&w=1200&q=85" },
    { id: 2, title: "Slide 2", image: "https://alifshop.tj/_next/image?url=https%3A%2F%2Fs3.eu-central-1.amazonaws.com%2Falifcore.storage%2Fmedia%2Fimages%2Fsettings%2F41%2Fbanner-1727761515426.jpg&w=1200&q=85" },
    { id: 3, title: "Slide 3", image: "https://mc-static.fast.eu/LABEL-7239/Kategoria_desktop_tablet_1940x600.webp?3585889097&size=category-tablet-standard-jpg" },
    { id: 4, image: "https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/ampere/30-series/back-in-stock/geforce-back-in-stock-refresh-og-1200x630-cppy@2x.jpg" }
  ];

  return (
    <div className="max-w-[1180px] md:w-[90%] mx-auto mb-[50px]">
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="mySwiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-[400px]">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover rounded-lg"
              />
              {/* <h3 className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 px-3 py-1 rounded">
                {slide.title}
              </h3> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperComponent;
