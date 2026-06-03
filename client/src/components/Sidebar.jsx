import { NavLink } from "react-router-dom"
import { MdDashboard } from "react-icons/md"
import { FaSuitcase, FaMap, FaUsers, FaTrash } from "react-icons/fa"

const Sidebar = () => {
    return (
        <div>
            <NavLink to="/dashboard">
                <MdDashboard />
                <span>Dashboard</span>
            </NavLink>

            <NavLink to="/trips">
                <FaSuitcase />
                <span>Trips</span>
            </NavLink>

            <NavLink to="/itinerary">
                <FaMap />
                <span>Itinerary</span>
            </NavLink>

            <NavLink to="/people">
                <FaUsers />
                <span>People</span>
            </NavLink>

            <NavLink to="/trashed">
                <FaTrash />
                <span>Trashed</span>
            </NavLink>
        </div>
    )
}

export default Sidebar