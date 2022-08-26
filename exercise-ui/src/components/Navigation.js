import { Link } from "react-router-dom";

function Navigation() {
    return (
        <nav>
            <span><Link to="/">Home Page</Link></span>
            <span> <Link to="/add-exercise">Create Exercise Page</Link></span>
        </nav>
    )

}


export default Navigation