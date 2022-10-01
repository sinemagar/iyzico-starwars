import "./style/style.css";
import { Link } from "react-router-dom";

const Cards = ({ starshipName, detailLink, ImageLink, starshipModel, starshipHyper }) => {

    return (
        <div className="card"
            style={{ backgroundColor: "#ddb500" }}
        >
            <Link to={detailLink}>
                <div className="content"
                    style={{ marginTop: "6px" }}
                >
                    <strong>{starshipName}</strong>
                </div>
                {/*src imagess[indexteki]img yi al çünkü */}
                {/*image json ile swapi indexleri aynı */}
                <div className="image">
                    <img
                        style={{ width: "270px", margin: "10px" }}
                        className="starships"
                        alt={starshipName}
                        src={ImageLink}
                    />
                </div>
                <div className="content"
                    style={{ marginBottom: "5px" }}
                >
                    <span className="starship_info">
                        <strong>MODEL : </strong>
                        {starshipModel}
                    </span>
                    <br />
                    <span className="starship_info">
                        <b>HYPERDRIVER RATING : </b>
                        {starshipHyper}
                    </span>
                </div>
            </Link>

        </div>
    );
}

export default Cards;
