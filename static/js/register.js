const rWarning = document.getElementsByClassName('rWarning');
const rErrorMsg = document.getElementsByClassName('rErrorMsg');
const rInput = document.getElementsByClassName('rInput');
const registerForm = document.getElementById('registerForm');
const flWarn = document.getElementsByClassName('flWarn')[3];

const specialChars = "!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
const nums = [0,1,2,3,4,5,6,7,8,9]

function checkValid(name){

    spe = false;
    numC = false;

    for(let i = 0; i < specialChars.length; i++){
        
        if(name.includes(specialChars[i])){
            spe = true;
            break;
        }
    }

    for(let j = 0; j < nums.length; j++)
    {
        if(name.includes(nums[j]))
        {
        numC = true;
        break;
        }
    }

    if (spe === true && numC === true)
    return true;
    else return false;
   
}




function email_validating(input,warn,error,e)
{
    let emailMessage = [];
    if (input.value.length == 0)
    emailMessage.push("Email address is required");

    if (input.value.length < 6)
    emailMessage.push("Too short.Use at least 6 charactes");

    if(!(input.value.includes("@")) || !(input.value.endsWith(".com")))
    emailMessage.push("Please enter a valid email address");

    if(emailMessage.length != 0)
    {
        e.preventDefault();
        error.textContent = emailMessage[0];
        warn.style.opacity = "1";
        input.style.borderColor = "#9b211b";
        
    }
    else{
        warn.style.opacity = "0";
        input.style.borderColor = "#58a6ff";
    }

    input.addEventListener('input',()=>{
        emailMessage = [];
        if (input.value.length == 0)
        emailMessage.push("Email address is required");
    
        if (input.value.length < 6)
        emailMessage.push("Too short.Use at least 6 charactes");
    
        if(!(input.value.includes("@")) || !(input.value.endsWith(".com")))
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

function password_validating(input,warn,error,e)
{
    let passMessage = [];

    if(input.value.length == 0)
    passMessage.push("Password is required")

    if (input.value.length < 8)
    passMessage.push("Too short.Use at least 8 characters")

    if (!(checkValid(input.value)))
    passMessage.push("Password should be at least 8 characters, with a symbol , letter and a number")

    if(passMessage.length != 0)
    {
        e.preventDefault();
        error.textContent = passMessage[0];
        warn.style.opacity = "1";
        if(screen.width < 400)
        flWarn.style.gap = "14px"
        input.style.borderColor = "#9b211b";

       
    }
    else{
        warn.style.opacity = "0";
        input.style.borderColor = "#58a6ff";
    }

    input.addEventListener('input',()=>{
        passMessage = [];

        if(input.value.length == 0)
passMessage.push("Password is required")

if (input.value.length < 8)
passMessage.push("Too short.Use at least 8 characters")

if (!(checkValid(input.value)))
passMessage.push("Password should be at least 8 characters, with a symbol , letter and a number")

if(passMessage.length != 0)
{
   
    error.textContent = passMessage[0];
    warn.style.opacity = "1";
    if(screen.width < 400)
    flWarn.style.gap = "14px"
    input.style.borderColor = "#9b211b";
}
else{
    warn.style.opacity = "0";
    input.style.borderColor = "#58a6ff";
}

    })
}


function lName_validating(input,warn,error,e)
{
    let fName_message = []

    if(input.value.length == 0)
    fName_message.push("Last name is required")

    if(input.value.length < 4)
    fName_message.push("Too short.Use at least 4 characters")

    if(fName_message.length != 0)
    {
        e.preventDefault();
        error.textContent = fName_message[0]
        warn.style.opacity = "1";
        input.style.borderColor = "#9b211b";
    }
    else{
        warn.style.opacity = "0";
        input.style.borderColor = "#58a6ff";
    }

    input.addEventListener('input',()=>{
        fName_message = [];
        if(input.value.length == 0)
        fName_message.push("Last name is required")
    
        if(input.value.length < 4)
        fName_message.push("Too short.Use at least 4 characters")
    
        if(fName_message.length != 0)
        {
            error.textContent = fName_message[0]
            warn.style.opacity = "1";
            input.style.borderColor = "#9b211b";
        }
        else{
            warn.style.opacity = "0";
            input.style.borderColor = "#58a6ff";
        }
    
            })
}




function fName_validating(input,warn,error,e)
{
    let fName_message = []

    if(input.value.length == 0)
    fName_message.push("First name is required")

    if(input.value.length < 4)
    fName_message.push("Too short.Use at least 4 characters")

    if(fName_message.length != 0)
    {
        e.preventDefault();
        error.textContent = fName_message[0]
        warn.style.opacity = "1";
        input.style.borderColor = "#9b211b";

    }
    else{
        warn.style.opacity = "0";
        input.style.borderColor = "#58a6ff";
    }

    input.addEventListener('input',()=>{
        fName_message = [];
        if(input.value.length == 0)
        fName_message.push("First name is required")
    
        if(input.value.length < 4)
        fName_message.push("Too short.Use at least 4 characters")
    
        if(fName_message.length != 0)
        {
            error.textContent = fName_message[0]
            warn.style.opacity = "1";
            input.style.borderColor = "#9b211b";
        }
        else{
            warn.style.opacity = "0";
            input.style.borderColor = "#58a6ff";
        }
    
            })

}


registerForm.addEventListener('submit',(e)=>{
    email_validating(rInput[2],rWarning[2],rErrorMsg[2],e)
    password_validating(rInput[3],rWarning[3],rErrorMsg[3],e)
    fName_validating(rInput[0],rWarning[0],rErrorMsg[0],e)
    lName_validating(rInput[1],rWarning[1],rErrorMsg[1],e)

})

const pageOB = new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting)
    {
        window.location.href = "#registerForm";
    }
} ,{
    threshold:0.1
})


pageOB.observe(menu);