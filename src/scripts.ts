import axios from "axios";
import {Country} from "./assets/scripts/types"
import {createSingleLine, removeSortClasses, setDescending, setAscending, disablePreviousButton, enablePreviousButton, disableFirstButton, enableFirstButton, disableNextButton, enableNextButton, disableLastButton, enableLastButton} from "./assets/scripts/functions"
import {table, sortCountry, sortCapital, sortCurrency, sortLanguage, inputName, inputCapital, inputCurrency, inputLanguage, searchButton, buttonPreviousPage, buttonNextPage, buttonLastPage, buttonFirstPage, currentPage} from "./assets/scripts/constants"

let pointerPosition: number;
let sortingOrder = "asc";
let sortingValue = "name";
let page = 1;
let searchParam = "";
let lastPage: number;


const showData = (page: number, scrollDown?: boolean) =>{
    axios.get(`http://localhost:3004/countries?&_page=${page}&_limit=20&_sort=${sortingValue}&_order=${sortingOrder}${searchParam}`).then(res => {
        const countries: Country[] = res.data;
        const pageLinks = (res.headers.link).split(",")
        
        const last = pageLinks.find(element => {
            if (element.includes("last")) {
                return true;
            }
        });
        if(last !== undefined){
            const searchParams = new URLSearchParams((last.trim().split(" "))[0]);
            lastPage = +searchParams.getAll("_page").join("")
        }else{
            lastPage = 1;
            disablePreviousButton()
            disableFirstButton()
            disableNextButton()
            disableLastButton()
        }
        

        countries.forEach(country => {
            createSingleLine(country, table)
        })
        if(scrollDown){
            const scrollingElement = (document.scrollingElement || document.body);
            scrollingElement.scrollTop = scrollingElement.scrollHeight;
        }

        if(page !== lastPage){
            buttonNextPage.disabled = false;
            buttonLastPage.disabled = false;
        }
        
    })
    currentPage.innerHTML = String(page);
}


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

// PAGINATION buttons
buttonPreviousPage.addEventListener("click", () => {
    page -= 1;
    table.innerHTML = ""
    showData(page, true);
    enableNextButton()
    enableLastButton()
    if(page === 1){
        disablePreviousButton()
        disableFirstButton()
    }
})
buttonNextPage.addEventListener("click", () => {
    page += 1;
    table.innerHTML = ""
    showData(page, true);
    buttonPreviousPage.disabled = false;
    buttonFirstPage.disabled = false;
    if(page === lastPage){
        disableNextButton();
        disableLastButton();
    } 
    
})
buttonFirstPage.addEventListener("click", () => {
    page = 1;
    table.innerHTML = ""
    showData(page, true);
    disablePreviousButton();
    disableFirstButton();
    enableNextButton();
    enableLastButton();
})
buttonLastPage.addEventListener("click", () => {
    page = lastPage;
    table.innerHTML = ""
    showData(page, true);
    disableNextButton();
    disableLastButton();
    enablePreviousButton();
    enableFirstButton();
})

addSortEventListener(sortCountry, sortCapital, sortCurrency, sortLanguage);
addSortEventListener(sortCapital, sortCountry, sortCurrency, sortLanguage);
addSortEventListener(sortCurrency, sortCountry, sortCapital, sortLanguage);
addSortEventListener(sortLanguage, sortCountry, sortCapital, sortCurrency);

showData(page)
disablePreviousButton();
disableFirstButton();
