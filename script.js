let listNum = [];
let checkNum = [];

const GetRandomNumber = (minNun, maxNum) => {
  return Math.floor(Math.random()*maxNum);
}


const checkNumExist = (num) => {
  let ListNumLocal = localStorage.getItem("ListNum");
  ListNumLocal = JSON.parse(ListNumLocal);
  if(!ListNumLocal) ListNumLocal = [];
  if((ListNumLocal.findIndex((item) => {
    return item==num
  })) == -1) return false;
  return true;
}

const goButton = () => {
  let ListNumLocal = localStorage.getItem("ListNum");
  ListNumLocal = JSON.parse(ListNumLocal);
  if(!ListNumLocal) ListNumLocal = [];
  listNum = ListNumLocal;
  let numContent = document.getElementById("showNum");
  var num = GetRandomNumber(0,100);
  while(checkNumExist(num) && ListNumLocal.length < 100){
    num = GetRandomNumber(0,100);
  }
  numContent.innerHTML = num;
  listNum.push(num);
  localStorage.setItem("ListNum", JSON.stringify(listNum));
}


const CheckNumHold = (num) => {
  if(!checkNum[num])
  checkNum[num] = true;
  else checkNum[num] = false;
  showResult()
  ShowBoard();
}

const showResult = () => {
  let ListNumLocal = localStorage.getItem("ListNum");
  ListNumLocal = JSON.parse(ListNumLocal);
  if(!ListNumLocal) ListNumLocal = [];
  const listNumContent = document.getElementById("listnum");
  if(listNumContent){
    listNumContent.innerHTML = '';
    ListNumLocal.sort(function(a, b){return a - b});
    ListNumLocal.map((item, index) => {
  
      const node = document.createElement('div');
      node.classList.add('col-2', 'pl-1', 'pr-1', 'mb-3');
      node.innerHTML = (checkNum[item]) ? `
      <div class="numResult active" onclick="CheckNumHold(${item})">
                <p id="showNum">${item}</p>
            </div>
      `
      :

      `
      <div class="num" onclick="CheckNumHold(${item})">
                <p id="showNum">${item}</p>
            </div>
      `
      listNumContent.appendChild(node)
    })

  }
}


const ResultButton = () => {
  location.href = "./result.html";
}

const ResetButton = () => {
  localStorage.removeItem('ListNum');
  let numContent = document.getElementById("showNum");
  numContent.innerHTML = '??';
}


let RandomList = []
const createRandomBoard = () => {
  RandomList = [];
  let checkRandomList = []
  for(let i = 0; i < 9; i++){
    let num = GetRandomNumber(0, 100);
    while(checkRandomList[num] && RandomList.length < 10){
      num = GetRandomNumber(0,100);
    }
    checkRandomList[num] = true;
    RandomList.push(num);
  }
  ShowBoard();
}

const ShowBoard = () => {
  let boardContent = document.getElementById("board");
  if(boardContent){
    boardContent.innerHTML = '';
    RandomList.map((item,index) => {
          let node = document.createElement('div');
          node.classList.add('col-4', 'p-0');
          node.innerHTML =  (checkNum[item]) ?  
          `
          <div class="numBoard activeBoard" onclick="CheckNumHold(${item})">
          <p id="showNum" class="m-0">${item}</p>
          </div>
          `:
          `
          <div class="numBoard" onclick="CheckNumHold(${item})">
          <p id="showNum" class="m-0">${item}</p>
          </div>
          `
          boardContent.appendChild(node)
    })
  }
}

onload = createRandomBoard();
onload = showResult();

