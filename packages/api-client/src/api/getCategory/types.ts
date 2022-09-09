import { ProductInterface } from '../getProduct/types';

export type FilterEqualTypeInput = {
    eq: string
    in: [string]
}

export type FilterMatchTypeInput = {
    match: string
}

export type CategoryProducts = {
    items: [ProductInterface]
    total_count: number
}

export type CategoryInterface = {
    created_at: string
    description: string
    id: number
    image: string
    include_in_menu: number
    level: number
    meta_description: string
    meta_keywords: string
    meta_title: string
    name: string
    path: string
    position: number
    product_count: number
    products: CategoryProducts
    updated_at: string
    url_key: string
    url_path: string
    url_suffix: string
}

export interface CategoryTree extends CategoryInterface {
    children: [CategoryTree]
}

export type categoryList = [CategoryTree]
