export type PopupType = 'success' | 'error' | 'warning';

export type PopupItemType = {
  id: number,
  type: PopupType,
  title: string,
  subtitle?: string,
  maxWidth?: string,
  isClosing: boolean,
}