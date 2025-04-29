import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../api/firebase';
import Header from '../../Components/Header/header';
import adEntity from '../../../api/adEntity';
import styles from './addPostForm.module.css';

const AddPostForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    county: '',
    city: '',
    comune: '',
    description: '',
    categories: 'Auto',
    image: null,
    contactName: '',
    phone: '',
    email: '',
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError(null);

    try {
      let imageUrl = '';
      if (formData.image) {
        const storageRef = ref(
          storage,
          `ads/${Date.now()}_${formData.image.name}`
        );
        await uploadBytes(storageRef, formData.image);
        imageUrl = await getDownloadURL(storageRef);
      }

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
        timestamp: Date.now(),
      };

      const { success, error } = await adEntity.create(adData);

      if (success) {
        setSuccess(true);
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
          email: '',
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
      <div className={styles.container}>
        <Container className={styles.formContainer}>
          <h2>Adaugă un anunț nou</h2>

          {success && (
            <Alert
              variant="success"
              onClose={() => setSuccess(false)}
              dismissible
              className={`${styles.alert} ${styles.alertSuccess}`}
            >
              Anunțul a fost adăugat cu succes!
            </Alert>
          )}

          {error && (
            <Alert
              variant="danger"
              onClose={() => setError(null)}
              dismissible
              className={`${styles.alert} ${styles.alertDanger}`}
            >
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit} className={styles.form}>
            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>Titlu anunț*</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Ex: Masina Ford Focus, 2015"
                className={styles.formControl}
              />
            </Form.Group>

            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>Categorie*</Form.Label>
              <Form.Select
                name="categories"
                value={formData.categories}
                onChange={handleChange}
                required
                className={styles.formSelect}
              >
                <option value="Auto">Auto</option>
                <option value="Imobiliare">Imobiliare</option>
                <option value="Electronice">Electronice</option>
                <option value="Servicii">Servicii</option>
                <option value="Moda">Moda</option>
                <option value="Hobby">Hobby</option>
                <option value="Casa/Gradina">Casa/Gradina</option>
                <option value="Mobilier/Decoratiuni">
                  Mobilier/Decoratiuni
                </option>
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

            <div className={styles.locationGroup}>
              <Form.Group className={styles.formGroup}>
                <Form.Label className={styles.formLabel}>Județ*</Form.Label>
                <Form.Control
                  type="text"
                  name="county"
                  value={formData.county}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Valcea"
                  className={styles.formControl}
                />
              </Form.Group>
              <Form.Group className={styles.formGroup}>
                <Form.Label className={styles.formLabel}>Oraș</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Ex: Râmnicu Vâlcea"
                  className={styles.formControl}
                />
              </Form.Group>
              <Form.Group className={styles.formGroup}>
                <Form.Label className={styles.formLabel}>Comună</Form.Label>
                <Form.Control
                  type="text"
                  name="comune"
                  value={formData.comune}
                  onChange={handleChange}
                  placeholder="Ex: Bujoreni"
                  className={styles.formControl}
                />
              </Form.Group>
            </div>

            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>
                Descriere detaliată*
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Descrie produsul sau serviciul oferit..."
                className={styles.formControl}
              />
            </Form.Group>

            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>Imagine</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={styles.formControl}
              />
              <Form.Text className={styles.formText}>
                Încarcă o imagine reprezentativă (max 2MB)
              </Form.Text>
            </Form.Group>

            <h5 className={styles.sectionTitle}>Date de contact</h5>
            <div className={styles.contactGroup}>
              <Form.Group className={styles.formGroup}>
                <Form.Label className={styles.formLabel}>Nume</Form.Label>
                <Form.Control
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  placeholder="Ex: Ion Popescu"
                  className={styles.formControl}
                />
              </Form.Group>
              <Form.Group className={styles.formGroup}>
                <Form.Label className={styles.formLabel}>Telefon</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Ex: 0722 123 456"
                  className={styles.formControl}
                />
              </Form.Group>
              <Form.Group className={styles.formGroup}>
                <Form.Label className={styles.formLabel}>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Ex: contact@example.com"
                  className={styles.formControl}
                />
              </Form.Group>
            </div>

            <div className={styles.buttonContainer}>
              <Button
                type="submit"
                disabled={uploading}
                className={`${styles.btnPrimary} ${
                  uploading ? styles.btnPrimaryDisabled : ''
                }`}
              >
                {uploading ? (
                  <>
                    <Spinner
                      as="span"
                      size="sm"
                      animation="border"
                      className={styles.spinnerBorder}
                    />{' '}
                    Postează...
                  </>
                ) : (
                  'Publică anunțul'
                )}
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default AddPostForm;
