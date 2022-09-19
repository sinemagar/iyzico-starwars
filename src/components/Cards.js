import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStarShips } from "../redux/starshipsSlice";
import Masonry from "react-masonry-css";
import "./style/style.css";
import Loading from "./Loading";
import Error from "./Error";

function Cards() {
    //get  with useSelector
    const starships = useSelector((state) => state.starships.items);
    //loading status
    const isLoading = useSelector((state) => state.starships.isLoading);
    //error status
    const error = useSelector((state) => state.starships.error);
    //pages
    const nextPage = useSelector((state) => state.starships.page);
    console.log(nextPage);

    const dispatch = useDispatch();
    //dispatch event wt useEffect
    useEffect(() => {
        dispatch(fetchStarShips());
    }, [dispatch]);

    //loading
    if (isLoading) {
        return <Loading />;
    }
    //error
    if (error) {
        return <Error message={error} />;
    }

    return (
        <div className="container">
            <Masonry
                breakpointCols={3}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {starships.map((starships) => (
                    <div key={starships.name}>
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
                    </div>
                ))}
            </Masonry>
            <div style={{ padding: 30, textAlign: "center" }}>
                <button
                    className="big ui inverted brown button"
                    onClick={() => dispatch(fetchStarShips(nextPage))}
                >
                    More ({nextPage})
                </button>
            </div>
        </div>
    );
}

export default Cards;
