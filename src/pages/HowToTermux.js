import "../App.css";

function Posts() {
    return (
        <div className="whole-post">
            <img src={require("../images/termux-photo-100x100.jpg")} alt="termux-photo" />
        </div>
    )
}

export default function ABlogPost() {
    return (
        <div className="whole-blog">
            <div>
                <h1 className="blog-title">How To Termux - part one</h1>
                <h3 className="blog-section-1"> Introduction to Termux</h3>
                <img className="blog-images" src={require("../images/termux-photo.jpg")} alt="termux-photo" />
                <p className="blog-paragraph">
                    Termux is by far the best Linux terminal emulator for Android.<br></br>
                    It Comes in handy for Linux lovers letting them use tools in Terminal.<br></br>
                    So to start with Termux it will be a good idea to update and upgrade<br></br>
                    the packages repository.
                </p>
                <h3 className="blog-section-1">Updating and Upgrading the packages repository</h3>
                <p className="blog-paragraph">
                    That can be done by typing the following commands in the terminal
                    <h4 className="blog-command">apt update</h4>
                    and then
                    <h4 className="blog-command">apt upgrade</h4>
                    click <a href="https://www.quarks.ml">here</a> if you get errors on the above step.
                </p>
            </div>
            <div className="posts-list">
                <Posts />
                <Posts />
                <Posts />
                <Posts />
                <Posts />
                <Posts />
                <Posts />
                <Posts />
            </div>

        </div>
    )
}