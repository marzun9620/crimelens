import { useState } from "react";

export default function ReportCrime() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!image) {
      setError("Please upload an image");
      return;
    }

    // Implement crime reporting logic here
    console.log("Crime report submitted:", {
      title,
      description,
      division,
      district,
      image,
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Report a Crime</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
            rows={4}
          />
        </div>
        <div>
          <label htmlFor="division" className="block mb-1">
            Division
          </label>
          <input
            type="text"
            id="division"
            value={division}
            onChange={(e) => setDivision(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="district" className="block mb-1">
            District
          </label>
          <input
            type="text"
            id="district"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="image" className="block mb-1">
            Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Report Crime
        </button>
      </form>
    </div>
  );
}
