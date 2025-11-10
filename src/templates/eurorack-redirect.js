import React from 'react';
import { navigate } from 'gatsby';

const EurorackRedirect = ({ location }) => {
    // preserve subpath and trailing slash
    const sub = location.pathname.replace(/^\/eurorack/, '');
    navigate(`/modules${sub}`, { replace: true });
    return null;
};

export default EurorackRedirect;
