import {
  BookOpen,
  Bot,
  Database,
  GalleryVerticalEnd,
  SquareActivity,
  SquareTerminal,
  WashingMachine,
} from "lucide-react";
import avatarLogo from "../../assets/avatar.jpg";

export const data = {
  user: {
    name: "Abrar Mahir Esam",
    email: "abrarme118@gmail.com",
    avatar: avatarLogo,
  },
  teams: [
    {
      name: "Main Branch",
      logo: GalleryVerticalEnd,
      plan: "Head Office",
    },
  ],
  navMain: [
    {
      title: "General",
      url: "#",
      icon: SquareTerminal,
      items: [
        {
          title: "Dashboard",
          url: "/profile/general/dashboard",
        },
        {
          title: "Report a Crime",
          url: "/profile/general/report",
        },
        {
          title: "Crime Feed",
          url: "/profile/general/feed",
        },
      ],
    },
    {
      title: "My Profile",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Information",
          url: "/profile/my-profile/info",
        },
        {
          title: "My Report",
          url: "/profile/my-profile/my-reports",
        },
        {
          title: "Edit Profile",
          url: "/profile/my-profile/edit-profile",
        },
      ],
    },
    {
      title: "Survey",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Heatmap",
          url: "/profile/survey/heatmap",
        },
        {
          title: "Leaderboard",
          url: "/profile/survey/leaderboard",
        },
      ],
    },
    // {
    //   title: "Site Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "/profile/site-settings/general",
    //     },
    //     {
    //       title: "Employees",
    //       url: "/profile/site-settings/employees",
    //     },
    //     {
    //       title: "Branch",
    //       url: "/profile/site-settings/branch",
    //     },
    //   ],
    // },
  ],
  projects: [
    {
      name: "Crime Rate Across the Country of Bangladesh",
      url: "#",
      icon: Database,
    },
    {
      name: "How to make an efficient survey heatmap for local crimes",
      url: "#",
      icon: WashingMachine,
    },
    {
      name: "Predictive Analysis of Crime Rates",
      url: "#",
      icon: SquareActivity,
    },
  ],
};
