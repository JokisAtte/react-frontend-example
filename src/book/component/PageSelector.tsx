import React from 'react'

interface pageSelectorProps {
  readonly currentPage: number
  readonly changePage: (pagenum: number) => void
}

const PageSelector: React.FunctionComponent<pageSelectorProps> = ({
  currentPage,
  changePage,
}: pageSelectorProps) => {
  return (
    <div className="flex flex-row max-w-sm">
      <button
        className="text-white text-xl font-bold px-3 py-1 bg-gray-700 hover:bg-gray-800 ml-2 focus:outline-none disabled:opacity-50"
        onClick={() => changePage(currentPage - 1)}
      >
        {'<'}
      </button>
      <h2 className="text-xl p-2">{`Sivu: ${currentPage}`}</h2>
      <button
        className="text-white text-xl font-bold px-3 py-1 bg-gray-700 hover:bg-gray-800 ml-0 focus:outline-none disabled:opacity-50"
        onClick={() => changePage(currentPage + 1)}
      >
        {'>'}
      </button>
    </div>
  )
}

export default PageSelector
