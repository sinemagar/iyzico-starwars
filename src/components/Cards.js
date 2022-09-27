import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStarShips } from "../redux/starshipsSlice";
import Masonry from "react-masonry-css";
import "./style/style.css";
import Error from "./Error";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import axios from "axios";


function Cards() {
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
    //var id = url.slice(32)

    //dispatch event wt useEffect
    useEffect(() => {
        ///let ignore = false;

        if (starships.length === 0) {
            dispatch(fetchStarShips());

        }

    }, [dispatch]);

    //image json istek atıp images set edilir
    const [imagess, setImagess] = useState([]);
    useEffect(() => {
        axios.get("https://raw.githubusercontent.com/sinemagar/My-React-Projects/master/todo-app/api/image.json")
            .then(
                (obj) =>
                    setImagess(obj.data)
            )
    }, []);
    //console.log("imagess", imagess)


    //error
    if (status === "failed") {
        return <Error message={error} />;
    }

    //fonks name gönderip starshipdeki name indexini bulma
    const lastIndexOfName = (name) => {
        let index = [...starships]
            .reverse()//diziyi tersine çevirme
            .findIndex((pageIndex) => pageIndex.name === name);
        return index >= 0 ? starships.length - 1 - index : index;
    }


    return (
        <div className="cardInfo">
            <div className="row">
                <Masonry
                    breakpointCols={3}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {starships.map((starships) => {
                        //image için ilgili index i bul src de kullanmak için
                        let imageIndex = lastIndexOfName(starships.name);
                        //typeof controle
                        //console.log("imageIndexme", typeof lastIndexOfName(starships.name))
                        return (
                            <div key={starships.name}>


                                <Link to={`starships/${starships.url.slice(32)}`}>
                                    <div className="starship_header">
                                        <strong>{starships.name}</strong>
                                    </div>
                                    {/*src imagess[indexteki]img yi al çünkü */}
                                    {/*image json ile swapi indexleri aynı */}
                                    <img
                                        className="starships"
                                        alt={starships.name}
                                        src={imagess[imageIndex].img}
                                    />
                                    <div>
                                        <span className="starship_info">
                                            <strong>MODEL : </strong>
                                            {starships.model}
                                        </span>
                                        <br />
                                        <span className="starship_info">
                                            <b>HYPERDRIVER RATING : </b>
                                            {starships.hyperdrive_rating}
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        )



                    })}
                </Masonry>
            </div>
            <div style={{ padding: 30, textAlign: "center" }}>
                {status === "loading" && <Loading />}
                {hasNextPage && status !== "loading" && (
                    <button
                        className="ui inverted yellow button"
                        onClick={() => dispatch(fetchStarShips(nextPage))}
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
    );
}

export default Cards;
