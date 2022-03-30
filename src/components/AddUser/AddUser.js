import React from 'react';
import { useRef } from 'react/cjs/react.development';

const AddUser = () => {
    const nameRef = useRef();
    const emailRef = useRef();

    const handleAddUSer = e =>{
        const name = nameRef.current.value;
        const email = emailRef.current.value;

        const newUser = {name, email};

        fetch('http://localhost:5000/users',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(data => {
            if(data.insertedId){
                alert('data added successfully')
                e.target.reset();
            }
        })
        // console.log(newUser);
        e.preventDefault();
    }
    return (
        <div>
            <h2>Add an User</h2>
            <form onSubmit={handleAddUSer}>
                <input type="text" ref={nameRef}/>
                <input type="email" name="" id="" ref={emailRef}/>
                <input type="submit" value="Add" />
            </form>
        </div>
    );
};

export default AddUser;