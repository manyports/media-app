"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchPosts } from '@/api/api';

interface Post {
    id: number;
    title: string;
    body: string;
}

export default function News() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const getPosts = async () => {
            try {
                const posts = await fetchPosts();
                setPosts(posts);
                setLoading(false);
            } catch (error) {
                console.error('Error loading posts:', error);
                setLoading(false);
            }
        };
        getPosts();
    }, []);

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handlePostClick = (id: number) => {
        router.push(`/news/${id}`);
    };

    return (
        <div className="flex items-center flex-col">
            <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border rounded p-2 mt-4 max-w-xs md:max-w-xl"
            />
            {loading ? (
                <div className="flex flex-col items-center justify-center">
                    <p>Loading posts...</p>
                </div>
            ) : filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                    <div
                        key={post.id}
                        className="border rounded mt-4 max-w-xs md:max-w-xl py-2 px-2 cursor-pointer"
                        onClick={() => handlePostClick(post.id)}
                    >
                        <div className="flex flex-row text-[20px] font-extrabold">
                            <span>
                                <b>{post.id}.</b>ㅤ
                            </span>
                            <h2>{post.title}</h2>
                        </div>
                        <p className="indent-10">{post.body}</p>
                    </div>
                ))
            ) : (
                <div className="flex flex-col items-center justify-center">
                    <p>Sorry, we couldn't find a matching post</p>
                </div>
            )}
        </div>
    );
}