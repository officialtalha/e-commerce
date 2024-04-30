const form = document.getElementById('signup-form');
const aleartMsg = document.getElementById('aleartMsg');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const fieldObject = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        }
        const result = await axios.post('http://localhost:3000/signup', fieldObject);
        if (result.data.message == 'user already exist' && result.data.success == false) {
            aleartMsg.innerText = 'user already exist';
            aleartMsg.style.color = 'red';
        }
        if (result.data.message == 'signup successfull' && result.data.success == true) {
            aleartMsg.innerText = 'sign up successfull';
            aleartMsg.style.color = 'green';
            setTimeout(() => {
                window.location.href = './login.html'
            }, 2000);
        }
    } catch (e) {
        console.log(e);
    }
});