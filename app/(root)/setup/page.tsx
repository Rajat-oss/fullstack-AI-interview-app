import { getCurrentUser } from "@/lib/actions/auth.action";
import InterviewSetup from "@/components/InterviewSetup";

const SetupPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return <div>Please sign in to continue</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Setup Your Interview</h1>
      <InterviewSetup userId={user.id} userName={user.name} />
    </div>
  );
};

export default SetupPage;