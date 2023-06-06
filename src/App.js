import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'
import TodoContainer from './Components/TodoContainer'
import { Bars } from "react-loader-spinner";
// import noteServices from './Components/services/notes'


const App = () => {

    const [json, setjson] = useState([]);

    const [loading, setLoading] = useState(false);


    useEffect(() => {
        axios.get('http://localhost:3000/notes')
        .then(res => {
            setTimeout(() => {
                setjson(res.data)
                setLoading(true)
            })
        },1000)
    },[]);
    // useEffect(() => {
    //         noteServices
    //             .getAll()
    //             .then(response => response.json())
    //             .then((json) => {
    //                 setTimeout(() => {
    //                     setjson(json)
    //                     setLoading(true);
    //                 }, 1000);
    //             })
    //             // console.log(json)
    //     },[]);

    
  return (
      <div>
          { loading ? (
              <TodoContainer jsonTodos = {json} />
          ) : (
              <Bars height="180" width="180" color="#4fa94d" ariaLabel="bars-loading" visible={true} />
            )
          }
    </div>
  )
}

export default App