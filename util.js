function head(arr){ //car
    return arr[0];
}

function tail(arr) { //cdr
    return arr.slice(1)
}

function is_symbol(str) {
    return "( )\"\u000a\r\n\u000d;".indexOf(str) == -1;
}

//any form of carriage return
function is_return(str) {
    return "\n\r\u000a\u000d".indexOf(str) > -1;
}

function smallest(arr) {
    var smallest_set = false
    var smallest = false;    
    for (var i in arr) {
        if (smallest_set == false) {
            smallest = arr[i]
            smallest_set = true        
        } else if (arr[i] < smallest) {
            smallest = arr[i]
        }
    }
    return smallest
}
function find_new_line(i, code) {
  var new_lines = ['\n', '\r', '\u000a', '\u000d']
  var chr = ""
  spots = []
  for (var one in new_lines) {
    chr = new_lines[one]
    pos = code.indexOf(chr, i)
    if (pos > -1) {
        spots.push(pos)
    }
  }
  return smallest(spots)
}

//
