import "./style/style.css";
import { Link } from "react-router-dom";

const Cards = ({ starshipName, detailLink, ImageLink, starshipModel, starshipHyper }) => {

    return (
        <div >

            <Link to={detailLink}>
                <div className="starship_header">
                    <strong>{starshipName}</strong>
                </div>
                {/*src imagess[indexteki]img yi al çünkü */}
                {/*image json ile swapi indexleri aynı */}
                <img
                    className="starships"
                    alt={starshipName}
                    src={ImageLink}
                />
                <div>
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
