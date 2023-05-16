import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
const AddLanguageClassForm = () => {
    const [name, setName] = useState(""); 
    const [teacher, setTeacher] = useState(""); 
    const [errors, setErrors] = useState([]); 
    const navigate = useNavigate();
    const api = axios.create({ withCredentials: true });

    const addLanguageClass= (e) => {
        e.preventDefault();

        api.post('http://localhost:8000/api/classes', {
            name,
            teacher
        })
            .then(res => {
                console.log(res);
                navigate("/dashboard"); // this will take us back to the Main.js
            })
            .catch(err=>{
                try {
                    let errorResponse = err.response.data.errors.message; // Get the errors from err.response.data
                    if (!errorResponse) {
                        errorResponse = err.response.data.message;
                    }
                    setErrors([errorResponse]);
                } catch (e) {
                    setErrors(["Class name already exists"]);
                }   
            })
    }

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleTeacher = (e) => {
        setTeacher(e.target.value);
    }
    
    return (
        <div class="main">
            <div class="top1">
                <h2>Add a new language class</h2>
                <div class="top-right">
                <Link to={"/dashboard"}>
                    Go Back
                </Link>
                </div>
            </div>
            <h4>Add details about the class</h4>
            <fieldset>
            <legend>New Class</legend>
            {errors.map((err, index) => <p class="error" key={index}>{err}</p>)}
            <form onSubmit={addLanguageClass}>
            <table>
            <tbody>
            <tr>
                <td>
                <label>Class Name:</label>
                </td><td> 
                <input type="text" 
                    name="name" 
                    value={name}
                    onChange={ handleName } />
                </td>
            </tr>
            <tr>
                <td>
                <label>Teacher:</label>
                </td><td> 
                <input type="text" 
                    name="teacher" 
                    value={teacher}
                    onChange={ handleTeacher } />
                </td>
            </tr>
            <tr>
            <td class="submit-button" colspan="2">
            <input class="b1" type="submit" value="Submit"/>
            </td>
            </tr>
                </tbody>
        </table>
            </form>
            </fieldset>
        </div>
    )
}
export default AddLanguageClassForm;

