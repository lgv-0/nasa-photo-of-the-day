import React, {useState, useEffect} from "react";
import axios from "axios";
import "./App.css";

/*
    copyright
    date
    explanation
    hdurl
    url
    media_type
    title
    service_version
*/

function App() {
  const [picOfDay, sPicOfDay] = useState({});
  let [EpicArray, sEpicArray] = useState([]);
  useEffect(()=>
    {
      axios.get("https://api.nasa.gov/planetary/apod?api_key=oSVEqTCvWA37W903hvscw06HJRtrZZbuaA6LUnF6").then(response =>
        {
          sPicOfDay(response.data);
        });
      axios.get("https://api.nasa.gov/EPIC/api/enhanced/images?api_key=oSVEqTCvWA37W903hvscw06HJRtrZZbuaA6LUnF6").then(response =>
        {
          let tmp = [];
          for (let i = 0; i < response.data.length; i++)
            tmp.push(response.data[i]);
          sEpicArray(tmp);
        });
    }, []);

  return (
    <div className="App">
      <div className="Container">
        <RenderPicture o_Info={picOfDay} />
        <div className="clusterContainer">
          <h1>The Earth</h1>
          <h4>As seen from NASA's Epic Camera on the NOAA DSCOVR Spacecraft</h4>
          {
            EpicArray.map((i,index)=>
              {
                return (<RenderCluster o_Info={i} key={index} />);
              })
          }
        </div>
      </div>
    </div>
  );
}

function RenderPicture(o_Pass)
{
  let data = o_Pass.o_Info;
  return (
    <div className="Picture">
      <h2>{data["title"]}</h2>
      <h3>© {data["copyright"]}, {data["date"]}</h3>
      <img src={data["hdurl"]} />
      <p>{data["explanation"]}</p>
    </div>
  );
}

function RenderCluster(o_Pass)
{
  let BuildCon = `https://epic.gsfc.nasa.gov/archive/enhanced/${o_Pass.o_Info["date"].slice(0, 4)}/${o_Pass.o_Info["date"].slice(5, 7)}/${o_Pass.o_Info["date"].slice(8,10)}/png/${o_Pass.o_Info["image"]}.png`;
  return (
    <div className="ClusterItem">
      <h2>{o_Pass.o_Info["date"]}</h2>
      <img src={BuildCon} />
    </div>
  );
}

export default App