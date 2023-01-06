
export function arraySet(array, idx, value) {
    const copied = array.slice();
    copied[idx] = value;
    return copied;
}
export function push(array, el) {
    const copied = array.slice();
    copied.push(el);
    return copied;
}

function drop_fist(array) {
    const copied = array.slice();
    copied.shift();
    return copied;
}
function fist_el(array) {
    return array[0];
}
export function shift(array) {
    return {
        fist: fist_el(array),
        array: drop_fist(array)
    }
}

function drop_last(array) {
    const copied = array.slice();
    copied.pop();
    return copied;
}
function last_el(array) {
    return array[array.length - 1];
}
export function pop(array) {
    return {
        last: last_el(array),
        array: drop_last(array)
    }
}


export function main() {
    let array = [1, 2, 3]
    array = arraySet(array, 0, 10);
    console.log(array);
    array = push(array, 48);
    console.log(array);
    console.log(shift(array));
    console.log(pop(array));

}

