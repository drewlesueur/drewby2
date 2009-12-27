function head(arr){ //car
    return arr[0];
}

function tail(arr) { //cdr
    return arr.slice(1)
}

function is_symbol(str) {
    return "( )'\"\u000a\r\n#;".indexOf(str) == -1;
}
