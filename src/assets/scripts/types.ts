export type {Currency, Language, Country};

type Currency = {
    code: string,
    name: string,
    symbol: string
}
type Language = {
    code: string,
    name: string
}
type Country = {
    name: string,
    capital: string,
    currency: Currency,
    language: Language,
    flag: string
}