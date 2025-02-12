import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ReportForm: React.FC = () => {
  const [report, setReport] = useState("");

  const handleSubmit = () => {
    alert(`Crime reported: ${report}`);
  };

  return (
    <div className="bg-[#131a30] text-white p-6 rounded-lg">
      <h3 className="text-yellow-400 text-lg font-bold mb-4">Report a Crime</h3>
      <Input
        placeholder="Describe the crime..."
        className="mb-4 bg-gray-900 text-white border border-gray-700"
        value={report}
        onChange={(e) => setReport(e.target.value)}
      />
      <Button
        className="bg-yellow-400 text-black w-full"
        onClick={handleSubmit}
      >
        Submit Report
      </Button>
    </div>
  );
};

export default ReportForm;
