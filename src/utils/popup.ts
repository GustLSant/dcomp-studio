import type { PopupType } from '../types/popup'
import eventBus from "../eventBus";

let nextId = 0;

function getNewId(){
  nextId += 1;
  return nextId;
}

export function createPopup(_type: PopupType, _title: string, _subtitle: string = ''){
  eventBus.dispatchEvent(
    new CustomEvent("create-popup", { 
      detail: {
        id: getNewId(),
        type:  _type,
        title: _title,
        subtitle: _subtitle,
        isClosing: false,
      } 
    })
  );
}