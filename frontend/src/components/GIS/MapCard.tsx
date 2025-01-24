import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { IoDocumentTextOutline } from "react-icons/io5";

const MapCard: React.FC = () => {
  const tools = ["ArcGIS", "ArcGIS Pro", "DataBC", "Cartography", "Blood", "Sweat", "Tears"];

  return (
    <div className="max-w-xlg bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 dark:bg-gray-900 dark:border-gray-700 m-20 mt-0 mb-12">
      <div className="p-6 pb-0">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
        More Than Just a Map: A Tribute to My Time in the North
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

        </div>

        <p className="mt-2 text-gray-600 dark:text-gray-300">
        This map is a personal project where I explored the artistic side of GIS, inspired by my summer's tree planting in Northern BC. I've spent countless hours driving up and down Highway 97 to and from Prince George on my days off and navigating the region's busy logging roads in the company F-550 trucks, calling out, "Pick-up 50 down on the Crocker."
I've marked the two planting camps where I lived out of a tent—enduring hot, cold, and rainy nights in Bear Country. I've planted over 100,000 trees in this area, contributing to my tree planting career total of over half a million.
This map holds deep sentimental value for me, so much so that I have a 3-by-3-foot framed copy displayed in my living room, a constant reminder of my connection to this land.</p>

        <div className="w-full flex flex-col items-center justify-center text-center mt-4">
          <img
            className="h-[35rem] object-fill rounded-lg"
            src="/ForestServiceRoadsPG.jpg"
            alt="Caribou Disturbances"
          />
          <a
            href="/ForestServiceRoadsPG.jpg"
            target="_blank"
            rel="noopener noreferrer"
            className="my-4 inline-block px-4 py-2 bg-black-500 border border-gray-700 text-white font-semibold rounded-lg hover:bg-pink-700 transition"
          >
            View in all its Glory
          </a>
        </div>
      </div>



    </div>
  );
};

export default MapCard;