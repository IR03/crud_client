import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react/cjs/react.development';
import { useHistory } from 'react-router-dom';

const UpdateUser = () => {
    // const [user, setUser] = useState({name : ' ', email : ''});
    const [user, setUser] = useState({});
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        fetch(`http://localhost:5000/users/${id}`)
            .then(res => res.json())
            .then(data => setUser(data))
    }, [id])


    const handleUpdateName = e => {
        const updateName = e.target.value;
        const updatedUser = { name: updateName, email: user.email };
        setUser(updatedUser);
    }
    const handleUpdateEmail = e => {
        const updateEmail = e.target.value;
        const updatedUser = { ...user };
        updatedUser.email = updateEmail;
        setUser(updatedUser);
    }

    const handleUpdateUser = e => {

        fetch(`http://localhost:5000/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    alert('Updated successfully');
                    setUser({});
                    history.push('/users');
                }
            });
        e.preventDefault();
    }

    return (
        <div>
            <p>{id}</p>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <h2>This is Update User</h2>
            <form onSubmit={handleUpdateUser}>
                <input type="text" onChange={handleUpdateName} value={user.name || ''} />
                <input type="email" onChange={handleUpdateEmail} value={user.email || ''} />
                <input type="submit" value="update" />
            </form>
        </div>
    );
};

export default UpdateUser;