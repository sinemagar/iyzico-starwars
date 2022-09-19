import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStarShips } from "../redux/starshipsSlice";
import Masonry from "react-masonry-css";
import "./style/style.css";
//import Loading from "./Loading";
import Error from "./Error";
import { Link } from "react-router-dom";

function Cards() {
    //get  with useSelector
    const starships = useSelector((state) => state.starships.items);
    //loading status
    const isLoading = useSelector((state) => state.starships.isLoading);
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

    //error
    if (error) {
        return <Error message={error} />;
    }

    return (
        <div className="container">
            <div className="row">
                <Masonry
                    breakpointCols={3}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {starships.map((starships) => (
                        <div key={starships.name}>
                            <Link to="/starships/2">
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
                {hasNextPage && !isLoading && (
                    <button
                        className={isLoading && "ui basic loading button"}
                        onClick={() => dispatch(fetchStarShips(nextPage))}
                    >
                        Load More

                    </button>
                )}
                {nextPage === 5 &&
                    <div>There is nothing to be shown.</div>
                }
            </div>
        </div>
    );
}

export default Cards;
