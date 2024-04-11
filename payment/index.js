const province = document.getElementById("province")
const disttrict  = document.getElementById("district")
const addWards = document.getElementById("addWards")

const addDistricts = (disttricts) => {
    disttricts.forEach(disttric => {
        const option = document.createElement("option")
        option.value = disttric;
        option.textContent = disttric;
        disttrict.appendChild(option)
    });
}

province.addEventListener("change",()=>{
    const select_province = province.value;
    disttrict.innerHTML = ""

    switch(select_province){
        case "Hà Nội":
            addDistricts(["Ba Đình", "Hoàn Kiếm", "Hai Bà Trưng", "Đống Đa", "Cầu Giấy", "Thanh Xuân", "Hoàng Mai", "Long Biên", "Bắc Từ Liêm", "Nam Từ Liêm"]);
            break;
        case "Hồ Chí Minh":
            addDistricts(["Quận 1", "Quận 2", "Quận 3", "Quận 4", "Quận 5", "Quận 6", "Quận 7", "Quận 8", "Quận 9", "Quận 10", "Quận 11", "Quận 12", "Thủ Đức", "Bình Thạnh", "Tân Bình", "Tân Phú", "Phú Nhuận", "Gò Vấp", "Bình Tân"]);
            break;
        case "Đà Nẵng":
            addDistricts(["Quận Hải Châu", "Quận Thanh Khê", "Quận Sơn Trà", "Quận Ngũ Hành Sơn", "Quận Liên Chiểu", "Quận Cẩm Lệ"]);
            break;
        case "Hải Phòng":
            addDistricts(["Quận Hồng Bàng", "Quận Ngô Quyền", "Quận Lê Chân", "Quận Hải An", "Quận Kiến An", "Quận Đồ Sơn", "Quận An Dương", "Quận An Lão", "Quận Vĩnh Bảo", "Quận Tiên Lãng", "Quận Đông Hải"]);
            break;
    }

})

const adWards = (adWardss)=>{
    adWardss.forEach(adWard =>{
    const option = document.createElement("option")
    option.value = adWard;
    option.textContent = adWard
    addWards.appendChild(option);
    })
}

disttrict.addEventListener("change",()=>{
    const select_dis = disttrict.value;
    addWards.innerHTML=""

    switch(select_dis){
        case "Ba Đình":
            adWards(["Phúc Xá", "Trúc Bạch", "Vĩnh Phúc", "Cống Vị", "Liễu Giai"]);
            break;
        case "Hoàn Kiếm":
            adWards(["Phan Chu Trinh", "Hàng Bài", "Tràng Tiền", "Hàng Trống", "Hòan Kiếm"]);
            break;
        case "Hai Bà Trưng":
            adWards(["Bách Khoa", "Bạch Đằng", "Bạch Mai", "Bùi Thị Xuân", "Cầu Dền"]);
            break;
    }

})

