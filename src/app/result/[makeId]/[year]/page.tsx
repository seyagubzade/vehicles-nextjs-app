import { getVehicleModels } from "@/actions";
import EmptySection from "@/components/empty-section";
import { ApiResponse, ResultPageProps, IModel } from "@/types";
import React from "react";
import ErrorPage from "@/app/result/error";

const ResultPage: React.FC<ResultPageProps> = ({ data }) => {
  return (
    <div className="p-5 bg-gray-50">
      <h1 className="text-3xl text-center font-semibold text-gray-800 mb-5">
        Models for {data.Results[0]?.Make_Name}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.Results.map((model, index) => (
          <div
            key={`${model.Model_ID}-${index}`}
            className="bg-white p-5 rounded-lg shadow-md"
          >
            <h2 className="text-xl text-center font-medium bg-gray-400 text-white w-auto px-2 mb-3 rounded">
              {model.Model_Name}
            </h2>
            <div className="space-y-2 text-gray-600">
              <div>
                <span className="font-semibold">Make ID:</span>
                <span>{model.Make_ID}</span>
              </div>
              <div>
                <span className="font-semibold">Make Name:</span>
                <span>{model.Make_Name}</span>
              </div>
              <div>
                <span className="font-semibold">Model ID:</span>
                <span>{model.Model_ID}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// server-side logic
export default async function ResultPageServer({
  params,
}: {
  params: Promise<{
    makeId: string;
    year: string;
  }>;
}) {
  const { makeId, year } = await params;

  try {
    const data: IModel[] = await getVehicleModels(makeId, year);

    const apiResponse: ApiResponse = {
      Results: data,
      Count: data.length,
      SearchCriteria: `makeId:${makeId} modelyear:${year}`,
    };

    if (data.length === 0) {
      return <EmptySection />;
    }
    return <ResultPage data={apiResponse} />;
  } catch (error) {
    console.error(error);
    return <ErrorPage />;
  }
}

// static params
export async function generateStaticParams() {
  const makeIds = [441]; // 441->Tesla
  const years = [2018, 2019, 2020];

  // makeId and year combination
  const params = [];
  for (const makeId of makeIds) {
    for (const year of years) {
      params.push({
        makeId: makeId.toString(),
        year: year.toString(),
      });
    }
  }

  return params.map(({ makeId, year }) => ({
    params: { makeId, year },
  }));
}
