type TicketPayload = {
  title: string;
  description: string;
  priority: 'Lowest' | 'Low' | 'Medium' | 'High' | 'Highest';
  ticketType: 'Bug' | 'Story';
  slackThread?: string;
  reporter?: string;
};

export async function submitTicket(payload: TicketPayload): Promise<boolean> {
  const result = await window.electron.ipcRenderer.invoke<typeof payload, { success: boolean }>('submit-ticket', payload);
  return result.success;
}