import React, { useEffect, useState } from "react";
import "./App.css";
// import logoCircled from "../docs/chevron-circled.svg";
import logoSmall from "../src/Assets/chevron-small.svg";
import logoCircled from "../src/Assets/chevron-circled.svg";

function App() {
  const [carsData, setCarsData] = useState([]);
  const [itemPerPage, setItemPerPage] = useState(4);
  const [currentPageId, setCurrentPageId] = useState(0);

  const getData = () => {
    fetch("./api/cars.json")
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (data) {
        // console.log(data);
        setCarsData(data);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const onPrev = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentPageId < 1) {
      setCurrentPageId(currentPageId);
    } else {
      setCurrentPageId(currentPageId - 1);
    }
  };
  const onNext = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (itemStartIndex + itemPerPage >= carsData.length) {
      setCurrentPageId(currentPageId);
    } else {
      setCurrentPageId(currentPageId + 1);
    }
  };

  const itemStartIndex = currentPageId * itemPerPage;
  console.log(setItemPerPage);
  return (
    <div className="App">
      {carsData
        .slice(itemStartIndex, itemStartIndex + itemPerPage)
        .map((e: any) => {
          return (
            <div className="carsDiv">
              <p style={{ color: "grey" }}> {e.bodyType}</p>
              <p style={{}}>
                <span style={{ fontWeight: "bold" }}>{e.modelName} </span>
                {e.modelType}
              </p>
              <img src={e.imageUrl} className="picture" alt="Not Available" />
              <p>
                <a
                  href="https://www.volvocars.com/in"
                  style={{
                    padding: "20px",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                  }}
                >
                  Learn
                  <img
                    src={logoSmall}
                    alt="Not Available"
                    style={{
                      width: "22px",
                      height: "13px",
                    }}
                  />
                </a>
                <a
                  href="https://buyonline.volvocarindia.com/"
                  style={{
                    padding: "20px",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                  }}
                >
                  Shop
                  <img
                    src={logoSmall}
                    alt="Not Available"
                    style={{
                      width: "22px",
                      height: "13px",
                    }}
                  />
                </a>
              </p>
            </div>
          );
        })}
      <img
        src={logoCircled}
        className="circle2"
        onClick={onPrev}
        alt="Not Available"
      />
      <img
        src={logoCircled}
        className="circle1"
        onClick={onNext}
        alt="Not Available"
      />
    </div>
  );
}

export default App;
