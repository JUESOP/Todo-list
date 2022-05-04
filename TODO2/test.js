const add = (a, b) => a + b;
const multiply = (a, b) => a * b;

function calculator(a, b, action) {
    let result = action(a, b);
    console.log(result);
    return result;
}

calculator(1, 2, add);


//주어진 숫자 만큼 0분터 순회하는 함수
//순회하면서 주어진 특정한 일을 수행해야 함

function iterate(max, action) {
    for(let i = 0; i < max; i++) {
       action(i);
    }
}

function log(num) {
    console.log(num);
}
iterate(1, )