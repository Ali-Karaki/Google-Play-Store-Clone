import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Typography } from "@material-ui/core";
import StarRateIcon from "@mui/icons-material/StarRate";
import { Box } from "@mui/material";

export interface CarouselData {
  id: string;
  name: string;
  logo: string;
  stars: number;
}

export interface CarouselProps {
  data: CarouselData[];
}

export interface ItemProps {
  chunk: CarouselData[];
  onHover: any;
  offHover: any;
}

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
  const clickItem = (item: CarouselData) => {};
  return (
    <Box sx={styles.container} onMouseEnter={onHover} onMouseLeave={offHover}>
      {chunk.map((item) => (
        <Box sx={styles.item} key={item.id} onClick={() => clickItem(item)}>
          <img
            style={styles.img}
            src="https://drive.google.com/uc?id=1CDaAsMzMmKeC3EcbAeh3MT-eRz_K63O5"
            alt={item.name}
          />
          <Typography style={styles.name}>{item.name}</Typography>
          <Box sx={styles.container}>
            <Typography>{item.stars}</Typography>
            <StarRateIcon />
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
    width: "200px",
    height: "180px",
  },
  item: {
    margin: " 0px 20px",
  },
  name: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#5F6368",
  },
};

export default CarouselComponent;
