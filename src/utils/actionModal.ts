import eventBus from "../eventBus";
import type { FileType } from "../types/entities";


export function deleteFile(_file: FileType) {
    eventBus.dispatchEvent(
        new CustomEvent("open-delete-file-modal", { detail: { file: _file } })
    );
}