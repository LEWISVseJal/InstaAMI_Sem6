import React, { useEffect, useState } from 'react';
import './PostList.css';
import axios from 'axios';

const PostList = () => {
    const [postList, setPostList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('http://localhost:5000/post/postlist');
            
            setPostList(response.data || []);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching post list:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log('Fetching data...');
        fetchData();
    }, []);

    useEffect(() => {
        console.log('Post list updated:', postList);
    }, [postList]);

    const extractDate = (dateTimeString) => {
        const date = new Date(dateTimeString); 
        const day = date.getDate().toString().padStart(2, '0'); 
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
        const year = date.getFullYear(); 
        return `${day}-${month}-${year}`; 
    };

    const fetchUsername = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:5000/user/${userId}`);
            return response.data.username;
        } catch (error) {
            console.error('Error fetching username:', error);
            return null;
        }
    };

    const fetchUsernamesForPosts = async () => {
        const updatedPostList = [];
        for (const post of postList.posts) {
            const username = await fetchUsername(post.userId);
            updatedPostList.push({ ...post, username });
        }
        setPostList({ ...postList, posts: updatedPostList });
    };

    useEffect(() => {
        if (postList.posts && postList.posts.length > 0) {
            fetchUsernamesForPosts();
        }
    }, [postList.posts]);

    return (
        <div className='PostList'>
            <h1>Post's List</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Likes</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(postList.posts) && postList.posts.map((post, index) => (
                            <tr key={post._id}>
                                <td>{index + 1}</td>
                                <td>{post.username}</td>
                                <td>{post.desc}</td>
                                <td>{post.likes.length}</td>
                                <td>{extractDate(post.createdAt)}</td>
                                <td>{extractDate(post.updatedAt)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default PostList;
