export default function() {
  return [
    {
      title: "Dashboard",
      to: "/dashboard",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ""
    },
    {
      title: "Add New Product",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/transaction-add"
    },
    {
      title: "Add Amount",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/add-amount"
    },
    {
      title: "View Transaction History",
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: "/transaction-history"
    },
    {
      title: "View History",
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: "/history"
    },
    {
      title: "Customer Profile",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/profile"
    }
  ];
}
