

export const starshipApi = "https://swapi.dev/api/starships"
export const imageApi = "https://raw.githubusercontent.com/sinemagar/My-React-Projects/master/todo-app/api/image.json"
export const defaultImg = "https://semantic-ui.com/images/wireframe/image.png"

/*

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
                    const newData = (
                        obj1.data.results
                            .concat(obj2.data.results)
                            .concat(obj3.data.results)
                            .concat(obj4.data.results)
                    )
                    console.log("newData:", newData);

                })

            )*/