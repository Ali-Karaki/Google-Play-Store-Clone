export interface BookModel {
  _id?: string;
  name: string;
  company: string;
  logo: string;
  releasedOn: Date;
  description: string;
  ageRestrictions: string;
  price: number;
  stars: number;
  downloads: number;
  aboutAuthor: string;
  isComic: boolean;
  category: string;
  type: string;
  pages?: number;
  duration?: string;
  narratedBy?: string;
}