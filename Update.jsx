import React, { useEffect,useState } from 'react'
import { MdBrowserUpdated } from "react-icons/md";
import { BrowserRouter as Router,Link,useLocation,useNavigate} from 'react-router-dom'





const Update = () => {


  const location = useLocation();
  const navigate = useNavigate();

  let id = location.state?.tid;
  let uid = location.state?.uid;

  let [updtaskname, setupdtaskname] = useState("")
  let [updtaskdesc, setupdtaskdesc] = useState("")
  let [updtaskstatus, setupdtaskstatus] = useState("")

  let [task, settask] = useState([])
  let [finaltask, setfinaltask] = useState([])

  // ✅ Fetch data
  useEffect(() => {
    fetch("http://localhost:4000/details")
      .then((res) => res.json())
      .then((data) => settask(data))
  }, [])

  // ✅ Get student tasks
  useEffect(() => {
    if (!task.length || !uid) return;

    const user = task.find(
      (student) =>
        student.studentId?.toString().trim().toLowerCase() ===
        uid.toString().trim().toLowerCase()
    );

    setfinaltask(user?.tasks || []);
  }, [task, uid])

  // ✅ Fill form
  useEffect(() => {
    if (!finaltask.length || !id) return;

    const result = finaltask.find(
      (t) => t.taskId?.toString().trim() === id.toString().trim()
    );

    if (result) {
      setupdtaskname(result.taskName || "")
      setupdtaskdesc(result.taskDescription || "")
      setupdtaskstatus(result.status || "")
    }
  }, [finaltask, id])

  // ✅ Update
  const handleUpdate = () => {

    const student = task.find((s) => s.studentId === uid);

    if (!student) {
      console.log("Student not found");
      return;
    }

    const updatedTasks = student.tasks.map((t) =>
      t.taskId === id
        ? {
            ...t,
            taskName: updtaskname,
            taskDescription: updtaskdesc,
            status: updtaskstatus
          }
        : t
    );

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
      navigate("/home");
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
      <h1 id="ut">Update Tasks</h1>
      <center>
      <div id="uform">
          <h1>Update form</h1>
          <input type="text" id="taskname" placeholder='Task Name' value={updtaskname} onChange={(e)=>{setupdtaskname(e.target.value)}} autoComplete='off'/>
          <textarea name="description" id="description" placeholder='Task description' value={updtaskdesc} onChange={(e)=>{setupdtaskdesc(e.target.value)}}></textarea>
          <input type="text" id="status" value={updtaskstatus} onChange={(e)=>{setupdtaskstatus(e.target.value)}} placeholder='Status' autoComplete='off'/>
          <button onClick={handleUpdate}>Update <MdBrowserUpdated size={25}/></button>

      </div></center>
    </div>
  )
}

export default Update