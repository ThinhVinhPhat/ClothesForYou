// for search bar
const search_bar = document.getElementById("search");
        
function clearPlaceholder(input) {
    if (input.value === "Tìm kiếm....") {
        input.value = "";
    }
}

function restorePlaceholder(input) {
    if (input.value === "") {
        input.value = "Tìm kiếm....";
    }
}

search_bar.addEventListener("blur" ,() =>{
    restorePlaceholder(search_bar);
    
})

search_bar.addEventListener("focus",() =>{
    clearPlaceholder(search_bar);
})


// for image scoller
const image_list = document.querySelector(".picture-container .picture-slide")
let items  = document.querySelectorAll(".picture-container .picture-slide .silde")
let dots = document.querySelectorAll(".picture-container .picture-slide .dots li");
let prev = document.querySelector(".picture-container  .btn_pre ")
let next = document.querySelector(".picture-container  .btn_next ")



let active = 0;
let itemlength = items.length -1;

next.addEventListener("click",()=>{
    if(active + 1 > itemlength){
        active =0;
    }
    else{
        active += 1;
    }
    reloadSlider();

    })
prev.addEventListener("click",()=>{
    if(active -1 <0){
        active =itemlength;
    }
    else{
        active -= 1;
    }
    reloadSlider();

    })
let refreshSlider = setInterval(()=> {next.click()},3000)
const reloadSlider = () =>{
    let checkleft = items[active].offsetLeft;
    image_list.style.left = -checkleft + "px";
    
    let activedots = document.querySelector(".picture-container .picture-slide .dots .active");
    image_list.classList.remove('active');
    dots[active].classList.add('active');
    let refreshSlider = setInterval(()=> {next.click()},3000)
}

dots.forEach((dot , key) => {
    dot.addEventListener('click',()=>{
        active = key;
        reloadSlider();
    })
})



// get PE data from firestore

