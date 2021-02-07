import { BookCollection } from 'book/model/BookCollection'
import BookListHeader from './BookListHeader'
import BookListItem from './BookListItem'
import React from 'react'
import { RemoteData } from 'langextensions/RemoteData'
import { assertNever } from 'langextensions/assertNever'

interface BookListProps {
  readonly bookCollection: RemoteData<BookCollection>
  readonly searchType: string
}

function bookListItemClass(index: number): string {
  return index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
}

const BookList: React.FunctionComponent<BookListProps> = ({
  bookCollection,
  searchType,
}: BookListProps) => {
  switch (bookCollection.type) {
    case 'NotAsked':
      return <div>Voit hakea kirjoja ylläolevasta hakupaneelista.</div>
    case 'Loading':
      return <div>Ladataan kirjoja...</div>
    case 'Failure':
      return <div>Hups! Haku epäonnistui.</div>
    case 'Success':
      return (
        <React.Fragment>
          <BookListHeader
            searchType={searchType}
            bookCollection={bookCollection.value}
          />
          <div
            className={[
              'flex',
              'p-6',
              'bg-gray-200',
              'border-b-2',
              'border-gray-800',
            ]
              .filter(x => x !== undefined)
              .join(' ')}
          >
            <span className="flex-1 font-normal ml-5">Kirjan nimi</span>
            <span className="flex-1">Vuosi</span>
            <span className="flex-1">ISBN</span>
            <span className="flex-1">Kirjailija</span>
          </div>
          <div className="flex flex-col">
            {bookCollection.value.books.map((book, index) => (
              <BookListItem
                key={`${book.title}${book.year}${book.isbn}`}
                book={book}
                className={bookListItemClass(index)}
              />
            ))}
          </div>
        </React.Fragment>
      )
    default:
      assertNever(bookCollection)
  }
}

export default BookList
