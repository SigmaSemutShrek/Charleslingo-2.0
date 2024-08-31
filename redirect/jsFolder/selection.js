localStorage.clear()

const addCheckbox = document.getElementById('addition')
const subtractionCheckbox = document.getElementById('subtraction')
const multiplicationCheckbox = document.getElementById('multiplication')
const divisionCheckbox = document.getElementById('division')
const addBtn = document.querySelector('.button1')
const subtractionBtn = document.querySelector('.button2')
const multiplicationBtn = document.querySelector('.button3')
const divisionBtn = document.querySelector('.button4')

addBtn.addEventListener('click', (()=>{
    if (addCheckbox.checked){
        addCheckbox.checked = false
        localStorage.removeItem('add')
    }
    else if (!addCheckbox.checked){
        addCheckbox.checked = true
        localStorage.setItem('add', 'true')
    }
}))

subtractionBtn.addEventListener('click', (()=>{
    if (subtractionCheckbox.checked){
        subtractionCheckbox.checked = false
        localStorage.removeItem('minus')
    }
    else if (!subtractionCheckbox.checked){
        subtractionCheckbox.checked = true
        localStorage.setItem('minus', 'true')
    }
}))

multiplicationBtn.addEventListener('click', (()=>{
    if (multiplicationCheckbox.checked){
        multiplicationCheckbox.checked = false
        localStorage.removeItem('times')
    }
    else if (!multiplicationCheckbox.checked){
        multiplicationCheckbox.checked = true
        localStorage.setItem('times', 'true')
    }
}))

divisionBtn.addEventListener('click', (()=>{
    if (divisionCheckbox.checked){
        divisionCheckbox.checked = false
        localStorage.removeItem('division')
    }
    else if (!divisionCheckbox.checked){
        divisionCheckbox.checked = true
        localStorage.setItem('division', 'true')
    }
}))


const easyCheckbox = document.getElementById('easy')
const mediumCheckbox = document.getElementById('medium')
const hardCheckbox = document.getElementById('hard')
const sheldonCheckbox = document.getElementById('sheldon')
const easyBtn = document.querySelector('.easyBtn')
const mediumBtn = document.querySelector('.mediumBtn')
const hardBtn = document.querySelector('.hardBtn')
const sheldonBtn = document.querySelector('.sheldonBtn')

easyBtn.addEventListener('click', (()=>{
    if (easyCheckbox.checked){
        easyCheckbox.checked = false
        localStorage.removeItem('easy')
    }
    else if (!easyCheckbox.checked){
        easyCheckbox.checked = true
        localStorage.setItem('easy', 'true')
    }
}))

mediumBtn.addEventListener('click', (()=>{
    if (mediumCheckbox.checked){
        mediumCheckbox.checked = false
        localStorage.removeItem('medium')
    }
    else if (!mediumCheckbox.checked){
        mediumCheckbox.checked = true
        localStorage.setItem('medium', 'true')
    }
}))

hardBtn.addEventListener('click', (()=>{
    if (hardCheckbox.checked){
        hardCheckbox.checked = false
        localStorage.removeItem('hard')
    }
    else if (!hardCheckbox.checked){
        hardCheckbox.checked = true
        localStorage.setItem('hard', 'true')
    }
}))

sheldonBtn.addEventListener('click', (()=>{
    if (sheldonCheckbox.checked){
        sheldonCheckbox.checked = false
        localStorage.removeItem('sheldon')
    }
    else if (!sheldonCheckbox.checked){
        sheldonCheckbox.checked = true
        localStorage.setItem('sheldon', 'true')
    }
}))

const submitBtn = document.querySelector('.submitBtn')

submitBtn.addEventListener('click', (()=>{
        const operationSelected = addCheckbox.checked || subtractionCheckbox.checked || multiplicationCheckbox.checked || divisionCheckbox.checked;
        const levelSelected = easyCheckbox.checked || mediumCheckbox.checked || hardCheckbox.checked || sheldonCheckbox.checked;

    if (operationSelected && levelSelected){
        window.location.href = 'game.html'
    }
    else{
        window.location.reload()
        alert('You must tick at least one operation and one level.')
    }
}))