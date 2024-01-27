let boxes = document.querySelectorAll(".box");
let msgbox = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");
let resetBtn = document.querySelector(".reset-btn");
let newGbtn = document.querySelector(".newgame");
// array below contains all the winning pattern
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
//below is the function to perform when draw
const checkDraw = (count) => {
  disableboxes();
  msg.innerText = `Its A Draw`;
  msgbox.classList.remove("hide");
};
let count = 0;// varibale used to check draw
let turnX = true;//to know who's turn it is
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("btn clicked");
    count++;//each time the button is pressed it increments
    if (turnX) {
      box.innerText = "X";
      box.style.color = "#FF7F50";
      turnX = false;
    } else {
      box.innerText = "O";
      box.style.color="#40E0D0";
      turnX = true;
    }
    box.disabled = true;//so that it can only be clicked once.
    let Winner = checkWinner(); //check the winner a store string(true);
    if (count == 9 && !Winner) checkDraw();//out of moves and no winner than draw
  });
});
const enableboxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};
const disableboxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const resetGame = () => {
  turnX = true;
  count = 0;
  enableboxes();
  msgbox.classList.add("hide");
};
//function to dom manipulation to display the winner
const showwinner = (winner) => {
  disableboxes();
  msg.innerText = `Congratulation ,Winner is ${winner}`;
  msgbox.classList.remove("hide");
};
//function to check the winner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let posval1 = boxes[pattern[0]].innerText;
    let posval2 = boxes[pattern[1]].innerText;
    let posval3 = boxes[pattern[2]].innerText;
  
//condition to check the value in three colums is same i.e either 3 o's or x's.
    if (posval1 != "" && posval2 != "" && posval3 != "") {
      if (posval1 === posval2 && posval2 === posval3) {
        console.log("Winner", posval1);
        showwinner(posval1);
      }
    }
  }
};
newGbtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
