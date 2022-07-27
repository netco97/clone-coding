import { useState, useEffect } from "react";
import {useParams} from "react-router-dom";

function Detail(){
    const {id} = useParams();
    const [movies, setMovies] = useState([]);
    const getMovies = async () =>  {
    const json = await (
        await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json();
    setMovies(json.data.movie);
};
    useEffect(()=>{
        getMovies();
    },[]);
    return (
        
    <div>
        <h1>"{movies.title_long}"</h1>
        <h3>rating : {movies.rating}</h3>
    </div>
    );
}

export default Detail;