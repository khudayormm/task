import React from 'react'
import { getBooks } from '../libs/books'

const Books = () => {
  const { data } = getBooks()

  console.log(data);
  

  return (
    <div>Books</div>
  )
}

export default Books