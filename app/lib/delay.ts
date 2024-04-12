export const delay = (milliSeconds: number): Promise<void> => new Promise(resolve => setTimeout(resolve, milliSeconds))
