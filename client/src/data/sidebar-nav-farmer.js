
export default function() {
    return [
        {
            title: "Blog Dashboard",
            to: "/blog-overview",
            htmlBefore: '<i class="material-icons">edit</i>',
            htmlAfter: ""
        },
        {
            title: "Add New Post",
            htmlBefore: '<i class="material-icons">note_add</i>',
            to: "/add-new-post"
        },
        {
            title: "Tables",
            htmlBefore: '<i class="material-icons">table_chart</i>',
            to: "/tables"
        },
        {
            title: "User Profile",
            htmlBefore: '<i class="material-icons">person</i>',
            to: "/user-profile-lite"
        },
    ];
}
