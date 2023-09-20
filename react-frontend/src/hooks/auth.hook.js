import { useEffect, useState } from 'react';

const useAuth = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('guest');
    const [isAdmin, setIsAdmin] = useState(false);
    const [isModerator, setIsModerator] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            setLoggedIn(true);
            setUsername(user.username);
            setIsAdmin(user.roles.includes('ROLE_ADMIN'));
            setIsModerator(user.roles.includes('ROLE_MODERATOR'));
        } else {
            setLoggedIn(false);
            setUsername('guest');
            setIsAdmin(false);
            setIsModerator(false);
        }
    }, []);

    return {
        isLoggedIn: loggedIn,
        getUsername: username,
        isAdmin,
        isModerator,
    };
};

export default useAuth;
