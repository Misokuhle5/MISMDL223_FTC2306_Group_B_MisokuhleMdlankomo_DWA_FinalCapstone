import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import { fetchShowById, } from "./CallingApi";

function ShowPreview() {
  const { showId } = useParams();
  const [showData, setShowData] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false); // Track favorite status

  useEffect(() => {
    const fetchData = async () => {
      try {
        const show = await fetchShowById(showId);
        setShowData(show);

        const seasonsData = await fetchShowById(showId);
        setSeasons(seasonsData);
      } catch (error) {
        console.error(error);
        // Handle error state or display error message to the user
      }
    };
    fetchData();
  }, [showId]);

  // Simulate favorite toggle functionality
  const handleFavoriteToggle = () => {
    setIsFavorite((prevFavorite) => !prevFavorite);
    // You would typically integrate this with Supabase or your backend to manage favorites for users
  };

  if (!showData) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h1 className="mt-4 mb-4">{showData.title}</h1>
      <Card>
        <Card.Img variant="top" src={showData.image} alt={showData.title} />
        <Card.Body>
          <h5>Genres:</h5>
          <ul>
            {showData.genres.map((genreId) => (
              <li key={genreId}>
                {/* Map genre IDs to titles (use a mapping object) */}
                {/* Display genre titles */}
              </li>
            ))}
          </ul>
          <Card.Text>{showData.description}</Card.Text>
          <Button onClick={handleFavoriteToggle}>
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
        </Card.Body>
      </Card>

      <h3 className="mt-4 mb-4">Seasons:</h3>
      {seasons.map((season) => (
        <Card key={season.id}>
          {/* Display season details - episode count, release date, etc. */}
        </Card>
      ))}

      {/* Add more functionalities like audio player, episode list, etc. */}
    </Container>
  );
}

export default ShowPreview;
