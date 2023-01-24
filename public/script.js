const signUpBtn = document.getElementById('signup-btn')
const colRight = document.getElementById('col-right-id')
const colLeft = document.getElementById('col-left-id')
const signUpForm = document.getElementById('signup-form-id')
const savebtn = document.getElementById('save-btn')
const fnameEdit = document.getElementById('fname-edit')

signUpBtn.addEventListener('click', (e) => {
    e.preventDefault();
    colRight.classList.toggle('col-right')
    colLeft.classList.toggle('col-left')
    signUpForm.classList.toggle('dnone')
})

savebtn.addEventListener('click', (e) => {
    e.preventDefault();
    fnameEdit.classList.toggle('dnone')
})
