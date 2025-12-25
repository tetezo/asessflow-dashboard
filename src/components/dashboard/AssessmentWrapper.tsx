import type { Assessment, PaginationState } from "@/types/types"
import { PaginationWrapper } from "./PaginationWrapper"
import { AssessmentTable } from "./AssessmentTable"
import { AssessmentCard } from "./AssessmentCard"


export function AssessmentWrapper({
    assessments,
    pagination,
    onPageChange,
    onOpenDetails,
}: {
    assessments: Assessment[]
    pagination: PaginationState
    onPageChange: (page: number) => void
    onOpenDetails: (assessment: Assessment) => void
}) {
  return (
    <div className="bg-transparent overflow-hidden 
                md:bg-white md:border md:border-gray-200 md:rounded-xl">
        <div className="hidden md:block">
            <AssessmentTable 
                assessments={assessments}
                onOpenDetails={onOpenDetails}
            />
        </div>
        <div className="block md:hidden">
            <AssessmentCard 
                assessments={assessments}
                onOpenDetails={onOpenDetails}
            />
        </div>
        <PaginationWrapper 
            pagination={pagination}
            onPageChange={onPageChange}
        />    

    </div>
  )
}
