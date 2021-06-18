let turn = -1;
let state = new Array(9);
for(let i = 0 ; i < 9 ; i++){
  state[i] = 0
}
let judge = "false";

module.exports = class logic {
  click(num) {
    turn = turn * -1
    state[num] = turn
    return state
  }
};
