import eventBus from "../eventBus";
import { EVENT_CREATE_ENTITY, EVENT_DELETE_ENTITY, EVENT_RENAME_ENTITY } from "../events/actionModal";
import type { EntityKind, FileType, FolderType } from "../types/entities";


export function openCreateEntityModal(_entityKind: EntityKind, _parentFolder: FolderType) {
    eventBus.dispatchEvent(
        new CustomEvent(EVENT_CREATE_ENTITY, { detail: { entityKind: _entityKind, parentFolder: _parentFolder } })
    );
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