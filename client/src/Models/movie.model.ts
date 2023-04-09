export interface MovieModel {
  _id?: string;
  name: string;
  company: string;
  logo: string;
  releasedOn: Date;
  duration: number;
  description: string;
  ageRestrictions: "G" | "PG" | "PG-13" | "R" | "NC-17";
  price: number;
  stars: number;
  downloads: number;
  tags: Array<
    | "Action"
    | "Comedy"
    | "Drama"
    | "Thriller"
    | "Horror"
    | "Romance"
    | "Science Fiction"
  >;
  isEditorChoice: boolean;
}

export interface MovieResponse {
  message: MovieModel;
  success: boolean;
}
