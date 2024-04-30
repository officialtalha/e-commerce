const form = document.getElementById('login-form');
const aleartMsg = document.getElementById('aleartMsg');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const fieldObject = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        }
        const result = await axios.post('http://localhost:3000/login', fieldObject);
        if (result.data.message == 'user does not exist' && result.data.success == false) {
            aleartMsg.innerText = 'user does not exist';
            aleartMsg.style.color = 'red';
        }
        if (result.data.message == 'incorrect password' && result.data.success == false) {
            aleartMsg.innerText = 'incorrect password';
            aleartMsg.style.color = 'red';
        }
        if (result.data.message == 'login successfull' && result.data.success == true) {
            aleartMsg.innerText = 'login successfull';
            aleartMsg.style.color = 'green';
            const info = {
                token: result.data.token,
                name: result.data.name
            }
            localStorage.setItem("user", JSON.stringify(info));
            setTimeout(() => {
                window.location.href = './home.html'
            }, 2000);
        }
    } catch (e) {
        console.log(e);
    }
});