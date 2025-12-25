import { Card } from "@/components/ui/card"
import { cn, getStatsIcon } from "@/lib/utils"
import type { StatsCardProps, StatsIcon } from "@/types/types"
import { FileText, ArrowUp, ArrowDown, CircleCheck, Users, Clock5, type LucideIcon } from 'lucide-react'


const iconMap: Record<StatsIcon, LucideIcon> = {
    document: FileText,
    check: CircleCheck,
    clock: Clock5,
    users: Users,
}

export function StatsCard({ icon, value, label, trend, iconColor}: StatsCardProps) {
    const isPositive = typeof trend === "number" && trend >= 0
    const Icon = iconMap[icon]
    const iconStyles = getStatsIcon(iconColor)
    
  return (
    <Card>
        <div className='flex flex-row items-center justify-between'>
            <div className={cn(
                'w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-lg',
                iconStyles.bg
                )}>
                <Icon className={cn(
                    iconStyles.text,
                    "w-4.5 h-4.5 md:w-5 md:h-5"
                )} 
                />
            </div>
            {typeof trend === "number" && (
                <span className={cn(
                    'flex items-center gap-1 text-xs font-medium',
                    isPositive ? 'text-success-500' : 'text-error-500'
                    )}>
                        {isPositive ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                        {Math.abs(trend)}%
            </span>
            )}
        </div>
        <div className='text-2xl md:text-[32px] font-bold text-gray-900 tracking-[-0.02em] leading-none'>
            {value}
        </div>
        <div className='text-[13px] text-gray-500'>
            {label}
        </div>
    </Card>
  )
}
