// import * as jwt_decode from 'jwt-decode';

import { jwtDecode } from 'jwt-decode';

export const verifyToken = (token) => {
  return jwtDecode(token);
};
 