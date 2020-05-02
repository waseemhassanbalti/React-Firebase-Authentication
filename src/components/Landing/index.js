import React from 'react';

import { withAuthorization } from '../Session';

 
const LandingPage = () => (
  <div>
    <h1>Landing Page</h1>
    <p>The Landing Page is accessible by everyone.</p>
  </div>
);
 
const condition = authUser => !!authUser;
 
export default LandingPage;