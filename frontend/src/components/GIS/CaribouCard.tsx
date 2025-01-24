import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { IoDocumentTextOutline } from "react-icons/io5";

const CaribouCard: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const tools = ["ArcGIS", "ArcMap", "Regression Analysis", "OLS", "DataBC"];

  return (
    <div className="max-w-xlg bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 dark:bg-gray-900 dark:border-gray-700 m-20 mt-0 mb-12">
      <div className="p-6 pb-0">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
        Regression Analysis of Logging Activities on Caribou Populations in Omineca Region, BC
        </h2>

        <div className="flex flex-row justify-between">

          <div className="mt-4">
            <div className="flex flex-wrap gap-2 my-2">
              {tools.map((tool, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm font-medium bg-gray-800 text-white rounded-full"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <a href="/caribou/CaribouPoster.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-white mt-4">
            <IoDocumentTextOutline className="text-xl" />
            See the Research Poster
          </a>

        </div>

        <p className="mt-2 text-gray-600 dark:text-gray-300">
        An Ordinary Least Squares regression analysis was conducted on the relationship between logging activities and caribou populations. The OLS model indicated a negative relationship between logging activities and caribou herd population.
        </p>

        <div className="flex flex-row py-6 text-gray-300 text-sm gap-8 mx-3">
          {/* Image 1 */}
          <div className="w-1/2 cursor-pointer">
            <img
              className="w-full h-[30rem] object-fill rounded-lg"
              src="/caribou/disturbances.jpg"
              onClick={() => setSelectedImage("/caribou/disturbances.jpg")}
            />
            <p className="mt-2">Silviculture disturbances are shown superimposed on the location of the caribou herds.</p>
          </div>

          {/* Image 2 */}
          <div className="w-1/2 cursor-pointer">
            <img
              className="w-full h-[30rem] object-fill rounded-lg"
              src="/caribou/results.jpg"
              onClick={() => setSelectedImage("/caribou/results.jpg")}
            />
            <p className="mt-2">The red polygons represent herds which are predicted to have their population decrease at a rate faster than the regression estimates.</p>
          </div>
        </div>
      </div>

      {/* Modal Dialog for Enlarged Image */}
      <Dialog open={!!selectedImage} onClose={() => setSelectedImage(null)} className="relative z-50">
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
            <Dialog.Panel className="max-w-4xl mx-auto p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
            <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-gray-300 hover:text-white text-xl"
            >
                &times;
            </button>

            {selectedImage && (
                <img
                src={selectedImage}
                alt="Expanded view"
                className="max-w-full max-h-[90vh] rounded-lg"
                />
            )}
            </Dialog.Panel>
        </div>
        </Dialog>

    </div>
  );
};

export default CaribouCard;
