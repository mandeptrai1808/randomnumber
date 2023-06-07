const GetRandomNumber = (minNun, maxNum) => {
  return Math.floor(Math.random()*100);
}

const goButton = () => {

  let numContent = document.getElementById("showNum");
  let num = GetRandomNumber(0,100);
  numContent.innerHTML = num;
}