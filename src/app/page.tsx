"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
    const [post, setPost] = useState<any>(null);

    useEffect(() => {
        const randomId = Math.floor(Math.random() * 30) + 1;
        const url = `https://dummyjson.com/posts/${randomId}`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setPost(data);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="flex items-center pt-20 flex-col">
            <div className="border rounded-[30px] px-4 py-2 border-[#232323]">
                {post ? (
                    <Link href={`/news/${post.id}`}>
                        <p className="font-semibold text-[14px] md:text-[30px] text-center">{'-> ' + post.title}</p>
                    </Link>
                ) : (
                    <p className="font-semibold text-[20px] md:text-[30px]">{'-> Loading...'}</p>
                )}
            </div>
            <div>
                <h1 className="font-black text-[24px] md:text-[56px]">Get to know about what's <br/>going around the world.</h1>
            </div>
        </div>
    );
}