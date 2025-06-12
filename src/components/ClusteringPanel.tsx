import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion, AnimatePresence } from "framer-motion";

export default function ClusteringPanel() {
    const [selected, setSelected] = useState("genre")
    const options = [
        { id: "genre", label: "Genre", description: "Clusters artists who have worked together on songs, albums, or live performances. Ideal for visualizing creative partnerships and discovering interconnected artist networks" },
        { id: "collab", label: "Collaboratons", description: "Finds relationships between artists who have worked together on songs, albums, or live performances. Ideal for visualizing creative partnerships and discovering interconnected artist networks." },
        { id: "fanbase", label: "Common Fanbase", description: "Organizes artists by audience overlap. This can help surface surprising connections between artists across genres or scenes." },
        { id: "popularity", label: "Popularity", description: "Groups artists by their general level of popularity, such as streaming numbers or chart performance. Use this to see how top artists relate to rising or niche ones in the broader music landscape." },
    ];
    
    return (
        // TODO: add animation to accordion effect
        <div>
            <RadioGroup
              value={selected}
              onValueChange={setSelected}
              className="flex flex-col items-start w-full gap-0.5 p-1 bg-gray-50 border border-gray-200 rounded-xl shadow-sm"
            >
                {options.map((option) => (
                  <div key={option.id} className="w-full">
                    <label
                      htmlFor={option.id}
                      className={`flex items-start w-full gap-2 rounded-xl p-3 transition-colors cursor-pointer ${
                        selected === option.id ? "bg-gray-200" : "hover:bg-gray-100"
                      }`}
                    >
                      <RadioGroupItem
                        value={option.id}
                        id={option.id}
                        className="mt-1 sr-only"
                      />
                      <div className="flex flex-col items-start">
                        <span className="text-md font-medium leading-none">
                          {option.label}
                        </span>
                          <AnimatePresence mode="wait" initial={false}>
                            {selected === option.id && (
                              <motion.p
                            
                              key={option.id}
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: .8 }}
                              transition={{
                                opacity: { duration: 0.25, ease: "easeOut" },
                                height: { duration: 0.25, ease: "easeOut" }
                              }}
                                className="text-md text-muted-foreground mt-1 text-left"
                              >
                                {option.description}
                              </motion.p>
                            )}
                          </AnimatePresence>
                      </div>
                    </label>
                  </div>
                ))}
            </RadioGroup>
        </div>
    )
}