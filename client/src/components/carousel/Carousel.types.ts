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
