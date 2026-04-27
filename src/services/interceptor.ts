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
      title: "TBWES OCR",
      description:
        "Enable smart data extraction from complex engineering drawings and technical specifications.",
      imageUrl: "/assets/dashboard/tbwes-ocr.png",
      path: "#",
    },
    {
      title: "Dr. ConBot",
      description:
        "Your intelligent site companion for real-time query resolution through AI.",
      imageUrl: "/assets/dashboard/dr-conbot.png",
      path: "#",
    },
    {
      title: "Smart Troubleshooting App",
      description:
        "Minimize equipment downtime with our predictive diagnostic engine.",
      imageUrl: "/assets/dashboard/troubleshooting.png",
      path: "#",
    },
    {
      title: "Transmitter OCR",
      description:
        "Automate the reading of field transmitter displays and nameplates.",
      imageUrl: "/assets/dashboard/transmitter-ocr.png",
      path: "#",
    },
    {
      title: "Sales Enablement Tool",
      description:
        "Empower your sales team with real-time access to technical data and AI-driven insights.",
      imageUrl: "/assets/dashboard/sales-enablement.png",
      path: "/sales-enablement",
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
