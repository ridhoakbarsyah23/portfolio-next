export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  tags: string[];
  role: string;
  problem: string;
  impact: string;
  desc: string;
  image: string;
  overview: string;
  responsibilities: string[];
  features: string[];
  outcomes: string[];
}

export const projects: ProjectItem[] = [
  {
    id: "ods-mandiri-kementerian-koperasi",
    title: "Online Data System (ODS) Mandiri Kementerian Koperasi RI",
    category: "Government",
    tags: ["Next.js", "API", "Government"],
    role: "Frontend Developer / Technical Support",
    problem: "Cooperatives and regional offices need a clearer way to record, update, and monitor institutional data.",
    impact: "Improved data entry flow, reporting visibility, and access to cooperative information for administrative users.",
    desc: "A digital cooperative data platform for independent reporting, profile updates, and institutional data management.",
    image: "/projects/ods.png",
    overview:
      "ODS Mandiri supports cooperative data management by giving cooperatives and supervising offices a more structured way to submit, update, and review institutional information. The interface focuses on reducing friction in administrative workflows while keeping data access clear for different user needs.",
    responsibilities: [
      "Supported frontend development for cooperative data workflows and user-facing administrative screens.",
      "Helped align interface behavior with reporting, profile update, and monitoring requirements.",
      "Worked with API-driven data flows to present cooperative information in a clearer format.",
    ],
    features: [
      "Cooperative profile and institutional data management",
      "Independent data submission and update flow",
      "Administrative monitoring and reporting-oriented interface",
    ],
    outcomes: [
      "Made routine data entry and review flows easier to follow.",
      "Improved visibility for cooperative data used by administrative users.",
      "Supported a more consistent digital workflow for cooperative reporting.",
    ],
  },
  {
    id: "simrs",
    title: "SIMRS",
    category: "Healthcare",
    tags: ["Laravel", "API", "Hospital"],
    role: "Programmer",
    problem: "Hospital teams need stable modules that support daily service, administration, and patient-related workflows.",
    impact: "Handled bug fixing, feature updates, and testing to keep hospital operations more reliable.",
    desc: "A hospital management information system built to support online operational workflows across healthcare services.",
    image: "/projects/simrs.jpg",
    overview:
      "SIMRS is a hospital management information system used to support operational workflows in healthcare environments. The work focused on maintaining reliability, improving existing modules, and helping the system respond to user needs from implementation and operational teams.",
    responsibilities: [
      "Fixed bugs in existing SIMRS modules and verified affected workflows after changes.",
      "Developed feature updates based on user and implementation team requirements.",
      "Supported testing and debugging to keep hospital service workflows stable.",
    ],
    features: [
      "Hospital administration workflow support",
      "Patient-related operational modules",
      "API-connected feature updates and maintenance",
    ],
    outcomes: [
      "Reduced friction caused by module issues and workflow bugs.",
      "Helped keep daily hospital operations more dependable.",
      "Improved response to user requirements through targeted feature updates.",
    ],
  },
  {
    id: "emr",
    title: "EMR",
    category: "Medical Records",
    tags: ["Laravel", "UI/UX", "Data"],
    role: "Programmer / UI Support",
    problem: "Medical staff need structured digital records that are easier to access, update, and review.",
    impact: "Supported patient record digitization with clearer interfaces and data management flows.",
    desc: "An electronic medical record system for managing patient history, clinical notes, and digital medical data.",
    image: "/projects/emr.jpg",
    overview:
      "The EMR project focuses on managing patient medical information in a digital format. The goal is to support medical record workflows with clearer data structures, easier review, and interfaces that help staff work with patient history more efficiently.",
    responsibilities: [
      "Supported development and maintenance of electronic medical record workflows.",
      "Helped improve interface clarity for patient data review and update flows.",
      "Worked with structured data requirements for medical record management.",
    ],
    features: [
      "Patient medical history management",
      "Clinical note and record update workflows",
      "Structured digital medical data interface",
    ],
    outcomes: [
      "Supported the shift from manual records toward clearer digital data management.",
      "Made patient information easier to review through structured interfaces.",
      "Helped improve consistency in medical record workflows.",
    ],
  },
  {
    id: "sisappra-satpol-pp-dki-jakarta",
    title: "SISAPPRA Satpol PP DKI Jakarta",
    category: "Government",
    tags: ["Dashboard", "Reporting", "Monitoring"],
    role: "Frontend Developer",
    problem: "Operational activities need to be easier to monitor, report, and review across field and administrative teams.",
    impact: "Built interface improvements for reporting, monitoring, and dashboard-based operational visibility.",
    desc: "A monitoring and reporting platform for Satpol PP DKI Jakarta operational activities and performance tracking.",
    image: "/projects/sisappra.png",
    overview:
      "SISAPPRA supports monitoring and reporting for Satpol PP DKI Jakarta operational activities. The project emphasizes dashboard clarity, activity reporting, and interface improvements that help users understand operational information faster.",
    responsibilities: [
      "Developed frontend interfaces for operational monitoring and reporting needs.",
      "Improved UI structure for dashboard and activity review workflows.",
      "Supported feature enhancement for the Satpol PP web platform.",
    ],
    features: [
      "Operational activity reporting",
      "Dashboard-based monitoring",
      "Administrative review and visibility tools",
    ],
    outcomes: [
      "Improved how operational activity information is presented to users.",
      "Made reporting and monitoring workflows easier to scan and review.",
      "Supported clearer visibility for government operational activities.",
    ],
  },
];

export function getProjectById(id: string) {
  return projects.find((project) => project.id === id);
}
