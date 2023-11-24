// AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/firebase'; // 确保路径正确

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            // 使用 Firebase 返回的用户信息
            setUser({
                uid: response.user.uid,
                email: response.user.email,
                displayName: response.user.displayName,
                // 其他需要的信息...
            });
            setIsLoggedIn(true);
        } catch (error) {
            // 处理登录错误
            console.error("Login error: ", error);
        }
    };

    const logout = () => {
        auth.signOut();
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
