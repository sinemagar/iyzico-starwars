import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { starshipApi } from '../../api/api';
import Loading from '../../components/Loading';

import "./index.css";

function Details() {



    const [star, setStar] = useState(null)
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    // console.log("id:", id);
    //axios get process with useEffect
    useEffect(() => {
        axios(`${starshipApi}/${id}/?format=json`)
            .then((res) => res.data,)
            .then(data => setStar(data))
            .finally(() => setLoading(false))
        console.log(id);
    }, [id])


    const [pic, setPic] = useState(null)
    useEffect(() => {
        axios.get(`https://raw.githubusercontent.com/sinemagar/My-React-Projects/master/todo-app/api/image.json`)
            .then((response) => {
                setPic(response.data)
                console.log("pic:", pic);
            }

            )
    }, [setPic])

    return (
        <div className='card'>


            {pic.map((image) => {
                console.log(image.id.slice(32).replace("/", ""));
            })}

            {loading && <Loading />}
            <Link to="/">
                <button style={{ margin: "10px" }}
                    className="ui left labeled icon inverted yellow button"
                >
                    <i className="left arrow icon"></i>
                    Back
                </button>
            </Link>
            <div className='detail'>
                {
                    star && pic && (
                        <div className="ui card">
                            <div className="content">
                                <b>
                                    {star.name}
                                </b>
                            </div>
                            <div className="image">
                                <img style={{ padding: "10px", borderStyle: "10px" }} src={pic[id - 2].img} />
                            </div>

                            <div className="content" >
                                <p style={{ marginTop: "10px" }}>
                                    <strong>Model : </strong>  {star.model}
                                </p>
                                <p style={{ marginTop: "10px" }}>
                                    <strong>Hyper Drive RATING : </strong>  {star.hyperdrive_rating}
                                </p>
                                <p style={{ marginTop: "10px" }}>
                                    <strong>Passengers : </strong>  {star.passengers}
                                </p>
                                <p style={{ marginTop: "10px" }}>
                                    <strong>Max Atmosphering Speed : </strong>  {star.max_atmosphering_speed}
                                </p>
                                <p style={{ marginTop: "10px" }}>
                                    <strong>Manufacturer : </strong>  {star.manufacturer}
                                </p>
                                <p style={{ marginTop: "10px" }}>
                                    <strong>Crew : </strong>  {star.crew}
                                </p>
                                <p style={{ marginTop: "10px" }}>
                                    <strong>Cargo Capacity : </strong>  {star.cargo_capacity}
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Details
