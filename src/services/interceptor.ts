import axios from "axios";

// Create a real axios instance if needed, but for now we'll mock it
const api = axios.create({
  baseURL: "/api",
});

// Mock delay helper
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mocking the interceptor or the instance itself to return mock data
// In a real scenario, you'd use axios-mock-adapter or just conditional logic
// For this task, we'll override the methods to return mock data after 3s

const mockData: Record<string, any> = {
  "/auth/sign-in": {
    access_token: "mock_token_123",
    token_type: "Bearer",
  },
  "/auth/me": {
    id: "user_123",
    name: "John Doe",
    email: "john@example.com",
    role: "owner",
    organization_id: "org_123",
    is_verified: true,
  },
  "/members": [
    {
      id: "1",
      name: "Anwar Ahamad",
      email: "AISL.AAhamad@thermaxglobal.com",
      role: "member",
    },
    {
      id: "2",
      name: "Shivam Paswan",
      email: "AISL.SPaswan@thermaxglobal.com",
      role: "member",
    },
    {
      id: "3",
      name: "Abhishek",
      email: "abhishek.kurian@thoughtminds.io",
      role: "owner",
    },
    {
      id: "4",
      name: "Mohit Singh",
      email: "AISL.MSingh@thermaxglobal.com",
      role: "member",
    },
    {
      id: "5",
      name: "Nagendra Adidam",
      email: "AISL.NAdidam@thermaxglobal.com",
      role: "member",
    },
    {
      id: "6",
      name: "Misbahul Haque",
      email: "AISL.MHaque@thermaxglobal.com",
      role: "member",
    },
    {
      id: "7",
      name: "AISL Alok Mishra",
      email: "AISL.AMishra@thermaxglobal.com",
      role: "member",
    },
    {
      id: "8",
      name: "Rahul Arya",
      email: "AISL.RArya@thermaxglobal.com",
      role: "member",
    },
  ],
  "/dashboard/apps": [
    {
      title: "Sales Enablement Tool",
      description:
        "A Gen AI based chatbot designed to provide Instant Insights into any Product related queries to empower your sales team.",
      imageUrl: "/assets/dashboard/sales-enablement.png",
      path: "/sales-enablement",
    },
    {
      title: "TBWES OCR",
      description:
        "The TBWES OCR is enabled with smart data pull feature that can be used extensively for pulling data from engineering drawings.",
      imageUrl: "/assets/dashboard/tbwes-ocr.png",
      path: "#",
    },
    {
      title: "Edge Bot",
      description:
        "A Gen AI based Chatbot designed to provide Instant Insights into any Product related queries to improve efficiency.",
      imageUrl: "/assets/dashboard/edge-bot.png",
      path: "#",
    },
    {
      title: "Document Translator",
      description:
        "The Document Translator is a ai-based service that enables automated translation of various document types.",
      imageUrl: "/assets/dashboard/document-translator.png",
      path: "#",
    },
    {
      title: "Thermax-GPT",
      description:
        "The Thermax-GPT is a powerful AI model capable of generating original and creative text based on context.",
      imageUrl: "/assets/dashboard/thermax-gpt.png",
      path: "#",
    },
    {
      title: "Dr. ConBot",
      description:
        "An intelligent question-answering bot designed to provide support for FAQs, user manuals, training materials.",
      imageUrl: "/assets/dashboard/dr-conbot.png",
      path: "#",
    },
    {
      title: "Smart Troubleshooting App",
      description:
        "Troubleshooting Application for streamlines issue resolution and minimizing equipment downtime.",
      imageUrl: "/assets/dashboard/troubleshooting.png",
      path: "#",
    },
    {
      title: "CyberBuddy",
      description:
        "A chatbot designed to provide Information and Insights on security-related topics and policy guidelines.",
      imageUrl: "/assets/dashboard/cyberbuddy.png",
      path: "#",
    },
    {
      title: "Heating OCR",
      description:
        "Heating OCR is a smart OCR application that extracts data from Images and PDFs, enabling better analysis.",
      imageUrl: "/assets/dashboard/heating-ocr.png",
      path: "/heating-ocr",
    },
    {
      title: "Transmitter OCR",
      description:
        "The Transmitter OCR is a smart data pull feature that can be used extensively for pulling required data from displays.",
      imageUrl: "/assets/dashboard/transmitter-ocr.png",
      path: "/transmitter-ocr",
    },
  ],
  "/usage/activity": Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    questions: Math.floor(Math.random() * 30) + 5,
  })),
  "/usage/top-users": [
    {
      name: "Lakshmi Prasad",
      email: "Lakshmi.Prasad@thermaxglobal.com",
      value: 85,
      initial: "LP",
    },
    {
      name: "Kirti Panamootil",
      email: "Kirti.Panamootil@thermaxglobal.com",
      value: 65,
      initial: "KP",
    },
    {
      name: "Srikanta Panda",
      email: "Srikanta.Panda@thermaxglobal.com",
      value: 45,
      initial: "SP",
    },
    {
      name: "Sneha Bharane",
      email: "Sneha.Bharane@thermaxglobal.com",
      value: 30,
      initial: "SB",
    },
  ],
  "/usage/cost": Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    cost: Math.random() * 0.05,
  })),
  "/usage/token-usage": {
    used: 10.61,
    remaining: 89.39,
    totalSpent: 0.2192,
    limit: 200.0,
  },
  "/chat/history": [
    { id: "1", title: "Product comparison 2024", active: true },
    { id: "2", title: "Market analysis report", active: false },
    { id: "3", title: "Technical specs for Project X", active: false },
  ],
  "/chat/similar-questions": [
    "What are the key technical specifications for TBWES boilers?",
    "How does Dr. ConBot compare to other industrial AI assistants?",
    "Show me the latest market trends in the energy sector for 2024.",
    "What are the maintenance requirements for Project X equipment?",
  ],
  "/transmitter-ocr/activity-summary": [
    {
      id: "1",
      serialNo: 1,
      tagNumber: "12-PG-620sa",
      date: "4/27/2026",
      modelNumber: "BSPGV6",
      unit: "Kg/cm2(g)",
      lowerRange: "0",
      upperRange: "10",
      status: "FAILED",
      remarks: [
        "TAG NUMBER: No value to compare in the master data",
        "MODEL NUMBER: No value to compare in the master data",
        "CALIBRATION RANGE UNIT: No value to compare in the master data",
        "LOWER CALIBRATION RANGE: No value to compare in the master data",
        "UPPER CALIBRATION RANGE: No value to compare in the master data",
      ],
    },
    {
      id: "2",
      serialNo: 2,
      tagNumber: "12-PG-204",
      date: "4/27/2026",
      modelNumber: "BSPGV6",
      unit: "Kg/cm2(g)",
      lowerRange: "0sda",
      upperRange: "16",
      status: "FAILED",
      remarks: ["LOWER CALIBRATION RANGE: Invalid numerical value"],
    },
    {
      id: "3",
      serialNo: 3,
      tagNumber: "12-PG-205",
      date: "4/27/2026",
      modelNumber: "BSPGV6",
      unit: "Kg/cm2(g)",
      lowerRange: "0",
      upperRange: "6",
      status: "PASSED",
      remarks: ["All fields valid"],
    },
    {
      id: "4",
      serialNo: 4,
      tagNumber: "12-PG-201",
      date: "4/27/2026",
      modelNumber: "BSPGV6",
      unit: "Kg/cm2(g)",
      lowerRange: "0",
      upperRange: "160",
      status: "PASSED",
      remarks: ["All fields valid"],
    },
    {
      id: "5",
      serialNo: 5,
      tagNumber: "12-PG-202",
      date: "4/27/2026",
      modelNumber: "BSPGV6",
      unit: "Kg/cm2(g)",
      lowerRange: "0",
      upperRange: "160",
      status: "PASSED",
      remarks: ["All fields valid"],
    },
    {
      id: "6",
      serialNo: 6,
      tagNumber: "12-PG-203",
      date: "4/27/2026",
      modelNumber: "BSPGV6",
      unit: "Kg/cm2(g)",
      lowerRange: "0",
      upperRange: "160",
      status: "PASSED",
      remarks: ["All fields valid"],
    },
    {
      id: "7",
      serialNo: 7,
      tagNumber: "12-PG-207",
      date: "4/27/2026",
      modelNumber: "BSPGV6",
      unit: "Kg/cm2(g)",
      lowerRange: "0",
      upperRange: "160",
      status: "PASSED",
      remarks: ["All fields valid"],
    },
    {
      id: "8",
      serialNo: 8,
      tagNumber: "12-PG-206",
      date: "4/27/2026",
      modelNumber: "BSPGV6",
      unit: "Kg/cm2(g)",
      lowerRange: "0",
      upperRange: "160",
      status: "PASSED",
      remarks: ["All fields valid"],
    },
  ],
  "/transmitter-ocr/master-activities": [
    {
      id: "1",
      title: "Plate Activity 1 27-04-26",
      createdAt: "4/27/2026",
      status: "In Progress",
      userInitials: "TA",
      type: "plate",
    },
    {
      id: "2",
      title: "Gauges Test 1 27-04-26 Dummy",
      createdAt: "4/27/2026",
      status: "In Progress",
      userInitials: "TA",
    },
    {
      id: "3",
      title: "Emerson Test 1 27-04-26",
      createdAt: "4/27/2026",
      status: "In Progress",
      userInitials: "TA",
    },
  ],
  "/transmitter-ocr/child-activities": [
    {
      id: "1",
      title: "Child Activity Test 1",
      createdAt: "4/28/2026",
      status: "In Progress",
      userInitials: "TA",
    },
    {
      id: "2",
      title: "Child Activity Test 2",
      createdAt: "4/28/2026",
      status: "In Progress",
      userInitials: "TA",
    },
  ],
  "/transmitter-ocr/activity-item/1": {
    id: "1",
    name: "12-PG-620sa",
    fields: [
      {
        name: "modelNumber",
        label: "Model Number",
        value: "BSPGV6",
        confidence: 0.8,
        message: "No value to compare in the master data",
      },
      {
        name: "tagNumber",
        label: "Tag Number",
        value: "12-PG-620SA",
        confidence: 0.75,
        message: "Tag Number does not exist in master data",
      },
      {
        name: "serialNumber",
        label: "Serial Number",
        value: "SN-987654",
        confidence: 0.6,
        message: "Serial Number mismatch detected",
      },
    ],
  },
  "/transmitter-ocr/master-activity-records/1": Array.from(
    { length: 36 },
    (_, i) => ({
      id: `${i + 1}`,
      serialNo: i + 1,
      tagNumber: `12-PG-${201 + i}`,
      modelNumber: "BSPGV150",
      lowerRange: "0",
      upperRange: "160",
      unit: "Kg/cm2",
    }),
  ),
};

api.post = (async (url: string, data?: any, config?: any) => {
  console.log(`Mock POST request to: ${url}`, data);
  await delay(3000);

  // Handle dynamic member URLs
  if (url.startsWith("/members/")) {
    if (url.endsWith("/delete"))
      return { data: { message: "Member deleted" }, status: 200 } as any;
    return {
      data: { message: "Member updated", member: data },
      status: 200,
    } as any;
  }

  const response = mockData[url] || { message: "Mock success" };
  return {
    data: response,
    status: 200,
    statusText: "OK",
    headers: {},
    config: config || {},
  } as any;
}) as any;

api.get = (async (url: string, config?: any) => {
  console.log(`Mock GET request to: ${url}`, config?.params);
  await delay(3000);
  const baseUrl = url.split("?")[0];
  const response = mockData[baseUrl] || { message: "Mock success" };
  return {
    data: response,
    status: 200,
    statusText: "OK",
    headers: {},
    config: config || {},
  } as any;
}) as any;

export default api;
