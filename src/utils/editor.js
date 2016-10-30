import {EditorState, convertToRaw, convertFromRaw, ContentState} from 'draft-js';

export function createRichFromText(text='') {
    return EditorState.createWithContent(ContentState.createFromText(text));
}

export function createRawFromText(text='') {
    return convertToRaw(ContentState.createFromText(text));
}

export function serialize(editorState) {
    return convertToRaw(editorState.getCurrentContent());
}

export function deserialize(raw0) {
    let raw = raw0;
    if (raw.toJS) raw = raw.toJS();
    return EditorState.createWithContent(convertFromRaw(raw));
}
