import { useBudget } from "../hooks/useBudget"
import { useMemo } from "react"
import ExpenseDetail from "./ExpenseDetail"

export default function ExpenseList() {
    const { state } = useBudget()
    const { expenses, currentCategory } = state

    const filteredExpenses = currentCategory 
        ? expenses.filter(expense => expense.category === currentCategory) 
        : expenses

    const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses])

    return (
        <div className="bg-white shadow-lg rounded-lg p-5 mt-10">
            {isEmpty 
                ? <p className="text-gray-600 text-2xl font-bold">No Hay Gastos</p> 
                : (
                    <>
                        <p className="text-gray-600 text-2xl font-bold my-5">Listado de Gastos</p>
                        {filteredExpenses.map(expense => (
                            <ExpenseDetail 
                                key={expense.id}
                                expense={expense}
                            />
                        ))}
                    </>
                )}
        </div>
    )
}