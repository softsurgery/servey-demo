export interface MenuItem {
    label: string;
    href: string;
}


export const menuItems: MenuItem[] = [
    {
        label: "Dashboard",
        href: "/",
    },
    {
        label: "Categories",
        href: "/categories",
    },
    {
        label: "Settings",
        href: "/settings",
    },
]