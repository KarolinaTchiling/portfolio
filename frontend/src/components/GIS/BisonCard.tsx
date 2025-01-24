import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { IoDocumentTextOutline } from "react-icons/io5";

const BisonCard: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const tools = ["ArcGIS", "ArcMap", "Multi-Criteria Decision Analysis", "GeoYukon"];

  return (
    <div className="max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 dark:bg-gray-900 dark:border-gray-700 m-20 mt-0 mb-12">
      <div className="p-6 pb-0">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
          Habitat Suitability Analysis of the Aishihik Wood Bison Herd in Yukon, Canada
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

          <a href="/bison/BisonPoster.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-white mt-4">
            <IoDocumentTextOutline className="text-xl" />
            See the Research Poster
          </a>

        </div>

        <p className="mt-2 text-gray-600 dark:text-gray-300">
          A weighted suitability analysis was conducted to identify the favorable and unfavorable areas throughout the Aishihik wood bison herd's range. The weighted model considered two major influences; environmental/physical and human activities.
        </p>

    {/* Image Layout */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-6 text-gray-300 text-sm mx-3">
  
      {/* Image 1 (Full Width on Mobile, Half on Larger Screens) */}
      <div className="cursor-pointer">
        <img
          className="w-full object-fit rounded-lg"
          src="/bison/final.jpg"
          onClick={() => setSelectedImage("/bison/final.jpg")}
        />
      </div>

      {/* Text Content with Buttons */}
      <div className="flex flex-col justify-center gap-6">
        <p>
          The environmental data consisted of a landcover and fire history shapefile as well as a DEM used for slope and aspect calculations.
          These 5 factors were classified into suitability on a scale of 1 - 5 and used to create the habitat suitability map as shown on the top left image.
        </p>
        
        <button
          onClick={() => setSelectedImage("/bison/physical.jpg")}
          className="px-4 py-2 bg-black-500 border border-gray-700 text-white font-semibold rounded-lg hover:bg-green-600 transition"
        >
          View Environmental Suitability Maps
        </button>

        <p>
          The human data consisted of road vector files, settlement polygons, and a natural resource activity point file which included mining, drill holes,
          gravel pits, wind energy, and hydro energy sites. Each variable was buffered and classified to create the habitat suitability map as shown on the image in the top right.
        </p>

        <button
          onClick={() => setSelectedImage("/bison/human.jpg")}
          className="px-4 py-2 bg-black-500 border border-gray-700 text-white font-semibold rounded-lg hover:bg-purple-600 transition"
        >
          View Human Influence Maps
        </button>

        <p className="pt-12">
          A weighted suitability analysis combined both influences to identify the favorable and unfavorable areas throughout the herd range.
          As shown in the map to the left; red areas represent low habitat suitability, whereas green areas represent areas of high habitat suitability.
        </p>
      </div>
    </div>

      </div>

      {/* Modal Dialog for Enlarged Image */}
      <Dialog open={!!selectedImage} onClose={() => setSelectedImage(null)} className="relative z-50">
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <Dialog.Panel className="max-w-4xl mx-auto p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg relative">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-gray-300 hover:text-white text-2xl"
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

export default BisonCard;
