import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import { starshipApi } from '../../api/api';
import Loading from '../../components/Loading';
import { fetchStarShips } from '../../redux/starshipsSlice';
import "./index.css";

function Details() {

    //console.log("starshipsssssss:", starships);
    const status = useSelector((state) => state.starships.status);
    const [star, setStar] = useState(null)
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    console.log("id:", id);

    //axios get process with useEffect
    useEffect(() => {
        axios(`${starshipApi}/${id}/?format=json`)
            .then(
                (res) => res.data,)
            .then(data => setStar(data))
            .finally(() => setLoading(false))
    }, [id])

    return (
        <div className='card'>
            {status === "loading" && <Loading />}
            <Link to="/">
                <button style={{ margin: "10px" }}
                    class="ui left labeled icon inverted yellow button"
                >
                    <i class="left arrow icon"></i>
                    Back
                </button>
            </Link>
            <div className='detail'>
                {
                    star && (
                        <div className="ui card">
                            <div className="content">
                                <b>
                                    {star.name}
                                </b>
                            </div>
                            <div className="image">
                                <img style={{ padding: "10px", borderStyle: "10px" }} src='https://semantic-ui.com/images/wireframe/image.png' />
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
