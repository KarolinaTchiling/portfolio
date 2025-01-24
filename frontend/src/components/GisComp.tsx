import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import BisonCard from "./GIS/BisonCard";
import CaribouCard from "./GIS/CaribouCard";
import MapCard from "./GIS/MapCard";
import React from 'react';

const MyProjects = () => {
  const projects = [
    <BisonCard key="bison" />,
    <CaribouCard key="caribou" />,
    <MapCard key="map" />,
  ];

  return (
    <div className="max-w-6xl mx-auto p-8">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
        }}
        navigation
        pagination={{ clickable: true }}
        className="w-full"
        style={{
          ['--swiper-pagination-color' as any]: "#ff00fb",
          ['--swiper-pagination-bullet-inactive-color' as any]: "#a3a3a3",
          ['--swiper-pagination-bullet-inactive-opacity' as any]: "0.5",
          ['--swiper-navigation-color' as any]: "#ff00fb",  // Change arrow color
        }}
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            {project}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MyProjects;
