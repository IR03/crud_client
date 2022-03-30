import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);
    console.log(users);

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => {
                setUsers(data);
            })
    }, []);

    //Delete user

    const handleDelete = id => {
        const proceed = window.confirm('Are you sure, you want to delete?');
        if (proceed) {
            fetch(`http://localhost:5000/users/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('deleted successfully');
                        const remainingUsers = users.filter(user => user._id !== id);
                        setUsers(remainingUsers);
                    }
                });
        }
    }

    return (
        <div>
            <h2>{users.length}</h2>

            <ul>
                {
                    users.map(user => <li key={user._id}>
                        {user.name} :: {user.email}
                        <button onClick={() => handleDelete(user._id)}>X</button>
                        <Link to={`/users/update/${user._id}`}>
                            <button>Update</button>
                        </Link>

                    </li>)
                }
            </ul>

        </div>
    );
};

export default Users;