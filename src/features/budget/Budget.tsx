import { useAppSelector } from "../../app/hooks"
import { BudgetItemType, selectBudget } from "./budgetSlice"

import BudgetItem from "./BudgetItem"
import AddBudgetCategory from "./AddBudgetCategory"

export default function Budget() {
  const budget = useAppSelector(selectBudget)
  const status = useAppSelector(selectBudget).status === "success"

  return (
    <>
      {status ? (
        <div>
          <div className=" flex justify-between">
            <h2 className=" text-xl font-semibold py-2">Budget</h2>
            <AddBudgetCategory />
          </div>
          <div className=" grid border border-collapse">
            <div className="budgetHeader grid grid-cols-4 px-4 py-2">
              <div className="budgetHeaderItem">Category</div>
              <div className="budgetHeaderItem">% Spent</div>
              <div className="budgetHeaderItem">$ Left</div>
              <div className="budgetHeaderItem text-right justify-self-end">
                <svg
                  width="20px"
                  height="20px"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  color="#000000"
                >
                  <path
                    d="M6 12H12M18 12H12M12 12V6M12 12V18"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
            </div>
            <div>
              {budget.budget.map((budget: BudgetItemType) => (
                <BudgetItem key={budget.category} {...budget} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className=" flex justify-between">
            <h2 className=" text-xl font-semibold py-2">Budget</h2>
            <AddBudgetCategory />
          </div>
          <div className=" grid border border-collapse">
            <div className="budgetHeader grid grid-cols-4 px-4 py-2">
              <div className="budgetHeaderItem">Category</div>
              <div className="budgetHeaderItem">% Spent</div>
              <div className="budgetHeaderItem">$ Left</div>
              <div className="budgetHeaderItem text-right justify-self-end">
                <svg
                  width="20px"
                  height="20px"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  color="#000000"
                >
                  <path
                    d="M6 12H12M18 12H12M12 12V6M12 12V18"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
            </div>
            <div>
              <div className=" flex justify-between ">
                <p className="budgetRowItem"></p>

                <p className="budgetRowItem "></p>
                <p className="budgetRowItem"></p>

                <button className=" justify-self-end">
                  <svg
                    width="18px"
                    height="18px"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    color="#000000"
                  >
                    <path
                      d="M12 3L12 21M12 21L20.5 12.5M12 21L3.5 12.5"
                      stroke="#000000"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
