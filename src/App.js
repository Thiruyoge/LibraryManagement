import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Container, Row, Col, Button, Table, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const initialBookValues = { title: '', author: '', isbn: '', pubDate: '' };
const initialAuthorValues = { name: '', birthDate: '', biography: '' };

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [showBookModal, setShowBookModal] = useState(false);
  const [showAuthorModal, setShowAuthorModal] = useState(false);
  const [editingBookIndex, setEditingBookIndex] = useState(null);
  const [editingAuthorIndex, setEditingAuthorIndex] = useState(null);

  const handleBookSubmit = (values, { resetForm }) => {
    if (editingBookIndex !== null) {
      // Update existing book
      const updatedBooks = [...books];
      updatedBooks[editingBookIndex] = values;
      setBooks(updatedBooks);
    } else {
      // Add new book
      setBooks([...books, values]);
    }

    setShowBookModal(false);
    resetForm();
  };

  const handleAuthorSubmit = (values, { resetForm }) => {
    if (editingAuthorIndex !== null) {
      // Update existing author
      const updatedAuthors = [...authors];
      updatedAuthors[editingAuthorIndex] = values;
      setAuthors(updatedAuthors);
    } else {
      // Add new author
      setAuthors([...authors, values]);
    }

    setShowAuthorModal(false);
    resetForm();
  };

  const handleEditBook = (index) => {
    setEditingBookIndex(index);
    setShowBookModal(true);
  };

  const handleDeleteBook = (index) => {
    const updatedBooks = [...books];
    updatedBooks.splice(index, 1);
    setBooks(updatedBooks);
  };

  const handleEditAuthor = (index) => {
    setEditingAuthorIndex(index);
    setShowAuthorModal(true);
  };

  const handleDeleteAuthor = (index) => {
    const updatedAuthors = [...authors];
    updatedAuthors.splice(index, 1);
    setAuthors(updatedAuthors);
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Library Management System</h1>

      <Row>
        <Col>
          <h2>Books</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>ISBN</th>
                <th>Publication Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={index}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.isbn}</td>
                  <td>{book.pubDate}</td>
                  <td>
                    <Button variant="info" onClick={() => handleEditBook(index)}>
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteBook(index)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Button variant="primary" onClick={() => setShowBookModal(true)}>
            Add Book
          </Button>
        </Col>

        <Col>
          <h2>Authors</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Birth Date</th>
                <th>Biography</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {authors.map((author, index) => (
                <tr key={index}>
                  <td>{author.name}</td>
                  <td>{author.birthDate}</td>
                  <td>{author.biography}</td>
                  <td>
                    <Button variant="info" onClick={() => handleEditAuthor(index)}>
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteAuthor(index)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Button variant="primary" onClick={() => setShowAuthorModal(true)}>
            Add Author
          </Button>
        </Col>
      </Row>

      {/* Book Modal */}
      <Modal show={showBookModal} onHide={() => setShowBookModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingBookIndex !== null ? 'Edit Book' : 'Add Book'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={editingBookIndex !== null ? books[editingBookIndex] : initialBookValues}
            onSubmit={handleBookSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <Field
                    type="text"
                    id="title"
                    name="title"
                    className={`form-control ${errors.title && touched.title ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage name="title" component="div" className="invalid-feedback" />
                </div>

                <div className="mb-3">
                  <label htmlFor="author" className="form-label">
                    Author
                  </label>
                  <Field
                    type="text"
                    id="author"
                    name="author"
                    className={`form-control ${errors.author && touched.author ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage name="author" component="div" className="invalid-feedback" />
                </div>

                <div className="mb-3">
                  <label htmlFor="isbn" className="form-label">
                    ISBN
                  </label>
                  <Field
                    type="text"
                    id="isbn"
                    name="isbn"
                    className={`form-control ${errors.isbn && touched.isbn ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage name="isbn" component="div" className="invalid-feedback" />
                </div>

                <div className="mb-3">
                  <label htmlFor="pubDate" className="form-label">
                    Publication Date
                  </label>
                  <Field
                    type="text"
                    id="pubDate"
                    name="pubDate"
                    className={`form-control ${errors.pubDate && touched.pubDate ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage name="pubDate" component="div" className="invalid-feedback" />
                </div>

                <Button variant="primary" type="submit">
                  {editingBookIndex !== null ? 'Update Book' : 'Add Book'}
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>

      {/* Author Modal */}
      <Modal show={showAuthorModal} onHide={() => setShowAuthorModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingAuthorIndex !== null ? 'Edit Author' : 'Add Author'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={editingAuthorIndex !== null ? authors[editingAuthorIndex] : initialAuthorValues}
            onSubmit={handleAuthorSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage name="name" component="div" className="invalid-feedback" />
                </div>

                <div className="mb-3">
                  <label htmlFor="birthDate" className="form-label">
                    Birth Date
                  </label>
                  <Field
                    type="text"
                    id="birthDate"
                    name="birthDate"
                    className={`form-control ${errors.birthDate && touched.birthDate ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage name="birthDate" component="div" className="invalid-feedback" />
                </div>

                <div className="mb-3">
                  <label htmlFor="biography" className="form-label">
                    Biography
                  </label>
                  <Field
                    as="textarea"
                    id="biography"
                    name="biography"
                    className={`form-control ${errors.biography && touched.biography ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage name="biography" component="div" className="invalid-feedback" />
                </div>

                <Button variant="primary" type="submit">
                  {editingAuthorIndex !== null ? 'Update Author' : 'Add Author'}
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;
