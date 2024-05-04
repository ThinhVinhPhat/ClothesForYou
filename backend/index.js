import {initializeApp} from 'firebase/app';
import { getAnalytics } from "firebase/analytics" ; 
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  onSnapshot,
  getDoc,
  doc

} from 'firebase/firestore'

import {
  getStorage, ref
} from 'firebase/storage'

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyC66Dwpyk0bcxbnu-zLtZd0fqgHdkIB6n0",
    authDomain: "work-a01e3.firebaseapp.com",
    projectId: "work-a01e3",
    storageBucket: "work-a01e3.appspot.com",
    messagingSenderId: "109221974987",
    appId: "1:109221974987:web:fb27e512e0ea5dd433dc4e",
    measurementId : "G-D9KB2R57R2"
  };

// init firebase app

const app  = initializeApp(firebaseConfig)


// init firestore services
const db = getFirestore(app)
const auth = getAuth(app)

// collection ref
const collRef = collection(db,'Clothes')
const ComboRef = collection(db,"Combo")
const SignatureRef = collection(db,"Signature")
const CartRef = collection(db,"Cart")

// queries
const q = query(collRef,where("deleted","==",false))
const docsSnap =  await getDocs(collRef);

const sq = query(SignatureRef,where("deleted","==",false))

// get collection docs
onSnapshot(q,(docs)=>{
  let PE_clothes = []
  docs.docs.forEach(doc=>{
    PE_clothes.push({...doc.data(),id: doc.id})
  })
  
  console.log(PE_clothes)
  
})


  
const add  = document.querySelector(".add")

const getsize = () =>{
  const string = [];
  for(var i=0;i<add.size.length;i++){
    if(add.size[i].checked){
      string.push(add.size[i].value);
    }
  }
 return string
}

const getstatus = ()=>{
  var string = ""
  for(var i=0;i<add.status.length;i++){
    if(add.status[i].checked){
      string = add.status[i].value;
    }
  }
  return string;
}

const getdeleted = ()=>{
  var string = ""
  for(var i=0;i<add.deleted.length;i++){
    if(add.deleted[i].checked){
      string = add.deleted[i].value;
    }
  }
  return string;
}

const storage = getStorage(app);

const moutain = ref(storage,'gs://work-a01e3.appspot.com/Clothes_PE_image/060223028/060223028td_1_a-01_60ab9d299274456daf1b2674902063ca_1024x1024.webp')



// add.addEventListener("submit",(e)=>{
//   e.preventDefault()

//   addDoc(SignatureRef , {
//     title: add.title.value,
//     description: add.description.value,
//     discount: parseInt(add.discount.value),
//     position: parseInt(add.position.value),
//     price: (add.price.value),
//     size: getsize(),
//     status: getstatus(),
//     stock: parseInt(add.stock.value),
//     deleted: getdeleted(),
//     img: add.img.value
//   }).then(() => {
//     add.reset()
//   })
// })


//end adding 




// login auth 
const login_auth = document.querySelector(".input")
const error = document.querySelector(".error")
const node1  = document.getElementById("node1")
const node2  = document.getElementById("node2")
const signin_name = document.querySelector("#signin");


login_auth.addEventListener("submit",(e)=>{
  e.preventDefault()
  const email  = login_auth.email.value;
  const password = login_auth.password.value;
  signInWithEmailAndPassword(auth,email,password)
  .then((cred)=>{
    let params = (new URL(document.location)).searchParams;
    let token = params.get("email");
    
    localStorage.setItem("email",email)
    
    window.location.reload()
  
    login_auth.removeChild(login_auth.email)
    login_auth.removeChild(login_auth.password)
    login_auth.removeChild(login_auth.loginbutton)

    const success  = document.createElement("h1")
    success.innerHTML="Đăng nhập thành công"
    success.className = "text-success"
    login_auth.appendChild(success)
    error.innerHTML = ""
 
  })
  .catch((err)=>{

    error.innerHTML = err.message
  })

})

const respond = localStorage.getItem("email")
const search = document.querySelector("#search_icon")
const sign_out = document.createElement("button")
if(respond !== null){
  signin_name.removeChild(node1)
  signin_name.removeChild(node2)
  const user_name  = document.createElement("a")
  
  user_name.className = "nav-link active fw-bold"
  user_name.innerHTML = `${respond}`;
  sign_out.textContent = "Đăng xuất "
  sign_out.className = "btn btn-primary m-1"

  signin_name.appendChild(user_name)
  signin_name.appendChild(sign_out)

  sign_out.addEventListener("click",()=>{
    signin_name.removeChild(user_name)
    signin_name.removeChild(sign_out)
    signin_name.appendChild(node1)
  signin_name.appendChild(node2)
    localStorage.removeItem("email")
  })

}
// end signin



// signing up auth
const signup = document.querySelector("#signup")

