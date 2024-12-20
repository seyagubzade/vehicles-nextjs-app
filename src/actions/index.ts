import { ApiResponse, IModel, VehicleMake } from "@/types";

// vehicle makes
export const getVehicleMakes = async (): Promise<VehicleMake[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/GetMakesForVehicleType/car?format=json`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch vehicle makes: ${response.statusText}`);
  }

  const data = await response.json();
  return data.Results || [];
};

export const getVehicleModels = async (
  makeId: string,
  year: string
): Promise<IModel[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch vehicle models: ${response.statusText}`);
  }

  const data: ApiResponse = await response.json();
  return data.Results;
};
