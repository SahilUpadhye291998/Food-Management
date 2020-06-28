export default function() {
    return [
        {
            title: "Blog Dashboard",
            to: "/blog-overview",
            htmlBefore: '<i class="material-icons">edit</i>',
            htmlAfter: ""
        },
        {
            title: "Add User",
            htmlBefore: '<i class="material-icons">note_add</i>',
            to: "/add-new-post"
        },
        {
            title: "Profile",
            htmlBefore: '<i class="material-icons">error</i>',
            to: "/errors"
        }
    ];
}
