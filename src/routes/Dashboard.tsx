import AllTransactions from "../components/AllTransactions"
import Navbar from "../components/Navbar"
import FinancialOverview from "../components/financialOverview"
import AllReoccuringCharges from "../components/AllReoccuringCharges"
import RequireAuth from "../components/RequireAuth"

export default function Dashboard() {
  return (
    <RequireAuth>
      <div className=" p-4">
        <header>
          <Navbar />
        </header>
        <FinancialOverview />
        <AllReoccuringCharges />
        <AllTransactions />
      </div>
    </RequireAuth>
  )
}
