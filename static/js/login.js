const email = document.getElementsByClassName('email')[0];
const pass = document.getElementsByClassName('pass')[0];
const signForm = document.getElementById('signForm');
const warning = document.getElementsByClassName('warning');
const errorMsg = document.getElementsByClassName('errorMsg');
const inpt = document.getElementsByClassName('inpt')


const specialChars = "!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~";

function checkValid(name){

    for(let i = 0; i < name.length; i++){
        
        if(name.includes(specialChars[i])){

            return true;
        }
    }
    return false;
}

function email_validating(input,warn,error,e)
{
    let emailMessage = [];
    if (input.value.length == 0)
    emailMessage.push("Email address is required");

    if (input.value.length < 6)
    emailMessage.push("Too short.Use at least 6 charactes");

    if(!(input.value.includes("@")) || !(input.value.endsWith(".com")) || !(checkValid(input.value)))
    emailMessage.push("Please enter a valid email address");

    if(emailMessage.length != 0)
    {
        e.preventDefault();
        error.textContent = emailMessage[0];
        warn.style.opacity = "1";
        input.style.borderColor = "#9b211b";

        input.addEventListener('input',()=>{
            emailMessage = [];
            if (input.value.length == 0)
            emailMessage.push("Email address is required");
        
            if (input.value.length < 6)
            emailMessage.push("Too short.Use at least 6 charactes");
        
            if(!(input.value.includes("@")) || !(input.value.endsWith(".com")) || !(checkValid(input.value)))
            emailMessage.push("Please enter a valid email address");

            if(emailMessage.length != 0)
            {
                error.textContent = emailMessage[0];
                warn.style.opacity = "1";
                input.style.borderColor = "#9b211b";
            }
            else{
                warn.style.opacity = "0";
                input.style.borderColor = "#58a6ff";
            }
            
        })
    }
    else{
        warn.style.opacity = "0";
        input.style.borderColor = "#58a6ff";
    }

}

function password_validating(input,warn,error,e)
{
    let passMessage = [];

    if(input.value.length == 0)
    passMessage.push("Password is required")

    if (input.value.length < 8)
    passMessage.push("Too short.Use at least 8 characters")

    if (!(checkValid(input.value)))
    passMessage.push("Password should be at least 8 characters, with a symbol or letter")

    if(passMessage.length != 0)
    {
        e.preventDefault();
        error.textContent = passMessage[0];
        warn.style.opacity = "1";
        input.style.borderColor = "#9b211b";

        input.addEventListener('input',()=>{
            passMessage = [];

            if(input.value.length == 0)
    passMessage.push("Password is required")

    if (input.value.length < 8)
    passMessage.push("Too short.Use at least 8 characters")

    if (!(checkValid(input.value)))
    passMessage.push("Password should be at least 8 characters, with a symbol or letter")

    if(passMessage.length != 0)
    {
       
        error.textContent = passMessage[0];
        warn.style.opacity = "1";
        input.style.borderColor = "#9b211b";
    }
    else{
        warn.style.opacity = "0";
        input.style.borderColor = "#58a6ff";
    }

        })
    }
    else{
        warn.style.opacity = "0";
        input.style.borderColor = "#58a6ff";
    }
}

signForm.addEventListener('submit',(e)=>{
    

    // Validating email 

    email_validating(inpt[0],warning[0],errorMsg[0],e)

    // Validating password
    
    password_validating(inpt[1],warning[1],errorMsg[1],e)
})
