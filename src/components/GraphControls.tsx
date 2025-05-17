import { useState, useEffect, useRef, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ClusteringPanel from "./ClusteringPanel";
import { Spline, Settings2, Tag } from "lucide-react";

type PanelType = "clustering" | "display" | "genres";

export function GraphControls() {
  const [activePanel, setActivePanel] = useState<PanelType>();

  const tabs: { id: PanelType; icon: React.ReactNode; label: string }[] = [
    { id: "clustering", icon: <Spline size={16} />, label: "Clustering" },
    { id: "display", icon: <Settings2 size={16} />, label: "Display" },
    { id: "genres", icon: <Tag size={16} />, label: "Genres" },
  ];

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
              setActivePanel(undefined);
            }
          };
      
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, []);

  return (
    // Container for the graph controls
    <div 
    ref={containerRef} className={`fixed top-1 right-1 z-50  p-2 rounded-xl overflow-hidden ${
      activePanel ? "w-xs flex flex-col gap-2 bg-white border-1 border-gray-200 shadow-md" : ""}`}>
    {/* tabs container */}
      <div className="flex justify-end gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActivePanel(tab.id)}
            className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all ${
                activePanel === tab.id
                  ? "bg-gray-100 text-gray-700 font-medium"
                  : "text-gray-500"
              }`}
          >
            {tab.icon}
            {activePanel === tab.id && <span className="text-sm">{tab.label}</span>}
          </button>
        ))}
      </div>
      <div className="">
        <AnimatePresence mode="wait">
          {activePanel === "clustering" && (
            <motion.div
              key="clustering"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <ClusteringPanel />
            </motion.div>
          )}
          {activePanel === "display" && (
            <motion.div
              key="display"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {/* <DisplayPanel /> */}
            </motion.div>
          )}
          {activePanel === "genres" && (
            <motion.div
              key="genres"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {/* <GenresPanel /> */}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}