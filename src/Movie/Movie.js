import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from "./style.module.css"

function Movies() {
  const [movies, setMovies] = useState([]);
  const [hoveredTitle, setHoveredTitle] = useState(null);

  useEffect(() => {
   
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=cfe422613b250f702980a3bbf9e90716`;

    axios.get(apiUrl)
      .then(response => {
        setMovies(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleMouseEnter = (title) => {
    setHoveredTitle(title);
  }

  const handleMouseLeave = () => {
    setHoveredTitle(null);
  }

  return (
    <>
     
      <ul className={style.movies}>
        {movies.map(movie => (
          <li key={movie.id} className={style.movie}>
            <div className={style.movie} onMouseEnter={() => handleMouseEnter(movie.title)} onMouseLeave={handleMouseLeave}>
              <figure>
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                {hoveredTitle === movie.title && <p className={style.title}>{movie.title}</p>}
              </figure>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Movies;
