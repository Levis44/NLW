
//pega o botao
const buttonSearch = document.querySelector("#page-home main a");
//pega o id
const modal = document.querySelector("#modal")
// tag a, fechar
const close = document.querySelector("#modal .header a ")

//tira a classe hide 
buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
});

//add a classe hide 
close.addEventListener("click", () => {
    modal.classList.add("hide")
});



