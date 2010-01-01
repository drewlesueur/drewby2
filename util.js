function head(arr){ //car
    return arr[0];
}

function tail(arr) { //cdr
    return arr.slice(1)
}

function is_symbol(str) {
    return "( )'\"\u000a\r\n#;".indexOf(str) == -1;
}

//any form of carriage return
function is_return(str) {
    return "\n\r\u000a\u000d".indexOf(str) > -1;
}

function find_new_line(i, code) {
    //return code.
}

//['\n', '\r', '\u000a', '\u000d']
