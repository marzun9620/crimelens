import {
  Bell,
  BookOpen,
  Bot,
  Database,
  GalleryVerticalEnd,
  Siren,
  SquareActivity,
  SquareTerminal,
  WashingMachine,
} from "lucide-react";
import avatarLogo from "../../assets/avatar.jpg";

export const data = {
  user: {
    name: "Humayra Akter",
    email: "humayraakter25@gmail.com",
    avatar: avatarLogo,
    className: "text-white",
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
          url: "/profile/general/crime-feed",
        },
      ],
    },
    {
      title: "My Profile",
      icon: Bot,
      items: [
        {
          title: "Information",
          url: "/profile/my-profile/info",
        },
        {
          title: "My Reports",
          url: "/profile/my-profile/my-reports",
        },
      ],
    },

    {
      title: "Alert & Update",
      icon: Bell,
      items: [
        {
          title: "Notification",
          url: "/profile/alert-update/notification",
        },
        {
          title: "Emergency",
          url: "/profile/alert-update/emergency",
        },
      ],
    },
    {
      title: "Survey",
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
