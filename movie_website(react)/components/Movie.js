import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import '../css/Movie.css';

function Movie({id, coverImg, title, summary, genres, year}){
    return (
    <div className="movie_list">
      <div className="movie_poster">
        <img src={coverImg} alt={title}/>
        </div>
      <div className="movie_container">
    <h3 className="movie_title">
      <Link className="link" to={`/movie/${id}`}>{title} </Link></h3>
    <h5 className="movie_year">({year})</h5>
    </div>
    <ul className="movie_genres">
      {genres.map(g=> (
      <li key={g}>{g}</li>
      ))}
    </ul>
    <p className="movie_summary">{summary}</p>
    
  </div>

  );
}

Movie.propTypes = {
    id: PropTypes.number.isRequired,
    coverImg: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;