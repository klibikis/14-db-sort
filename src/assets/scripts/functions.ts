import {Country} from "./types";
import {buttonPreviousPage, buttonNextPage, buttonLastPage, buttonFirstPage} from "./constants"

export const disablePreviousButton = () => {buttonPreviousPage.disabled = true}
export const enablePreviousButton = () => {buttonPreviousPage.disabled = false} 
export const disableFirstButton = () => {buttonFirstPage.disabled = true} 
export const enableFirstButton = () => {buttonFirstPage.disabled = false}
export const disableNextButton = () => {buttonNextPage.disabled = true}
export const enableNextButton = () => {buttonNextPage.disabled = false} 
export const disableLastButton = () => {buttonLastPage.disabled = true}
export const enableLastButton = () => {buttonLastPage.disabled = false} 

export const createSingleLine = (input: Country, table: HTMLTableElement) => {
    table.innerHTML += `<tr><td>${input.name}</td>
        <td>${input.capital}</td>
        <td>${input.currency.name}</td>
        <td>${input.language.name}</td></tr>`
}

export const removeSortClasses = (sortElement: HTMLTableCellElement) => {
    if(sortElement.classList.contains("sort-asc")){
        sortElement.classList.remove("sort-asc")
    }
    if(sortElement.classList.contains("sort-desc")){
        sortElement.classList.remove("sort-desc")
    }
}

export const setAscending = (sortElement: HTMLTableCellElement) => {
    sortElement.classList.add("sort-asc")
    if(sortElement.classList.contains("sort-desc")){
        sortElement.classList.remove("sort-desc")
    }
}

export const setDescending = (sortElement: HTMLTableCellElement) => {
    sortElement.classList.add("sort-desc")
    if(sortElement.classList.contains("sort-asc")){
        sortElement.classList.remove("sort-asc")
    }
}

