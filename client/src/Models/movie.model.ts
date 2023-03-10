export interface Movie {
  _id: string;
  name: string;
  company: string;
  logo: string;
  releasedOn: Date;
  duration: number;
  description: string;
  ageRestrictions: string;
  price: number;
  stars: number;
  downloads: number;
  tags: string[];
  isEditorChoice: boolean;
}