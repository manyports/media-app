"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchPostById } from '@/api/api';

interface Post {
    id: number;
    title: string;
    body: string;
    tags: string[];
    reactions: {
        likes: number;
        dislikes: number;
    };
    views: number;
    userId: number;
}

export default function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        const getPost = async () => {
            try {
                const fetchedPost = await fetchPostById(Number(id));
                setPost(fetchedPost);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };
        if (id) {
            getPost();
        }
    }, [id]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p>{post.body}</p>
            <div className="mt-4">
                <strong>Tags:</strong> {post.tags.join(', ')}
            </div>
            <div className="mt-2">
                <strong>Reactions:</strong> {post.reactions.likes} likes, {post.reactions.dislikes}
            </div>
            <div className="mt-2">
                <strong>Views:</strong> {post.views}
            </div>
            <div className="mt-2">
                <strong>User ID:</strong> {post.userId}
            </div>
            <div className="flex justify-center">
                <a href="/news">
                <div className="border rounded max-w-xs">
                    <p className="py-3 px-3 text-center">Back to news.</p>
                </div>
                </a>
            </div>
        </div>
    );
}
