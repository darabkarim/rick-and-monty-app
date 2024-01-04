import React from 'react';

function CharacterCard({ character, onClick }) {
  const {  name, status, species, gender, image,location} = character;

  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src={image} className="card-img-top" alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">
          <strong>Status:</strong> <span className={`badge bg-${status === 'Alive' ? 'success' : (status === 'Dead' ? 'danger' : 'secondary')}`}>{status}</span>
        </p>
        <p className="card-text"><strong>Species:</strong> {species}</p>
        <p className="card-text"><strong>Gender:</strong> {gender}</p>
        <p className="card-text"><strong>Location:</strong> {location.name}</p>
        <button className="btn btn-primary" onClick={onClick}>View Details</button>
      </div>
    </div>
  );
}

export default CharacterCard;
