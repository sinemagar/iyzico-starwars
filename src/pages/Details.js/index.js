import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { defaultImg, imageApi, starshipApi } from "../../api/api";
import Loading from "../../components/Loading";

import "./index.css";

function Details() {
    const [star, setStar] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    useEffect(() => {
        axios(`${starshipApi}/${id}/?format=json`)
            .then((res) => res.data)
            .then((data) => setStar(data))
            .finally(() => setLoading(false));
    }, []);

    //ffor images
    const [pic, setPic] = useState(null);
    useEffect(() => {
        axios.get(`${imageApi}`).then((response) => {
            let foundedImg = response.data.find(
                (img) => img.img_id.toString() === id
            );
            if (foundedImg === undefined) {
                foundedImg = { img: `${defaultImg}` };
            }
            setPic(foundedImg);
            console.log(foundedImg);
        });
    }, []);

    return (
        <div className="card">
            {loading && <Loading />}
            <a href="/">
                <button
                    style={{ margin: "10px" }}
                    className="ui left labeled icon inverted yellow button"
                >
                    <i className="left arrow icon"></i>
                    Back
                </button>
            </a>
            <div className="detail">
                {star && (
                    <div className="ui card">
                        <div className="content">
                            <b>{star.name}</b>
                        </div>
                        <div className="image">
                            <img
                                style={{ padding: "10px", borderStyle: "10px" }}
                                src={pic && pic.img}
                                alt="img"
                            />
                        </div>
                        <div className="content">
                            <p style={{ marginTop: "10px" }}>
                                <strong>Model : </strong> {star.model}
                            </p>
                            <p style={{ marginTop: "10px" }}>
                                <strong>Hyper Drive RATING : </strong> {star.hyperdrive_rating}
                            </p>
                            <p style={{ marginTop: "10px" }}>
                                <strong>Passengers : </strong> {star.passengers}
                            </p>
                            <p style={{ marginTop: "10px" }}>
                                <strong>Max Atmosphering Speed : </strong>{" "}
                                {star.max_atmosphering_speed}
                            </p>
                            <p style={{ marginTop: "10px" }}>
                                <strong>Manufacturer : </strong> {star.manufacturer}
                            </p>
                            <p style={{ marginTop: "10px" }}>
                                <strong>Crew : </strong> {star.crew}
                            </p>
                            <p style={{ marginTop: "10px" }}>
                                <strong>Cargo Capacity : </strong> {star.cargo_capacity}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Details;
