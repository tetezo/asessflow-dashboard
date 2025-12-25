import type { Assessment } from "@/types/types";
import { Sheet, SheetClose, SheetContent, SheetFooter } from "@/components/ui/sheet";
import { Calendar, Dot, Download, IdCard, SquarePen, X } from "lucide-react";
import { cn, formatDate, getScoreColors, getStatusColors, getStatusLabel } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function AssessmentDetail({
    open,
    onOpenChange,
    assessment,
}: {
    open: boolean
    onOpenChange: (open: boolean) => void
    assessment: Assessment | null
}) {
    if (!assessment) return null

    const date = formatDate(assessment.date)

    const statusColors = getStatusColors(assessment.status)
    const statusLabel = getStatusLabel(assessment.status)

    const scoreColors = assessment.score
        ? getScoreColors(assessment.score)
        : null
console.log("assesmenttt")
  return (
    <Sheet
        open={open}
        onOpenChange={onOpenChange}
    >
        <SheetContent
            onOpenAutoFocus={(e) => e.preventDefault()}
        >
            
            <div className=" flex items-center justify-between py-5 px-6 border-b border-gray-200">
                <h2 className="text-[18px] text-start font-semibold text-gray-900">
                    Assessment Details
                </h2>
                <SheetClose asChild>
                    <Button
                    variant={"btnClose"}
                    size={"closeBtn"}
                    aria-label="Close"
                    onClick={() => onOpenChange(false)}
                >
                    <X size={20} />
                </Button>

                </SheetClose>
{/*                 <Button
                    className="text-black bg-blue-300"
                    aria-label="Close"
                    onClick={() => onOpenChange(false)}
                >
                    <X className="w-8 h-8" />
                </Button> */}
            </div>

            <div className="overflow-y-auto p-6">
                <div className="flex items-center gap-4 pb-6 border-b border-b-gray-200 mb-6">
                    <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center text-[20px] font-semibold text-primary-700">
                        {assessment.patient.initials}
                    </div>
                    <div className="flex-1">
                        <h3 className="text-[18px] font-semibold text-gray-900 mb-1">
                            {assessment.patient.name}
                        </h3>
                        <div className="flex items-center gap-3 text-[13px] text-gray-500">
                            <span className="flex items-center gap-1">
                                <IdCard size={14} />
                                {assessment.patient.id}
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar size={14} />
                                {date}
                            </span>
                        </div>
                    </div>
                </div>
            {/* assesment info */}
                <div className="mb-6">
                    <h4 className="text-[11px] font-semibold text-gray-500 uppercase tracking-[0.05em] mb-3">
                        Assessment Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-gray-500">
                                Assessment Type
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                                {assessment.type}
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-gray-500">
                                Status
                            </span>
                            <span>
                                <div className={cn(
                                    "inline-flex items-center gap-1.5 py-1 px-2.5 text-xs font-medium rounded-full", 
                                    statusColors.bg,
                                    statusColors.text
                                )}>
                                    <Dot size={6} className={cn("rounded-full",statusColors.dot)}/>
                                    <span>{statusLabel}</span>
                                </div>
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-gray-500">
                                Administered By
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                                {assessment.administeredBy.name}
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-gray-500">
                                Duration
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                                {assessment.duration}
                            </span>
                        </div>
                    </div>
                </div>
            {/* overall */}
                <div className="mb-6">
                    <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-[0.05] mb-3">
                        Overall score
                    </span>

                    <div className="bg-gray-50 rounded-xl mt-2 p-6 text-center">
                        <div className="relative w-35 h-17.5 mt-0 mx-auto mb-4">
                            <svg viewBox="0 0 100 50" className="w-full h-full">
                                {/* background arc */}
                                <path
                                d="M90 50 A40 40 0 0 0 10 50"
                                fill="none"
                                stroke="#E5E7EB"
                                strokeWidth="14"
                                />

                            {/* value arc */}
                                <path
                                d="M90 50 A40 40 0 0 0 10 50"
                                fill="none"
                                stroke="url(#gradient)"
                                strokeWidth="14"
                                strokeDasharray="126"
                                strokeDashoffset={126 - (assessment.score ?? 0) * 1.26}
                                strokeLinecap="butt"
                                />

                                <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#EF4444" />
                                    <stop offset="50%" stopColor="#F59E0B" />
                                    <stop offset="100%" stopColor="#10B981" />
                                </linearGradient>
                                </defs>
                            </svg>

                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[28px] font-bold text-gray-900">
                                {assessment.score}
                            </div>
                            </div>

                            <div className="text-[13px] text-gray-500 mb-1">
                                Composite Score
                            </div>
                            <div className={cn(
                                "text-sm font-semibold",
                                scoreColors?.text
                            )}>
                                {assessment.scoreInterpretation}
                            </div>
                    </div>
                </div>
            {/* subscale */}
                <div className="mb-6">
                    <h4 className="text-[11px] font-semibold text-gray-500 uppercase tracking-[0.05] mb-3">
                        Subscale scores
                    </h4>
                    <div className="flex flex-col gap-4">
                    {assessment.subscales.map((subscale) => {
                        const percent = (subscale.score / subscale.maxScore) * 100
                        const colors = getScoreColors(percent)

                        return (
                            <div key={subscale.name}
                                className="flex flex-col gap-2"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700">
                                        {subscale.name}
                                    </span>
                                    <span className="text-sm font-semibold text-gray-900">
                                        {subscale.score}
                                    </span>
                                </div>
                                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div className={cn(
                                        "h-full rounded-full",
                                        colors.bar)}
                                        style={{ width: `${percent}%`}}
                                    />
                                </div>
                            </div>
                        )
                    })}
                    </div>
                </div>
            {/* notes */}
                <div className="mb-6">
                    <h4 className="text-[11px] font-semibold text-gray-500 uppercase tracking-[0.05] mb-3">
                        Clinician notes
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <SquarePen size={16} className="text-gray-500" />
                            <span className="text-[13px] font-semibold text-gray-700">
                                {assessment.administeredBy.name}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 leading-[1.6]">
                            {assessment.notes}
                        </p>
                    </div>
                </div>

            </div>

            <SheetFooter className="flex items-center justify-between gap-3 py-4 px-6 border-t border-gray-200 bg-gray-50">
                <Button 
                    variant={"btnWhite"}
                >
                    <Download size={16} />
                    Download Report
                </Button>
                <Button
                    variant={"btnBlue"}
                >
                    <SquarePen size={16} />
                    Edit Assessment
                </Button>
            </SheetFooter>
        </SheetContent>
                
        </Sheet>
      
  )
}
