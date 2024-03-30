import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiService } from './ApiService';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        if (token && token !== '' && token !== undefined) {
            navigate("/Main");
        }
    }, [token, navigate]);

    const handleSubmit = () => {
        ApiService.Login({ email, password })
            .then(resp => {
                if (resp !== undefined && resp.access_token !== '') {
                    sessionStorage.setItem("token", resp.access_token);
                    navigate("/Main");
                }
            })
            .catch(error => console.log(error));
    }

    return (
        <section>
            <div>
                <h1>Login</h1>
                <div className='row'>
                    <div className='col form-group'>
                        <label htmlFor='email' className='form-control'>Enter email</label>
                        <input type="text" id='email' className='form-control'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>
                <div className='row'>
                    <div className='col form-group'>
                        <label htmlFor='password' className='form-control'>Enter password</label>
                        <input type="text" id='password' className='form-control'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                <div>
                    <button type='submit' onClick={handleSubmit}>Login</button>
                </div>
            </div>
        </section>
    );
}

export default Login;
