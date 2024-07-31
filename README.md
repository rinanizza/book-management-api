markdown
# Book Management API

## Description
The Book Management API is an Express.js-based application for managing a collection of books.
It provides endpoints to create, retrieve, update, and delete book records.
The application also serves an HTML frontend for interacting with the API.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)


## Project Setup and Installation
### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/rinanizza/book-management-api.git
   cd book-management-api
Install Dependencies


bash
npm install
Setup Environment Variables

Create a .env file in the root directory of the project and add the following environment variables:

bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/bookmanagement
Replace MONGO_URI with your MongoDB connection string if you're using a different database.

API Endpoints
1. POST /books
Description: Create a new book.
Request Body:
json
Copy code
{
  "title": "string",
  "author": "string",
  "publishedDate": "YYYY-MM-DD",
  "ISBN": "string"
}
Response:
Status Code: 201 Created
Body:
json
Copy code
{
  "_id": "string",
  "title": "string",
  "author": "string",
  "publishedDate": "YYYY-MM-DD",
  "ISBN": "string"
}

2. GET /books
Description: Get a list of all books.
Response:
Status Code: 200 OK
Body:
json
Copy code
[
  {
    "_id": "string",
    "title": "string",
    "author": "string",
    "publishedDate": "YYYY-MM-DD",
    "ISBN": "string"
  }
]

3. GET /books/:id
Description: Retrieve a book by ID.
Request Parameters:
id: The ID of the book to retrieve.
Response:
Status Code: 200 OK
Body:
json
Copy code
{
  "_id": "string",
  "title": "string",
  "author": "string",
  "publishedDate": "YYYY-MM-DD",
  "ISBN": "string"
}

4. PUT /books/:id
Description: Update a book by ID.
Request Parameters:
id: The ID of the book to update.
Request Body:
json
Copy code
{
  "title": "string",
  "author": "string",
  "publishedDate": "YYYY-MM-DD",
  "ISBN": "string"
}
Response:
Status Code: 200 OK
Body:
json
Copy code
{
  "_id": "string",
  "title": "string",
  "author": "string",
  "publishedDate": "YYYY-MM-DD",
  "ISBN": "string"
}

5. DELETE /books/:id
Description: Delete a book by ID.
Request Parameters:
id: The ID of the book to delete.
Response:
Status Code: 204 No Content
Running the Application
Build the Project

bash
Copy code
npm run build
Start the Server

bash
Copy code
npm start
The server will start on http://localhost:5000.

Access the Frontend

Open a browser and navigate to http://localhost:5000 to access the Book Management System frontend.

Testing
To run the tests, use the following command:

bash
Copy code
npm test
This command will execute the test suite using Jest. Ensure that MongoDB is running and accessible before running tests.

Test File
The following is a sample test file used for testing the API endpoints:

typescript
Copy code
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
Contributing
If you would like to contribute to this project, please fork the repository and submit



