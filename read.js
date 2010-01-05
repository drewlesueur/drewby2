function parse(code){
    var stack = [];
    var exp = [];
    var val = [];
    var i = 0;
    var state = "symbol";
    var chr;
    var need_to_close = false;
    while (i < code.length) {
        chr = code.charAt(i)
        if (state == "symbol") {
            if (chr == "'") {
                single_quote = true
                stack.push(exp)
                exp = ["list"]
                console.log(exp)
            } if (is_symbol(chr)) {
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
                    if (need_to_close == true) {
                        exp.push(symbol)
                        exp = [exp]
                        need_to_close = false
                    } else {
                        stack.push(exp)
                        exp = [symbol]
                    }
                    need_to_close = false
                }
            } else if (chr == ")") {
                state = "potential close"
            } else if (chr == ";") {
                i = find_new_line(i, code)
            } else if (chr == " " || is_return(chr)) { //if there is a space
                if (val.length > 0) {
                    var symbol = val.join('')
                    val = []
                    exp.push(symbol)             
                }
                if (need_to_close == true) {
                    new_exp = exp; 
                    exp = stack.pop()
                    exp.push(new_exp)
                    need_to_close = false;
                }
            }
        } else if (state = "potential close" ) {
            if (val.length > 0){                
                exp.push(val.join(""))
                val = []                
            }
            state = "symbol"
            if (chr == " " || is_return(chr)) {
                new_exp = exp; 
                exp = stack.pop()
                exp.push(new_exp)
            } else if (chr == "(") {
                //stack.push(exp) //no need to do this!                        
                exp = [exp]
            } else if (chr == ")") { //wait you might need to set the state
                console.log("you are here")
                console.log(exp)
                new_exp = exp; 
                exp = stack.pop()
                exp.push(new_exp)
                new_exp = exp; 
                exp = stack.pop()
                exp.push(new_exp)
            } else if (is_symbol(chr)) {
                exp = [exp]
                need_to_close = true;
                val.push(chr)
            } else {
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
