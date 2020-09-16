let counter = 0;

function countUp() {
  const resultCmp = document.getElementById('result');
  counter = counter + 1;
  resultCmp.innerHTML = counter;
};

document.getElementById('countUpBtn').addEventListener('click', countUp);
document.getElementById('result').innerHTML = counter;