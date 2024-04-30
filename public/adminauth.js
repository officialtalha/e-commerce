const id = prompt('username');
const password = prompt('password');

if (id === 'admin' && password === 'admin') {
    window.location.href = './admin.html';
} else {
    alert('authentication failed!');
    window.location.href = './home.html';

}