import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faCircleCheck, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'

const ToDo = (props) => {
    return (
      <>
          {
              props.notesToShow.map((task, index) => {
                  return (
                      <React.Fragment key={task.id}>

                          <div className="col taskBg" style={task.important ? {backgroundColor : "#580101"} : {}}>
                              <div className={task.completed ? 'done' : ''}>
                                  <span className="taskNumber">{index+1}</span>
                                  <span className="taskText">{task.title}</span>
                              </div>
                              <div className="iconsWrap">
                              {
                                      task.completed ? null : (
                                        <span title='Importante / Não importante'  
                                        onClick={(e) => props.markImportant(task.id)}
                                                                                        >
                                        <FontAwesomeIcon icon={faCircleExclamation} />
                                        </span>)
                                  }
                
                                  <span title='Feito / Não feito'
                                      onClick={(e) => props.markDone(task.id)}
                                  >
                                      <FontAwesomeIcon icon={faCircleCheck} />
                                  </span>
                                  {
                                      task.completed ? null : (
                                          <span title='Editar'
                                              onClick={() => props.setUpdateData({
                                                  id: task.id,
                                                  title: task.title,
                                                  completed: task.completed ? true : false
                                              })}
                                          >
                                              <FontAwesomeIcon icon={faPen} />
                                          </span>)
                                  }
                                  <span title='Apagar'
                                      onClick={() => props.deleteTask(task.id)}
                                  >
                                      {/* trash Icon for Deleting Single todo  */}
                                      <FontAwesomeIcon icon={faTrashCan} />
                                  </span>
                              </div>
                          </div>
                      </React.Fragment>
                  )
              })
          }
      </>
  )
}

export default ToDo