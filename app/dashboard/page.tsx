"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { isDarkMode, user, properties } = useStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  // Redirect if not authenticated
  if (!user) {
    router.push("/login");
    return null;
  }

  const { data: userProperties = [] } = useQuery({
    queryKey: ["userProperties", user.id],
    queryFn: () => api.getProperties({ ownerId: user.id }),
  });

  const { data: offers = [] } = useQuery<any>({
    queryKey: ["offers", user.id],
    queryFn: () => api.getOffers(user.id),
  });

  const stats = {
    totalProperties: userProperties.length,
    totalOffers: offers.length,
    pendingOffers: offers.filter((o: any) => o.status === "pending").length,
    acceptedOffers: offers.filter((o: any) => o.status === "accepted").length,
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: "ri-dashboard-line" },
    { id: "properties", label: "My Properties", icon: "ri-home-line" },
    { id: "offers", label: "Offers", icon: "ri-hand-coin-line" },
    { id: "favorites", label: "Favorites", icon: "ri-heart-line" },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-2`}>
            Welcome back, {user.name}!
          </h1>
          <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Manage your properties and track your real estate activities
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Properties", value: stats.totalProperties, icon: "ri-home-line", color: "blue" },
            { label: "Total Offers", value: stats.totalOffers, icon: "ri-hand-coin-line", color: "green" },
            { label: "Pending Offers", value: stats.pendingOffers, icon: "ri-time-line", color: "yellow" },
            { label: "Accepted Offers", value: stats.acceptedOffers, icon: "ri-check-line", color: "green" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-lg p-6`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {stat.label}
                  </p>
                  <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>{stat.value}</p>
                </div>
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-full flex items-center justify-center`}>
                  <i className={`${stat.icon} text-2xl text-${stat.color}-600`}></i>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 cursor-pointer ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : `border-transparent ${
                          isDarkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"
                        }`
                  }`}
                >
                  <i className={tab.icon}></i>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* Recent Properties */}
              <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-lg p-6`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    Recent Properties
                  </h3>
                  <Link
                    href="/dashboard/add-property"
                    className="text-blue-600 hover:text-blue-700 text-sm cursor-pointer"
                  >
                    Add New
                  </Link>
                </div>
                <div className="space-y-3">
                  {userProperties.slice(0, 3).map((property, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>{property.title}</p>
                        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                          ${property.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Offers */}
              <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-lg p-6`}>
                <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"} mb-4`}>
                  Recent Offers
                </h3>
                <div className="space-y-3">
                  {offers.slice(0, 3).map((offer: any, index: number) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          ${offer.amount.toLocaleString()}
                        </p>
                        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                          Property #{offer.propertyId}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          offer.status === "accepted"
                            ? "bg-green-100 text-green-800"
                            : offer.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {offer.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "properties" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  My Properties
                </h3>
                <Link
                  href="/dashboard/add-property"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Add Property
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userProperties.map((property, index) => (
                  <div
                    key={index}
                    className={`${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-lg overflow-hidden`}
                  >
                    <div className="h-48 overflow-hidden">
                      <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <h4 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"} mb-2`}>
                        {property.title}
                      </h4>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-2`}>
                        {property.location}
                      </p>
                      <p className="text-lg font-bold text-blue-600 mb-3">${property.price.toLocaleString()}</p>
                      <div className="flex space-x-2">
                        <Link
                          href={`/properties/${property.id}`}
                          className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm text-center hover:bg-blue-700 transition-colors cursor-pointer"
                        >
                          View
                        </Link>
                        <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-3 rounded text-sm hover:bg-gray-50 transition-colors cursor-pointer">
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "offers" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h3 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-900"} mb-6`}>Offers</h3>

              <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-lg overflow-hidden`}>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className={`${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                      <tr>
                        <th
                          className={`px-6 py-3 text-left text-xs font-medium ${
                            isDarkMode ? "text-gray-300" : "text-gray-500"
                          } uppercase tracking-wider`}
                        >
                          Property
                        </th>
                        <th
                          className={`px-6 py-3 text-left text-xs font-medium ${
                            isDarkMode ? "text-gray-300" : "text-gray-500"
                          } uppercase tracking-wider`}
                        >
                          Amount
                        </th>
                        <th
                          className={`px-6 py-3 text-left text-xs font-medium ${
                            isDarkMode ? "text-gray-300" : "text-gray-500"
                          } uppercase tracking-wider`}
                        >
                          Status
                        </th>
                        <th
                          className={`px-6 py-3 text-left text-xs font-medium ${
                            isDarkMode ? "text-gray-300" : "text-gray-500"
                          } uppercase tracking-wider`}
                        >
                          Date
                        </th>
                        <th
                          className={`px-6 py-3 text-left text-xs font-medium ${
                            isDarkMode ? "text-gray-300" : "text-gray-500"
                          } uppercase tracking-wider`}
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      className={`${isDarkMode ? "bg-gray-800" : "bg-white"} divide-y ${
                        isDarkMode ? "divide-gray-700" : "divide-gray-200"
                      }`}
                    >
                      {offers.map((offer: any, index: number) => (
                        <tr key={index}>
                          <td className={`px-6 py-4 whitespace-nowrap ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            Property #{offer.propertyId}
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            ${offer.amount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                offer.status === "accepted"
                                  ? "bg-green-100 text-green-800"
                                  : offer.status === "rejected"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {offer.status}
                            </span>
                          </td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap text-sm ${
                              isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {offer.createdAt}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button className="text-blue-600 hover:text-blue-700 cursor-pointer">View Details</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "favorites" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h3 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-900"} mb-6`}>
                Favorite Properties
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Favorite properties would be loaded here */}
                <div className="col-span-full text-center py-12">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-heart-line text-3xl text-gray-400"></i>
                  </div>
                  <h3 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-900"} mb-2`}>
                    No favorites yet
                  </h3>
                  <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Start adding properties to your favorites to see them here
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
