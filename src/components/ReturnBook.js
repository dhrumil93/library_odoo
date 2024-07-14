import React, { useState } from 'react';
import axios from 'axios';

const ReturnBook = () => {
  const [formData, setFormData] = useState({
    user: '',
    book: '',
    returnedDate: '',
    lateFee: '',
  });

  const { user, book, returnedDate, lateFee } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/borrow/return', formData);
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
        <label>Returned Date</label>
        <input type="date" name="returnedDate" value={returnedDate} onChange={onChange} required />
      </div>
      <div>
        <label>Late Fee</label>
        <input type="number" name="lateFee" value={lateFee} onChange={onChange} />
      </div>
      <button type="submit">Return Book</button>
    </form>
  );
};

export default ReturnBook;
