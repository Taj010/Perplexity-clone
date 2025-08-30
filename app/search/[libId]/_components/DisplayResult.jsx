import React, { useState, useEffect } from "react";
import { Sparkles, Image, Video, List } from "lucide-react";
import AnswerDisplay from "./AnswerDisplay";
import axios from "axios";
import { SEARCH_RESULT } from "@/services/Shared";

const tabs = [
  { label: "Answer", icon: Sparkles },
  { label: "Images", icon: Image },
  { label: "Videos", icon: Video },
  { label: "Sources", icon: List, badge: 10 },
];

function DisplayResult({ searchInputRecord }) {
  const [activeTab, setActiveTab] = useState("Answer");
  const [searchResults, setSearchResults] = useState(SEARCH_RESULT);

  useEffect(() => {
    //    searchInputRecord&&GetSearchApiResult();
  }, [searchInputRecord]);

  const GetSearchApiResult = async () => {
    try {
      const result = await axios.post("/api/brave-search-api", {
        searchInput: searchInputRecord?.searchInput,
        searchType: searchInputRecord?.type,
      });
      console.log("Search results:", result.data);
      console.log(JSON.stringify(result.data));
      setSearchResults(result.data);
    } catch (error) {
      console.error("Search API error:", error);
    }
  };

  return (
    <div className="mt-7">
      <h2 className="font-medium text-3xl line-clamp-1">
        {searchInputRecord?.searchInput}
      </h2>
      <div className="flex items-center space-x-6 border-b border-gray-200 pb-2 mt-6">
        {tabs.map(({ label, icon: Icon, badge }) => (
          <button
            key={label}
            onClick={() => setActiveTab(label)}
            className={`flex items-center gap-1 relative text-sm font-medium text-gray-700 hover:text-black ${
              activeTab === label ? "text-black" : ""
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
            {badge && (
              <span className="ml-1 text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                {badge}
              </span>
            )}
            {activeTab === label && (
              <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-black rounded"></span>
            )}
          </button>
        ))}
        <div className="ml-auto text-sm text-gray-500">
          1 task <span className="ml-1">↗</span>
        </div>
      </div>
      <div>
        {activeTab === "Answer" ? (
          <AnswerDisplay searchResults={searchResults} />
        ) : null}
      </div>
    </div>
  );
}

export default DisplayResult;
