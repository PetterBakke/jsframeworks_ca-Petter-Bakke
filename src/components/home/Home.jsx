import { useState, useEffect } from "react";
import { API_URL } from "../../constants/api"; 
import { Link } from "react-router-dom";
import Heading from "../heading/Heading";

function Home() {
  const [ wordpress, setWord] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ error, setError] = useState(null);

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await fetch(API_URL);

        if(response.ok) {
          const json = await response.json();
          console.log(json);
          setWord(json);
        } else{
          setError("An error occured");
        }
      } catch(error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>ERROR: An error occured</div>;
  }

  return (
    <div className="results">
      <Heading title="Home" />
      {wordpress.map((pages) => (
        <>
          <h3 key={pages.id}>{pages.title.rendered}</h3>
          <Link to={`page/${pages.id}`}>Link to {pages.slug}</Link>
        </>
      ))}
    </div>
  );
}

export default Home;