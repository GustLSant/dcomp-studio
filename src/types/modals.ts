import type { ModalID } from "../enums/modals"
import type { Entity, EntityKind } from "./entities"

export type CreateEntityModalPayload = {
    entityKind: EntityKind,
    parentFolderId: number,
}

export type RenameEntityModalPayload = {
    entity: Entity,
}

export type MoveEntityModalPayload = {
    entity: Entity
}

export type DeleteEntityModalPayload = {
    entity: Entity,
}

export type ModalPayload = CreateEntityModalPayload | RenameEntityModalPayload | MoveEntityModalPayload | DeleteEntityModalPayload;

export type ModalEntry = {
    open: boolean,
    payload: ModalPayload | null,
}


export type ModalStore = Record<ModalID, ModalEntry>;

export const defaultModalStore: ModalStore = {
    'createEntityModal': {
        open: false,
        payload: null,
    },
    'deleteEntityModal': {
        open: false,
        payload: null,
    },
    'moveEntityModal': {
        open: false,
        payload: null,
    },
    'renameEntityModal': {
        open: false,
        payload: null,
    },
}