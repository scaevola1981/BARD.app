import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useState } from 'react';



const AddPostForm = () => {

     const [formData, setFormData] = useState({
        title: '',
        description:'',
     })    
     
     const [success, setSuccess] = useState(false);

     const handleChange = (e) => {
      const {name, value} = e.target
      setFormData({
        ...formData,[name]:value

      });
     };


     const handleSubmit = (e) => {
      e.preventDefault();


      console.log('Datele formularului' , formData);

      setSuccess(true)
     }



    return (
        <>
            <Container className="mt-4">
      <h2>Adaugă un anunț</h2>
      {success && <Alert variant="success">Anunț postat cu succes!</Alert>}

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
          <Form.Label>Descriere</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Preț (RON)</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Postează anunț
        </Button>
      </Form>
    </Container>
        </>
    )
}

export default AddPostForm;

