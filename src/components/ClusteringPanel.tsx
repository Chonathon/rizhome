import { useState } from "react";

export default function ClusteringPanel() {
    const [selected, setSelected] = useState("genre")
    const options = [
        { id: "genre", label: "Genre", description: "Clusters artists who have worked together on songs, albums, or live performances. Ideal for visualizing creative partnerships and discovering interconnected artist networks" },
        { id: "collab", label: "Collaboratons", description: "Clusters artists who have worked together on songs, albums, or live performances. Ideal for visualizing creative partnerships and discovering interconnected artist networks." },
        { id: "fanbase", label: "Common Fanbase", description: "Organizes artists by audience overlap. This can help surface surprising connections between artists across genres or scenes." },
        { id: "popularity", label: "Popularity", description: "Groups artists by their general level of popularity, such as streaming numbers or chart performance. Use this to see how top artists relate to rising or niche ones in the broader music landscape." },
    ];
    
    return (
        <div>
            <div className="flex flex-col items-start w-full align-start gap-0.5 p-1 bg-gray-50 border border-gray-200 rounded-xl shadow-sm">
            {options.map((option) => (
          <button
            key={option.id}
            onClick={() => setSelected(option.id)}
            className={`flex w-full flex-col gap-0.5 items-start text-left appearance-none border-none  p-3 rounded-xl transition-all font-medium ${
                selected === option.id
                  ? "bg-gray-300"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-200"
              }`}
          >
            {option.label}
            {selected === option.id && <span className="text-md font-normal">{option.description}</span>}
          </button>
        ))}
            </div>
        </div>
    )
}