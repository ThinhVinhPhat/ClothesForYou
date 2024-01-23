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

