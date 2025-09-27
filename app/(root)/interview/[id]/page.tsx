import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getInterviewById } from "@/lib/actions/general.action";

interface PageProps {
  params: Promise<{ id: string }>;
}

const InterviewPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const user = await getCurrentUser();
  const interview = await getInterviewById(id);

  if (!user || !interview) {
    return <div>Interview not found</div>;
  }

  return (
    <>
      <h3>Interview: {interview.role}</h3>
      <Agent
        userName={user.name}
        userId={user.id}
        interviewId={id}
        type="interview"
        questions={interview.questions}
      />
    </>
  );
};

export default InterviewPage;