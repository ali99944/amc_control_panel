import { LucideIcon } from "lucide-react"
import Card from "../ui/card"

export interface StatisticItem {
    name: string
    value: number | string
    icon: LucideIcon
}

const StatisticCard = ({ stat }: { stat: StatisticItem }) => {
    return (
        <Card className="!p-2">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <stat.icon size={24} className="text-white" />
                </div>
                <div>
                    <p className="text-sm text-gray-600">{stat.name}</p>
                    <p className="text-lg font-bold text-primary">{stat.value}</p>
                </div>
            </div>
        </Card>
    )
}

export default StatisticCard

