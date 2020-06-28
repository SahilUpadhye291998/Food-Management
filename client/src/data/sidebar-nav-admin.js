export default function() {
  return [
    {
      title: 'Blog Dashboard',
      to: '/blog-overview',
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
