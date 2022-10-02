import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStarShips } from "../redux/starshipsSlice";
import "../components/style/style.css";
import Error from "../components/Error";
import Loading from "../components/Loading";
import axios from "axios";
import Cards from "../components/Cards";



export default function Home() {
  const [filterText, setFilterText] = useState("");
  const [imagess, setImagess] = useState([]);

  //get  with useSelector
  const starships = useSelector((state) => state.starships.items);
  //loading status
  const status = useSelector((state) => state.starships.status);
  //error status
  const error = useSelector((state) => state.starships.error);
  //pages
  const nextPage = useSelector((state) => state.starships.page);
  //has next page
  const hasNextPage = useSelector((state) => state.starships.hasNextPage);

  const dispatch = useDispatch();

  //dispatch event wt useEffect
  useEffect(() => {


    dispatch(fetchStarShips());



  }, [dispatch]);

  //image json istek atıp images set edilir
  useEffect(() => {
    axios.get("https://raw.githubusercontent.com/sinemagar/My-React-Projects/master/todo-app/api/image.json")
      .then(
        (obj) =>
          setImagess(obj.data)
      )

  }, []);

  //search
  const filtered = starships.filter((item) => {
    return Object.keys(item).some((key) => {
      return item[key]
        .toString()
        .toLowerCase()
        .includes(filterText.toLocaleLowerCase());
    });
  });

  //fonks name gönderip starshipdeki name indexini bulma
  const lastIndexOfName = (name) => {
    let index = [...starships]
      .reverse()//diziyi tersine çevirme
      .findIndex((pageIndex) => pageIndex.name === name);
    return index >= 0 ? starships.length - 1 - index : index;
  }
  //error
  if (status === "failed") {
    return <Error message={error} />;
  }


  return (
    <div >
      <div className="ui huge icon input">
        <input
          style={{ width: "400px", marginTop: "20px" }}
          className=""
          type="text"
          placeholder="Search"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <i className="search icon"
          style={{ marginTop: "9px" }}
        ></i>
      </div>

      <div className="container">
        <div className="ui link cards">
          {filtered.map((starships, index) => {
            //image için ilgili index i bul src de kullanmak için
            let imageIndex = lastIndexOfName(starships.name);

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

        </div>
      </div>

      <div style={{ padding: 30, textAlign: "center" }}>
        {status === "loading" && <Loading />}
        {hasNextPage && status !== "loading" && (
          <button
            className="ui inverted yellow button"
            onClick={() => {
              dispatch(fetchStarShips(nextPage));

            }}
          > Load More </button>
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
  )
}


