function parse(code){
    var stack = [];
    var exp = [];
    var val = [];
    var i = 0;
    var state = "symbol";
    var chr;
    var need_to_close = false;
    var need_to_close_for_quote = false;    
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
                    if (need_to_close == true && need_to_close_for_quote == false) {
                        //console.log("I was raised by the street")
                        exp.push(symbol)
                        exp = [exp]
                        need_to_close = false
                    } else if (need_to_close == false && need_to_close_for_quote == true) {
                       // console.log("Too much television watching")
                        exp.push(symbol)
                        exp = [exp]
                        need_to_close_for_quote = false
                    } else if (need_to_close == true && need_to_close_for_quote == true) {
                        //console.log("test")                      
                        exp.push(symbol)
                        new_exp = exp
                        exp = stack.pop()
                        exp.push(new_exp)
                        exp = [exp]
                        need_to_close_for_quote = false;                       
                        need_to_close = false
                    }
                    else if (need_to_close == false && need_to_close_for_quote == false) {
                        console.log("I cant live a normal life")
                        stack.push(exp)
                        exp = [symbol]
                    }
                    need_to_close = false
                    need_to_close_for_quote = false
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
                if (need_to_close_for_quote == true) {
                    new_exp = exp; 
                    exp = stack.pop()
                    exp.push(new_exp)
                    need_to_close_for_quote = false;
                }
            } else if (chr == '"') {
                if (val.length > 0) {
                    state = "special quote"
                } else {
                    state = "quote"
                }
            }
        } else if (state == "special quote") {
            var search = val.join('');
            val = [];
            var end = code.indexOf('"' + search, i+1);
            if (end == -1) {
                
                return "error! you didn't properly close your special quote";
            }
            var the_string = code.substring(i,end)
            i = end + (('"' + search).length  - 1)
            exp.push(["'", the_string])
            console.log(exp)
            //need_to_close_for_quote = true
            state = "end special quote"
        } else if (state == "end special quote") {
            if (chr == "(") {
                stack.push([])
            } else if (is_symbol(chr)) {                    
                stack.push([])                
                val.push(chr)
                need_to_close = true;
            } else if (chr == ")") {
                new_exp = exp
                exp = stack.pop()
                exp.push(new_exp)
            } else {
                
            }
            state = "symbol"
        } else if (state == "quote") {
            if (chr == "\\") {
                state = "quote escape"
            } else if (chr == '"') {
                stack.push(exp)
                exp = ["'"]
                need_to_close_for_quote = true //hmm?
                state = "symbol"
            } else {
                val.push(chr)
            }
        } else if (state == "quote escape") {
            if (chr == '"') {
                val.push('"')
            } else if (chr == "\\") {
                val.push("\\")
            } else {
                //todo: there will be more cases/ this will change
                val.push("\\")
                val.push("chr")            
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
            } else if (chr == '"'){
                exp = [exp]
                state = "quote"
                need_to_close = true
                need_to_close_for_quote = true;
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
