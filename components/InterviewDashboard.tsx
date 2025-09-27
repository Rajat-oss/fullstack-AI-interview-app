"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";

interface InterviewDashboardProps {
  userId: string;
}

const InterviewDashboard = ({ userId }: InterviewDashboardProps) => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInterviews();
  }, [userId]);

  const fetchInterviews = async () => {
    try {
      // This would be replaced with actual API call
      // const response = await fetch(`/api/interviews?userId=${userId}`);
      // const data = await response.json();
      // setInterviews(data.interviews);
      
      // For now, using dummy data
      setInterviews([]);
    } catch (error) {
      console.error("Error fetching interviews:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading interviews...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Interviews</h2>
        <Button onClick={() => window.location.href = "/setup"}>
          New Interview
        </Button>
      </div>

      {interviews.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No interviews yet</p>
          <Button onClick={() => window.location.href = "/setup"}>
            Create Your First Interview
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interviews.map((interview) => (
            <InterviewCard
              key={interview.id}
              interviewId={interview.id}
              userId={userId}
              role={interview.role}
              type={interview.type}
              techstack={interview.techstack}
              createdAt={interview.createdAt}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default InterviewDashboard;