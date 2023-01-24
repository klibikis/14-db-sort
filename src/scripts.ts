import axios from "axios";
import {Country} from "./assets/scripts/types"
import {createSingleLine, removeSortClasses, setDescending, setAscending} from "./assets/scripts/functions"

const table = document.querySelector<HTMLTableElement>(".js-table");
const sortCountry = document.querySelector<HTMLTableCellElement>(".js-sort-country");
const sortCapital = document.querySelector<HTMLTableCellElement>(".js-sort-capital");
const sortCurrency = document.querySelector<HTMLTableCellElement>(".js-sort-currency");
const sortLanguage = document.querySelector<HTMLTableCellElement>(".js-sort-language");
const inputName = document.querySelector<HTMLInputElement>(".js-input-country");
const inputCapital = document.querySelector<HTMLInputElement>(".js-input-capital");
const inputCurrency = document.querySelector<HTMLInputElement>(".js-input-currency");
const inputLanguage = document.querySelector<HTMLInputElement>(".js-input-language");
const searchButton = document.querySelector<HTMLButtonElement>(".js-search-button");
const buttonPreviousPage = document.querySelector<HTMLButtonElement>(".js-button-previous");
const buttonNextPage = document.querySelector<HTMLButtonElement>(".js-button-next");
const currentPage = document.querySelector<HTMLDivElement>(".js-current-page");

let sortingOrder = "asc";
let sortingValue = "name";
let page = 1;
let searchParam = "";


const showData = (page: number) =>{
    axios.get(`http://localhost:3004/countries?&_page=${page}&_limit=20&_sort=${sortingValue}&_order=${sortingOrder}${searchParam}`).then(res => {
        const countries: Country[] = res.data;
        countries.forEach(country => {
            createSingleLine(country, table)
        })
    })
    currentPage.innerHTML = String(page);
}
// http://localhost:3004/countries?_page=1&_limit=10&_sort=${sortingValue}&_order=${sortingOrder}${searchParam}


// SORT EVENT LISTENERS
const addSortEventListener = (sortItem: HTMLTableCellElement, sortRemoveElement1: HTMLTableCellElement, 
    sortRemoveElement2: HTMLTableCellElement, sortRemoveElement3: HTMLTableCellElement) => {

        sortItem.addEventListener("click", () => {
            
            removeSortClasses(sortRemoveElement1);
            removeSortClasses(sortRemoveElement2);
            removeSortClasses(sortRemoveElement3);

            if(sortItem === sortCountry){
                sortingValue = "name"
            }
            if(sortItem === sortCapital){
                sortingValue = "capital"
            }
            if(sortItem === sortCurrency){
                sortingValue = "currency.name"
            }
            if(sortItem === sortLanguage){
                sortingValue = "language.name"
            }
                

            if(sortItem.classList.contains("sort-desc")){
                setAscending(sortItem);
                sortingOrder = "asc"
            }else{
                setDescending(sortItem);
                sortingOrder = "desc"
            }
            
            table.innerHTML = ""
            showData(page)

        })
}


// SEARCH EVENT LISTENERS
searchButton.addEventListener("click", () => {
    if(inputName.value !== ""){
        searchParam = `&name=${inputName.value}`;
    }
    else if(inputCapital.value !== ""){
        searchParam = `&capital=${inputCapital.value}`;
    }
    else if(inputCurrency.value !== ""){
        searchParam = `&currency.name=${inputCurrency.value}`;
    }
    else if(inputLanguage.value !== ""){
        searchParam = `&language.name=${inputLanguage.value}`;
    }else{
        searchParam = ""
    }
    table.innerHTML = ""
    page=1;
    showData(page)

})

buttonPreviousPage.addEventListener("click", () => {
    page -= 1;
    table.innerHTML = ""
    showData(page);
    if(page === 1){
        buttonPreviousPage.disabled = true;
    }  
})
buttonNextPage.addEventListener("click", () => {
    page += 1;
    table.innerHTML = ""
    showData(page);
    buttonPreviousPage.disabled = false;
})

addSortEventListener(sortCountry, sortCapital, sortCurrency, sortLanguage);
addSortEventListener(sortCapital, sortCountry, sortCurrency, sortLanguage);
addSortEventListener(sortCurrency, sortCountry, sortCapital, sortLanguage);
addSortEventListener(sortLanguage, sortCountry, sortCapital, sortCurrency);

showData(page)
buttonPreviousPage.disabled = true;



// BACKUP FOR SORTING EVENT LISTENERS
// SORT COUNTRY

// sortCountry.addEventListener("click", () => {
            
//             removeSortClasses(sortCapital);
//             removeSortClasses(sortCurrency);
//             removeSortClasses(sortLanguage);
//             sortingValue = "name"
    
//             if(sortCountry.classList.contains("sort-desc")){
//                 setAscending(sortCountry);
//                 sortingOrder = "asc"
//             }else{
//                 setDescending(sortCountry);
//                 sortingOrder = "desc"
//             }

//             table.innerHTML = ""
//             showData()
//         })

// // SORT CAPITAL

// sortCapital.addEventListener("click", () => {
            
//             removeSortClasses(sortCountry);
//             removeSortClasses(sortCurrency);
//             removeSortClasses(sortLanguage);
//             sortingValue = "capital"
    
//             if(sortCapital.classList.contains("sort-desc")){
//                 setAscending(sortCapital);
//                 sortingOrder = "asc"
//             }else{
//                 setDescending(sortCapital);
//                 sortingOrder = "desc"
//             }
            
//             table.innerHTML = ""
//             showData()
//         })

// // SORT CURRENCY

// sortCurrency.addEventListener("click", () => {
            
//     removeSortClasses(sortCountry);
//     removeSortClasses(sortCapital);
//     removeSortClasses(sortLanguage);
//     sortingValue = "currency.name"

//     if(sortCurrency.classList.contains("sort-desc")){
//         setAscending(sortCurrency);
//         sortingOrder = "asc"
//     }else{
//         setDescending(sortCurrency);
//         sortingOrder = "desc"
//     }
    
//     table.innerHTML = ""
//     showData()
// })

// // SORT LANGUAGE

// sortLanguage.addEventListener("click", () => {
            
//     removeSortClasses(sortCountry);
//     removeSortClasses(sortCapital);
//     removeSortClasses(sortCurrency);
//     sortingValue = "language.name"

//     if(sortLanguage.classList.contains("sort-desc")){
//         setAscending(sortLanguage);
//         sortingOrder = "asc"
//     }else{
//         setDescending(sortLanguage);
//         sortingOrder = "desc"
//     }
    
//     table.innerHTML = ""
//     showData()
// })
