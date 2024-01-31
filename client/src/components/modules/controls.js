import React, { useEffect } from "react"
import { useAppContext } from "../context/context"
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { post } from "../../utilities";

const Resign = ({socket, room}) => {
    const resign = () => {
        post("/api/lose", {
            loser: socket.id, 
            room: room
        });
    } 
    return (
        <button onClick={resign}
        className = "resign theme-btn"><span className="fa-solid fa-flag"></span> Resign
        </button>
    )
}
const style = {
    textAlign: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#bce1e1',
    borderRadius: '15px',
    boxShadow: 24,
    p: 4,
  };
function WinModal({wins, losses, open}) {
    // const [open, setOpen] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);
  
    return (
        <>
        {/* <button onClick={handleOpen}>Open modal</button> */}
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h1 id="modal-modal-title" variant="h6" component="h2" style={{color:"#006666"}}>
              you win!
            </h1>
            <div id="modal-modal-description" sx={{ mt: 2 }}>
              <p>total wins: {wins+1}</p>
              <p>total losses: {losses}</p>
            </div>
          </Box>
        </Modal>
        </>
    );
  }
  function LoseModal({wins, losses, open}) {
    // const [open, setOpen] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);
  
    return (
        <>
        {/* <button onClick={handleOpen}>Open modal</button> */}
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h1 id="modal-modal-title" variant="h6" component="h2" style={{color:"#006666"}}>
              you lose.
            </h1>
            <div id="modal-modal-description" sx={{ mt: 2 }}>
              <p>total wins: {wins}</p>
              <p>total losses: {losses+1}</p>
            </div>
          </Box>
        </Modal>
        </>
    );
  }
  

const Controls = ({socket, side, wins, losses, room}) =>{

    console.log(wins)

    const {appState,dispatch} = useAppContext()
    const {turn, position,castleDirection,entangled} = appState
    
    const [openwin, setOpenWin] = React.useState(false);
    const handleOpenWin = () => setOpenWin(true);
    const handleCloseWin = () => setOpenWin(false);

    const [openlose, setOpenLose] = React.useState(false);
    const handleOpenLose = () => setOpenLose(true);
    const handleCloseLose = () => setOpenLose(false);

    // console.log(socket)
    socket.emit("test")
    socket.on("connect", () => {
        socket.off("winner")
        socket.on("winner", (winner) => {
            if(winner==socket.id) {
                handleOpenWin();
            } else {
                handleOpenLose();
            }
        })
        
        socket.off("loser")
        socket.on("loser", (loser) => {
            if(loser==socket.id) {
                handleOpenLose();
            } else {
                handleOpenWin();
            }
        })
    })
    return (
    <>
    <Resign socket={socket} room={room} />
    <WinModal wins={wins} losses={losses} room={room} open={openwin}/>
    <LoseModal wins={wins} losses={losses} room={room} open={openlose}/>
    </>)
    

}
export default Controls