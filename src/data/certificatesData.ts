export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  description: string;
  date: string;
  certificateNumber: string;
}

export const certificates: Certificate[] = [
  {
    id: 1,
    title: "ISO 9001:2015",
    issuer: "Intertek",
    description: "Quality Management Systems",
    date: "Valid Until: 21 December 2025",
    certificateNumber: "OJ908585",
  },
  {
    id: 2,
    title: "ISO 45001:2018",
    issuer: "Intertek",
    description: "Occupational Health and Safety Management System",
    date: "Valid Until: 21 December 2025",
    certificateNumber: "OJ908588",
  },
  {
    id: 3,
    title: "JKKP Certification",
    issuer: "Jabatan Keselamatan dan Kesihatan Pekerjaan Malaysia",
    description: "Pembuat Mesin Angkat (Launching Gantry) Certificate",
    date: "13/12/2024 to 13/12/2027",
    certificateNumber: "JKKP/2021/22/14",
  },
  {
    id: 4,
    title: "BCA License",
    issuer: "Building and Construction Authority, Singapore",
    description: "General Builder Class 2 and Specialist Builder (In-situ Post-tensioning Work)",
    date: "13 Jan 2023 to 13 Jan 2026",
    certificateNumber: "UEN: T22FC0059E",
  },
  {
    id: 5,
    title: "bizSAFE Level 4",
    issuer: "Workplace Safety and Health Council, Singapore",
    description: "Workplace safety certification",
    date: "Valid till 09/08/2026",
    certificateNumber: "E45100",
  },
  {
    id: 6,
    title: "TENSA Distribution Agreement",
    issuer: "Tensacciai S.r.l.",
    description: "Distribution agreement for Malaysia, Singapore and project-based countries",
    date: "Signed on 14/05/2021",
    certificateNumber: "TENSA Rev_0",
  },
];
