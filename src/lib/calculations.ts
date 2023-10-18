// This file contains functions that perform calculations on the data.

// This function takes an array of transactions and returns the sum of the amounts from the last week.
export function sumLastWeekCharges(transactions): number {
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  const lastWeekTransactions = transactions.filter(
    (transaction) =>
      transaction.date >= oneWeekAgo && transaction.type === "charge",
  )
  const lastWeekCharges = lastWeekTransactions.reduce(
    (total, transaction) => total + transaction.amount,
    0,
  )
  return lastWeekCharges
}
