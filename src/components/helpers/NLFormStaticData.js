import { Skills } from "../Skills";

const paragraphs = [
  "I'm looking for an Expert {expertTypeObj}",
  "with {multiSelect} expertise ",
  "that is {availabilityObj} for at least {hoursObj}"
];

const extraParagraphs = [
  "That has experience in {industry}",
  "that utilizes {tool}",
  "that has {levelOfExp}",
  "that is located in {location}"
];

const selectObj = {
  expertTypeObj: [
    {
      label: "Expert type",
      value: "Expert type",
      selected: false,
      placeholder: true
    },
    {
      label: "Graphic Designer",
      value: "Graphic Designer",
      selected: false
    },
    {
      label: "Front-end Developer",
      value: "Front-end Developer",
      selected: false
    }
  ],
  hoursObj: [
    {
      label: "hours/week",
      value: "hours/week",
      selected: false,
      placeholder: true
    },
    {
      label: "10-40 hours total",
      value: "10-40 hours total",
      selected: false
    },
    {
      label: "10-20 hours/week",
      value: "10-20 hours/week",
      selected: false
    },
    {
      label: "20-30 hours/week",
      value: "20-30 hours/week",
      selected: false
    },
    {
      label: "30+ hours/week",
      value: "30+ hours/week",
      selected: false
    }
  ],
  availabilityObj: [
    {
      label: "availability",
      value: "availability",
      selected: false,
      placeholder: true
    },
    {
      label: "Available",
      value: "Available",
      selected: false
    },
    {
      label: "Approved Expert (Any Availability)",
      value: "Approved Expert (Any Availability) ",
      selected: false
    },
    {
      label: "Not Available",
      value: "Not Available ",
      selected: false
    }
  ],
  industry: [
    {
      label: "industry",
      value: "industry",
      selected: false,
      placeholder: true
    },
    {
      label: "Accomodations",
      value: "Accomodations",
      selected: false
    },
    {
      label: "Accounting",
      value: "Accounting",
      selected: false
    },
    {
      label: "Advertising",
      value: "Advertising",
      selected: false
    },
    {
      label: "Aerospace",
      value: "Aerospace",
      selected: false
    },
    {
      label: "Agriculture",
      value: "Agriculture",
      selected: false
    },
    {
      label: "Air Transportation",
      value: "Air Transportation",
      selected: false
    }
  ],
  tool: [
    {
      multiselect: 1,
      label: "tool",
      value: "",
      placeholder: true
    },
    {
      label: "Photoshop",
      value: "Photoshop",
      selected: false
    },
    {
      label: "Illustrator",
      value: "Illustrator",
      selected: false
    },
    {
      label: "InDesign",
      value: "InDesign",
      selected: false
    },
    {
      label: "Sketch",
      value: "Sketch",
      selected: false
    },
    {
      label: "InVision",
      value: "InVision",
      selected: false
    },
    {
      label: "Figma",
      value: "Figma",
      selected: false
    }
  ],
  levelOfExp: [
    {
      label: "level of experience with Torchlite",
      value: "level of experience with Torchlite",
      selected: false,
      placeholder: true
    },
    {
      label: "Worked on at least 1 project before with Torchlite",
      value: "Worked on at least 1 project before with Torchlite",
      selected: false
    },
    {
      label: "Worked on multiple Projects before with Torchlite",
      value: "Worked on multiple Projects before with Torchlite",
      selected: false
    },
    {
      label: "Not worked on a project before with Torchlite",
      value: "Not worked on a project before with Torchlite",
      selected: false
    }
  ],
  multiSelect: [
    {
      multiselect: 1,
      label: "skill",
      value: "",
      placeholder: true
    },
    ...Skills
  ],
  location: [
    {
      location: true
    }
  ]
};

export { paragraphs, extraParagraphs, selectObj };
