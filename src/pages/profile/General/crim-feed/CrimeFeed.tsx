import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const crimeFeed = [
  { id: "1", description: "Robbery reported in Dhaka", time: "10 mins ago" },
  {
    id: "2",
    description: "Assault reported in Chittagong",
    time: "20 mins ago",
  },
];

const CrimeFeed: React.FC = () => {
  return (
    <Card className="bg-[#131a30] text-white border border-gray-700">
      <CardHeader>
        <h3 className="text-yellow-400 text-lg font-bold">Crime Feed</h3>
      </CardHeader>
      <CardContent>
        {crimeFeed.map((crime) => (
          <div
            key={crime.id}
            className="border-l-4 border-yellow-400 pl-3 mb-3"
          >
            <p>{crime.description}</p>
            <span className="text-gray-400 text-sm">{crime.time}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CrimeFeed;
