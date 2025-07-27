"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { motion } from "framer-motion";

export default function UnitConverter() {
  const { isDarkMode } = useStore();
  const [activeTab, setActiveTab] = useState("area");

  // Area converter state
  const [areaValue, setAreaValue] = useState("");
  const [areaFromUnit, setAreaFromUnit] = useState<AreaUnit>("sqft");
  const [areaToUnit, setAreaToUnit] = useState<AreaUnit>("sqm");
  const [areaResult, setAreaResult] = useState("");

  // Length converter state
  const [lengthValue, setLengthValue] = useState("");
  const [lengthFromUnit, setLengthFromUnit] = useState<LengthUnit>("feet");
  const [lengthToUnit, setLengthToUnit] = useState<LengthUnit>("meters");
  const [lengthResult, setLengthResult] = useState("");

  // Area conversion factors to square feet

  type AreaUnit = "sqft" | "sqm" | "sqyd" | "acre" | "hectare";
  type LengthUnit = "feet" | "meters" | "yards" | "inches" | "centimeters";

  const areaFactors = {
    sqft: 1,
    sqm: 10.764,
    sqyd: 9,
    acre: 43560,
    hectare: 107639,
  };

  // Length conversion factors to feet
  const lengthFactors = {
    feet: 1,
    meters: 3.28084,
    yards: 3,
    inches: 0.0833333,
    centimeters: 0.0328084,
  };

  const convertArea = () => {
    if (!areaValue || isNaN(Number(areaValue))) {
      setAreaResult("");
      return;
    }

    const inputInSqFt = Number(areaValue) * areaFactors[areaFromUnit];
    const result = inputInSqFt / areaFactors[areaToUnit];
    setAreaResult(result.toFixed(6));
  };

  const convertLength = () => {
    if (!lengthValue || isNaN(Number(lengthValue))) {
      setLengthResult("");
      return;
    }

    const inputInFeet = Number(lengthValue) * lengthFactors[lengthFromUnit];
    const result = inputInFeet / lengthFactors[lengthToUnit];
    setLengthResult(result.toFixed(6));
  };

  const tabs = [
    { id: "area", label: "Area", icon: "ri-square-line" },
    { id: "length", label: "Length", icon: "ri-ruler-line" },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"} transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-4`}>Unit Converter</h1>
          <p className={`text-xl ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Convert between different units of measurement for real estate calculations
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex justify-center">
            <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-lg p-1 shadow-lg`}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white"
                      : `${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900"}`
                  }`}
                >
                  <i className={tab.icon}></i>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Area Converter */}
        {activeTab === "area" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-lg p-8`}
          >
            <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-6`}>Area Converter</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* From */}
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-2`}>
                  From
                </label>
                <div className="space-y-4">
                  <input
                    type="number"
                    value={areaValue}
                    onChange={(e:any) => {
                      setAreaValue(e.target.value);
                      setTimeout(convertArea, 100);
                    }}
                    placeholder="Enter value"
                    className={`w-full px-4 py-3 border ${
                      isDarkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white text-gray-900"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg`}
                  />
                  <select
                    value={areaFromUnit}
                    onChange={(e:any) => {
                      setAreaFromUnit(e.target.value);
                      setTimeout(convertArea, 100);
                    }}
                    className={`w-full px-4 py-3 border ${
                      isDarkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white text-gray-900"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8`}
                  >
                    <option value="sqft">Square Feet</option>
                    <option value="sqm">Square Meters</option>
                    <option value="sqyd">Square Yards</option>
                    <option value="acre">Acres</option>
                    <option value="hectare">Hectares</option>
                  </select>
                </div>
              </div>

              {/* To */}
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-2`}>
                  To
                </label>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={areaResult}
                    readOnly
                    placeholder="Result will appear here"
                    className={`w-full px-4 py-3 border ${
                      isDarkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-gray-50 text-gray-900"
                    } rounded-lg text-lg font-semibold`}
                  />
                  <select
                    value={areaToUnit}
                    onChange={(e:any) => {
                      setAreaToUnit(e.target.value);
                      setTimeout(convertArea, 100);
                    }}
                    className={`w-full px-4 py-3 border ${
                      isDarkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white text-gray-900"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8`}
                  >
                    <option value="sqft">Square Feet</option>
                    <option value="sqm">Square Meters</option>
                    <option value="sqyd">Square Yards</option>
                    <option value="acre">Acres</option>
                    <option value="hectare">Hectares</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={convertArea}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer"
              >
                Convert
              </button>
            </div>
          </motion.div>
        )}

        {/* Length Converter */}
        {activeTab === "length" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-lg p-8`}
          >
            <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-6`}>
              Length Converter
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* From */}
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-2`}>
                  From
                </label>
                <div className="space-y-4">
                  <input
                    type="number"
                    value={lengthValue}
                    onChange={(e:any) => {
                      setLengthValue(e.target.value);
                      setTimeout(convertLength, 100);
                    }}
                    placeholder="Enter value"
                    className={`w-full px-4 py-3 border ${
                      isDarkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white text-gray-900"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg`}
                  />
                  <select
                    value={lengthFromUnit}
                    onChange={(e:any) => {
                      setLengthFromUnit(e.target.value);
                      setTimeout(convertLength, 100);
                    }}
                    className={`w-full px-4 py-3 border ${
                      isDarkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white text-gray-900"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8`}
                  >
                    <option value="feet">Feet</option>
                    <option value="meters">Meters</option>
                    <option value="yards">Yards</option>
                    <option value="inches">Inches</option>
                    <option value="centimeters">Centimeters</option>
                  </select>
                </div>
              </div>

              {/* To */}
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-2`}>
                  To
                </label>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={lengthResult}
                    readOnly
                    placeholder="Result will appear here"
                    className={`w-full px-4 py-3 border ${
                      isDarkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-gray-50 text-gray-900"
                    } rounded-lg text-lg font-semibold`}
                  />
                  <select
                    value={lengthToUnit}
                    onChange={(e:any) => {
                      setLengthToUnit(e.target.value);
                      setTimeout(convertLength, 100);
                    }}
                    className={`w-full px-4 py-3 border ${
                      isDarkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white text-gray-900"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8`}
                  >
                    <option value="feet">Feet</option>
                    <option value="meters">Meters</option>
                    <option value="yards">Yards</option>
                    <option value="inches">Inches</option>
                    <option value="centimeters">Centimeters</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={convertLength}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer"
              >
                Convert
              </button>
            </div>
          </motion.div>
        )}

        {/* Common Conversions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`mt-8 ${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-lg p-8`}
        >
          <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-6`}>
            Common Real Estate Conversions
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className={`font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-3`}>
                Area Conversions
              </h4>
              <div className={`space-y-2 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                <div>1 Square Foot = 0.092903 Square Meters</div>
                <div>1 Square Meter = 10.764 Square Feet</div>
                <div>1 Acre = 43,560 Square Feet</div>
                <div>1 Hectare = 107,639 Square Feet</div>
              </div>
            </div>

            <div>
              <h4 className={`font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-3`}>
                Length Conversions
              </h4>
              <div className={`space-y-2 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                <div>1 Foot = 0.3048 Meters</div>
                <div>1 Meter = 3.28084 Feet</div>
                <div>1 Yard = 3 Feet</div>
                <div>1 Inch = 2.54 Centimeters</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
