type Devices = "Windows" | "Phone" | "Tablet" | "TV";
type Tags = "Business"
          | "Communication"
          | "Finance"
          | "Health"
          | "Travel"
          | "Action"
          | "Arcade"
          | "Sports"
          | "Simulation"
type Type = "App" | "Game";
type AgeRestriction = "G" | "PG" | "PG-13" | "R" | "NC-17";

export interface AppModel {
  _id: string;
  name: string;
  company: string;
  logo: string;
  devices: Array<Devices>;
  type: Type;
  version: string;
  releasedOn: Date;
  updatedOn: Date;
  size: number;
  description: string;
  ageRestrictions: AgeRestriction;
  price: number;
  stars: number;
  downloads: number;
  isOffline: boolean;
  tags: Array<Tags>;
  isEditorChoice: boolean;
}

