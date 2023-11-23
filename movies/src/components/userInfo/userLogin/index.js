// src/components/Login.js
import React, {useState} from 'react';
import {useAuth} from '../../../contexts/authContext';
import {useNavigate} from 'react-router-dom';
import TextField from "@mui/material/TextField";
import Paper from '@mui/material/Paper';
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import {purple} from "@mui/material/colors";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        // 这里调用 Firebase Auth 或其他身份验证服务
        // 假设登录成功并获取到了用户数据
        const userData = {name: 'User', email};
        login(userData);
        navigate('/');
    };

    return (
        <>
            <TextField
                id="outlined-email"
                type="email"
                value={email}
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                fullWidth
                margin="normal"
                sx={{
                    input: { color: purple[700] }, // 输入文字颜色
                    label: { color: purple[700] }, // 标签文字颜色
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: purple[500] }, // 边框颜色
                        '&:hover fieldset': { borderColor: purple[700] }, // 悬停时边框颜色
                    }
                }}
            />
            <TextField
                id="outlined-password"
                type="password"
                value={password}
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                fullWidth
                margin="normal"
                sx={{
                    input: { color: purple[700] },
                    label: { color: purple[700] },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: purple[500] },
                        '&:hover fieldset': { borderColor: purple[700] },
                    }
                }}
            />
            <Button
                onClick={handleLogin}
                fullWidth
                margin="normal"
                sx={{
                    height: 70,
                    backgroundColor: purple[500], // 按钮背景颜色
                    color: 'white', // 按钮文字颜色
                    '&:hover': {
                        backgroundColor: purple[700], // 悬停时按钮背景颜色
                    },
                }}
            >
                Login
            </Button>
        </>
    )
        ;
};

export default Login;
