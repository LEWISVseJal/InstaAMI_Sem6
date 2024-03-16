import React, { useEffect, useState } from 'react';
import './UserList.css';
import axios from 'axios';

const UserList = () => {
    const [userList, setUserList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('http://localhost:5000/user/');
            const filteredUsers = response.data.filter(user => !user.isAdmin); // Filter out users where isAdmin is false
            setUserList(filteredUsers);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching user list:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log('Fetching data...');
        fetchData();
    }, []);

    useEffect(() => {
        console.log('User list updated:', userList);
    }, [userList]);

    const extractDate = (dateTimeString) => {
        const date = new Date(dateTimeString); // Convert the date string to a Date object
        const day = date.getDate().toString().padStart(2, '0'); // Get the day and pad with leading zero if necessary
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get the month (add 1 because January is 0) and pad with leading zero if necessary
        const year = date.getFullYear(); // Get the full year
        return `${day}-${month}-${year}`; //// Extracting the first 10 characters (date part)
    };

    return (
        <div className='UserList'>
            <h1>User List</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Country</th>
                            <th>Lives In</th>
                            <th>Works At</th>
                            <th>Relationship</th>
                            <th>Followers</th>
                            <th>Following</th>
                            <th>Regsitered</th>
                            <th>Updated At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>
                                <td>{user.country}</td>
                                <td>{user.livesin}</td>
                                <td>{user.worksAt}</td>
                                <td>{user.relationship}</td>
                                <td>{user.followers.length}</td> {/* Assuming followers is an array */}
                                <td>{user.following.length}</td> {/* Assuming following is an array */}
                                <td>{extractDate(user.createdAt)}</td>
                                <td>{extractDate(user.updatedAt)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default UserList;
