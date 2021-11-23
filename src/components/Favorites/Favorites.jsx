import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { SwiperSlide } from "swiper/react";

import useFavorites from "../../hooks/useFavorites";
import useData, { url } from "../../hooks/useData";
import api from "../../api/api.js";
import helpers from "../helpers";

import Navbar from "../Navbar/Navbar.styled";
import Hero from "../Hero/Hero.styled";
import Carousel from "../Carousel/Carousel";
import CardContainer from "../CardContainer/CardContainer.styled";
import Title from "../Title/Title.styled";

const StyledWrapper = styled.div`
  margin: 6rem auto 0 auto;

  @media only screen and ${helpers.device.lg} {
    margin: 0 auto;
  }
`;

const StyledImage = styled.img`
  width: 1920px;
  height: auto;
`;

const Favorites = () => {
  const { submitRequest } = useData();

  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [heroImage, setHeroImage] = useState([]);

  const fetchData = async (name, location, setState) => {
    name = await submitRequest(location);
    setState(name);
  };

  useEffect(() => {
    fetchData(heroImage, url.popularMovies(), setHeroImage);
  }, [favorites]);

  return (
    <StyledWrapper>
      <Navbar />
      <Carousel>
        {heroImage.map((movie, index) => (
          <SwiperSlide key={index}>
            <StyledImage
              src={api.images(movie.backdrop_path)}
              alt={`poster of ${movie.original_title} movie`}
            />
            <Hero
              title={movie.original_title}
              text={movie.overview.substring(0, 220)}
            />
          </SwiperSlide>
        ))}
      </Carousel>
      <Title title={"Favorites"} />
      <CardContainer cardContainer={heroImage} />
    </StyledWrapper>
  );
};

export default Favorites;
