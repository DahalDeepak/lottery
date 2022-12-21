import { useState, useEffect } from "react";
const TicketWinner = () => {
  const [ticketList, setTicketList] = useState([]);
  const [stillInTheGame, setStillInTheGame] = useState(true);
  const [typedTicketNo, setTypedTicketNo] = useState("");
  const [currentName, setCurrentName] = useState("");

  const colorList = ["red", "green", "aqua"];
  const [colorIndex, setColorIndex] = useState(0);
  const fetchTicketData = async () => {
    const data = await fetch("http://localhost:3000/ticket/");
    const tickets = await data.json();
    const allTicketList = tickets.ticketList;
    //make an empty array tempArr
    //loop allticketList and push the item.ticketNo to tempArr
    //if tempArr already has item.ticketNo do not add
    //  setTicketList(tempArr)
    const tempList = [];
    allTicketList.map((item) => {
      if (!tempList.includes(item.ticketNo)) {
        tempList.push(item.ticketNo);
      }
      
    });

    setTicketList(tempList);
  };
  useEffect(() => {
    fetchTicketData();
  }, []);

  const drawRandom = () => {
    const randomID = Math.floor(Math.random() * ticketList.length);
    const tempTicket = [...ticketList];
    tempTicket.splice(randomID, 1);
    const typedNumInt = Number(typedTicketNo);
    if (tempTicket.includes(typedNumInt)) {
      setStillInTheGame(true);
    } else {
      setStillInTheGame(false);
    }
    setTicketList(tempTicket);
  };

  const changeColor = () => {
    if (colorIndex === colorList.length - 1) {
      setColorIndex(0);
    } else {
      setColorIndex(colorIndex + 1);
    }
  };

  if (!stillInTheGame) {
    return <h1>hi you lost</h1>;
  }
  return (
    <>
      hi {currentName}
      {ticketList.length > 0 &&
        ticketList.map((item, id) => {
          return (
            <div
              onClick={() => changeColor()}
              style={{
                backgroundColor:
                  typedTicketNo.toString() === item.toString()
                    ? colorList[colorIndex]
                    : null,
                margin: "20px",
                height: "40px",
                width: "50px",
              }}
            >
              {item}
            </div>
          );
        })}
      <input
        onKeyUp={(e) => setTypedTicketNo(e.target.value)}
        placeholder="Enter your ticket number"
      />
      <input
        onKeyUp={(e) => setCurrentName(e.target.value)}
        placeholder="Enter your name"
      />
      <button onClick={() => drawRandom()}>Next draw</button>
    </>
  );
};

export default TicketWinner;

// import { useState, useEffect } from "react";
// const TicketWinner = () => {
//   const [ticketList, setTicketList] = useState([]);
//   const [stillInTheGame, setStillInTheGame] = useState(true);
//   const [typedTicketNo, setTypedTicketNo] = useState("");
//   const [currentName, setCurrentName] = useState("");

//   const colorList = ["red", "green", "aqua"];
//   const [colorIndex, setColorIndex] = useState(0);
//   const fetchTicketData = async () => {
//     const data = await fetch("http://localhost:3000/ticket/");
//     const tickets = await data.json();
//     const allTicketList = tickets.ticketList;
//     // console.log(allTicketList)
//     // const ticketLists = await data.json();
//     // const allTicketList = ticketLists.ticket;
//     //make an empty array tempArr
//     //loop allticketList and push the item.ticketNo to tempArr
//     //if tempArr already has item.ticketNo do not add
//     //  setTicketList(tempArr)
//     const tempList = [];
//     allTicketList.map((item) => {
//       if (!tempList.includes(item.ticketNo)) {
//         tempList.push(item.ticketNo);
//       }
//       return tempList;
//     });

//     setTicketList(tempList);
//   };
//   useEffect(() => {
//     fetchTicketData();
//   }, []);
//   //   const name = () => {
//   //     if (stillInTheGame === true) {
//   //       const player = "you are winning";
//   //       setCurrentName(player);
//   //     }
//   //   };
//   //   useEffect(() => {
//   //     name();
//   //   }, []);

//   const drawRandom = () => {
//     const randomID = Math.floor(Math.random() * ticketList.length);
//     //  console.log(randomID);
//     // let winnerNo = "";

//     // console.log(winnerNo);
//     const tempTicket = [...ticketList];
//     tempTicket.splice(randomID, 1);
//     const typedNumInt = Number(typedTicketNo);
//     if (tempTicket.includes(typedNumInt)) {
//       setStillInTheGame(true);
//     } else {
//       setStillInTheGame(false);
//     }

//     setTicketList(tempTicket);
//   };
//   const changeColor = () => {
//     if (colorIndex === colorList.length - 1) {
//       setColorIndex(0);
//     } else {
//       setColorIndex(colorIndex + 1);
//     }
//   };
//   if (!stillInTheGame) {
//     return <h1>hi you lost</h1>;
//   }
//   // if (!stillInTheGame && ticketList.length > 0) {
//   //   return <h1>hi you lost{currentName}</h1>;
//   // } else if (ticketList.length === 1) {
//   //   return (
//   //     <>
//   //       <h1>Hi you won</h1>
//   //     </>
//   //   );
//   // }
//   // console.log(ticketList.length);
//   return (
//     <>
//       hi {currentName}
//       {ticketList.length > 0 &&
//         ticketList.map((item, id) => {
//           return (
//             <div
//               onClick={changeColor()}
//               style={{
//                 backgroundColor:
//                   typedTicketNo.toString() === item.toString()
//                     ? colorList[colorIndex]
//                     : null,
//                 margin: "20px",
//                 height: "40px",
//                 width: "50px",
//               }}
//             >
//               {item}
//             </div>
//           );
//         })}
//       <input
//         onKeyUp={(e) => setTypedTicketNo(e.target.value)}
//         placeholder="Enter your ticket number"
//       />
//       <input
//         onKeyUp={(e) => setCurrentName(e.target.value)}
//         placeholder="Enter your name"
//       />
//       <button onClick={() => drawRandom()}>Next draw</button>
//     </>
//   );
// };

// export default TicketWinner;
