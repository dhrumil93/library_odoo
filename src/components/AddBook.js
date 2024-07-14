import React, { useState } from "react";
import axios from "axios";

const AddBook = () => {
  const [formData, setFormData] = useState({
    isbn: "",
    title: "",
    author: "",
    publisher: "",
    year: "",
    genre: "",
    quantity: "",
  });

  const { isbn, title, author, publisher, year, genre, quantity } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/books", formData);
      console.log(res.data);
      // Optionally: Redirect to book list or update state to show success message
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>ISBN</label>
        <input
          type="text"
          name="isbn"
          value={isbn}
          onChange={onChange}
          required
        />
      </div>
      <div>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={onChange}
          required
        />
      </div>
      <div>
        <label>Author</label>
        <input
          type="text"
          name="author"
          value={author}
          onChange={onChange}
          required
        />
      </div>
      <div>
        <label>Publisher</label>
        <input
          type="text"
          name="publisher"
          value={publisher}
          onChange={onChange}
          required
        />
      </div>
      <div>
        <label>Year</label>
        <input
          type="number"
          name="year"
          value={year}
          onChange={onChange}
          required
        />
      </div>
      <div>
        <label>Genre</label>
        <input
          type="text"
          name="genre"
          value={genre}
          onChange={onChange}
          required
        />
      </div>
      <div>
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          value={quantity}
          onChange={onChange}
          required
        />
      </div>
      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBook;
