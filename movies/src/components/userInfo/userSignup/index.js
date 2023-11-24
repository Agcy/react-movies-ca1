import React, { useState } from 'react';
import TextField from "@mui/material/TextField";
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Button from "@mui/material/Button";
import { purple } from '@mui/material/colors';
import Alert from '@mui/material/Alert'; // 引入 Alert 组件显示错误消息

const UserSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const auth = getAuth();

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: username
            });
            // 注册成功后的操作，例如重定向到登录页面
            navigate('/user/login');
        } catch (error) {
            setError("Failed to create an account: " + error.message);
        }
    };

    return (
        <>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
                id="signup-username"
                type="text"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                id="signup-email"
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                id="signup-password"
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                id="signup-confirm-password"
                type="password"
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            <Button
                onClick={handleSignup}
                fullWidth
                margin="normal"
                sx={{
                    height: 70,
                    backgroundColor: purple[500],
                    color: 'white',
                    '&:hover': {
                        backgroundColor: purple[700],
                    },
                }}
            >
                Sign Up
            </Button>
        </>
    );
};

export default UserSignup;
