"use client"

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

interface PostData {
    id: number;
    title: string;
    body: string;
}

export default function MyPosts() {
    const [posts, setPosts] = useState<PostData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const userId = Cookies.get('userId');
        if (!userId) {
            window.location.href = '/account';
        } else {
            fetchUserPosts(userId);
        }
    }, []);

    const fetchUserPosts = async (userId: string) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://dummyjson.com/posts?userId=${userId}`);
            if (Array.isArray(response.data)) {
                setPosts(response.data);
            } else {
                console.error('API response is not an array');
                setError('An error occurred while fetching posts');
            }
        } catch (error) {
            console.error(error);
            setError('An error occurred while fetching posts');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">My Posts</h2>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <ul>
                {posts.map((post) => (
                    <li key={post.id} className="mb-4">
                        <h3 className="text-xl font-bold">{post.title}</h3>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
