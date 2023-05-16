import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
const RegistrationAndLoginForm = () => {

    const api = axios.create({ withCredentials: true });

    const [errors, setErrors] = useState([]); 
    const [userName, setUserName] = useState(""); 
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [cwPassword, setCwPassword] = useState(""); 
    const [loginErrors, setLoginErrors] = useState([]); 
    const [loginEmail, setLoginEmail] = useState(""); 
    const [loginPassword, setLoginPassword] = useState(""); 
    const navigate = useNavigate();

      const registerUser = (e) => {

        e.preventDefault();

        api.post('http://localhost:8000/api/register', {
            userName,
            email,
            password,
            cwPassword
        }, { withCredentials: true })
            .then(res => {
                console.log(res);
                localStorage.setItem("username", res.data.username);
                localStorage.setItem("id", res.data._id);
                navigate("/dashboard");
            })
            .catch(err=>{
                let errorResponse = err.response.data.error.message; // Get the errors from err.response.data
                if (!errorResponse) {
                    errorResponse = err.response.data.message;
                }
                setErrors([errorResponse]);
            })
    }

    const loginUser = (e) => {

        e.preventDefault();

        api.post('http://localhost:8000/api/login', {
            loginEmail,
            loginPassword
        }, { withCredentials: true })
            .then(res => {
                console.log(res);
                localStorage.setItem("username", res.data.username);
                localStorage.setItem("id", res.data._id);
                navigate("/dashboard");
            })
            .catch(err=>{
                let errorResponse = err.response.data.error.message; // Get the errors from err.response.data
                if (!errorResponse) {
                    errorResponse = err.response.data.message;
                }
                setLoginErrors([errorResponse]);
            })
    }

    return (
        <div class="container">
        <h2>Welcome to the Language Class Portal</h2>
        <p>Please login or register</p>
        <div class="login-registration">
        <div class="registration-form">
        <fieldset>
        <legend>Register:</legend>
        {errors.map((err, index) => <p class="error" key={index}>{err}</p>)}
        <form onSubmit={registerUser}>
        <table>
            <tbody>
            <tr>
                <td>
                <label>Username:</label>
                </td><td> 
                <input name="username" value={userName} onChange = {(e)=>setUserName(e.target.value)}/>
                </td>
            </tr>
            <tr>
                <td>
                <label>Email:</label>
                </td><td> 
                <input name="email" value={email} onChange = {(e)=>setEmail(e.target.value)}/>
                </td>
            </tr>
            <tr>
                <td>
                <label>Password:</label>
                </td><td> 
                <input name="password" type="password" value={password} onChange = {(e)=>setPassword(e.target.value)}/>
                </td>
            </tr>
            <tr>
                <td>
                <label>Confirm PW:</label>
                </td><td> 
                <input name="cwPassword" type="password" value={cwPassword} onChange = {(e)=>setCwPassword(e.target.value)}/>
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

        <div class="login-form">
        <fieldset>
        <legend>Login:</legend>
        {loginErrors.map((err, index) => <p class="error" key={index}>{err}</p>)}
        <form onSubmit={loginUser}>
        <table>
            <tbody>
            <tr>
                <td>
                <label>Email:</label>
                </td><td> 
                <input name="email" value={loginEmail} onChange = {(e)=>setLoginEmail(e.target.value)}/>
                </td>
            </tr>
            <tr>
                <td>
                <label>Password:</label>
                </td><td> 
                <input name="password" type="password" value={loginPassword} onChange = {(e)=>setLoginPassword(e.target.value)}/>
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
        </div>  
        </div>
    )
}
export default RegistrationAndLoginForm;

