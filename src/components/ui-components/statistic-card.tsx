import { LucideIcon } from "lucide-react"
import Card from "../ui/card"

export interface StatisticItem {
    name: string
    value: number
    icon: LucideIcon
}

const StatisticCard = ({ stat }: { stat: StatisticItem }) => {
    return (
        <Card className="w-fit">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <stat.icon size={24} className="text-white" />
                </div>
                <div>
                    <p className="text-md font-medium text-primary">{stat.name}</p>
                    <p className="text-2xl font-bold text-black/80">{stat.value}</p>
                </div>
            </div>
        </Card>
    )
}

export default StatisticCard
