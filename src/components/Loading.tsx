import { Loader } from "lucide-react";

export function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background text-foreground z-50">
            <Loader className="animate-spin" size={24} />
    </div>
  );
}