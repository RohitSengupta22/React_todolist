import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { VapingRoomsSharp } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import Modal from '@mui/material/Modal';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

function App() {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [text,setText] = React.useState('');



  const [textArr,setTextArr] = React.useState([]);

  const [count,setCount] = React.useState(0);

  const [appear,setAppear] = React.useState(false);
  const [ind,setInd] = React.useState(0);

  const [open, setOpen] = React.useState(false); //Modal state variable
  
  const handleClose = () => setOpen(false);

  

  function addHandler(){

    
    if(text!==''){
    textArr.push({Name: text, Done: false});
    setTextArr([...textArr]);
    console.log(textArr);
    setText('');
   
    }

    else{
      alert("Please enter some item in the input box");
    }
  
  }

  function dltHandler(index){
   setOpen(true);
   setInd(index);
  }

  function dltYesHandler(){
    for(var i=0;i<textArr.length;i++){
      if(ind===i){

       

        textArr.splice(i,1);
      }

    }
    setTextArr([...textArr]);
    setOpen(false);
  }

  function dltNoHandler(){
    setOpen(false);
  }

  function doneHandler(index){


    for(var i=0;i<textArr.length;i++){
      if(index===i && count%2===0){

        textArr[i].Done = true;
        setCount(count+1);
      }

      else if(index===i && count%2!==0){
        textArr[i].Done = false;
        setCount(count+1);
      }

    }
  
    setTextArr([...textArr]);
    
    }

function editHandler(index){

  for(var i=0;i<textArr.length;i++){
    if(index===i){
      setInd(index);
      setText(textArr[i].Name);
      setAppear(true);
      
    }
  }

}

function finalEditHandler(){

  if(text!==''){

 for(var i=0;i<textArr.length;i++){
  if(ind===i){
    textArr[i].Name = text;
    setTextArr([...textArr]);
    setAppear(false);
    setText('');
  }
 }
}
  
}

  

  

  return (
    <div className="App">
     <h1 style={{color: "rgb(235, 17, 99)"}}>Todo List</h1>
     <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label="Enter some item"
          className='field'
          value={text}
          onChange={(e) => setText(e.target.value)}
          
          
        />
        <AddCircleOutlineRoundedIcon onClick={addHandler} className='add'/>
        {appear ? <DownloadDoneIcon className='editdone' onClick={finalEditHandler}/> : null}

        </div>

        <div className='card'>

{textArr.map((elem,index)=>{
  return (
    <Card sx={{ maxWidth: 400 }} style={{margin: '10px'}} key={index}>
    <CardActionArea>
     
      <CardContent>
        
        <Typography variant="body2" color="text.secondary" style={{textDecoration : elem.Done ? "line-through" : "None"}} >
         {index+1}.{elem.Name}
         <DeleteIcon className='dlt' onClick={()=> dltHandler(index)}/>
         <DoneAllIcon className='done' onClick={()=> doneHandler(index)} />
         <EditIcon className='edit' onClick={()=> {editHandler(index)}} />
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
  )
})}

</div>

<div>
<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           Are you sure you want to delete this item?
          </Typography>

          <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Button onClick={dltYesHandler}>Yes</Button>
      <Button onClick={dltNoHandler} style={{backgroundColor: "red"}}>No</Button>
      
    </ButtonGroup>

    

        </Box>
      </Modal>
</div>

       



        </Box>
    </div>
  );
}

export default App;
