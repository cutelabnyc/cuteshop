import React, { useEffect } from 'react';
import { navigate } from 'gatsby';

const EurorackRedirect = ({ location }) => {
    useEffect(() => {
        if (typeof window !== 'undefined' && location) {
            const sub = location.pathname.replace(/^\/eurorack/, '');
            navigate(`/modules${sub}`, { replace: true });
        }
    }, [location]);

    return null;
};

export default EurorackRedirect;
