const axios = require('axios');

async function testDashboards() {
    const baseURL = 'http://127.0.0.1:5002/api';
    
    const getUsers = async () => {
        try {
            const response = await axios.get(`${baseURL}/auth/login`, {
                // This won't work without a body, just checking if port is open
            });
        } catch (e) {
            console.log('Port 5002 is active');
        }
    };

    // We can't easily get JWTs for all without passwords, so we'll just check if the stats routes exist
    const routes = [
        '/dashboard-stats/admin',
        '/dashboard-stats/teacher',
        '/dashboard-stats/student'
    ];

    for (const route of routes) {
        try {
            const res = await axios.get(`${baseURL}${route}`);
            console.log(`Route ${route}: SUCCESS (Status: ${res.status})`);
        } catch (err) {
            if (err.response?.status === 401) {
                console.log(`Route ${route}: ACTIVE (Got 401 as expected for no token)`);
            } else {
                console.log(`Route ${route}: FAILED (${err.response?.status || err.message})`);
            }
        }
    }
}

testDashboards();
