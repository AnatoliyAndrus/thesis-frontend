import {useState} from 'react';
import "./loginForm.css"
import {Link, useNavigate} from "react-router-dom";
import * as authService from "../../services/authService.js"
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function LoginForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        userId: '',
        password: ''
    });

    const handleChangeField = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        authService
            .signIn(formData)
            .then(res => {
                if(res.success){
                    authService
                        .setToken(res.token)
                    navigate("/home")
                    location.reload()
                }else{
                    toast(res.message)
                }
            })
        console.log(formData);
    };

    return (
        <div className="form-container">
            <h2 style={{textAlign:"center"}}>Log In</h2>
            <form onSubmit={handleFormSubmit} style={{marginBottom:"20px"}}>
                <div className="field-container">
                    <label htmlFor="userId" className="label">User ID:</label>
                    <input
                        className="input-field"
                        type="text"
                        id="userId"
                        name="userId"
                        value={formData.userId}
                        onChange={handleChangeField}
                        placeholder="someId123"
                        required
                    />
                </div>
                <div className="field-container">
                    <label htmlFor="password" className="label">Password:</label>
                    <input
                        className="input-field"
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChangeField}
                        required
                    />
                </div>
                <button type="submit" className="form-button">Login</button>
            </form>
            <ToastContainer
                newestOnTop={true}
            />
            <Link to="/register">Register instead</Link>
        </div>
    );
}
