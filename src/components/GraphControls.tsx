import { useState, useEffect, useRef, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ClusteringPanel from "./ClusteringPanel";
import DisplayPanel from "./DisplayPanel";
import GenrePanel from "./GenrePanel";
import { Spline, Settings2, Tag, RotateCcw } from "lucide-react";

type PanelType = "clustering" | "display" | "genres";

export function GraphControls() {
  const [activePanel, setActivePanel] = useState<PanelType>();

  const tabs: { id: PanelType; icon: React.ReactNode; label: string }[] = [
    { id: "clustering", icon: <Spline size={20} />, label: "Clustering" },
    { id: "display", icon: <Settings2 size={20} />, label: "Display" },
    { id: "genres", icon: <Tag size={20} />, label: "Genres" },
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
    <motion.div
      key="graph-controls"
      ref={containerRef}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`fixed top-4 right-4 z-50 w-sm flex flex-col gap-2 p-2 rounded-xl overflow-hidden   ${activePanel ? "bg-white border border-gray-200 shadow-md" : ""}`}
    >
      <div className="relative flex items-center
 justify-end gap-1">
    {activePanel ? 
        <button className="absolute top-1/2 -translate-y-1/2 left-0 flex items-center gap-1 px-2 py-1 rounded-md text-gray-500 transition-all hover:bg-gray-100">
            <RotateCcw size={20}/>
            {/* TODO: onClick should reset graph controls to defaults */}
        </button> : ""}
            
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActivePanel(tab.id)}
            className={`flex items-center gap-1 px-2 py-1 rounded-md text-gray-500 transition-all hover:bg-gray-100 ${
              activePanel === tab.id
                ? "bg-gray-100 text-gray-700 font-medium"
                : ""
            }`}
          >
            {tab.icon}
            {activePanel === tab.id && <span className="text-sm">{tab.label}</span>}
          </button>
        ))}
      </div>
      <div>
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
              <DisplayPanel />
            </motion.div>
          )}
          {activePanel === "genres" && (
            <motion.div
              key="genres"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <GenrePanel />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}