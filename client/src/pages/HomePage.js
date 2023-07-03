import React from 'react'
import Searchbook from '../components/SearchBook/Searchbook.js'
import Booklist from '../components/Books/Booklist.js'

export default function HomePage() {
  return (
    <div>
      <Searchbook />
      <Booklist />
    </div>
  )
}