import React, { useState } from 'react';
import axios from 'axios';

const BorrowBook = () => {
  const [formData, setFormData] = useState({
    user: '',
    book: '',
    dueDate: '',
  });

  const { user, book, dueDate } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/borrow/borrow', formData);
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>User ID</label>
        <input type="text" name="user" value={user} onChange={onChange} required />
      </div>
      <div>
        <label>Book ID</label>
        <input type="text" name="book" value={book} onChange={onChange} required />
      </div>
      <div>
        <label>Due Date</label>
        <input type="date" name="dueDate" value={dueDate} onChange={onChange} required />
      </div>
      <button type="submit">Borrow Book</button>
    </form>
  );
};

export default BorrowBook;
