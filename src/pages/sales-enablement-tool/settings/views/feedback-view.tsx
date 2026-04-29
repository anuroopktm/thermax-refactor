import { useState } from "react";
import { FeedbackHeader } from "../components/feedback/feedback-header";
import { FeedbackList } from "../components/feedback/feedback-list";

const FEEDBACK_DATA = [
  {
    id: 1,
    user: "AK",
    question: "hi all",
    answer:
      "I'm here to assist with topics related to information security policies, access control, compliance standards, audit procedures, risk management, and CISO-level governance. Could you please ask something related to these areas? I'd be glad to help you with that.",
    status: "Not Specified",
    source: "",
  },
  {
    id: 2,
    user: "AK",
    question: "hi",
    answer: "Hello! How can I help you today?",
    status: "Not Specified",
    source: "",
  },
];

export function FeedbackView() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFeedback = FEEDBACK_DATA.filter((item) =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <FeedbackHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        count={filteredFeedback.length}
      />

      <FeedbackList feedbackItems={filteredFeedback} />
    </div>
  );
}
