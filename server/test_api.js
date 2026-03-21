async function testLogin() {
    try {
        const response = await fetch('http://127.0.0.1:5002/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@natyanjali.com', password: 'admin123' })
        });
        
        const data = await response.json();
        if (response.ok) {
            console.log('--- LOGIN SUCCESS ---');
            console.log('User Role:', data.role);
            console.log('User Name:', data.name);
            console.log('Token Received:', !!data.token);
        } else {
            console.log('--- LOGIN FAILED ---');
            console.log('Status:', response.status);
            console.log('Response:', data);
        }
    } catch (error) {
        console.error('--- ERROR ---');
        console.error(error.message);
    }
}

testLogin();