signup.addEventListener("submit",(e)=>{
  e.preventDefault()
  const email = signup.email.value;
  const password = signup.password.value;
  const firstname = signup.fristname.value;
  const lastname = signup.lastname.value;

  createUserWithEmailAndPassword(auth,email,password)
    .then((cred) =>{


    signup.reset()

    const success  = document.createElement("h1")
    success.innerHTML="Đăng ký thành công"
    success.className = "text-success"  
    signup.appendChild(success)
    error.innerHTML = ""

  }).catch((err)=>{
    error.innerHTML = err.message
  })

  
})


// get item from firestore and adding id to links


const pic_holder = document.querySelector(".PE-picture-slide #figure")

if(!docsSnap.empty){
 docsSnap.forEach(doc=>{
    const silde = document.createElement("div")
    silde.className = "slide"
    if(doc.id !=null){
      silde.id = doc.id
    }
    pic_holder.appendChild(silde)
  })

}


const pic_child = pic_holder.children


for(var i=0;i<pic_child.length;i++){
  const id = pic_child[i].id  
  const imgs = document.createElement("img")
  const a= document.createElement("a")
  a.href = `./description/index.html`
  const url = new URL(a.href)

  if(a != null){
    url.searchParams.set("id",id)
  }
  else{
    url.searchParams.delete("id")
  }
  a.href = url

  const DocRef = doc(db,"Clothes",id)
  const docSnap = await getDoc(DocRef)

  imgs.src = docSnap.data().img;
  a.appendChild(imgs)
  pic_child[i].appendChild(a)

}

// end section


// tranfer value to description
const Tranfer = async (ref,titles) =>{
  const url = new URL(window.location.href);

  if(url.searchParams.get("id") != null) {
    const id = url.searchParams.get("id")
  
    const DocRef = doc(db,ref,id)
    const docSnap = await getDoc(DocRef)
    
    if(docSnap.data() != null) {
     const clo_id = document.getElementById("id")
     clo_id.innerHTML = `/${titles}/${docSnap.data().title}`
    }
  
    const pic_list = document.getElementById("pic_list")
    const pic_array = docSnap.data().detail_img;
    const main_pic = document.getElementById("main_pic")
  
  
    for(var i=0;i<pic_array.length;i++){
      const img = document.createElement("img")
      
      img.src = pic_array[i];
  
      img.className = "w-25 m-1"
  
  
      pic_list.appendChild(img)
    }
  
    const main_img = document.createElement("img")
    main_img.src = `.${docSnap.data().img}`;
    main_img.className = "w-75"
    main_pic.appendChild(main_img)
  
  
  
    // title and id
    const title = document.querySelector("#main_detail #title")
    const pro_id = document.querySelector("#main_detail #id")
    title.innerHTML = docSnap.data().title
    pro_id.innerHTML = id;
    
  
  
    // size
    const size = document.querySelector("#main_detail #size")
    const size_array = docSnap.data().size;
    for(var i=0;i<size_array.length;i++){
      const button = document.createElement("button")
      button.className = "btn btn-light m-1"
      button.innerHTML = size_array[i];
      let count = 0;
      
      button.addEventListener("click",()=>{
        button.className = "btn btn-dark m-1"
        button.addEventListener("click",()=>{
          
          button.className = "btn btn-light m-1"
        })
      })
  
      size.appendChild(button)
    }
      //end size
  
      //stock
  
      const add = document.querySelector("#quantity #include")
      const remove = document.querySelector("#quantity #remove")
      const stock = document.querySelector("#quantity #stock")
  
      if(parseInt(stock.innerHTML) <= docSnap.data().stock){
  
        add.addEventListener("click",()=>{
          stock.innerHTML = parseInt(stock.innerHTML) + 1;
        })
        remove.addEventListener("click",()=>{
          stock.innerHTML = parseInt(stock.innerHTML) -1;
        })
      }
      else{
        alert("Sản phẩm đã đạt số lượng tối đa")
      }
      
  
      // info
      const des = document.getElementById("description")
      const des_array = docSnap.data().description.split(";")
  
      for(var i =0;i<des_array.length;i++){
        const li = document.createElement("li")
        li.innerHTML = des_array[i]
  
        des.appendChild(li)
  
      }

      //price 
      const price = document.getElementById("price")
      price.innerHTML = docSnap.data().price
  }
  
}

Tranfer("Clothes","Bộ thể dục nữ")

// end PE_CLOTHES




// Combo 


const combo_q = query(ComboRef,where("deleted","==",false))
const docsCombo =  await getDocs(ComboRef);

const combo_link  = document.querySelectorAll(".women-skirt .combo")

docsCombo.forEach(doc=>{
combo_link.forEach(combo =>{
    combo.href="./description/index.html"
  
    const url = new URL(combo.href)

    if(doc.id != null){
      url.searchParams.set("id",doc.id)
    }
    else{
      url.searchParams.delete("id")
    }

    combo.href = url 


  })
  
})


