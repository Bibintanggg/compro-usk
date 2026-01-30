export type Order = {
    id: string
    price: number
    order_code: string
    status: string
}

export type Payment = {
    id: string
    method: string
    amount: number
    status: string
}
