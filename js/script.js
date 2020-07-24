let allPeople = [];

window.addEventListener('load', () => {
  getData().then(fillItems());
});

function fillItems() {
  document.getElementById('people');
}

async function getData() {
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  allPeople = await res.json();
}

/**
 *  var li = document.createElement('li');
 *  li.innerHTML = "teste";
 *  document.getElementById('people').appendChild(li);
 */
