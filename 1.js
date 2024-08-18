function login(){
    const Lista=[]
    const user= document.getElementById("username").value
    const password= document.getElementById("password").value

    if (user=="1109115317" && password=="JuanL1210"){
        window.location="Menu.html"
        Lista.push(user, password)
    }
    else{
        alert("Datos incorrectos")
    }
}

