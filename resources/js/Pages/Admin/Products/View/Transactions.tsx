import { DataTable } from "@/Components/payments/data-table";
import { transactionsColumns } from "@/features/transactions/columns";
import { Order } from "@/features/transactions/types";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";

export default function Transactions() {
    const user = usePage().props.auth.user
    const { transactions } = usePage().props

    const uniqueTransactions = (transactions as Order[]).reduce<Order[]>((acc, order) => {
        if (!acc.find(o => o.product?.id === order.product?.id)) {
            acc.push(order);
        }
        return acc;
    }, []);

    return (
        <div className="p-10">
            <Authenticated>
                <div className="w-full mx-auto py-10">

                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-5 flex justify-between">
                        Transactions

                        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                            Hello, {user.name} !!
                        </h3>
                    </h2>
                    <DataTable
                        columns={transactionsColumns}
                        data={uniqueTransactions}
                        filterColumn="name"
                        filterPlaceholder="Filter Transactions"
                        />
                </div>
            </Authenticated>
        </div>
    )
}
