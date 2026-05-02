import React, { useState,useEffect } from 'react'
import { RiFolderAddLine } from "react-icons/ri";
import { BrowserRouter as Router,Link,useParams} from 'react-router-dom'
const Addtask = () => {
  let {uid}=useParams()
  console.log(uid);
  


  let [addtaskname,setaddtaskname]=useState("")
  let [addtaskdesc,setaddtaskdesc]=useState("")
  let [task, settask] = useState([])


   useEffect(() => {
    fetch("http://localhost:4000/details")
      .then((res) => res.json())
      .then((data) => settask(data))
  }, [])

  // ✅ Add Task function
  const handleAdd = () => {

    if (!addtaskname || !addtaskdesc) {
      alert("Please fill all fields");
      return;
    }

    // 1. Find student
    const student = task.find((s) => s.studentId === uid);

    if (!student) {
      console.log("Student not found");
      return;
    }

    // 2. Create new task
    const newTask = {
      taskId: "T" + Date.now(),   // unique id
      taskName: addtaskname,
      taskDescription: addtaskdesc,
      status: "Pending",
      
    };

    // 3. Add to existing tasks
    const updatedTasks = [...student.tasks, newTask];

    // 4. Update backend
    fetch(`http://localhost:4000/details/${student.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tasks: updatedTasks
      })
    })
    .then(() => {
        setaddtaskname("")
        setaddtaskdesc("") 
        alert("Add Successfully ")
    });
  };
  return (
    <div>
            <nav>
                          <h1>Student Task Management</h1>
                            <ul>
                      
                              <Link style={{textDecoration:"none",color:"white",fontSize:"23px"}} to="/home">Home</Link>
                              <Link style={{textDecoration:"none",color:"white",fontSize:"23px"}} to="/addtask">Add Task</Link>
                                             
                              </ul>
                      </nav>
                      <h1 id="ut">Add Tasks</h1>
          <center>
          <div id="uform">
              <h1>Add Task form</h1>
              <input type="text" id="taskname" placeholder='Task Name' value={addtaskname} onChange={(e)=>{setaddtaskname(e.target.value)}} autoComplete='off'/>
              <textarea name="description" id="description" value={addtaskdesc} onChange={(e)=>{setaddtaskdesc(e.target.value)}} placeholder='Task description'></textarea>
              <button onClick={handleAdd}>Add<RiFolderAddLine style={{marginLeft:"7px"}} size={25}/> </button>
    
          </div></center></div>
  )
}

export default Addtask