import { COLORS } from "constants/ChartConstant";

export const regionData = [
  {
    color: "#3e82f7",
    name: "Nairobi - CBD",
    value: "37.61%",
  },
  {
    color: "#04d182",
    name: "Ngong Road",
    value: "16.79%",
  },
  {
    color: "#ffc542",
    name: "87",
    value: "12.42%",
  },
  {
    color: "#fa8c16",
    name: "Kawangware",
    value: "9.85%",
  },
  {
    color: "#ff6b72",
    name: "Kasarani",
    value: "7.68%",
  },
  {
    color: "#a461d8",
    name: "Naivasha Road",
    value: "5.11%",
  },
];

export const latestAlerts = [
  {
    timeout: "17:00",
    location: "Nairobi - CBD",
    duration: "60:00 min",
    eventLocation: "200 meters from your location",
    signal_strength: "0.749684",
  },
  {
    timeout: "17:00",
    location: "Kawangware",
    duration: "40:00 min",
    eventLocation: "20 meters from your location",
    signal_strength: "0.949684",
  },
  {
    timeout: "17:00",
    location: "Nairobi - CBD",
    duration: "60:00 min",
    eventLocation: "200 meters from your location",
    signal_strength: "0.749684",
  },
];

export const pagesViewData = [
  {
    title: "Home",
    url: "/app/home/",
    amount: 7616,
  },
  {
    title: "Resources",
    url: "/app/resources/",
    amount: 6923,
  },
  {
    title: "Integrations",
    url: "/integrations/paypal/",
    amount: 5228,
  },
  {
    title: "Partners",
    url: "/partners/our-partners/",
    amount: 3512,
  },
  {
    title: "Developers",
    url: "developers/docs/",
    amount: 1707,
  },
];

export const sessionColor = [COLORS[3], COLORS[0], COLORS[1]];
export const sessionData = [3561, 1443, 2462];
export const sessionLabels = ["Gold", "Silver", "Bronze"];
const jointSessionData = () => {
  let arr = [];
  for (let i = 0; i < sessionData.length; i++) {
    const data = sessionData[i];
    const label = sessionLabels[i];
    const color = sessionColor[i];
    arr = [
      ...arr,
      {
        data: data,
        label: label,
        color: color,
      },
    ];
  }
  return arr;
};
export const conbinedSessionData = jointSessionData();

export const socialMediaReferralData = [
  {
    title: "Facebook",
    data: [
      {
        data: [12, 14, 2, 47, 42, 15, 47],
      },
    ],
    percentage: 30.1,
    amount: 322,
  },
  {
    title: "Twitter",
    data: [
      {
        data: [9, 32, 12, 42, 25, 33],
      },
    ],
    percentage: 21.6,
    amount: 217,
  },
  {
    title: "Youtube",
    data: [
      {
        data: [10, 9, 29, 19, 22, 9, 12],
      },
    ],
    percentage: -7.1,
    amount: 188,
  },
  {
    title: "Linkedin",
    data: [
      {
        data: [25, 66, 41, 89, 63, 25, 44],
      },
    ],
    percentage: 11.9,
    amount: 207,
  },
  {
    title: "Dribbble",
    data: [
      {
        data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14],
      },
    ],
    percentage: -28.5,
    amount: 86,
  },
];

export const uniqueVisitorsDataDay = {
  series: [
    {
      name: "Signal Strength",
      data: [12, 4, 7, 15],
    },
    {
      name: "Light Intensity",
      data: [8, 6, 10, 11],
    },
  ],
  categories: ["12:00 AM", "6:00 AM", "12:00 PM", "6:00 PM"],
};

export const uniqueVisitorsDataWeek = {
  series: [
    {
      name: "Signal Strength",
      data: [0.749684, 0.810629, 0.862792, 0.876423],
    },
    // 		0
    // 1			0
    // 2			1
    // 3			0
    // 4	0.113893	0.811374	1
    // ...	...	...	...
    // 95	0.566111	0.600755	1
    // 96	0.210823	0.966710	1
    // 97	0.395327	0.892202	0
    // 98	0.293693	0.428173	1
    // 99	0.533502	0.884793
    {
      name: "Light Intensity",
      data: [0.2086, 0.567914, 0.740185, 0.946858],
    },
  ],
  categories: [
    "01 Jan",
    "02 Jan",
    "03 Jan",
    "04 Jan",
    "05 Jan",
    "06 Jan",
    "07 Jan",
  ],
};

export const uniqueVisitorsDataMonth = {
  series: [
    {
      name: "Signal Strength",
      data: [35, 41, 62, 42, 13, 18, 29, 25, 31, 15],
    },
    {
      name: "Light Intensity",
      data: [45, 52, 38, 24, 33, 26, 21, 15, 20, 16],
    },
  ],
  categories: [
    "03 Jan",
    "06 Jan",
    "09 Jan",
    "12 Jan",
    "15 Jan",
    "18 Jan",
    "21 Jan",
    "24 Jan",
    "27 Jan",
    "30 Jan",
  ],
};
