import * as cowObj from "./copy-on-write/object.js"
import * as cowArr from "./copy-on-write/array.js"



const main = () => {
    /*
        
    */

    copyOnWrite();
}

const copyOnWrite = () => {
    /*
        값의 불변성을 확보하기 위해 복사->복사본 수정-> 복사본 리턴 하는 패턴(원칙)
        js는 기본적으로 cow되지 않으므로 따로 구현해줘야함. 
        아래는 Array와 object cow 패턴 적용.
    */
    cowArr.main();
    cowObj.main();

}









main();
