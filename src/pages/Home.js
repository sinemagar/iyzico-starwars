import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStarShips } from "../redux/starshipsSlice";
import Masonry from "react-masonry-css";
import "../components/style/style.css";
import Error from "../components/Error";
import Loading from "../components/Loading";
import axios from "axios";
import Navbar from "../components/Navbar";
import Cards from "../components/Cards";
import { render } from "@testing-library/react";


export default function Home() {
  const [filterText, setFilterText] = useState("")
  const [filtered, setFiltered] = useState([]);
  const [imagess, setImagess] = useState([]);
  //get  with useSelector
  const starships = useSelector((state) => state.starships.items);


  //setFiltered(starships);
  console.log("starshipApi", starships);
  //loading status
  const status = useSelector((state) => state.starships.status);

  //error status
  const error = useSelector((state) => state.starships.error);
  //pages
  const nextPage = useSelector((state) => state.starships.page);
  //has next page
  const hasNextPage = useSelector((state) => state.starships.hasNextPage);

  const dispatch = useDispatch();
  //var id = url.slice(32)

  //dispatch event wt useEffect
  useEffect(() => {

    if (starships.length === 0) {
      dispatch(fetchStarShips());

    }

  }, [dispatch]);


  //image json istek atıp images set edilir

  useEffect(() => {
    axios.get("https://raw.githubusercontent.com/sinemagar/My-React-Projects/master/todo-app/api/image.json")
      .then(
        (obj) =>
          setImagess(obj.data)
      )

  }, []);
  //console.log("imagess", imagess)

  useEffect(() => {
    setFiltered(starships)
  }, [])

  //error
  if (status === "failed") {
    return <Error message={error} />;
  }

  //search
  const requestSearch = () => {
    if (filterText == "" || filterText === null) {
      setFiltered(starships);
    } else {
      console.log("filtertext", filterText);
      axios
        .get(
          `https://swapi.dev/api/starships/?search=${filterText}&format=json`
        )
        .then((objDene) => {
          setFiltered(objDene.data.results);
          console.log("OBJDENE", objDene);
        });
    }
  };

  //fonks name gönderip starshipdeki name indexini bulma
  const lastIndexOfName = (name) => {
    let index = [...starships]
      .reverse()//diziyi tersine çevirme
      .findIndex((pageIndex) => pageIndex.name === name);
    return index >= 0 ? starships.length - 1 - index : index;
  }



  console.log("filtrelenmiş hali", filtered);



  return (
    <div>
      <input
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />

      <button onClick={requestSearch}>SEARCH</button>
      <button onClick={() => setFiltered(starships)}>CLEAR</button>
      <div className="cardInfo">
        <div className="row">


          <Masonry
            breakpointCols={3}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >

            {filtered.map((starships, index) => {

              //image için ilgili index i bul src de kullanmak için
              let imageIndex = lastIndexOfName(starships.name);
              //typeof controle
              //console.log("imageIndexme", typeof lastIndexOfName(starships.name))
              return (

                <Cards
                  key={index}
                  starshipName={starships.name}
                  detailLink={`starships/${starships.url.slice(32)}`}
                  ImageLink={imagess[imageIndex].img}
                  starshipModel={starships.model}
                  starshipHyper={starships.hyperdrive_rating}
                />
              )
            })}

          </Masonry>
        </div>
        <div style={{ padding: 30, textAlign: "center" }}>
          {status === "loading" && <Loading />}
          {hasNextPage && status !== "loading" && (
            <button
              className="ui inverted yellow button"
              onClick={() => {
                dispatch(fetchStarShips(nextPage));
                setFiltered(starships)
              }}
            >
              Load More

            </button>
          )}
          {nextPage === 5 &&
            <div style={{ color: "#eee" }}>
              <strong>
                There is nothing to be shown.
              </strong>
            </div>
          }
        </div>
      </div>
    </div>
  )
}


