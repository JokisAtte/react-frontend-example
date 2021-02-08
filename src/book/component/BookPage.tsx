import * as RemoteData from 'langextensions/RemoteData'

import { BookCollection } from 'book/model/BookCollection'
import BookList from './BookList'
import BookSearchControl from './BookSearchControl'
import { BookSearchCriteria } from 'book/model/BookSearchCriteria'
import { BookSearcher } from 'book/model/BookSearcher'
import React from 'react'
import PageSelector from './PageSelector'

interface BookPageProps {
  readonly bookSearcher: BookSearcher
}

const BookPage: React.FunctionComponent<BookPageProps> = ({
  bookSearcher,
}: BookPageProps) => {
  const [bookCollection, setBookCollection] = React.useState<
    RemoteData.RemoteData<BookCollection>
  >(RemoteData.notAsked())
  const [bookTitle, setBookTitle] = React.useState<string>('')
  const [searchType, setSearchType] = React.useState<string>('AllFields')
  const [searchCriteria, setSearchCriteria] = React.useState<
    BookSearchCriteria | undefined
  >(undefined)
  const [page, setPage] = React.useState<number>(1)

  const updateBookCollection = () => {
    if (searchCriteria === undefined) {
      return
    }
    setBookCollection(RemoteData.loading())
    // title (optional) cleanIsbn (optional), edition (optional), year (optional)
    bookSearcher
      .findBooks(searchCriteria)
      .then((books: BookCollection) => {
        setBookCollection(RemoteData.success(books))
      })
      .catch(error => {
        setBookCollection(RemoteData.failure(error))
      })
  }

  const handlePageChange = (pagenum: number) => {
    setPage(pagenum)
    setSearchCriteria({
      title: bookTitle,
      searchType: searchType,
      page: page,
    })
    updateBookCollection()
  }

  React.useEffect(() => {
    updateBookCollection()
  }, [searchCriteria, bookSearcher])

  return (
    <div className="flex flex-col px-4 py-4">
      <BookSearchControl
        bookTitle={bookTitle}
        onBookTitleChange={setBookTitle}
        onSearchSubmit={() =>
          setSearchCriteria({
            title: bookTitle,
            searchType: searchType,
            page: page,
          })
        }
        searching={RemoteData.isLoading(bookCollection)}
        searchType={searchType}
        onSearchTypeChange={setSearchType}
      />
      <hr className="my-5" />
      <BookList
        bookCollection={bookCollection}
        searchType={searchType}
        currentPage={page}
        changePage={handlePageChange}
      />
    </div>
  )
}

export default BookPage
