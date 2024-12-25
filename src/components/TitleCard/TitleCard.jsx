import React, { useRef ,useEffect, useState} from 'react'
import './TitleCard.css'
import cards_data from "../../assets/cards/Cards_data"
import { Link } from 'react-router-dom';

function TitleCard({title,category}) {
  const cardsRef = useRef();
  const [apiData, setapiData] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzIzM2Q4ZTk4MzZlMmVmNGViNzhjZTJkZGE2ZDQ1OSIsIm5iZiI6MTczNTE1NTM5MC42MzM5OTk4LCJzdWIiOiI2NzZjNWViZWYzODg1MmNhZTNlY2E1NTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zzpfCp1WigCGdmA68F2VndAUpY-KPC4ygv1KQ-gqFgs",
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${category ? category:"now_playing"}?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setapiData(res.results))
        .catch((err) => console.error(err));
    cardsRef.current.addEventListener('wheel',handleWheel)  
  },[])

  return (
    <div className='titleCards'>
      <h2> {title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
                alt=""
              />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  )
}

export default TitleCard; 