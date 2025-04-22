

import React from "react";
import { HardHat } from "lucide-react"; 

export default function UnderConstruction() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center bg-yellow-100 text-yellow-800 p-4 rounded-full">
          <HardHat className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Under Construction</h1>
        <p className="text-gray-600 text-lg">
          Currently Unavailable in MVP
        </p>
      </div>
    </div>
  );
}
