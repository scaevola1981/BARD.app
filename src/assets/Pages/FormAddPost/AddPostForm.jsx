import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useState } from 'react';
import Api from '../../../api';

const AddPostForm = () => {
  const [formData, setFormData] = useState({
    county: '',
    city: '',
    description: '',
    categories: [],
    title: '',
    image: '',
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Verificăm câmpurile care sunt liste și le transformăm în array-uri
    if (name === 'categories') {
      setFormData({
        ...formData,
        [name]: value.split(',').map((item) => item.trim()), // Convertim inputul într-un array
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(null);

    const response = await Api.ad.create(formData);

    if (response.success) {
      setSuccess(true);
      console.log('Anunț postat cu succes:', response.data);
    } else {
      setError('Eroare la postarea anunțului.');
    }
  };

  return (
    <Container className="mt-4">
      <h2>Adaugă un anunț</h2>
      {success && <Alert variant="success">Anunț postat cu succes!</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Titlu</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Județ</Form.Label>
          <Form.Control
            type="text"
            name="county"
            value={formData.county}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Oraș</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descriere</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Categorii (separate prin virgulă)</Form.Label>
          <Form.Control
            type="text"
            name="categories"
            value={formData.categories.join(', ')}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>URL Imagine</Form.Label>
          <Form.Control
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Postează anunț
        </Button>
      </Form>
    </Container>
  );
};

export default AddPostForm;
