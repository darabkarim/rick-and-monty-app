import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CharacterProfile from '../components/CharacterProfile';
import api from '../services/api';

function CharacterProfilePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    // Fetch individual character details based on id
    api.getCharacterById(id).then((data) => {
      setCharacter(data);
    });
  }, [id]);

  const handleProfileClose = () => {
    // Navigate back to the character grid page
    navigate('/');
  };

  return (
    <div>
      {character && (
        <CharacterProfile character={character} onClose={handleProfileClose} />
      )}
    </div>
  );
}

export default CharacterProfilePage;
