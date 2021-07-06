// var: Gammal javascript-variabel, använd helst inte
// let: Modern javascript-vartiabel där man kan byta innehåll
// const: Modern javascript-variabel där man inte kan byta värde

const themePicker = document.querySelector('#theme-picker');
const themePickerButton = document.querySelector('#theme-picker > button');
const themePickerMenu = document.querySelector('.theme-picker__theme-menu');

// []: Array
// {}: Objekt, samma som dict i Python
//   { key: value }
const themes = [
    {
        primary: 'red',
        secondary: 'green',
        secondaryLighter: '#88FF88',
    },
    {
        primary: 'green',
        secondary: 'red',
        secondaryLighter: '#FF8888',
    },
    {
        primary: 'white',
        secondary: 'black',
        secondaryLighter: '#808080',
    },
    {
        primary: 'blue',
        secondary: 'yellow',
        secondaryLighter: '#88FFFF',
    },
    {
        primary: 'white',
        secondary: '#7eb1ac',
        secondaryLighter: '#bbdbd8',
    },
]

function toggleThemePicker() {
    // classList: Listan över klasser på ett element
    if (themePickerMenu.classList.contains('open')) {
        closeThemePicker()
    } else {
        openThemePicker()
    }
}

function openThemePicker() {
    themePickerMenu.classList.add('open')
}

function closeThemePicker() {
    themePickerMenu.classList.remove('open')
}

function populateThemePicker() {
    // for each object in 'themes', run a function
    themes.forEach(theme => {
        const button = document.createElement('div')
        button.className = 'theme-picker__theme-menu__theme-button'

        const primaryColor = document.createElement('div')
        primaryColor.className = 'theme-picker__theme-menu__theme-button--color'
        primaryColor.style.backgroundColor = theme.primary

        const secondaryColor = document.createElement('div')
        secondaryColor.className = 'theme-picker__theme-menu__theme-button--color'
        secondaryColor.style.backgroundColor = theme.secondary

        // Lägg till ett element inuti ett annat
        button.appendChild(primaryColor)
        button.appendChild(secondaryColor)

        // Anonym funktion
        button.onclick = function () {
            setStyle(theme)
        }
        // Lambda-syntax: () => { setStyle(theme) }

        themePickerMenu.appendChild(button)
    })
}

function setStyle(style) {
    let styleTag = document.querySelector('#theme-style')

    // Om styleTag inte finns...
    if (!styleTag) {
        // ...skapa upp en ny
        styleTag = document.createElement('style')
        styleTag.id = 'theme-style'
    }

    // Fyll style-taggen med vårt nya tema
    // Vi använder 'string interpolation':
    // Omge strängen med backticks `
    // Omge variabler med ${} för att byta ut dem mot variabelns innehåll
    styleTag.innerText = `:root {
    --primary: ${style.primary};
    --secondary: ${style.secondary};
    --secondary-lighter: ${style.secondaryLighter};
}`
    document.body.appendChild(styleTag)
    closeThemePicker()
    saveTheme(style)
}

function saveTheme(theme){
    window.localStorage.setItem('pagetheme', JSON.stringify(theme))
}

function loadTheme(){
    let loaded = window.localStorage.getItem('pagetheme')
    if(loaded != null) {
        loaded = JSON.parse(loaded)
        setStyle(loaded) 
    }
    
}

// Exekvera vår funktion för att rita upp menyns innehåll
populateThemePicker()
loadTheme()
