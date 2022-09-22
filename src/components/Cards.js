import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStarShips } from "../redux/starshipsSlice";
import Masonry from "react-masonry-css";
import "./style/style.css";
//import Loading from "./Loading";
import Error from "./Error";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import axios from "axios";

function Cards() {
    //get  with useSelector
    const starships = useSelector((state) => state.starships.items);
    console.log("starships:", starships);
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




    //error
    if (status === "failed") {
        return <Error message={error} />;
    }



    return (
        <div className="cardInfo">
            <div className="row">
                <Masonry
                    breakpointCols={3}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {starships.map((starships) => (
                        <div key={starships.name}>

                            <Link to={`starships/${starships.url.slice(32)}`}>
                                <div className="starship_header">
                                    <strong>{starships.name}</strong>
                                </div>
                                <img
                                    className="starships"
                                    alt={starships.name}
                                    src="https://semantic-ui.com/images/wireframe/image.png"
                                />
                                <div>
                                    <span className="starship_info">
                                        <strong>MODEL : </strong>
                                        {starships.model}
                                    </span>
                                    <br />
                                    <span className="starship_info">
                                        <strong>HYPERDRIVER RATING : </strong>
                                        {starships.hyperdrive_rating}
                                    </span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </Masonry>
            </div>
            <div style={{ padding: 30, textAlign: "center" }}>
                {status === "loading" && <Loading />}
                {hasNextPage && status !== "loading" && (
                    <button

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
