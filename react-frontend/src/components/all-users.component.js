import React, {useEffect, useState} from "react";
import styles from "../css/stats-table.module.css"
import AllUsersService from "../services/all-users.service";
import {withRouter} from "../common/with-router";

const AllUsersComponent = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        AllUsersService()
            .then((response) => {
                setUsers(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    console.log(users);
    return (
        <section>
            <h1>Users</h1>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </section>
    );
};


export default withRouter(AllUsersComponent);