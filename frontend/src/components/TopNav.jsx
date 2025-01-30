import PropTypes from "prop-types";
import "./topNav.css"; // Custom CSS for the navigation

function TopNav({ onNavigate }) {
    return (
        <nav className="top-nav">
            <ul className="nav-list">
                <li className="nav-item"><button onClick={() => onNavigate("dashboard")}>Dashboard</button></li>
                <li className="nav-item"><button onClick={() => onNavigate("gallery")}>Gallery</button></li>
            </ul>
        </nav>
    );
}

TopNav.propTypes = {
    onNavigate: PropTypes.func.isRequired, // Prop for handling navigation
};

export default TopNav;
