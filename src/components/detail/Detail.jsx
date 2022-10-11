import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../constants/api";
import Container from 'react-bootstrap/Container';

function Detail() {
  const [wp, setWP] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  const url = API_URL + "/" + id;

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await fetch(url);

        if (response.ok) {
          const json = await response.json();
          console.log(json);
          setWP(json);
        } else {
          setError("An error occured");
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [url]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>ERROR: An error occured</div>;
  }

  return (
    <Container>
      <div className="page-detail">
        <h2>{wp.title.rendered}</h2>
        <p>Author: {wp.author}</p>
        <p>Slug: {wp.slug}</p>
        <div dangerouslySetInnerHTML={{ __html: wp.excerpt.rendered }} />
        <p>Date: {wp.date}</p>
      </div>
    </Container>
  );

}

export default Detail;