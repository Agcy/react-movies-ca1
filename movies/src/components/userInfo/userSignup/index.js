import React, { useState } from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { purple } from '@mui/material/colors';

const UserSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignup = async () => {
        // 这里实现用户注册逻辑
        // 比如调用 Firebase Auth 或其他服务
    };

    return (
        <>
            <TextField
                id="signup-email"
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
                sx={{ /* 样式与 Login 组件相同 */ }}
            />
            <TextField
                id="signup-password"
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
                sx={{ /* 样式与 Login 组件相同 */ }}
            />
            <TextField
                id="signup-confirm-password"
                type="password"
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
                margin="normal"
                sx={{ /* 样式与 Login 组件相同 */ }}
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
