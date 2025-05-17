import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"


export default function DisplayPanel() {
    
    return (
        <div>
            <div className="flex flex-col items-start w-full align-start gap-4 p-1 bg-gray-50 border border-gray-200 rounded-xl shadow-sm">
            <Switch id="show-labels" defaultChecked />
            <Switch id="show-labels" defaultChecked />
            <Switch id="show-labels" defaultChecked />
            <Slider />
            <Slider />
            <Slider />
            
            </div>
        </div>
    )
}