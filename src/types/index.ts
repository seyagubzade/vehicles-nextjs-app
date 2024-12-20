export interface VehicleMake {
  MakeId: string;
  MakeName: string;
}

export interface VehicleModel {
  ModelId: number;
  ModelName: string;
  VehicleTypeId: number;
  VehicleTypeName: string;
}

// result types
export interface IModel {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

export interface ApiResponse {
  Count?: number;
  Message?: string;
  SearchCriteria: string;
  Results: IModel[];
}

export type ResultPageProps = {
  data: ApiResponse;
};
