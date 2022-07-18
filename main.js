'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Games starts with 4,3,2,1 in the A stack
// Win is 4,3,2,1 in either B

// Next, what do you think this function should do?
const movePiece = (startStack, endStack) => {
  // move the top piece of the start stack 

  // move it to the end of selected endStack

  // .pop() removes selected piece from array
  let start = stacks[startStack].pop();


  // .push() will put the piece at the endStack
  stacks[endStack].push(start);

}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (startStack, endStack) => {
  // is startStack > endStack? no
  let start = stacks[startStack].slice(-1);
  let end = stacks[endStack].slice(-1);
  // is startStack < endStack? yes(implied no code needed)
  // is endStack empty? yes
  // can i move the piece to the same stack?
  if (stacks[endStack].length == 0){
    return true;
  } if (start < end){
    return true;
  }else {
    return false;
  }

  



}

// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {
  // if all four numbers are in stack b or c
  // stack["b"].length == 4 || stacks["c"].length
  if (stacks["b"].length == 4 || stacks['c'].length == 4) {
    return true;
  } else {
    return false;
  }


}

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  // Here's where we put it all together
  if (isLegal(startStack, endStack)) {
    movePiece(startStack, endStack)
  }

  if (checkForWin()){
    console.log('You Win!');
  }
//grab the arguments (a and c) and set the variables

//if it's true, call the movePiece()
//if false, display "invalid move"


//   if(isLegal(start, end)) {
//     movePiece(start, end)
//   } else {
//     console.log('Invalid move. Try again');
//   }

// // check for win
//   if (checkForWin()){
//     console.log('You Won!');
//   }

}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
