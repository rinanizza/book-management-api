import request from 'supertest';
import app from '../index'; // Import your Express app

// Helper function to create a book for testing
const createBook = async () => {
  const res = await request(app)
    .post('/books')
    .send({
      title: 'Test Book',
      author: 'Test Author',
      publishedDate: '2024-01-01',
      ISBN: '1234567890'
    });
  return res.body._id; // Return the created book's ID for further testing
};

describe('Book API', () => {
  // Test the root endpoint
  describe('GET /', () => {
    it('should return the HTML content for the root route', async () => {
      const response = await request(app).get('/');

      // Check that the response status is 200
      expect(response.status).toBe(200);

      // Check that the response contains part of the HTML content
      expect(response.text).toContain('<title>Book Management</title>');
      expect(response.text).toContain('<h1>Book Management System</h1>');
    });
  });

  // Test creating a new book
  it('should create a new book', async () => {
    const res = await request(app)
      .post('/books')
      .send({
        title: 'Test Book',
        author: 'Test Author',
        publishedDate: '2024-01-01',
        ISBN: '1234567890'
      });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Test Book');
  }, 10000); // Increase timeout to 10 seconds

  // Test getting a list of books
  it('should get a list of books', async () => {
    await createBook(); // Ensure there is at least one book
    const res = await request(app).get('/books');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // Test retrieving a single book by ID
  it('should retrieve a book by ID', async () => {
    const bookId = await createBook(); // Create a book to retrieve
    const res = await request(app).get(`/books/${bookId}`);
    expect(res.status).toBe(200);
    expect(res.body._id).toBe(bookId);
    expect(res.body.title).toBe('Test Book');
  });

  // Test updating a book
  it('should update a book', async () => {
    const bookId = await createBook(); // Create a book to update
    const res = await request(app)
      .put(`/books/${bookId}`)
      .send({
        title: 'Updated Book',
        author: 'Updated Author',
        publishedDate: '2024-01-02',
        ISBN: '0987654321'
      });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Updated Book');
  });

  // Test deleting a book
  it('should delete a book', async () => {
    const bookId = await createBook(); // Create a book to delete
    const res = await request(app).delete(`/books/${bookId}`);
    expect(res.status).toBe(204); // No content expected on successful delete
    const getRes = await request(app).get(`/books/${bookId}`);
    expect(getRes.status).toBe(404); // Should not find the book
  });
});
