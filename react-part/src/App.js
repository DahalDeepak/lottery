import "./App.css";
import { Route, Routes } from "react-router-dom";
import TicketWinner from "./containers/users/ticketWinner";
import RegisterUser from "./containers/admin/registeruser";
import AssignWinner from "./containers/admin/assignWinner";
import YupPracice from "./containers/yuppractice";
import UsersList from "./containers/users/usersList";

function App() {
  return (
    <>
    <div className="navbar">
     <a className="navitem" href="/">Ticket Winner</a>
     <a className="navitem" href="/registeruser">Register User</a>
     <a className="navitem" href="/userslist">User List</a>
     <a className="navitem" href="/assignwinner">Assign Winner</a>
     </div>
    <div className="App">
      <Routes>
        <Route exact path="/" element={<TicketWinner />} />
        <Route exact path="/registeruser" element={<RegisterUser />} />
        <Route exact path="/userslist" element={<UsersList />} />
        <Route exact path="/assignwinner" element={<AssignWinner />} />
        <Route exact path="/yuppractice" element={<YupPracice />} />
        {/* <Route exact path="/user" element={<User />} /> */}
      </Routes>
      <h1>sdsdsdas</h1>
      {/* <Admin/> */}
    </div>
    
    </>
  );
}

export default App;
