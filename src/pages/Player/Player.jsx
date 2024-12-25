import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from "../../assets/back_arrow_icon.png"
import { useNavigate, useParams } from 'react-router-dom';

function Player() {
  const { id } = useParams();
  const navigate = useNavigate(); //use for navigation from one page to another;

  const [apiData, setapiData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof:""
  });
  
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzIzM2Q4ZTk4MzZlMmVmNGViNzhjZTJkZGE2ZDQ1OSIsIm5iZiI6MTczNTE1NTM5MC42MzM5OTk4LCJzdWIiOiI2NzZjNWViZWYzODg1MmNhZTNlY2E1NTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zzpfCp1WigCGdmA68F2VndAUpY-KPC4ygv1KQ-gqFgs",
    },
  };
  
  useEffect(() => {
     fetch(
       `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
       options
     )
       .then((res) => res.json())
       .then((res) => setapiData(res.results[0]))
       .catch((err) => console.error(err));
  },[])

  return (
    <div className="player">
      <img src={back_arrow_icon} alt="" onClick={() => {
        navigate(-2);
      }} />
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
}

export default Player