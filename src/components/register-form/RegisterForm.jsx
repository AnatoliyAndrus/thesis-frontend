import {useState} from 'react';
import "./registerForm.css"
import {Link, useNavigate} from "react-router-dom";
import * as authService from "../../services/authService.js"
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        userId: '',
        nickname: '',
        email: '',
        password: ''
    });

    const handleChangeField = (e) => {

        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const navigate = useNavigate();

    const handleFormSubmit = (e) => {
        e.preventDefault();

        authService
            .signUp(formData)
            .then(res => {
                if(res.success){
                    navigate("/login")
                }else{
                    toast(res.message)
                }
            })
          };

    return (
        <div className="form-container">
            <h2 style={{textAlign:"center"}}>Register</h2>
            <form onSubmit={handleFormSubmit} style={{marginBottom:"20px"}}>
                <div className="field-container">
                    <label htmlFor="userId" className="label">User ID:</label>
                    <input
                        value={formData.userId}
                        onChange={handleChangeField}
                        className="input-field"
                        type="text"
                        id="userId"
                        name="userId"
                        placeholder="someId123"
                        required
                    />
                </div>
                <div className="field-container">
                    <label htmlFor="nickname" className="label">Nickname:</label>
                    <input
                        className="input-field"
                        type="text"
                        id="nickname"
                        name="nickname"
                        value={formData.nickname}
                        onChange={handleChangeField}
                        placeholder="Nickname"
                        required
                    />
                </div>
                <div className="field-container">
                    <label htmlFor="email" className="label">Email:</label>
                    <input
                        className="input-field"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="example@gmail.com"
                        value={formData.email}
                        onChange={handleChangeField}
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
                <button type="submit" className="form-button">Register</button>
            </form>
            <ToastContainer
                newestOnTop={true}
            />
            <Link to="/login">Log in instead</Link>
        </div>
    );
}
