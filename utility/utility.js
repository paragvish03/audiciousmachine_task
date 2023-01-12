exports.MYKEY = "itssecretkeywith32lettersofstring"
exports.valid_email = function(value){
    let result = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
    if (result) {
        return value
    } else {
        return false
    }

}
