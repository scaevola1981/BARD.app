import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import Api from '../../../api'; // Ajustează calea în funcție de proiectul tău

const DbContent = () => {
  const [ads, setAds] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAds = async () => {
    const response = await Api.ad.readAll();

    if (response.success) {
      setAds(response.data);
    } else {
      setError('Eroare la preluarea anunțurilor.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAds();
  }, []);

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" />
        <p>Se încarcă anunțurile...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2>Anunțuri disponibile</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {!error && ads.length === 0 && (
        <Alert variant="info">Momentan nu există anunțuri.</Alert>
      )}

      <Row>
        {ads.map((ad) => (
          <Col key={ad.id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{ad.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {ad.county}, {ad.city}
                </Card.Subtitle>
                <Card.Text>{ad.description}</Card.Text>
                {ad.image && (
                  <Card.Img variant="bottom" src={ad.image} alt="Imagine anunț" />
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default DbContent;