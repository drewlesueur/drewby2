function parse(code){
    var stack = [];
    var exp = [];
    var val = [];
    var i = 0;
    var state = "symbol";
    var chr;
    while (i < code.length) {
        chr = code.charAt(i)
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
                    stack.push(exp)
                    exp = []
                } else if (exp.length > 0 && val.length > 0) {
                    var symbol = val.join('')
                    val = []
                    stack.push(exp)
                    exp = [symbol]
                    console.log(symbol)
                }
            } else if (chr == ")") {
                if (val.length > 0){                
                    exp.push(val.join(""))
                    val = []                
                }
                //if (stack.length > 0) {
                    if (i+1 < code.length) {
                        var next_chr = code.charAt(i+1)
                    } else {
                        var next_chr = " "
                    }
                                        
                    if (next_chr == " " || is_return(next_chr)) {
                        console.log(stack)                        
                        new_exp = exp; 
                        exp = stack.pop()
                        exp.push(new_exp)
                        i++
                    } else if (next_chr == "(") {
                        //stack.push(exp) //no need to do this!                        
                        exp = [exp]
                        i++
                    } else if (is_symbol(next_chr)) {
                        
                    } else {
                        console.log("problem")
                    }
                //}
            } else if (chr == ";") {
                i = find(['\n', '\r', '\u000a', '\u000d']) //comment go to the next carriage return
            } else if (chr == " ") { //if there is a space
                 if (val.length > 0) {
                    var symbol = val.join('')
                    val = []
                    exp.push(symbol)             
               }
            }
        }
        i++;
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