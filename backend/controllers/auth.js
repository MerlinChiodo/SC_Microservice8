const accessLevels = {
    admin: 3,
    worker: 2,
    citizen: 1,
    noRights: 0
};
Object.freeze(accessLevels);

const auth = async (token, accessLevel, requestedID) => {
    if(!accessLevel || accessLevel == accessLevels.noRights){
        return requestedID ? requestedID : 1; // Grant access
    }
    if(token && token.length > 15){ // for testing
        return requestedID==1 ? 1 : 0;  // logged in user = 1
    }
    return 0; // deny access
}
 
module.exports = {
    auth,
    accessLevels,
}