import React, { useEffect, useState } from 'react';
import api from '../services/api';

function CharacterProfile({ character, onClose }) {
  const [origin, setOrigin] = useState(null);
  const [location, setLocation] = useState(null);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const fetchLocation = async (url, setter) => {
      try {
        const response = await api.getLocation(url);
        setter(response);
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    const fetchEpisodes = async () => {
      try {
        const episodeRequests = character.episode.map(api.getEpisode);
        const episodesData = await Promise.all(episodeRequests);
        setEpisodes(episodesData);
      } catch (error) {
        console.error('Error fetching episodes:', error);
      }
    };

    fetchLocation(character.origin.url, setOrigin);
    fetchLocation(character.location.url, setLocation);
    fetchEpisodes();
  }, [character]);

  return (
    <div className="card mb-3">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">{character.name}'s Profile</h5>
        <button className="btn btn-outline-secondary" onClick={onClose}>
          Close Profile
        </button>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-4">
            <img src={character.image} alt={character.name} className="img-fluid rounded" />
          </div>
          <div className="col-md-8">
            <p className="card-text"><strong>Species:</strong> {character.species}</p>
            <p className="card-text"><strong>Gender:</strong> {character.gender}</p>
            <p className="card-text"><strong>Status:</strong> {character.status}</p>
            {origin && (
              <p className="card-text">
                <strong>Origin:</strong> {origin.name}, Dimension: {origin.dimension}, Residents: {origin.residents.length}
              </p>
            )}
            {location && (
              <p className="card-text">
                <strong>Location:</strong> {location.name}, Dimension: {location.dimension}, Residents: {location.residents.length}
              </p>
            )}
            {episodes.length > 0 && (
              <div>
                <strong>Episodes:</strong>
                <ul>
                  {episodes.map((episode) => (
                    <li key={episode.id}>{episode.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterProfile;
