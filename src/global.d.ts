/** ALL REDUX TYPES */

export enum Status {
  Idle = "Idle",
  Sucess = "Success",
  Loading = "Loading",
  Failed = "Failed",
}
interface BaseEntity {
  id: string | null
}

export class Account {
  //Public variables
  reoccuringCharges: reoccurringChargesType[] = []
  reoccuringChargeSum: number
  userId: number
  balance: number

  //Account constructor
  constructor() {
    //Initialize variables to 0 or empty
    this.balance = 0
    this.userId = 0
    this.reoccuringChargeSum = 0

    //Get account data from firebase and set variables to the data if found
    const account = this.getAccount().then(
      (doc) => (
        (this.reoccuringCharges = doc?.reoccuringCharges),
        (this.reoccuringChargeSum = doc?.reoccuringChargeSum),
        (this.userId = doc?.userId),
        (this.balance = doc?.balance)
      ),
    )
  }

  //Returns promise of account document from firebase
  async getAccount(): Promise<DocumentData | null> {
    const docRef = doc(db, "customers", auth.currentUser?.uid || "")
    const account = await getDoc(docRef)
    return account?.data() || null
  }
}

declare interface AccountType {
  reoccuringCharges: reoccurringChargesType[]
  reoccuringChargeSum: number
  userId: number
  balance: number
}

declare interface CustomerType {
  reoccuringCharges: reoccurringChargesType[]
  reoccuringChargesSum: number
  userId: number
  balance: number
  firstName: string
  lastName: string
}

declare interface TransactionType {
  transactionParty: string
  transactionAmount: number
  transactionNumber: number
  transactionDescription: string
  transactionDate: string
  transactionType: "Income" | "Expense"
  transactionCategory: string
  newBalance: number
  transactionStatus: "Pending" | "Completed" | "Canceled"
  userId: string
}

declare interface reoccurringChargesType {
  dayOfMonth: number
  amount: number
  name: string
}

/** ALL REDUX STATES */
declare interface TransactionState {
  transactions: TransactionType[]
  status: "idle" | "loading" | "failed"
}

declare interface financialOverviewState {
  bankAccount1Balance: number
  totalEarnings: number
  totalSpending: number
  reoccuringChargesSum: number
  monthlyGoal: number
  transactionCount: number
  transactions: TransactionType[]
}

declare interface reoccurringChargesState {
  allReoccurringCharges: reoccurringChargesType[]
  sumOfReoccurringCharges: number
}
