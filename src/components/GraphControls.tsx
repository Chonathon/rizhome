import { useState, useEffect, useRef, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ClusteringPanel from "./ClusteringPanel";
import DisplayPanel from "./DisplayPanel";
import GenrePanel from "./GenrePanel";
import { Spline, Settings2, Tag, RotateCcw } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

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
  // State to control rotation animation
  const [isRotating, setIsRotating] = useState(false);

  const handleResetClick = () => {
    // TODO: Reset logic for graph controls can be implemented here
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
    }, 200);
  };

  return (
    <motion.div
      key="graph-controls"
      ref={containerRef}
      initial={{ opacity: 0, y:0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`fixed top-4 right-4 z-50 w-sm flex flex-col gap-2 p-2 rounded-xl overflow-hidden   ${activePanel ? "bg-white border border-gray-200 shadow-md" : ""}`}
    >
      <div className="relative flex items-center
 justify-end gap-1">
    {activePanel ? 
        <Button
        onClick={handleResetClick}
        variant="ghost" size="icon" className="absolute top-1/2 -translate-y-1/2 left-0 size-10">
     <motion.div
       animate={ isRotating ?{rotate: -45 } : "rotate"}
       transition={{ type: "spring", stiffness: 300, damping: 12 }}
     >
       <RotateCcw size={20} />
     </motion.div>
        </Button> : ""}
            
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            onClick={() => setActivePanel(tab.id)}
            variant="ghost"
            className={` ${
              activePanel === tab.id
                ? "bg-gray-100 text-gray-700 font-medium"
                : ""
            }`}
          >
            {tab.icon}
            {activePanel === tab.id && 
            <motion.span 
            className="text-sm w-full overflow-hidden rounded-sm"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                >
            
              {tab.label}
            </motion.span>}
          </Button>
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