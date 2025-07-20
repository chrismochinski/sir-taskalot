type TicketPayload = {
  title: string;
  description: string; // Slack HTML
  descriptionJson: Record<string, unknown>; // Jira JSON
  priority: "Lowest" | "Low" | "Medium" | "High" | "Highest";
  ticketType: "Bug" | "Story";
  slackThread?: string;
  reporter?: string;
  previews?: string[]; // image previews array
  slackChannel?: "dragon" | "test" | "none"; 
};

export async function submitTicket(payload: TicketPayload): Promise<boolean> {
  const result = await window.electron.ipcRenderer.invoke<typeof payload, { success: boolean }>(
    "submit-ticket",
    payload
  );
  return result.success;
}
