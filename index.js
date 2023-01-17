import * as cowObj from "./copy-on-write/object.js"
import * as cowArr from "./copy-on-write/array.js"

const main = () => {
    copyOnWrite();

}

const copyOnWrite = () => {
    cowArr.main();
    cowObj.main();
}

main();
