import { Button } from "@/components/ui/button";
import { Undo2 } from "lucide-react";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";


export function ResetButton(props: { onClick: () => void }) {
  const { onClick } = props;
  const isMobile = useMediaQuery({ maxWidth: 640 });
  return(
        <motion.div 
      key="artist-graph"
      className={`absolute left-1/2 
        ${isMobile 
        ? "bottom-4" 
        : "bottom-8"}`}
      initial={{ opacity: 0, y: 16, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      exit={{ opacity: 0, y: 16, x: "-50%" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
        <Button
          className="rounded-full p-8 bg-gray-200/90 shadow-lg hover:bg-gray-200"
          size="icon"
          variant="secondary"
          onClick={onClick}
        >
          <Undo2 />
        </Button>
    </motion.div>
    )
}