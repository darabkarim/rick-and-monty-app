import React, { useState, useEffect, useCallback } from "react";
import CharacterCard from "../components/CharacterCard";
import CharacterSearch from "../components/CharacterSearch";
import FilterOptions from "../components/FilterOptions";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import "bootstrap/dist/css/bootstrap.min.css";

function CharacterGridPage() {
  const navigate = useNavigate();
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
    location: "",
    episode: "",
    gender: "",
    species: "",
    type: "",
    name: "",
  });

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchCharacters = useCallback(async () => {
    try {
      const data = await api.getCharacters({ page, filters });

      if (data.results && Array.isArray(data.results)) {
        const newCharacters = data.results;

        if (page === 1) {
          setCharacters(newCharacters);
          setFilteredCharacters(newCharacters);
        } else {
          setCharacters((prevCharacters) => [
            ...prevCharacters,
            ...newCharacters,
          ]);
        }

        setHasMore(!!data.info.next);
      } else {
        console.error('Invalid data structure:', data);
      }
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  }, [page, filters]);

  useEffect(() => {
    fetchCharacters();
  }, [page, filters, fetchCharacters]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterType]: value }));
    setPage(1);
  };

  const handleSearch = (searchTerm) => {
    setFilters({ ...filters, name: searchTerm });
    setPage(1);
  };

  const applyFilters = useCallback(() => {
    const filteredResults = characters.filter((character) => {
      if (
        filters.status &&
        character.status.toLowerCase() !== filters.status.toLowerCase()
      ) {
        return false;
      }
      if (
        filters.gender &&
        character.gender.toLowerCase() !== filters.gender.toLowerCase()
      ) {
        return false;
      }
      if (
        filters.species &&
        character.species.toLowerCase() !== filters.species.toLowerCase()
      ) {
        return false;
      }
      if (
        filters.name &&
        !character.name.toLowerCase().includes(filters.name.toLowerCase())
      ) {
        return false;
      }
      if (
        filters.location &&
        !character.location.name.toLowerCase().includes(filters.location.toLowerCase())
      ) {
        return false;
      }
      if (
        filters.episode &&
        !character.episode.some((ep) =>
          ep.toLowerCase().includes(filters.episode.toLowerCase())
        )
      ) {
        return false;
      }
      if (
        filters.type &&
        character.type &&
        character.type.toLowerCase() !== filters.type.toLowerCase()
      ) {
        return false;
      }
      // ... (other filters)

      return true;
    });

    setFilteredCharacters(filteredResults);
  }, [filters, characters]);

  useEffect(() => {
    applyFilters();
  }, [filters, characters, applyFilters]);

  const handleCharacterClick = (character) => {
    navigate(`/character/${character.id}`);
  };

  const loadMoreCharacters = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="container mt-4">
      <CharacterSearch onSearch={handleSearch} />
      <FilterOptions filters={filters} onFilterChange={handleFilterChange} />

      <InfiniteScroll
        dataLength={characters.length}
        next={loadMoreCharacters}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more characters to load</p>}
        style={{ overflow: "visible" }}
      >
        <div className="row">
          {filteredCharacters.map((character) => (
            <div key={character.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <CharacterCard
                character={character}
                onClick={() => handleCharacterClick(character)}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default CharacterGridPage;
