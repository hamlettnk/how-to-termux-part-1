import "../App.css";
import { Link } from "react-router-dom";

export default function BlogHomePage() {
    return (
        <div className="home">
            <div className="side-menu">

            </div>
            <div className="whole-blog">
                <img className="home-logo" src={require("../images/termux-photo.jpg")} alt="logo" />
                <h1 className="logo-name">quarks</h1>
                <a className="termux-link" href="https://www.quarks.ml/how-to-termux-part-1">Learn Termux</a>
            </div>
            <div className="side-menu">
                <Link to="/invoices">Invoices</Link> |{" "}
                <Link to="/expenses">Expenses</Link>
            </div>
        </div>
    )
}