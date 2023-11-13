import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { GroupsStore } from "mobx/groupsStore";
import { toJS } from "mobx";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ style, users }) {
  if (!GroupsStore.chosenGroup) return null;
  const expenses = GroupsStore.chosenGroup.expenses;
  console.log("expenses", toJS(expenses));
  const uidTotalExpenses = expenses.reduce((acc, expense) => {
    if (acc[expense.user_id]) {
      acc[expense.user_id] += parseInt(expense.amount);
    } else {
      acc[expense.user_id] = parseInt(expense.amount);
    }
    return acc;
  }, {});
  console.log("uidTotalExpenses", toJS(uidTotalExpenses));

  const usersTotalExpenses = users.map((user) => {
    const total = uidTotalExpenses[user.id];
    return { ...user, total };
  });
  console.log("usersTotalExpenses", toJS(usersTotalExpenses));

  const data = {
    labels: usersTotalExpenses.map((user) => user.name),
    datasets: [
      {
        label: "# of Votes",
        data: usersTotalExpenses.map((user) => user.total),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} style={style} />;
}
