import React from 'react'

const AddTaskForm = (props) => {
    return (
      <>
          <div className="row mb-3">
              <div className="col">
                  <input
                      value={props.newTask}
                      onChange={(e) => props.setNewTask(e.target.value)}
                      className='form-control form-control-lg'
                      type="text"/>
                    {/* <input type="checkbox" id="event-private"/>
                    <label for="event-private">Evento Privado</label>    */}
              </div>
                <div className="col-auto">
                  <button
                      onClick={props.addTask}
                      className='btn btn-lg btn-success'>Salvar</button>
              </div>
          </div>
          <div className='filter'>
            <button onClick={() => props.setShowAll(!props.showAll)} className='btn btn-lg btn-outline-secondary'>
                {props.showAll ? 'Mostrar apenas importantes' : 'Mostrar todos'}
            </button>
          </div>
      </>
  )
}

export default AddTaskForm