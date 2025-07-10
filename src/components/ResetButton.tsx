import { Button } from "@/components/ui/button";
import { Undo2 } from "lucide-react";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { useEffect, useCallback, useState } from "react";

interface ResetButtonProps {
    onClick: () => void;
    show: boolean;
}

export function ResetButton({ onClick, show }: ResetButtonProps) {

  const isMobile = useMediaQuery({ maxWidth: 640 }); // pass this in as a prop if you want to use it
  const [isLayoutAnimating, setIsLayoutAnimating] = useState(false);
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.metaKey && event.key === "ArrowLeft") {
        onClick();
      }
    },
    [onClick]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return show && (
      <motion.div 
      layout
      // initial={{ opacity: 0, y: 16 }}
      // animate={{ opacity: isLayoutAnimating ? 0 : 1, y: 0 }}
      // exit={{ opacity: 0, y: 16 }}
      // onLayoutAnimationStart={() => setIsLayoutAnimating(true)}
      // onLayoutAnimationComplete={() => setIsLayoutAnimating(false)}
      // transition={{ layout: { delay: .2, duration: 0.2, ease: "easeInOut" }, opacity: { duration: 0.2 } }}
      // transition={{ layout: { duration: 0.4 }, opacity: { duration: 0.2, ease: "easeInOut" } }}
    >
        <Button
          className="rounded-full h-[54px] w-[54px] bg-stone-100/90 dark:bg-stone-900/50 backdrop-blur-xs border border-input shadow-lg"
          size="icon"
          variant="secondary"
          onClick={onClick}
        >
          <Undo2 />
        </Button>
    </motion.div>
    )
}