export const MODAL_IDS = [
    'createEntityModal',
    'deleteEntityModal',
    'moveEntityModal',
    'renameEntityModal',
] as const;

export type ModalID = typeof MODAL_IDS[number];