Tranfer("Combo","Combo")

// End Combo


// Signature

const SignDocs = await getDocs(SignatureRef)

const holder = document.createElement("div")
const Sign_holder = document.querySelectorAll(".signature-picture-slide .silde")

if(!SignDocs.empty){

    SignDocs.forEach(doc=>{
      const silde = document.createElement("div")
      silde.className = "slide"
      if(doc.id !=null){  
        silde.id = doc.id
      
      }
      holder.appendChild(silde)
    })

}

const holder_child = holder.children
var i =0;

Sign_holder.forEach(holder=>{
  holder.id = holder_child[i].id;
  i++;
})

const a_pic = document.querySelectorAll(".signature-picture-slide .silde .pic")
var j=0;
a_pic.forEach(pic => {
  var id = Sign_holder[j].id; 
  pic.href = "./description/index.html"

  const url = new URL(pic.href )

  if(pic != null){
    url.searchParams.set("id",id)
  }
  else{
    url.searchParams.delete("id")
  }
  pic.href  = url

  j++
})

Tranfer("Signature","Signature Clothes")

// END SIGNATURE


// SHOPPING CART
const current_stock = document.getElementById("stock")
var match_title;

const add_cart_func =  async (ref,stock)=>{
  const add_cart = document.getElementById("add_cart")

  add_cart.addEventListener("click", async()=>{
    const url = new URL(window.location.href)
    
    const id = url.searchParams.get("id")
  
    try{
      const DocRef = doc(db,ref,id);
      const docSnap = await getDoc(DocRef)

      addDoc(CartRef , {
            title: docSnap.data().title,
            price: docSnap.data().price,
            quantity: Number(current_stock.innerHTML),
            img:  docSnap.data().img,
            total: parseInt(docSnap.data().price.replace(/[₫,.]/g, '') ) * Number(current_stock.innerHTML)
          }).then(() => {
            match_title = docSnap.data().title
            alert("Thêm vào giỏ hàng thành công")
            window.location.reload()
          })
    }
    catch(err){
      alert(err.message)
    }

  })

}
add_cart_func("Signature",current_stock)
add_cart_func("Clothes",current_stock)
add_cart_func("Combo",current_stock)


const cart_holder = document.getElementById("product_holder")
const total_shown = document.getElementById("total_show")
var sum =0;


function formatCurrency(value) {
  return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}


if(cart_holder){  
  const Cart_Docs = await getDocs(CartRef)
  
  if(!Cart_Docs.empty) {
    Cart_Docs.forEach(doc=>{

      if(doc.data().title === localStorage.getItem("title")){
        doc.data().quantity += 1;
      }
      else{
        const row = document.createElement("div");
        row.classList.add("row-xl-12", "d-flex", "justify-content-center", "mt-4", "mb-4");
    
        row.innerHTML = `
          <div class="col-1 d-flex justify-content-center" >
          
        <img src="../.${doc.data().img}" alt="" id="cart_img" style="width: 100px;">
      
        </div>
        <div class="col-5 d-flex justify-content-center flex-md-column">
        <div class="info" style="margin-left: 70px;">
          <p  id="cart_title" style="width:400px;">${doc.data().title}>
        </div>
        </div>
        <div class="col-2 mt-5">
        <strong  id="cart_price" >${doc.data().price}</strong>
        </div>
        <div class="col-2 mt-4  p-2"   >
          <p id="cart_stock" aria-valuemin="0" class="p-2 fs-5" aria-valuemax="10">${doc.data().quantity}</p>
        </div>
        <div class="col-2 mt-5" >
        <strong id="cart_total">${doc.data().total}₫</strong>
        </div>
        `
        sum+=doc.data().total
        cart_holder.appendChild(row)
  
      }


     
    })
  
    total_shown.innerHTML = formatCurrency(sum) 
  }
}
// end shopping cart


// payment 

const pay_holder = document.querySelector(".pay_holder")

if(pay_holder){
  const Cart_Docs = await getDocs(CartRef)
  const pay_total = document.querySelectorAll(".total_payment")
  var sum =0 ;
  if(!Cart_Docs.empty) {
    Cart_Docs.forEach(doc=>{
      const row = document.createElement("div")
      row.className = "m-3 d-flex justify-content-evenly"

      row.innerHTML = 
      ` 
      <img src=".${doc.data().img}"" style="width:  10%; border: 5px solid white; " class="img">
  
      <div class="detail d-flex">
          <div class="detail-1">

              <p style="width: 60%; ">${doc.data().title}

                  <p class="form-text text-muted ">S / 100%COTTON</p>
              </p>
          </div>

          <p>SL: ${doc.data().quantity}</p>
      </div> 
  `
      sum += doc.data().total

      pay_holder.appendChild(row)
    })
    pay_total.forEach(pay =>{
      pay.innerHTML = formatCurrency(sum) 

    })

  }
}
//end payment
