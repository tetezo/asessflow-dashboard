import { FileText } from 'lucide-react'

export function Header() {
  return (
    <header className='border-b border-solid border-gray-200 py-3 px-4 md:py-4 md:px-6 sticky top-0 z-10 bg-white'>
        <div className='md:max-w-7xl my-0 mx-auto flex flex-row items-center justify-between gap-4'>
            <a href='#' className='flex flex-row items-center gap-2.5 no-underline'>
                <div className='w-8 h-8 flex items-center justify-center bg-linear-135 from-primary-500 to-primary-700 rounded-lg'>
                    <FileText color='white' size={18}/>                
                </div>
                <span className='text-[18px] md:text-[20px] font-bold text-gray-900 -leading-[0.02em]'>AssessFlow</span>
            </a>
            <nav className='hidden md:flex items-center gap-2'>
              <a href="#" className='text-sm font-medium py-2 px-4 no-underline rounded-md text-primary-700 bg-primary-50 hover:bg-gray-100 hover:text-gray-900'>
                Dashboard
              </a>
              <a href="#" className='text-sm font-medium py-2 px-4 no-underline rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 active:text-primary-700 active:bg-primary-50'>
                Patients
              </a>
              <a href="#" className='text-sm font-medium py-2 px-4 no-underline rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 active:text-primary-700 active:bg-primary-50'>
                Reports
              </a>
              <a href="#" className='text-sm font-medium py-2 px-4 no-underline rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 active:text-primary-700 active:bg-primary-50'>
                Settings
              </a>
            </nav>
            <div className='flex items-center gap-3'>
              <div className='w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-sm font-semibold text-primary-700 cursor-pointer hover:shadow-avatar transition-all duration-150 ease-in-out'>
                DR
              </div>
            </div>
        </div>        
    </header>
  )
}
