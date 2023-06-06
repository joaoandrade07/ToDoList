import React, { useState } from 'react';
import './TodoContainer.css'
import AddTaskForm from './toDos/AddTaskForm'
import UpdateForm from './toDos/UpdateForm'
import ToDo from './toDos/ToDo'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
// import noteServices from './services/notes'


function TodoContainer(props) {
    const [toDo, setToDo] = useState(props.jsonTodos); /*usar props.jsonTodos*/
    const [newTask, setNewTask] = useState('');
    const [updateData, setUpdateData] = useState('');
    const [errorMessage, setErrorMessage] = useState(null)
    const [sucessMessase, setSucessMessage] = useState(null)
    const [showAll, setShowAll] = useState(true)
    
    // useEffect(() => {
    //     noteServices
    //         .getAll()
    //         .then((response) => response.data)
    //         .then((json) => {
    //             setTimeout(() => {
    //                 setToDo(json)
    //             }, 1000);
    //         });
    // },[]);

    const notesToShow = showAll
            ? toDo
            :toDo.filter(
                task => task.important === true
            )

    const Notification = ({message}) => {
        if(message === null){
            return null
        }else if(message === errorMessage){
            return(
                <div className='error'>
                    {message}
                </div>
            )
        } else {
            return(
                <div className='sucess'>
                    {message}
                </div>
            )
        }
    }


    const addTask = () => {
        if (newTask) {
            let newEntry = {
                id: Date.now(),
                title: newTask,
                completed:false,
                important: false
            }
            setToDo([newEntry, ...toDo])
            axios
                .post('http://localhost:3000/notes/', newEntry)
                .then(res => {
                    console.log(res)
                })
            setNewTask('');
            setSucessMessage(
                'Tarefa adicionada com sucesso!'
              )
              setTimeout(() => {
                setSucessMessage(null)
              },3000)
        }else if(newTask === ''){
            setErrorMessage(
                'Não foi possível adicionar a tarefa'
              )
              setTimeout(() => {
                setErrorMessage(null)
              },3000)
        }
    }

    const deleteTask = (id) => {
        let newTasks = toDo.filter(task => task.id !== id);
        axios
            .delete(`http://localhost:3000/notes/${id}`)
            .then(res => {
                setToDo(newTasks)
                console.log(res)
            })
    }

    const markDone = (id) => {
        const note = toDo.find(n => n.id === id)
        const changedNote = {...note, completed: !note.completed}
        axios
            .put(`http://localhost:3000/notes/${id}`, changedNote)
            .then(res => {
                console.log(res)
                setToDo(toDo.map(note => note.id !== id ? note : res.data))
            })
    }

    const markImportant = (id) => {  //ainda não usado
        const note = toDo.find(n => n.id === id)
        const changedNote = {...note, important: !note.important}
        axios
            .put(`http://localhost:3000/notes/${id}`, changedNote)
            .then(res => {
                // console.log(res)
                setToDo(toDo.map(note => note.id !== id ? note : res.data))
            })
    }

    const cancelUpdate = () => {
        setUpdateData('');
    }


    const changeTask = (e) => {
        let newEntry = {
            id: updateData.id,
            title:e.target.value,
            completed: updateData.completed ? true : false,
            important : updateData.important ? true : false

        }
        setUpdateData(newEntry)
    }

 
    const updateTask = () => {
        let filterList = [...toDo].filter(task => task.id !== updateData.id)
        let UpdatedObject = [updateData, ...filterList];
        const filterRecord = [...toDo].find(task => task.id === updateData.id)
        const changedNote = {...filterRecord, title: updateData.title}
        axios
        .put(`http://localhost:3000/notes/${filterRecord.id}`, changedNote)
        .then(res => {
            setToDo(UpdatedObject)
        })

        setUpdateData('')

    }

    return (
        <React.Fragment>

            <h2 id='todo-heading'>Lista de tarefas</h2>
        <div className="container App">
            <Notification message={errorMessage}/>
            <Notification message={sucessMessase}/>

            {
                updateData && updateData ? (
                      <UpdateForm
                          updateData={updateData}
                          changeTask={changeTask}
                          updateTask={updateTask}
                          cancelUpdate={cancelUpdate}

                    />
                ) : (
                        <AddTaskForm
                            newTask={newTask}
                            setNewTask={setNewTask}
                            addTask = {addTask}
                            showAll = {showAll}
                            setShowAll = {setShowAll}
                        />
            )
            }
            

            <ToDo
                // toDo={toDo}
                markImportant={markImportant}
                markDone={markDone}
                setUpdateData={setUpdateData}
                deleteTask = {deleteTask}
                
                notesToShow = {notesToShow}

            />
           
            </div>
        </React.Fragment>
    );
}

export default TodoContainer;
