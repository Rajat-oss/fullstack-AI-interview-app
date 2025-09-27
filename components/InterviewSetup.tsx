"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InterviewSetupProps {
  userId: string;
  userName: string;
}

const InterviewSetup = ({ userId, userName }: InterviewSetupProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    role: "",
    level: "Junior",
    type: "Technical",
    techstack: "",
    amount: 5,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/vapi/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userid: userId,
        }),
      });

      if (response.ok) {
        router.push("/interview");
      } else {
        console.error("Failed to create interview");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
      <div>
        <Label htmlFor="role">Job Role</Label>
        <Input
          id="role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          placeholder="e.g., Frontend Developer"
          required
        />
      </div>

      <div>
        <Label htmlFor="level">Experience Level</Label>
        <select
          id="level"
          value={formData.level}
          onChange={(e) => setFormData({ ...formData, level: e.target.value })}
          className="w-full p-2 border rounded-md"
        >
          <option value="Junior">Junior</option>
          <option value="Mid">Mid-Level</option>
          <option value="Senior">Senior</option>
        </select>
      </div>

      <div>
        <Label htmlFor="type">Interview Type</Label>
        <select
          id="type"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="w-full p-2 border rounded-md"
        >
          <option value="Technical">Technical</option>
          <option value="Behavioral">Behavioral</option>
          <option value="Mixed">Mixed</option>
        </select>
      </div>

      <div>
        <Label htmlFor="techstack">Tech Stack (comma-separated)</Label>
        <Input
          id="techstack"
          value={formData.techstack}
          onChange={(e) => setFormData({ ...formData, techstack: e.target.value })}
          placeholder="e.g., React, Node.js, MongoDB"
          required
        />
      </div>

      <div>
        <Label htmlFor="amount">Number of Questions</Label>
        <Input
          id="amount"
          type="number"
          min="3"
          max="10"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: parseInt(e.target.value) })}
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Creating Interview..." : "Start Interview"}
      </Button>
    </form>
  );
};

export default InterviewSetup;