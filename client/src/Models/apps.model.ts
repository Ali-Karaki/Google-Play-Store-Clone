export interface AppModel {
  _id: string;
  name: string;
  company: string;
  logo: string;
  devices: string[];
  type: string;
  version: string;
  releasedOn: Date;
  updatedOn: Date;
  size: number;
  description: string;
  ageRestrictions: string;
  price: number;
  stars: number;
  downloads: number;
  isOffline: boolean;
  tags: string[];
  isEditorChoice: boolean;
}
