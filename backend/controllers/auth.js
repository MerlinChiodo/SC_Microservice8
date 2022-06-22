const fetch = require('node-fetch');

const accessLevels = {
    admin: 3,
    worker: 2,
    citizen: 1,
    noRights: 0
};
Object.freeze(accessLevels);

const auth = async (token, accessLevel, requestedID) => {
    const formBody = [];
    formBody.push(encodeURIComponent("code") + '=' + encodeURIComponent(token));
    citizen = null;
    if(token){
        await fetch('http://auth.smartcityproject.net:8080/verify', { 
            method: 'POST', 
            body: formBody.join('&'), 
            headers: { 'Content-Type': "application/x-www-form-urlencoded;charset=UTF-8" } 
        })
        .then(response => {
            console.log(response.status)
            if (response.status === 200) {
                return response.json();
            } 
            return null;
        })
        .then(data =>{
            if(data){
                citizen = data;
            }
        });
    }
    if(citizen && citizen.citizen_id==63 && requestedID!=undefined){ // user 63 -> only current admin
        return requestedID // Request from admin -> grant rights
    }
    if(!accessLevel || accessLevel == accessLevels.noRights){
        return requestedID ? requestedID : citizen ? citizen.citizen_id : 1; // Grant access
    }
    if(citizen && accessLevel == accessLevels.citizen){ 
        if(requestedID != undefined){ // specific id was requested
            return citizen.citizen_id==requestedID ? citizen.citizen_id : 0; 
        }
        return citizen.citizen_id;  // no specific id was requested
    }
    return 0; // deny access
}
 
module.exports = {
    auth,
    accessLevels,
}