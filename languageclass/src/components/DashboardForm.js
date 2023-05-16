import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
const DashboardForm = () => {
    const navigate = useNavigate();
    //keep track of what is being typed via useState hook
    const [languageClassList, setLanguageClassList] = useState([]); 
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    const api = axios.create({ withCredentials: true });

    useEffect(() => {
        let uname = localStorage.getItem("username");
        let uId = localStorage.getItem("id");
        setUsername(uname);
        setUserId(uId);

        api.get('http://localhost:8000/api/classes').then(response=>{
          let list = [];
          for (let i in response.data.languageclasses) {
            list.push(response.data.languageclasses[i]);
          }

          console.log(list);

          setLanguageClassList(list)
        });
    
      }, []);


      const deleteLanguageClass = (id) => {
        api.delete('http://localhost:8000/api/class/delete/' + id)
            .then(res => {
                console.log(res); // always console log to get used to tracking your data!
                setLanguageClassList(  
                [ 
                ...languageClassList.filter(languageclass => languageclass._id != id), 
              ]);
            })
            .catch(err => console.log(err))
    }

    const logout = () => {
        api.get('http://localhost:8000/api/logout')
            .then(res => {
                console.log(res);
                localStorage.clear();
                navigate("/"); // this will take us back to the Main.js
            })
            .catch(err => console.log(err))
    }

    return (
        <div class="main">
            <div class="top1">
                <h2>Welcome {username}</h2>
                <div class="top-right">
                <Link to={"/class/new"}>
                        Add a New Class
                </Link>
                <span class="space">|</span>
                <Link onClick={(e)=>{logout()}}>
                    Logout
                </Link>
                </div>
            </div>
                <h4>Here are the classes</h4>
            
            <table class="table">
            <tr>
                <th scope="col">Class Name</th>
                <th scope="col">Teacher</th>
                <th scope="col">Action</th>
            </tr>
            <tbody>
            {
                    languageClassList.map( (languageClass, index) => 
                    <tr class='language-class'>
                    <td><Link to={"/class/" + languageClass._id}>
                        {languageClass.name}
                        </Link>
                    </td>
                    <td>{languageClass.teacher}</td>
                    <td>
                    {
                        (languageClass.userId == userId) ?
                        <div>
                        <Link to={"/class/edit/" + languageClass._id}>
                            Edit
                        </Link>
                        <span class="space">|</span>
                        <Link onClick={(e)=>{deleteLanguageClass(languageClass._id)}}>
                            Delete
                        </Link>
                        </div>
                        :
                        ''
                    }
                    </td>
                    </tr>

                    )
                }
                </tbody>
            </table>
        </div>
    )
}
export default DashboardForm;

