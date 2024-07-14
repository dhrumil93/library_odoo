import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await axios.get('/api/books');
      setBooks(res.data);
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            {book.title} by {book.author} ({book.available}/{book.quantity} available)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
