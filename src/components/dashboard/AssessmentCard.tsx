import { cn, formatDate, formatTime, getScoreColors, getStatusColors, getStatusLabel } from "@/lib/utils"
import type { Assessment } from "@/types/types"
import { Dot, Download, EllipsisVertical, Eye } from "lucide-react"
import { Button } from "../ui/button"


export function AssessmentCard({
    assessments,
    onOpenDetails,
}: {
    assessments: Assessment[]
    onOpenDetails: (assessment: Assessment) => void
}) {
  return (
    <div className="flex flex-col gap-3">
        {assessments.map((a) => {
                const statusColors = getStatusColors(a.status)
                const statusLabel = getStatusLabel(a.status)
                
                const date = formatDate(a.date)
                const time = formatTime(a.date)

                return (
                    <div key={a.id} 
                        className="bg-white border border-gray-200 rounded-xl p-4 cursor-pointer"
                        onClick={() => onOpenDetails(a)}
                    >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-600 shrink-0">
                                        {a.patient.initials}
                                    </div>
                                <div className="flex flex-col gap-0.5">
                                    <span className="font-semibold text-gray-900">{a.patient.name}</span>
                                    <span className="text-xs text-gray-500">{a.patient.id}</span>
                                </div>
                            </div>
                            <div className={cn(
                                "inline-flex items-center gap-1.5 py-1 px-2.5 text-xs font-medium rounded-full", 
                                statusColors.bg,
                                statusColors.text
                            )}>
                                <Dot size={6} className={cn("rounded-full",statusColors.dot)}/>
                                <span>{statusLabel}</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500">Assessment</span>
                                <span className="text-sm font-medium text-gray-800">{a.type}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500">Score</span>
                                {a.status === "completed" || a.status === "in-progress" ? (() => {
                                                                const scoreColors = getScoreColors(a.score!)
                                
                                                                return (
                                                                    <div className="flex items-center gap-2.5">
                                                                <div className="w-15 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                                    <div className={cn(
                                                                        "h-full rounded-full", 
                                                                        scoreColors.bar
                                                                        )}
                                                                        style={{ width: `${a.score}%` }}
                                                                        />
                                                                </div>
                                                                <span className={cn(
                                                                    "font-semibold text-[13px] min-w-9",
                                                                    scoreColors.text)}>
                                                                    {a.score}
                                                                </span>
                                                            </div>
                                                            )
                                                            })() : (
                                                                <span className="font-semibold text-[13px] min-w-9 text-gray-400">—</span>
                                
                                                            )}

                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500">Date</span>
                                <span className="text-sm font-medium text-gray-800">
                                    {date} • {time}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                            <Button
                                variant={"btnWhite"}
                                className={cn("py-2! px-3! text-[13px]!")}
                                aria-label="View Details"
                                onClick={() => onOpenDetails(a)}
                            >
                                <Eye size={16} />
                                View Details
                            </Button>
                            <div className="flex items-center gap-1">
                                <button 
                                    className="w-8 h-8 flex items-center justify-center border-none bg-transparent text-gray-400 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 transition-all delay-150 ease-in-out"
                                    aria-label="Download Report"
                                    title="Download Report"
                                    >
                                        <Download size={16} />
                               </button>
                                <button 
                                    className="w-8 h-8 flex items-center justify-center border-none bg-transparent text-gray-400 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 transition-all delay-150 ease-in-out"
                                    aria-label="More Options"
                                    title="More Options"
                                >
                                        <EllipsisVertical size={16} />
                                </button>
                            </div>
                        </div>
                        
                    </div>

                )
            })}
      
    </div>
  )
}
