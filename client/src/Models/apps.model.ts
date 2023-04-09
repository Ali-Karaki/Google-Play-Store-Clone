export interface AppModel {
  _id: string;
  name: string;
  company: string;
  logo: string;
  devices: Array<"Windows" | "Phone" | "Tablet" | "TV">;
  type: "App" | "Game";
  version: string;
  releasedOn: Date;
  updatedOn: Date;
  size: number;
  description: string;
  ageRestrictions: "G" | "PG" | "PG-13" | "R" | "NC-17";
  price: number;
  stars: number;
  downloads: number;
  isOffline: boolean;
  tags: Array<
    | "Business"
    | "Communication"
    | "Finance"
    | "Health"
    | "Travel"
    | "Action"
    | "Arcade"
    | "Sports"
    | "Simulation"
  >;
  isEditorChoice: boolean;
}
