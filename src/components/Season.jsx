import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { fetchShowById, fetchEpisodesBySeasonId } from "./CallingApi";

function Season() {
  const { showId } = useParams();
  const [showData, setShowData] = useState(null);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const showData = await fetchShowById(showId);
        setShowData(showData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [showId]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      if (showData) {
        const episodesData = await fetchEpisodesBySeasonId(showData.seasons.map(season => season.id));
        setEpisodes(episodesData);
      }
    };
    fetchEpisodes();
  }, [showData]);

  if (!showData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Container>
        <h1 className="mt-4 mb-4">{showData.title}</h1>
        <Row>
          {showData.seasons.map((season) => (
            <Col key={season.id} sm={12} md={6} lg={4} xl={3} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>Season {season.number}</Card.Title>
                  <p>{season.description}</p>
                  <p>{season.releaseDate}</p>
                  <div>
                    <h5>Episodes:</h5>
                    <ul>
                      {episodes
                        .filter(episode => episode.seasonId === season.id)
                        .map((episode) => (
                          <li key={episode.id}>{episode.title}</li>
                        ))}
                    </ul>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Season;
