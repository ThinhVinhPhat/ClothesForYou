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
const nextbtn = document.querySelector(".next")
const prebtn = document.querySelector(".pre")
const slider = document.querySelector(".picture-slide")

nextbtn.addEventListener("click", ()=>{
    slider.scrollLeft += 1400;
})
prebtn.addEventListener("click", ()=>{
    slider.scrollLeft -= 1400;
})

// for PE image scoller
const pe_nextbtn = document.querySelector(".PE-picture-container .next")
const pe_prebtn = document.querySelector(".PE-picture-container .pre")   
const pe_slide = document.querySelector(".PE-picture-slide")   

pe_nextbtn.addEventListener("click",()=>{
    pe_slide.scrollLeft += 300;
})
pe_prebtn.addEventListener("click",()=>{
    pe_slide.scrollLeft -= 300;
})