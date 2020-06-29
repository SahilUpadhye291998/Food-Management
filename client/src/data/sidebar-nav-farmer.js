export default function() {
  return [
    {
      title: 'Blog Dashboard',
      to: '/dashboard',
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: '',
    },
    {
      title: 'Add New Product',
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: '/transaction-add',
    },
    {
      title: 'View Transaction History',
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: '/transaction-history',
    },
    {
      title: 'View History',
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: '/history',
    },
    {
      title: 'Farmer Profile',
      htmlBefore: '<i class="material-icons">person</i>',
      to: '/profile',
    },
  ];
}
