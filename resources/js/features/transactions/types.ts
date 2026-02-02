import { Products } from "../products/types"

export type Order = {
    id: string
    price: number
    order_code: string
    status: string
    product?: Products
    payments?: Payment[]
    created_at: string
}

export type Payment = {
    id: string
    method: string
    amount: number
    status: string
    transaction_id?: string
    customer_name?: string
    customer_email?: string
}
