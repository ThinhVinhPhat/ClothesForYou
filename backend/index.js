import {initializeApp} from 'firebase/app';

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  onSnapshot,
  orderBy,

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

// queries
const q = query(collRef,where("deleted","==",false))


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

//   addDoc(collRef , {
//     title: add.title.value,
//     description: add.description.value,
//     discount: parseInt(add.discount.value),
//     position: parseInt(add.position.value),
//     price: parseInt(add.price.value),
//     size: getsize(),
//     status: getstatus(),
//     stock: parseInt(add.stock.value),
//     deleted: getdeleted()
//   }).then(() => {
//     add.reset()
//   })
// })


// end adding 




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

if(respond !== null){
  signin_name.removeChild(node1)
  signin_name.removeChild(node2)
  const user_name  = document.createElement("a")
  user_name.className = "nav-link active fw-bold"
  user_name.innerHTML = `${respond}`;
  signin_name.appendChild(user_name)

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





