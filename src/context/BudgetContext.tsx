import { useReducer, createContext, Dispatch, ReactNode } from "react"
import { BudgetActions, BudgetState, budgetReducer, initialState } from "../reducers/budget-reducer"
import { useMemo } from "react"

type BudgetContextprops = {
    state: BudgetState
    dispatch: Dispatch<BudgetActions>
    totalExpenses: number
    remainingBudget: number
}

type BudgetProvidersProps = {
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextprops>(null!)

export const BudgetProvider = ({children} : BudgetProvidersProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState)

    const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0), [state.expenses])
    const remainingBudget = state.budget - totalExpenses

    return (
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                totalExpenses,
                remainingBudget
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}