import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../api/firebase';
import Header from '../../Components/Header/header';
import adEntity from '../../../api/adEntity';

const AddPostForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    county: '',
    city: '',
    comune: '',
    description: '',
    categories: 'Auto', // Valoare implicită
    image: null,
    contactName: '',
    phone: '',
    email: ''
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError(null);
    
    try {
      // 1. Upload imagine (dacă există)
      let imageUrl = '';
      if (formData.image) {
        const storageRef = ref(storage, `ads/${Date.now()}_${formData.image.name}`);
        await uploadBytes(storageRef, formData.image);
        imageUrl = await getDownloadURL(storageRef);
      }

      // 2. Pregătește datele pentru Firebase
      const adData = {
        title: formData.title,
        county: formData.county,
        city: formData.city,
        comune: formData.comune || '',
        description: formData.description,
        categories: formData.categories,
        image: imageUrl || '',
        contactName: formData.contactName || '',
        phone: formData.phone || '',
        email: formData.email || '',
        timestamp: Date.now()
      };

      // 3. Salvează în Firebase
      const { success, error } = await adEntity.create(adData);
      
      if (success) {
        setSuccess(true);
        // Resetează formularul
        setFormData({
          title: '',
          county: '',
          city: '',
          comune: '',
          description: '',
          categories: 'Auto',
          image: null,
          contactName: '',
          phone: '',
          email: ''
        });
      } else {
        throw new Error(error || 'Eroare la salvarea anunțului');
      }
    } catch (err) {
      console.error('Eroare:', err);
      setError(err.message || 'A apărut o eroare la postarea anunțului');
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Header />
      <Container className="mt-4 mb-5">
        <h2 className="mb-4">Adaugă un anunț nou</h2>
        
        {success && (
          <Alert variant="success" onClose={() => setSuccess(false)} dismissible>
            Anunțul a fost adăugat cu succes!
          </Alert>
        )}
        
        {error && (
          <Alert variant="danger" onClose={() => setError(null)} dismissible>
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          {/* Sectiunea principala */}
          <Form.Group className="mb-3">
            <Form.Label>Titlu anunț*</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Ex: Masina Ford Focus, 2015"
            />
          </Form.Group>

          {/* Categorie */}
          <Form.Group className="mb-3">
            <Form.Label>Categorie*</Form.Label>
            <Form.Select 
              name="categories"
              value={formData.categories}
              onChange={handleChange}
              required
            >
              <option value="Auto">Auto</option>
              <option value="Imobiliare">Imobiliare</option>
              <option value="Electronice">Electronice</option>
              <option value="Servicii">Servicii</option>
              <option value="Moda">Moda</option>
              <option value="Hobby">Hobby</option>
              <option value="Casa/Gradina">Casa/Gradina</option>
              <option value="Mobilier/Decoratiuni">Mobilier/Decoratiuni</option>
              <option value="Carti/Muzica">Carti/Muzica</option>
              <option value="Echipamente">Echipamente</option>
              <option value="Produse/Alimentare">Produse/Alimentare</option>
              <option value="Articole/Sportive">Articole/Sportive</option>
              <option value="Animale">Animale</option>
              <option value="Voluntariat">Voluntariat</option>
              <option value="Antichitati">Antichitati</option>
              <option value="IT/Software">IT/Software</option>
              <option value="Altele">Altele</option>
            </Form.Select>
          </Form.Group>

          {/* Locatie */}
          <div className="row mb-3">
            <Form.Group className="col-md-4">
              <Form.Label>Județ*</Form.Label>
              <Form.Control
                type="text"
                name="county"
                value={formData.county}
                onChange={handleChange}
                required
                placeholder="Ex: Valcea"
              />
            </Form.Group>
            <Form.Group className="col-md-4">
              <Form.Label>Oraș</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Ex: Râmnicu Vâlcea"
              />
            </Form.Group>
            <Form.Group className="col-md-4">
              <Form.Label>Comună</Form.Label>
              <Form.Control
                type="text"
                name="comune"
                value={formData.comune}
                onChange={handleChange}
                placeholder="Ex: Bujoreni"
              />
            </Form.Group>
          </div>

          {/* Descriere */}
          <Form.Group className="mb-3">
            <Form.Label>Descriere detaliată*</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Descrie produsul sau serviciul oferit..."
            />
          </Form.Group>

          {/* Imagine */}
          <Form.Group className="mb-3">
            <Form.Label>Imagine</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <Form.Text className="text-muted">
              Încarcă o imagine reprezentativă (max 2MB)
            </Form.Text>
          </Form.Group>

          {/* Contact */}
          <h5 className="mt-4 mb-3">Date de contact</h5>
          <div className="row mb-3">
            <Form.Group className="col-md-4">
              <Form.Label>Nume</Form.Label>
              <Form.Control
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                placeholder="Ex: Ion Popescu"
              />
            </Form.Group>
            <Form.Group className="col-md-4">
              <Form.Label>Telefon</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Ex: 0722 123 456"
              />
            </Form.Group>
            <Form.Group className="col-md-4">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ex: contact@example.com"
              />
            </Form.Group>
          </div>

          <Button 
            variant="primary" 
            type="submit" 
            disabled={uploading}
            className="mt-3"
          >
            {uploading ? (
              <>
                <Spinner as="span" size="sm" animation="border" /> Postează...
              </>
            ) : (
              'Publică anunțul'
            )}
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default AddPostForm;

