import * as types from 'constants/action-types';

let counter = 0;

export function addSection(heading) {
    return {
        type: types.ADD_SECTION,
        id: counter++,
        heading
    }
}
