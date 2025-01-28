"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

// Define the type for search result
type SearchResult = {
  _id: string;
  name: string;
};

export function GlobalSearchBar() {
  const [value, setValue] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<SearchResult[]>([]); // Use the defined type
  const router = useRouter();

  // Fetch results when value changes
  React.useEffect(() => {
    if (value.trim()) {
      const fetchResults = async () => {
        const response = await fetch(
          `/api/search?q=${value}`,
        );
        const data = await response.json();
        setSearchResults(data);
      };
      fetchResults();
    } else {
      setSearchResults([]);
    }
  }, [value]);

  return (
    <div className="relative flex items-center w-full gap-3 bg-gray-100 rounded-full">
      <input
        type="text"
        placeholder="Search for products..."
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
        className="border-none bg-transparent text-gray-400 font-satoshi text-[16px] leading-[22px] outline-none w-full"
      />
      {value && searchResults.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white shadow-lg border rounded z-10 max-h-[200px] overflow-y-auto">
          {searchResults.map((result, index) => (
            <div
              key={result._id}
              onClick={() => {
                router.push(`/productdetail/${result._id}`); // Navigate to product page
              }}
              className={`p-2 hover:bg-gray-100 cursor-pointer ${index < 3 ? "" : "opacity-60"}`}>
              {result.name}
              <Check className="ml-auto opacity-0" />
            </div>
          ))}
        </div>
      )}
      {value && searchResults.length === 0 && (
        <div className="absolute top-full mt-2 w-full bg-white shadow-lg border rounded z-10">
          <div className="p-2">No results found.</div>
        </div>
      )}
    </div>
  );
}
