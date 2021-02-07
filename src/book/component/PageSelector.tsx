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
    <div>
      <div>{currentPage}</div>
      <button onClick={() => changePage(currentPage + 1)}>Klikedi klik</button>
      <button onClick={() => changePage(currentPage - 1)}>Moroust</button>
    </div>
  )
}

export default PageSelector
