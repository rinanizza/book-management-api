document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('book-form');
  const toggleBooksButton = document.getElementById('toggle-books');
  const bookListContainer = document.getElementById('book-list');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const publishedDate = document.getElementById('publishedDate').value;
    const ISBN = document.getElementById('ISBN').value;

    const response = await fetch('/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        author,
        publishedDate,
        ISBN,
      }),
    });

    if (response.ok) {
      alert('Book added successfully');
      form.reset();
      loadBooks();
    } else {
      alert('Error adding book');
    }
  });

  const loadBooks = async () => {
    const response = await fetch('/books');
    const books = await response.json();
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';
    books.forEach(book => {
      const div = document.createElement('div');
      div.className = 'book-item';
      div.innerHTML = `
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Published Date: ${book.publishedDate}</p>
        <p>ISBN: ${book.ISBN}</p>
        <button class="delete-button" data-id="${book._id}">Delete</button>
      `;
      bookList.appendChild(div);
    });

    // Attach event listeners to delete buttons
    document.querySelectorAll('.delete-button').forEach(button => {
      button.addEventListener('click', async (event) => {
        const bookId = event.target.getAttribute('data-id');
        await deleteBook(bookId);
        event.target.parentElement.remove();
      });
    });
  };

  const deleteBook = async (id) => {
    try {
      const response = await fetch(`/books/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete book');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  toggleBooksButton.addEventListener('click', () => {
    if (bookListContainer.classList.contains('hidden')) {
      loadBooks();
      bookListContainer.classList.remove('hidden');
      toggleBooksButton.textContent = 'Hide Books';
    } else {
      bookListContainer.classList.add('hidden');
      toggleBooksButton.textContent = 'Show Books';
    }
  });
});
