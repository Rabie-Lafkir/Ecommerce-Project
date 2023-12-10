import DataTable from "../../components/DataTable/DataTable";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

import "./User.css";
export default function User() {
  return (
    <div className="user">
      <Sidebar />
      <div className="usersContainer">
        <Navbar />
        <DataTable />
      </div>
    </div>
  );
}
