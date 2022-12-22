import React, { useEffect, useState } from "react";
// import RegisterUser from "../admin/registeruser";
import "./user.css";

const UsersList = () => {
  const [ticketList, setTicketList] = useState([]);
  // const [editId, setEditId] = useState(null);

  const fetchTicketData = async () => {
    const data = await fetch("http://localhost:3000/ticket/");
    const tickets = await data.json();
    setTicketList(tickets.ticketList);
  };
  useEffect(() => {
    fetchTicketData();
  }, []);
  return (
    <div>
      {ticketList.length > 0 && (
        <>
          <div className="table-div">
            <table className="table">
              <tr className="tablerow">
                <th className="tabledata">Name</th>
                <th className="tabledata">TicketNo</th>
              </tr>

              {ticketList.map((item, id) => {
                return (
                  <tr className="tablerow">
                    <td className="tabledata">{item.name} </td>
                    <td className="tabledata">{item.ticketNo}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        </>
      )}
    </div>
  );
};
// <button onClick={()=>setEditId(id)}>Edit</button>
//  {id===editId && <RegisterUser editform={true} userDetail={item}/>}

export default UsersList;
