export const getHeaders = (JWTtoken) => {
    const myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', "Bearer " + JWTtoken);

    return myHeaders;
}