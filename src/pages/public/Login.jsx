import React, {useContext, useState} from 'react';
import {UserApiClient} from "../../utils/ApiClientsInstances";
import {UserLoginDto} from "../../api/UserClient.ts";
import {AuthorizationContext} from "../../context";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [error, setError] = useState("");
    const [user, setUser] = useState({email: '', password: ''})
    const {setIsAuthorized} = useContext(AuthorizationContext);
    const navigate = useNavigate();

    const login = async (e) => {
        setError("");
        e.preventDefault();
        try {
            let token = await UserApiClient.login(new UserLoginDto(user));
            localStorage.setItem('token', token);
            setIsAuthorized(true);
        } catch (e) {
            setError(e.message);
        }
    }

    return (
        <div className="container">
            <p className="h1 text-center mt-3">Login</p>
            <form onSubmit={login}>
                {error &&
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                }
                <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="emailInput"
                        value={user.email}
                        onChange={e => setUser({...user, email: e.target.value})}
                        aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordInput" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={user.password}
                        onChange={e => setUser({...user, password: e.target.value})}
                        id="passwordInput"/>
                </div>
                <button type="submit" className="btn btn-primary me-2">Login</button>
                <button onClick={() => navigate("/register")} className="btn btn-outline-info">Register</button>
            </form>
        </div>
    );
};

export default Login;