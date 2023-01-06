

export function objectSet(object, key, value) {
    const copied = Object.assign({}, object);
    copied[key] = value;
    return copied;
}

export function objectDelete(object, key) {
    const copied = Object.assign({}, object);
    delete copied[key];
    return copied;
}

function setPrice(item, new_price) {
    return objectSet(item, "price", new_price)
}

function setQuantity(item, new_quantity) {
    return objectSet(item, "quantity", new_quantity)
}



export function main() {
    let object = {}
    object = objectSet(object, 'price', 48)
    console.log(object)
    object = setPrice(object, 23)
    console.log(object)

}

