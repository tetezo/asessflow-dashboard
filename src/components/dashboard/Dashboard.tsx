import { StatsCard } from './StatsCard';
import { FilterBar } from './FilterBar'
import { Plus } from 'lucide-react'
import data from "@/data/assessments.json"
import type { Assessment, AssessmentTypeOption, DashboardStats, FilterState, PaginationState, StatusOption } from '@/types/types';
import { Button } from '../ui/button'
import { useEffect, useState } from 'react';
import { filterAssessments, paginateItems } from '@/lib/utils';
import { AssessmentWrapper } from './AssessmentWrapper';
import { AssessmentDetail } from './AssessmentDetail';


export function Dashboard() {
  const assessments = data.assessments as Assessment[];
  const assessmentTypes = data.assessmentTypes as AssessmentTypeOption[];

  const statusOptions = data.statusOptions as StatusOption[];
  const stats: DashboardStats = data.stats

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: '',
    type: '',
  })

  const filteredAssessments = filterAssessments(assessments, filters)

  const handleDays = () => {
    setFilters(prev => {
      if(prev.dateRange) {
        return {
          ...prev,
          dateRange:undefined,
        }
      }

      const end = new Date()
      const start = new Date()
      start.setDate(end.getDate() - 30)

      return {
        ...prev,
        dateRange: {start, end},
      }
    })
  }

  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    pageSize: 5,
    totalItems: filteredAssessments.length,
  })

  const paginatedAssessments = paginateItems(
    filteredAssessments,
    pagination.currentPage,
    pagination.pageSize
  )

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      currentPage: 1,
    }))
  }, [filters])

  const handlePageChange = (page: number) => {
    setPagination(prev => ({
      ...prev,
      currentPage: page,
    }))
  }

  // Slide over/Assessment Details

  const [selectedAssessment, setSelectedAssessment] =
  useState<Assessment | null>(null)

  const [open, setOpen] = useState(false)

  const handleOpenDetails = (assessment: Assessment) => {
    setSelectedAssessment(assessment)
    setOpen(true)
  }

  return (
    <>
    <div className='flex flex-1 flex-col mb-8'>
        <div className='flex flex-col items-stretch md:flex-row md:items-start justify-between gap-4 mb-6'>
            <div className='flex flex-col gap-1 '>
                <h1 className='text-2xl md:text-[28px] font-bold text-gray-900 tracking-[-0.02em] leading-normal'>Assessments</h1>
                <p className='text-sm text-gray-500'>Manage and review patient psychological assessments</p>
            </div>
            <Button
              variant={'btnBlue'}
            >
                <Plus size={16} />
                New Assessment
            </Button>
        </div>
        <div className='grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 mb-6'>
            <StatsCard 
              icon='document'
              iconColor='blue'
              value={stats.totalAssessments}
              trend={stats.totalAssessmentsTrend}
              label='Total Assessments'
            />

            <StatsCard 
                icon='check'
                iconColor='green'
                value={stats.completed}
                trend={stats.completedTrend}
                label='Completed'
              />

              <StatsCard
                icon='clock'
                iconColor='yellow'
                value={stats.inProgress}
                trend={stats.inProgressTrend}
                label='In Progress'
              />

              <StatsCard
                icon='users'
                iconColor='purple'
                value={stats.activePatients}
                label='Active Patients' 
              />
        </div>

        <FilterBar 
          filters={filters}
          onFilterChange={setFilters}
          assessmentTypes={assessmentTypes}
          statusOptions={statusOptions}
          onLastDays={handleDays}          
        />
    </div>

        <AssessmentWrapper 
          assessments={paginatedAssessments}
          pagination={{
            ...pagination,
            totalItems: filteredAssessments.length,
          }}
          onPageChange={handlePageChange}
          onOpenDetails={handleOpenDetails}          
        />

        <AssessmentDetail 
          open={open}
          onOpenChange={setOpen}
          assessment={selectedAssessment}
        />
    </>
  )
}