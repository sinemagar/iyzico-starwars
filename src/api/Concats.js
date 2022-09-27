import axios from "axios";
import { useEffect, useState } from "react";

export default function Contacts() {
    const [page, setPage] = useState([]);
    const [imagess, setImagess] = useState([]);
    const [asd, setAsd] = useState([]);

    useEffect(() => {
        axios
            .all([
                axios.get("https://swapi.dev/api/starships/?page=1&format=json"),
                axios.get("https://swapi.dev/api/starships/?page=2&format=json"),
                axios.get("https://swapi.dev/api/starships/?page=3&format=json"),
                axios.get("https://swapi.dev/api/starships/?page=4&format=json"),
                axios.get(
                    "https://raw.githubusercontent.com/sinemagar/My-React-Projects/master/todo-app/api/image.json"
                )
            ])
            .then(
                axios.spread((obj1, obj2, obj3, obj4, obj5) => {
                    // Both requests are now complete
                    setPage(
                        obj1.data.results
                            .concat(obj2.data.results)
                            .concat(obj3.data.results)
                            .concat(obj4.data.results)
                    );

                    console.log("obj1", obj1);

                    setImagess(obj5.data);
                })
            );
    }, []);

    console.log("page", page);

    console.log("index", page.name);
    // console.log("imageindeksli", imagess[1].img);
    console.log(imagess);

    // console.log("asdas", asd);

    return (
        <div>
            {page.map((page, index) => {
                return (
                    <div key={index}>
                        <h4> page den gelen name : {page.name}</h4>
                        <h4>
                            {" "}
                            image datasından page indexisine göre name : {imagess[index].name}
                        </h4>
                        <h4> image resim : alttaki resim image datasından geldi</h4>
                        <img src={imagess[index].img} height={120}></img>
                    </div>
                );
            })}
        </div>
    );
}