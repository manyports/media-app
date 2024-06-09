import axios from 'axios';
import Cookies from 'js-cookie';

const getAuthToken = (): string | undefined => Cookies.get('authToken');

const axiosInstance = axios.create({
    baseURL: 'https://dummyjson.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized, logging out...');
            Cookies.remove('authToken');
            window.location.href = '/account/login';
        } else {
            console.error('API Error:', error);
        }
        return Promise.reject(error);
    }
);

export const fetchPosts = async (): Promise<any[]> => {
    try {
        const response = await axiosInstance.get('/posts');
        return response.data.posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};

export const fetchPostById = async (id: number): Promise<any> => {
    try {
        const response = await axiosInstance.get(`/posts/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching post:', error);
        throw error;
    }
};

export async function addPost(postData: { title: string; body: string; userId: string; }): Promise<any> {
    try {
        const response = await fetch('https://dummyjson.com/posts/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('authToken')}`
            },
            body: JSON.stringify(postData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error data:', errorData);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error adding post:', error);
        throw error;
    }
}