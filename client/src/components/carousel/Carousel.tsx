import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Typography } from "@material-ui/core";
import StarRateIcon from "@mui/icons-material/StarRate";
import { Box } from "@mui/material";
import { CarouselProps, CarouselData, ItemProps } from "./Carousel.types";
import { useLocation, useNavigate } from "react-router-dom";

const CarouselComponent = ({ data }: CarouselProps) => {
  const splitArrayIntoChunks = (array: any[], chunkSize: number): any[][] => {
    const chunks = Array.from(
      { length: Math.ceil(array.length / chunkSize) },
      (_, index) => array.slice(index * chunkSize, (index + 1) * chunkSize)
    );
    return chunks;
  };

  const [isHovering, setIsHovering] = useState(false);

  const onHover = () => {
    setIsHovering(true);
  };

  const offHover = () => {
    setIsHovering(false);
  };

  const chunckedData = splitArrayIntoChunks(data, 5);

  return (
    <Carousel
      navButtonsAlwaysVisible={isHovering}
      animation="slide"
      duration={1000}
      cycleNavigation={true}
      autoPlay={false}
    >
      {chunckedData.map((item: CarouselData[], i: number) => (
        <Item key={i} chunk={item} onHover={onHover} offHover={offHover} />
      ))}
    </Carousel>
  );
};

const Item = ({ chunk, onHover, offHover }: ItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const clickItem = (item: CarouselData) => {
    const curPage = location.pathname.split("/store/")[1];
    navigate(`/store/${curPage}/view/${item.id}`);
  };
  return (
    <Box sx={styles.container} onMouseEnter={onHover} onMouseLeave={offHover}>
      {chunk.map((item) => (
        <Box sx={styles.item} key={item.id} onClick={() => clickItem(item)}>
          <img style={styles.img} src={item.logo} alt={item.name} />
          <Box style={styles.appDetails}>
            <Typography style={styles.name}>{item.name}</Typography>
            <Box sx={styles.container}>
              <Typography style={styles.name}>{item.stars}</Typography>
              <StarRateIcon style={styles.stars} />              
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

const styles = {
  container: {
    display: "flex",
  },
  img: {
    width: "160px",
    height: "160px",
    borderRadius: "20%",
  },
  item: {
    margin: " 0px 20px",
  },
  name: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#5F6368",
  },
  stars: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#5F6368",
  },
  appDetails: {
    marginLeft: "10px",
  },
};

export default CarouselComponent;
