import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Database,
  GalleryVerticalEnd,
  Settings2,
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
    {
      name: "Rajshahi Branch",
      logo: AudioWaveform,
      plan: "Sales",
    },
    {
      name: "Chottogram Branch",
      logo: Command,
      plan: "Marketing",
    },
  ],
  navMain: [
    {
      title: "General",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: "/profile/general/dashboard",
        },
        {
          title: "Sentiment Analysis",
          url: "/profile/general/sentiment-analysis",
        },
        {
          title: "Predictive Analysis",
          url: "/profile/general/predictive-analysis",
        },
        {
          title: "Data Visualization",
          url: "/profile/general/data-visualization",
        },
        {
          title: "Model Training",
          url: "/profile/general/model-training",
        },
        {
          title: "Data Settings",
          url: "/profile/general/data-settings",
        },
        {
          title: "Teams and Messages",
          url: "/profile/general/teams",
        }
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Recurrent Neural Network",
          url: "/profile/models/rnn",
        },
        {
          title: "Neural Network Regression",
          url: "/profile/models/nnr",
        },
        {
          title: "Random Forest",
          url: "/profile/models/random-forest",
        },
        {
          title: "Quantum Machine Learning",
          url: "/profile/models/qml",
        },
      ],
    },
    {
      title: "Survey",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Survey Builder",
          url: "/profile/survey/survey-builder",
        },
        {
          title: "Explore Templates",
          url: "/profile/survey/explore-templates",
        },
        {
          title: "Responses",
          url: "/profile/survey/responses",
        },
        {
          title: "Survey History",
          url: "/profile/survey/survey-history",
        },
        {
          title: "Survey Settings",
          url: "/profile/survey/settings",
        },
      ],
    },
    {
      title: "Site Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/profile/site-settings/general",
        },
        {
          title: "Employees",
          url: "/profile/site-settings/employees",
        },
        {
          title: "Branch",
          url: "/profile/site-settings/branch",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Data Visualization with Charts",
      url: "#",
      icon: Database,
    },
    {
      name: "Machine Learning Model Training",
      url: "#",
      icon: WashingMachine,
    },
    {
      name: "How to make an efficient survey",
      url: "#",
      icon: SquareActivity,
    },
  ],
};
