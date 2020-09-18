import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useContent } from '../../App';

const ProtectedPage = ({ children, ...rest }) => {
    const [user, setUser] = useContext(useContent)
    return (
        <div>
            <Route
                {...rest}
                render={({ location }) =>
                    user.email ? (
                        children
                    ) : (
                            <Redirect
                                to={{
                                    pathname: "/login",
                                    state: { from: location }
                                }}
                            />
                        )
                }
            />
        </div>
    );
};

export default ProtectedPage;