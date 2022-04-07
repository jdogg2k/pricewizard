import awsconfig from './aws-exports';
import { Auth } from 'aws-amplify';
import { node } from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

Auth.configure(awsconfig);

function ProtectedRoute({ children }) {

    const [auth, setAuth] = useState(false);

    const navigate = useNavigate();

    const isAuthenticated = () => {

        setAuth(false);
    
        Auth.currentSession().then( response => {
            if(response.isValid()) {
                setAuth(true);
            } else {
                navigate('/login');
            }
        }).catch((err) => {
            navigate('/login');
        });
    }

    useEffect(() => {
        isAuthenticated();
    }, []);

    return children;
    
};
  
ProtectedRoute.propTypes = {
children: node,
}

export default ProtectedRoute;