let allPeople = [];

window.addEventListener('load', () => {
  document.getElementById('search').addEventListener('click', handleClick);
  document
    .getElementById('nameToSearch')
    .addEventListener('keyup', handleInputType);
  addLoading();
  getData().then((data) => {
    allPeople = transform(data);
  });

  setTimeout(() => {
    removeLoading();
  }, 1000);
  clearInterval();
});

function transform(data) {
  let dataArray = data.results;
  return dataArray.map((data) => {
    return {
      name: `${data.name.first} ${data.name.last}`,
      picture: data.picture.thumbnail,
      age: data.dob.age,
      gender: data.gender,
    };
  });
}

async function getData() {
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  return await res.json();
}

function removeLoading() {
  var elem = document.querySelector('.progress');
  elem.parentNode.removeChild(elem);
}

function addLoading() {
  let loadingDiv = document.getElementById('loading');
  let progressDiv = document.createElement('div');
  let childDiv = document.createElement('div');
  progressDiv.classList.add('progress');
  childDiv.classList.add('indeterminate');
  progressDiv.appendChild(childDiv);
  loadingDiv.appendChild(progressDiv);
}

function handleInputType() {
  if (document.getElementById('nameToSearch').value === '')
    document.getElementById('search').classList.value =
      'waves-effect waves-light btn-small disabled';
  else
    document.getElementById('search').classList.value =
      'waves-effect waves-light btn-small';
}

function handleClick() {
  let value = document.getElementById('nameToSearch').value;
  search(value);
}

function search(valueToSearch) {
  let filteredPeople = allPeople.filter((person) => {
    return person.name.toLowerCase().includes(valueToSearch.toLowerCase(), 0);
  });
  if (filteredPeople.length === 0) {
    clearResults();
    return;
  }
  let totalMale = calculateMaleGender(filteredPeople);
  let totalFemale = calculateFemaleGender(filteredPeople);
  let ageSum = calculateAgeSum(filteredPeople);
  let ageRate = ageSum / filteredPeople.length;
  fillHtmlStatistics(totalMale, totalFemale, ageSum, ageRate);
  fillHtmlWithResult(filteredPeople);
}

function clearResults() {
  let peopleList = document.getElementById('people');
  peopleList.innerHTML = `
    <li class="collection-item">
      <h3 class="total-users">
        Nenhum usuário encontrado
      </h3>
    </li>
  `;

  let statiscsList = document.getElementById('statiscsList');
  statiscsList.innerHTML = `
    <li class="collection-item">
      <h3 class="statistics">
        Nenhum usuário encontrado
      </h3>
    </li>
  `;

}

function calculateMaleGender(result) {
  return result.reduce((accumulator, current) => {
    if (current.gender === 'male') {
      accumulator++;
    }
    return accumulator;
  }, 0);
}

function calculateFemaleGender(result) {
  return result.reduce((accumulator, current) => {
    if (current.gender === 'female') {
      accumulator++;
    }
    return accumulator;
  }, 0);
}

function calculateAgeSum(result) {
  return result.reduce((acc, curr) => {
    return acc + curr.age;
  }, 0);
}

function fillHtmlWithResult(result) {
  let list = document.getElementById('people');
  list.innerHTML = `
  <li class="collection-item">
    <h3 class="total-users">${result.length} usuário(s) encontrado(s)</h3>
  </li>
  ${result
    .map((element) => {
      return `
    <li class='collection-item'>
      <img src='${element.picture}'>
      </img>
      ${element.name}, ${element.age} anos
    </li>
    `;
    })
    .join('')}
    `;
}

function fillHtmlStatistics(totalMale, totalFemale, ageSum, ageRate) {
  let statisctisList = document.getElementById('statiscsList');
  statisctisList.innerHTML = `
    <li class="collection-item ">
      <h3 class="statistics">Estatísticas</h3>
    </li>
    <li class="collection-item ">Sexo masculino: ${totalMale}</li>
    <li class="collection-item ">Sexo feminino: ${totalFemale}</li>
    <li class="collection-item ">Soma das idades: ${ageSum}</li>
    <li class="collection-item ">Média das idades: ${ageRate}</li>
  `;
}
