const {odd, even} = require('./ex2_1');

function checkFunc(num){
    if(num % 2){
        return odd;
    }
    return even;
}

module.exports = checkFunc;