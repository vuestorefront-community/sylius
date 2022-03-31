export enum SortEnum {
    ASC = 'ASC',
    DESC = 'DESC'
}

export type ProductSortInput = {
    createdAt: string
}

export type ProductAttributeSortInput = {
    name: SortEnum
    position: SortEnum
    price: SortEnum
    relevance: SortEnum
}

export type ProductInterface = {
    id: number
    sku: string
    name: string
    created_at: string
    updated_at: string
    url_key: string
}
