export interface BookModel {
  _id?: string;
  name: string;
  company: string;
  logo: string;
  releasedOn: Date;
  description: string;
  ageRestrictions: "G" | "PG" | "PG-13" | "R" | "NC-17";
  price: number;
  stars: number;
  downloads: number;
  aboutAuthor: string;
  isComic: boolean;
  category:
    | "Fiction"
    | "Non-Fiction"
    | "Mystery"
    | "Science Fiction"
    | "Romance";
  type: "Ebook" | "Audiobook";
  pages?: number;
  duration?: string;
  narratedBy?: string;
}
