function parse(code) {
    var stack = []
    var exp = []
    var val = []
    var i = 0
    var state = "symbol"
    while (i <  code.length) {
        chr = code.charAt(i);
        if (state == "symbol") {
            if (is_symbol(chr)) {
                val.push(chr)            
            } else if (chr == "(") {
                if (val.length == 0) {
                    stack.push(exp)
                    exp = []
                } else {
                    var symbol = val.join('')
                    val = []
                    stack.push(exp)
                    exp = [symbol]             
                }
            } else if (chr == ")") {
                exp.push(val.join(""))
                val = []
                state = "potential exp close" //possible close out. possible next function call
            } else if (chr == ";") {
                i = find(['\n', '\r', '\u000a', '\u000d']) //comment go to the next carriage return
            } else if (chr == ' ') { //if there is a space
                exp.push(val.join(""))
                val = []                
                //state = "potential val close"            
            }
        } else if (state == "potential val close") {
             
        } else if (state == "potential exp close") {
             if (chr == " ") {
                //close out val
                new_exp = exp                
                exp = stack.pop()
                exp.push(new_exp)
                state = "symbol"           
            } else if (is_symbol(chr)) { //(give me param)here
                val = [chr]
                exp = [exp]
            }
        }
        i++    
    }
    //do anything with the stack?
    if (val.length > 0) {
        exp.push(val.join(""))
    }
    stack.push(exp)
    return stack
    //return exp
}
