import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from './style.module.css';


function Search() {
  const [input, setInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${input}&api_key=cfe422613b250f702980a3bbf9e90716`;

    axios.get(apiUrl)
      .then(res => {
        setSearchResults(res.data.results);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [input]);

  return (
    <>
    <form className={style.search}>
      <input
        type="search"
        placeholder="Search for movie title"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {/* <div className={style.movieList}>
        {searchResults.map(movie => (
          <div key={movie.id} className={style.movie}>
             <div className={style.movie}>
              <figure>
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                 <p className={style.title}>{movie.title}</p>
              </figure>
            </div>
          </div>
        ))}
      </div> */
      
      <ul className={style.movies}>
        {searchResults.map(movie => (
          <li key={movie.id} className={style.movie}>
            <div className={style.movie}>
              <figure>
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                 <p className={style.title}>{movie.title}</p>
              </figure>
            </div>
          </li>
        ))}
      </ul>}
    </form>
    </>
  );
}

export default Search;
