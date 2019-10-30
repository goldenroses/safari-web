/*!

=========================================================
* Material Dashboard React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import DashboardBackupPage from "views/Dashboard_Backup/Dashboard_backup";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.jsx";
// core components/views for RTL layout
import {FaceRounded} from "@material-ui/icons";
import Categories from "./views/Categories/Categories";
import Agents from "./views/Agents/Agents";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  // {
  //   path: "/edit_place",
  //   name: "Edit Place",
  //   icon: Edit,
  //   component: EditPlace,
  //   layout: "/admin"
  // },
  {
    path: "/agents",
    name: "Agents",
    icon: FaceRounded,
    component: Agents,
    layout: "/admin"
  },
  {
    path: "/categories",
    name: "Categories",
    icon: Category,
    component: Categories,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Table List",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin"
  },
  {
    path: "/upgrade-to-pro",
    name: "Upgrade To PRO",
    icon: Unarchive,
    component: UpgradeToPro,
    layout: "/admin"
  },
  // {
  //   path: "/users",
  //   name: "All Users",
  //   rtlName: " الجدول",
  //   icon: "content_paste",
  //   component: Users,
  //   layout: "/admin"
  // },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/dashboard_backup",
    name: "Dashboard_backup",
    icon: Unarchive,
    component: DashboardBackupPage,
    layout: "/admin"
  }
];

export default dashboardRoutes;
