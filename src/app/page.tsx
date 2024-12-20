"use client";

import { getVehicleMakes } from "@/actions";
import LoadingSpinner from "@/components/loading";
import { VehicleMake } from "@/types";
import Link from "next/link";
import { useEffect, useMemo, useState, Suspense } from "react";

export const dynamic = "force-dynamic";

function Home() {
  const [vehicleMakes, setVehicleMakes] = useState<VehicleMake[]>([]);
  const [selectedMake, setSelectedMake] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const makes = await getVehicleMakes();
        setVehicleMakes(makes);
      } catch (error) {
        console.error("Failed to fetch vehicle makes", error);
      }
    };
    fetchData();
  }, []);

  const isNextEnabled = useMemo(
    () => selectedMake && selectedYear,
    [selectedMake, selectedYear]
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white w-[60%] px-8 py-12 flex flex-col items-center justify-center shadow-md rounded">
        <h1 className="text-2xl font-bold mb-6 text-black">Filter Vehicles</h1>
        <form className="w-full max-w-md">
          {/* vehicle make */}
          <div className="mb-6 flex flex-col gap-2">
            <label htmlFor="make" className="text-gray-600 font-medium text-md">
              Vehicle Make
            </label>
            <Suspense fallback={<LoadingSpinner />}>
              <select
                name="make"
                className="w-full p-2 border rounded text-gray-600"
                defaultValue=""
                required
                onChange={(e) => setSelectedMake(e.target.value)}
              >
                <option value="" disabled>
                  Select
                </option>
                {vehicleMakes.map((make) => (
                  <option key={make.MakeId} value={make.MakeId}>
                    {make.MakeName}
                  </option>
                ))}
              </select>
            </Suspense>
          </div>

          {/* model year */}
          <div className="mb-6 flex flex-col gap-2">
            <label htmlFor="make" className="text-gray-600 font-medium text-md">
              Model Year
            </label>
            <select
              name="year"
              className="w-full p-2 border rounded text-gray-600"
              defaultValue=""
              required
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="" disabled>
                Select
              </option>
              {Array.from(
                { length: currentYear - 2015 + 1 },
                (_, i) => 2015 + i
              ).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* link to result page */}
          <div className="mt-6">
            <Link
              href={
                isNextEnabled ? `/result/${selectedMake}/${selectedYear}` : "#"
              }
            >
              <button
                type="button"
                className={`block text-center p-2 rounded text-white w-full ${
                  isNextEnabled
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!isNextEnabled}
              >
                See Results
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;
