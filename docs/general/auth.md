# Problem
where to store a JWT token properly and safely in a web application?

- Save in `Local Storage` => XSS problem

![alt text](https://i.imgur.com/HwaxLVg.png)

- Save in `Cookie` => CSRF problem


- Don't save => Performance & User experience

# Solution

![alt text](https://i.imgur.com/kmjAnpD.png)

- 1. Save in JWT in memory such as: `Global state`, ...

![alt text](https://i.imgur.com/E38ui8g.png)

- 2. Save `Refresh token` in Cookie to silent get JWT

![alt text](https://i.imgur.com/2clfyZA.png)

- 3. Use `Higher-Order Components` to check isAuthenticated

![alt text](https://i.imgur.com/q9mSKm1.png)

- 3. Save `logout: time` in Local storage to logout in all tab 

![alt text](https://i.imgur.com/MjlYCnY.png)



# Refer
- https://reactjs.org/docs/higher-order-components.html

- https://medium.com/@ryanchenkie_40935/react-authentication-how-to-store-jwt-in-a-cookie-346519310e81

- https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/

# Refer repo

- https://github.com/vnovick/graphql-jwt-tutorial

- https://github.com/mjrussell/redux-auth-wrapper#readme