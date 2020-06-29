export default function() {
  return [
    {
      title: 'Dashboard',
      to: '/dashboard',
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: '',
    },
    {
      title: 'Authorize user',
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: '/admin/authUser',
    },
    {
      title: 'Profile',
      htmlBefore: '<i class="material-icons">error</i>',
      to: '/profile',
    },
  ];
}
