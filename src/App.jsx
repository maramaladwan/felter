import './App.css'
import 'bootstrap/dist/css/bootstrap.css'

import { useEffect } from "react"
import { useState } from "react"




function App() {
  const [Item, setitam] = useState('')
  //const [todolist, setlist] = useState([])
  const [todolist, setlist] = useState(() => {
    const localvalue = localStorage.getItem("iteam")
    if (localvalue == null) return []
    return JSON.parse(localvalue)
  })


  useEffect(() => {
    localStorage.setItem("iteam", JSON.stringify(todolist))
  }, [todolist])


  function toogeltodo(id, ispaked) {
    setlist(
      todolist.map(todo => {
        if (todo.id === id) {
          return { ...todo, ispaked }
        }
        return todo
      }

      )

    )
  }

  const AddItem = () => {
    setlist([...todolist, { id: crypto.randomUUID(), name: Item, ispaked: false }])
    setitam('')
  }

  const deleteiteam = (id) => {
    setlist(todolist.filter(todo => todo.id !== id))
  }


  return (
    <>
     
      <div className="jj">
        <input className="ma" placeholder= "Add Item,الرجاءادخال العنصر هنا" type="text" value={Item} onChange={e => setitam(e.target.value)} />

        <button className="mm" onClick={AddItem}>Add Item</button>
      </div>

      {todolist.map((task) =>
        <div  className="in" key={task.id}>
          <input type="checkbox" checked={task.ispaked}
            onChange={e => toogeltodo(task.id, e.target.checked)} />
          {
            
              task.ispaked ? <span style={{ marginLeft: "10px" }} ><del>{task.name}<span id="yellow-checkmark">&#10003;</span></del></span> :
                <span  style={{ "marginLeft": "10px" }}>{task.name}</span>
  


            
          }

         <button className='b' onClick={() => deleteiteam(task.id)}>x</button>
         
     
        </div>


      )}
    </>
  )
}

export default App