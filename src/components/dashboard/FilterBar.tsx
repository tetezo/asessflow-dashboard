import { Calendar, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import type { AssessmentTypeCode, FilterBarProps, FilterState } from "@/types/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export  function FilterBar({
    filters,
    onFilterChange,
    assessmentTypes,
    statusOptions,
    onLastDays
}: FilterBarProps) {

    const statusValue = 
    filters.status === '' ? 'all' : filters.status
    const typeValue = 
    filters.type === '' ? 'all' : filters.type

  return (
    <div className="flex flex-col items-stretch md:flex-row md:items-center gap-3 flex-wrap">
        <div className="relative flex flex-1 min-w-auto max-w-none md:min-w-60 md:max-w-80">
            <Search size={16}
                    className="left-3 top-1/2 absolute -translate-y-2/4 pointer-events-none text-gray-400" />
            <Input 
                placeholder="Search patients or assessments..."
                value={filters.search}
                onChange={(e) =>
                    onFilterChange({
                        ...filters,
                        search: e.target.value,
                    })
                }
            />
        </div>
        
        <div className="relative">
            <Select
                value={statusValue}
                onValueChange={(value) =>
                    onFilterChange({
                        ...filters,
                        status: value === 'all' ? '' : (value as FilterState['status']),
                    })
                }
            >
                <SelectTrigger className="w-full md:w-auto md:min-w-35">
                    <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    {statusOptions.map((status) => (
                        <SelectItem 
                            key={status.value}
                            value={String(status.value)}
                        >
                            {status.label}
                        </SelectItem>
                    ))}

                </SelectContent>

            </Select>
        </div> 

        <div className="relative">
            <Select
                value={typeValue}
                onValueChange={(value) =>
                    onFilterChange({
                        ...filters, 
                        type: value === 'all' ? '' : (value as AssessmentTypeCode),
                    })
                }
            >
                <SelectTrigger className="w-full md:w-auto md:min-w-70">
                    <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                        {assessmentTypes.map((type) => (
                            <SelectItem 
                                key={type.code}
                                value={type.code}
                            >
                                {type.name}
                            </SelectItem>
                        ))}
                </SelectContent>
            </Select>
        </div> 

        <TooltipProvider>
            <Tooltip>
            <TooltipTrigger asChild>
                <Button 
                    variant={filters.dateRange ? "btnBlue" : "btnWhite"}
                    onClick={onLastDays}
                >
                    <Calendar 
                        size={16} 
                        className={filters.dateRange ? "text-white" : "text-gray-700"}
                    />
                    Last 30 days
                </Button>
            </TooltipTrigger>
            {filters.dateRange && (
                <TooltipContent>
                    Clear filter
                </TooltipContent>
            )}
        </Tooltip>
        </TooltipProvider>        
    </div>
  )
}
