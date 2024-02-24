const inputEL = document.querySelectorAll("[input]")


 

inputEL.forEach(input => {
    input.addEventListener("click", (e)=>{
        e.preventDefault();
        input.style.border-color = 'wheat'
    })
})