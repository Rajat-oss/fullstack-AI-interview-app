export const validateVapiConfig = () => {
  const token = process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN;
  const workflowId = process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID;

  if (!token || token === 'your_actual_vapi_web_token_here') {
    throw new Error('VAPI Web Token is not configured. Please set NEXT_PUBLIC_VAPI_WEB_TOKEN in your .env.local file');
  }

  if (!workflowId || workflowId === 'your_actual_workflow_id_here') {
    throw new Error('VAPI Workflow ID is not configured. Please set NEXT_PUBLIC_VAPI_WORKFLOW_ID in your .env.local file');
  }

  return { token, workflowId };
};