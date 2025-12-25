import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination'
import type { PaginationProps } from '@/types/types'
import { cn, getPageNumbers, getTotalPages } from '@/lib/utils'

export function PaginationWrapper({
    pagination,
    onPageChange,
}: PaginationProps) {
    const { currentPage, pageSize, totalItems } = pagination

    const totalPages = getTotalPages(
        totalItems, 
        pageSize
    )
    const pages = getPageNumbers(
        currentPage, 
        totalPages
    )

    const startItem = (currentPage - 1) * pageSize + 1
    const endItem = Math.min(currentPage * pageSize, totalItems)

    const firstPage = currentPage === 1
    const lastPage = currentPage === totalPages
  return (
    <div className='flex flex-col gap-3 p-4 border-t-none items-center justify-between bg-transparent 
                    md:flex-row md:py-4 md:px-6 md:border md:border-t-gray-200 md:bg-gray-50'>
        <span className='text-[13px] text-gray-500'>
            Showing {startItem}-{endItem} of {totalItems} assessments
        </span>
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious 
                        aria-disabled={firstPage}
                        className={cn(firstPage && 'pointer-events-none opacity-40')}
                        onClick={() => {
                            if (firstPage) return
                            onPageChange(currentPage -1)
                        }}
                    />
                </PaginationItem>
                {pages.map((page, index) => 
                page === null ? (
                    <PaginationItem key={index}>
                        <PaginationEllipsis />
                    </PaginationItem>
                ) : (
                    <PaginationItem key={page}>
                        <PaginationLink
                            isActive={page === currentPage}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                    )
                 )
                 }

                <PaginationItem>
                    <PaginationNext 
                        aria-disabled={lastPage}
                        className={cn(lastPage && 'pointer-events-none opacity-40')}
                        onClick={() => {
                            if (lastPage) return
                            onPageChange(currentPage + 1)
                        }}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
      
    </div>
  )
}