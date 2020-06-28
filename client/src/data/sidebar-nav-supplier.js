export default function() {
    return [
        {
            title: "Blog Dashboard",
            to: "/blog-overview",
            htmlBefore: '<i class="material-icons">edit</i>',
            htmlAfter: ""
        },
        {
            title: "Add New Post Farmer",
            htmlBefore: '<i class="material-icons">note_add</i>',
            to: "/add-new-post"
        },
        {
            title: "Add New Post Customer",
            htmlBefore: '<i class="material-icons">view_module</i>',
            to: "/components-overview"
        },
        {
            title: "View History",
            htmlBefore: '<i class="material-icons">table_chart</i>',
            to: "/tables"
        },
        {
            title: "User Profile",
            htmlBefore: '<i class="material-icons">person</i>',
            to: "/user-profile-lite"
        }
    ];
}
