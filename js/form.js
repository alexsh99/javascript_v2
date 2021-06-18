document.querySelector('#form').addEventListener('submit', e => {
    let error = false;
    let name = document.getElementById('name');
    let tel = document.querySelector('#tel');
    let mail = document.querySelector('#mail');

    if (!/^[a-zа-яё]+$/ig.test(name.value)){
        name.classList.add('invalid');
        name.nextElementSibling.className = 'help_block';
        error = true;
    } else {
        name.classList.remove('invalid');
        name.nextElementSibling.className = 'invisible';
        error |= false;
    }

    if (!/^\+7\([0-9]{3}\)\d{3}-\d{4}$/ig.test(tel.value)){
        tel.classList.add('invalid');
        tel.nextElementSibling.className = 'help_block';
        error = true;
    } else {
        tel.classList.remove('invalid');
        tel.nextElementSibling.className = 'invisible';
        error |= false;
    }

    if (!/^[a-z]+\.?-?[a-z]+@[a-z]+\.[a-z]{2,4}$/ig.test(mail.value)){
        mail.classList.add('invalid');
        mail.nextElementSibling.className = 'help_block';
        error = true;
    } else {
        mail.classList.remove('invalid');
        mail.nextElementSibling.className = 'invisible';
        error |= false;
    }

    if (error) e.preventDefault();
}, false);