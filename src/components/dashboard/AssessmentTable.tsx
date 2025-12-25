import type { Assessment } from "@/types/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Dot, Download, EllipsisVertical, Eye, FileText } from "lucide-react";
import { cn, formatDate, formatTime, getScoreColors, getStatusColors, getStatusLabel } from "@/lib/utils";


export function AssessmentTable({
    assessments,
    onOpenDetails,
}: {
    assessments: Assessment[]
    onOpenDetails: (assessment: Assessment) => void
}) {
  return (
    <>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="ps-6 text-start py-3.5 px-5 text-xs font-semibold text-gray-500 uppercase tracking-[0.05em] bg-gray-50 border-b-gray-200">
                        Patient
                    </TableHead>
                    <TableHead className="text-start py-3.5 px-5 text-xs font-semibold text-gray-500 uppercase tracking-[0.05em] bg-gray-50 border-b-gray-200">
                        Assessment Type
                    </TableHead>
                    <TableHead className="text-start py-3.5 px-5 text-xs font-semibold text-gray-500 uppercase tracking-[0.05em] bg-gray-50 border-b-gray-200">
                        Status
                    </TableHead>
                    <TableHead className="text-start py-3.5 px-5 text-xs font-semibold text-gray-500 uppercase tracking-[0.05em] bg-gray-50 border-b-gray-200">
                        Score
                    </TableHead>
                    <TableHead className="text-start py-3.5 px-5 text-xs font-semibold text-gray-500 uppercase tracking-[0.05em] bg-gray-50 border-b-gray-200">
                        Date
                    </TableHead>
                    <TableHead className="text-start py-3.5 px-5 text-xs font-semibold text-gray-500 uppercase tracking-[0.05em] bg-gray-50 border-b-gray-200">
                        Actions
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="cursor-pointer">
                {assessments.map((a) => {
                    const statusColors = getStatusColors(a.status)
                    const statusLabel = getStatusLabel(a.status)

                    const date = formatDate(a.date)
                    const time = formatTime(a.date)

                    return (
                    <TableRow key={a.id}
                            onClick={() => onOpenDetails(a)}
                    >
                        <TableCell className="ps-6 py-4 px-5 text-sm text-gray-700 border-b-gray-100 align-middle">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-600 shrink-0">
                                    {a.patient.initials}
                                </div>
                                <div className="flex flex-col gap-0.5">
                                    <span className="font-semibold text-gray-900">{a.patient.name}</span>
                                    <span className="text-xs text-gray-500">{a.patient.id}</span>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell className="py-4 px-5 text-sm text-gray-700 border-b-gray-100 align-middle">
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-md bg-gray-100 text-gray-600 flex items-center justify-center">
                                    <FileText size={14}/>
                                </div>
                                <span className="font-medium text-gray-800">
                                    {a.type}
                                </span>
                            </div>
                        </TableCell>
                        <TableCell className="py-4 px-5 text-sm text-gray-700 border-b-gray-100 align-middle">
                            <div className={cn(
                                "inline-flex items-center gap-1.5 py-1 px-2.5 text-xs font-medium rounded-full", 
                                statusColors.bg,
                                statusColors.text
                            )}>
                                <Dot size={6} className={cn("rounded-full",statusColors.dot)}/>
                                <span>{statusLabel}</span>
                            </div>                           
                        </TableCell>
                        <TableCell className="py-4 px-5 text-sm text-gray-700 border-b-gray-100 align-middle">
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
                        </TableCell>
                        <TableCell className="py-4 px-5 text-sm text-gray-700 border-b-gray-100 align-middle">
                            <div className="flex flex-col gap-0.5">
                                <span className="font-medium text-gray-800">{date}</span>
                                <span className="text-xs text-gray-500">{time}</span>
                            </div>
                        </TableCell>
                        <TableCell className="pe-6 py-4 px-5 text-sm text-gray-700 border-b-gray-100 align-middle">
                            <div className="flex items-center gap-1">
                                <button 
                                    className="w-8 h-8 flex items-center justify-center border-none bg-transparent text-gray-400 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 transition-all delay-150 ease-in-out"
                                    aria-label="View Details"
                                    title="View Details"
                                    onClick={() => onOpenDetails(a)}
                                    >
                                    <Eye size={16} />
                                </button>
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
                        </TableCell>
                    </TableRow>
                )
                })}
            </TableBody>
        </Table>     
    </>
  )
}
