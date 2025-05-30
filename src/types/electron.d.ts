export {};

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        invoke<T = unknown, R = unknown>(channel: string, data: T): Promise<R>;
        send(channel: string, data: unknown): void;
      };
    };
  }
}
