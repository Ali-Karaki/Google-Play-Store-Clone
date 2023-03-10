export interface DataSafetyModel {
  canDeleteData: boolean;
  encryptsDataInTransit: boolean;
  collectsData: boolean;
  sharesDataWith: {
    isSharing: boolean;
    thirdParties: string[];
  };
}

export interface AppModel {
  _id: string;
  name: string;
  company: string;
  logo: string;
  pictures: string[];
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
  dataSafety: DataSafetyModel;
}
