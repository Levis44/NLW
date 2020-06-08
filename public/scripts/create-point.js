
// popula os estados
function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]");
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res =>  res.json() )
    .then( states => {

        for(const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        };
    } );
};

populateUFs();

//popula as cidades a partir dos estados
function getCities(event) {
    
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");
    
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true
    
    fetch(url)
    .then(res =>  res.json() )
    .then( cities => {

        for(const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        };

        citySelect.disabled = false
    } );
    
};



 document
     .querySelector("select[name=uf]")
     .addEventListener("change", getCities);


//itens de coleta
// pegar todos os lis

const itemsToCollect = document.querySelectorAll(".items-grid li")

//itens clicados
for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name = items]")

//array
let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    // add e remove uma classe
    //itemLi.classList.add("selected")
    //itemLi.classList.remove("selected")
    // add ou remove (tem ou n)
    itemLi.classList.toggle("selected")
    
    //id do item
    const itemId = itemLi.dataset.id

    

    //verificar se existem items selecionados
    // se sim, pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId 
        return itemFound

        // retorna -1, 0, 1, 2, 3, 4 ou 5
        // -1 nao esta selecionado
    })

    

    //se ja estiver selecionado, tirar da selecao

    if(alreadySelected >= 0){
        //tirar da selecao
        const filteredItems = selectedItems.filter(item =>{
            const itemIsDifferent = item != itemId // se for igual retorna false
            return itemIsDifferent
        })

        selectedItems = filteredItems

    // se n tiver selecionado, adicionar a selecao
    } else {

        selectedItems.push(itemId)
    }


    // atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems


}