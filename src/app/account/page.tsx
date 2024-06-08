"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userDetails, setUserDetails] = useState<any>(null);

    useEffect(() => {
        const token = Cookies.get('authToken');
        const userId = Cookies.get('userId');
        if (token && userId) {
            setIsLoggedIn(true);
            fetchUserDetails(userId);
        }
    }, [Cookies.get('userId')]);

    function fetchUserDetails(userId: string) {
        axios.get(`https://dummyjson.com/user/${userId}`)
            .then(response => {
                setUserDetails(response.data);
            })
            .catch(error => {
                console.error('Failed to fetch user details:', error);
            });
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        axios.post('https://dummyjson.com/auth/login', {
            username,
            password,
        })
            .then(response => {
                setIsLoggedIn(true);
                Cookies.set('authToken', response.data.token);
                Cookies.set('userId', response.data.id);
                fetchUserDetails(response.data.id);
            })
            .catch(error => {
                console.error('Login failed:', error);
            });
    }

    function handleLogout() {
        setIsLoggedIn(false);
        Cookies.remove('authToken');
        Cookies.remove('userId');
        setUserDetails(null);
    }

    if (isLoggedIn) {
        return (
            <div className="flex flex-col items-center justify-center mt-8">
                <h1>What's up, {userDetails?.firstName}?</h1>
                {userDetails && (
                    <div>
                        <p><b>ID: </b> {userDetails.id}</p>
                        <p><b>First Name: </b> {userDetails.firstName}</p>
                        <p><b>Last Name: </b> {userDetails.lastName}</p>
                        <p><b>Email:</b> {userDetails.email}</p>
                        <div className="flex justify-center">
                            <button className="border rounded py-2 px-4 mt-4" onClick={handleLogout}>Log out</button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
    else {
        return (
            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold">
                            Sign in to your account
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="username" className="sr-only">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
