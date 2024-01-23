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
var counter =1;
setInterval(function(){
    document.getElementById('radio'+counter).checked=true;
    counter++;
    if(counter>4){
        counter=1;
    }
})