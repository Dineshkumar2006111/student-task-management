import React, { useEffect, useState,useRef } from 'react'
import { SiTicktick } from "react-icons/si";
import { BrowserRouter as Router,Link,useNavigate} from 'react-router-dom'
const Home = () => {
    let user = JSON.parse(localStorage.getItem("user"));
let uid = user?.studentId;
    let [task,settask]=useState([])
    let [finaltask,setfinaltask]=useState([])

    useEffect(()=>{fetch("http://localhost:4000/details",{method:"GET"})
    .then((res)=>{return res.json()})
    .then((data)=>{settask(data)})
},[])
    

useEffect(() => {
  const user = task.find((student) => student.studentId === uid);
  setfinaltask(user ? user.tasks : []);
}, [task]);
    console.log(finaltask);
    
    const navigate = useNavigate()
  
let hupd=(id)=>{
  navigate("/updatetask",{state:{tid:id,uid:uid}})
}


let handleDelete = (taskId) => {

  // 1. Find the student
  const student = task.find((s) => s.studentId === uid);

  if (!student) {
    console.log("Student not found");
    return;
  }

  // 2. Remove the selected task
  const updatedTasks = student.tasks.filter(
    (t) => t.taskId !== taskId
  );

  // 3. Update backend
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
    // 4. Update UI instantly (no refresh needed)
    setfinaltask(updatedTasks);
  });
};

let handlecomp = (taskId) => {

  const student = task.find((s) => s.studentId === uid);

  if (!student) {
    console.log("Student not found");
    return;
  }

  // Update only selected task
  const updatedTasks = student.tasks.map((t) =>
    t.taskId === taskId
      ? { ...t, status: "Completed" }
      : t
  );

  // Update backend
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
    setfinaltask(updatedTasks);  // update UI instantly
  });
};

  return (
    <div>
        <nav>
                      <h1>Student Task Management</h1>
                        <ul>
                  
                          <Link style={{textDecoration:"none",color:"white",fontSize:"23px"}} to="/home"  >Home</Link>
                          <Link style={{textDecoration:"none",color:"white",fontSize:"23px"}} to={`/addtask/${uid}`}>Add Task</Link>
                                         
                          </ul>
                  </nav>
        <h1 style={{marginLeft:"20px",marginTop:"30px"}}>Tasks</h1>
        
      
        <div id="tskcon">
            {
  finaltask.length === 0 ? (

    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "60vh",
      width:"90%"
    }}>
      <h2 style={{fontSize:"27px"}}>No Tasks Yet 😴</h2>
      <p style={{fontSize:"27px",marginTop:"8px"}}>Add your first task to get started</p>

      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginTop:"15px"
        }}
        onClick={() => navigate(`/addtask/${uid}`)}
      >
        Add Task
      </button>
    </div>

  ) : (

    finaltask.map((t) => (
      <div
        className="task"
        key={t.taskId}
        style={{
          backgroundColor: t.status === "Completed" ? "lightgreen" : ""
        }}
      >
        <h1>{t.taskName}</h1>
        <p>{t.taskDescription}</p>
        <h4>Status: {t.status}</h4>

        <button
          style={{ backgroundColor: "blue" }}
          onClick={() => hupd(t.taskId)}
        >
          Update
        </button>

        <button
          style={{ backgroundColor: "green", marginLeft: "4%" }}
          onClick={() => handlecomp(t.taskId)}
        >
          complete
        </button>

        <button
          style={{ backgroundColor: "red", width: "100%" }}
          onClick={() => handleDelete(t.taskId)}
        >
          delete
        </button>

      </div>
    ))

  )
}
            </div>
        
    </div>
  )
}

export default Home

//    "taskId": "T101",
//         "taskName": "OS Assignment",
//         "taskDescription": "Complete threading concepts",
//         "status": "In Progress",
//         "startingDate": "2026-04-25"