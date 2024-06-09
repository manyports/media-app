"use client"

import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { addPost } from '@/api/api';

interface PostData {
    title: string;
    body: string;
}

function FormField({
    label,
    id,
    value,
    onChange,
    type = 'text'
}: {
    label: string;
    id: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    type?: string;
}) {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            {type === 'textarea' ? (
                <textarea
                    id={id}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    rows={4}
                    value={value}
                    onChange={onChange}
                ></textarea>
            ) : (
                <input
                    type={type}
                    id={id}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    value={value}
                    onChange={onChange}
                />
            )}
        </div>
    );
}

export default function AddPost() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = Cookies.get('authToken');
        const userId = Cookies.get('userId');
        if (!token || !userId) {
            window.location.href = '/account';
        } else {
            setUserId(userId);
        }
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addPost({ title, body, userId });
            alert('Post added successfully!');
            setTitle('');
            setBody('');
            window.location.href = '/mynews';
        } catch (error) {
            console.error('Error adding post:', error);
            setError('Failed to add post');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Add New Post</h2>
            <form onSubmit={handleSubmit}>
                <FormField
                    label="Title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <FormField
                    label="Body"
                    id="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    type="textarea"
                />
                {error && <p className="text-red-500">{error}</p>}
                <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-blue-600"
                    disabled={loading}
                >
                    {loading ? 'Adding...' : 'Add Post'}
                </button>
            </form>
        </div>
    );
}
