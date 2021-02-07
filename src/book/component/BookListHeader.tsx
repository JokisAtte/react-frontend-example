import { BookCollection } from 'book/model/BookCollection'
import React from 'react'
import translateSearchType from '../../infrastructure/translateSeachType'

interface BookListHeaderProps {
  readonly bookCollection: BookCollection
  readonly searchType: string
}

const BookListHeader: React.FunctionComponent<BookListHeaderProps> = ({
  bookCollection,
  searchType,
}: BookListHeaderProps) => (
  <div className="flex flex-col content-center sm:flex-row text-2xl font-medium mb-2">
    <span>Tuloksia yhteensä: {bookCollection.resultCount}</span>
    <span className="sm:ml-8">Näytetään: {bookCollection.books.length}</span>
    <span className="sm:ml-8">
      Hakukenttä: {translateSearchType(searchType)}
    </span>
  </div>
)

export default BookListHeader
