function parse(code) {
    var stack = []
    var exp = []
    var val = []
    var i = 0
    var state = "symbol"
    var on_first = true;
    while (i <  code.length) {
        chr = code.charAt(i);
        if (state == "symbol") {
            if (is_symbol(chr)) {
                val.push(chr)            
            } else if (chr == "(") {
                if (val.length == 0 && exp.length == 0) {
                    stack.push(exp)
                    exp = []
                } else if (val.length > 0 && exp.length == 0) {
                    var symbol = val.join('')
                    val = []
                    stack.push(exp)
                    exp = [symbol]             
                } else if (exp.length > 0 && val.length == 0) {
                    exp = [exp]
                } else if (exp.length > 0 && val.length > 0) {
                    var symbol = val.join('')
                    val = []
                    exp.push(symbol)
                    //stack.push(exp)
                    exp = [exp]
                    console.log(symbol)      
                }
            } else if (chr == ")") {
                exp.push(val.join(""))
                val = []
                state = "potential exp close" //possible close out. possible next function call
            } else if (chr == ";") {
                i = find(['\n', '\r', '\u000a', '\u000d']) //comment go to the next carriage return
            } else if (chr == " ") { //if there is a space
                exp.push(val.join(""))
                val = []                
            }
        } else if (state == "potential exp close") {
             if (chr == " ") {
                //close out val
                new_exp = exp                
                exp = stack.pop()
                exp.push(new_exp)
                state = "symbol"           
            } else if (is_symbol(chr)) { //(give me param)here
                state = "symbol"
                val = [chr]
                exp = [exp]
            }
        }
        i++    
    }
    if (val.length > 0) {
        exp.push(val.join(""))
    }
    if (stack.length > 0) {
        while (stack.length > 0) {        
            new_exp = exp
            exp = stack.pop()
            exp.push(new_exp)
        }
    }
    return exp
}
