import eventBus from "../eventBus";
import { EVENT_CREATE_ENTITY, EVENT_DELETE_ENTITY, EVENT_MOVE_ENTITY, EVENT_RENAME_ENTITY } from "../events/actionModal";
import { useModalStore } from "../stores/modals";
import type { EntityKind, FileType, FolderType } from "../types/entities";
import type { CreateEntityModalPayload } from "../types/modals";




export function openCreateEntityModal(_entityKind: EntityKind, _parentFolder: FolderType) {
    eventBus.dispatchEvent(
        new CustomEvent(EVENT_CREATE_ENTITY, { detail: { entityKind: _entityKind, parentFolder: _parentFolder } })
    );


    const modalStore = useModalStore();

    modalStore.openModal<CreateEntityModalPayload>("createEntityModal", {
        entityKind: 'file',
        parentFolderId: 0,
    });
}


export function openDeleteEntityModal(_entity: FileType | FolderType) {
    eventBus.dispatchEvent(
        new CustomEvent(EVENT_DELETE_ENTITY, { detail: { entity: _entity } })
    );
}


export function openRenameEntityModal(_entity: FileType | FolderType) {
    eventBus.dispatchEvent(
        new CustomEvent(EVENT_RENAME_ENTITY, { detail: { entity: _entity } })
    );
}


export function openMoveEntityModal(_entity: FileType | FolderType) {
    eventBus.dispatchEvent(
        new CustomEvent(EVENT_MOVE_ENTITY, { detail: { entity: _entity } })
    );
}