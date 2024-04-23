const signup = document.getElementById("signup")
const error = document.querySelector(".error");

console.log(signup.fristname)

const email = signup.email;
const fristname  = signup.fristname;
const lastname = signup.lastname;
const password = signup.password;
const button = signup.signupbutton


const checkemail = ()=>{
    if(email.value == "") {
        error.innerHTML = "Vui lòng nhập email"
        return false;
    }    
    return true;
}

const checkpassword = ()=>{
    if(email.value == "") {
        error.innerHTML = "Vui lòng nhập password"
        return false;
    }    
    return true;
}

const checkfristname = ()=>{
    if(fristname.value  == "") {
        error.innerHTML = "Vui lòng nhập Họ";
        return false;
    }
    else{
        if(/[A-Z]\w{2,}/.test(fristname.value)){
           error.innerHTML = ""; 
           return true;
        }
        else{
            error.innerHTML = "Họ phải có 2 chữ trở lên và chữ đầu phải in hoa"; 
            return false;
        }
    }
}
const checklastname = ()=>{
    if(lastname.value  == "") {
        error.innerHTML = "Vui lòng nhập Tên";
        return false;
    }
    else{
        if(/[A-Z]\w{2,}/.test(lastname.value)){
           error.innerHTML = ""; 
           return true;
        }
        else{
            error.innerHTML = "Tên phải có 2 chữ trở lên và chữ đầu phải in hoa"; 
            return false;
        }
    }
}


email.addEventListener("blur",()=>{
    checkemail();
})

password.addEventListener("blur",()=>{
    checkpassword();
})

fristname.addEventListener("blur",()=>{
    checkfristname();
})

lastname.addEventListener("blur",()=>{
    checklastname();
})

button.addEventListener("click",()=>{
    checkemail()  
    checkfristname() 
    checklastname()  
    checkpassword()

    
})
