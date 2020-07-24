let allPeople = [];

window.addEventListener("load", () => {
  document.getElementById("search").addEventListener("click", handleClick);
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
    "https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo"
  );
  return await res.json();
}

function removeLoading() {
  var elem = document.querySelector(".progress");
  elem.parentNode.removeChild(elem);
}

function addLoading() {
  let loadingDiv = document.getElementById("loading");
  let progressDiv = document.createElement("div");
  let childDiv = document.createElement("div");
  progressDiv.classList.add("progress");
  childDiv.classList.add("indeterminate");
  progressDiv.appendChild(childDiv);
  loadingDiv.appendChild(progressDiv);
}

function handleClick() {
  let value = document.getElementById("nameToSearch").value;
  search(value);
}

function search(valueToSearch) {
  let filteredPeople = allPeople.filter((person) => {
    return person.name.toLowerCase().includes(valueToSearch.toLowerCase(), 0);
  });
  if (filteredPeople.length === 0) return;
  let totalMale = calculateMaleGender(filteredPeople);
  let totalFemale = calculateFemaleGender(filteredPeople);
  let ageSum = calculateAgeSum(filteredPeople);
  let ageRate = ageSum / filteredPeople.length;
  fillHtmlStatistics(totalMale, totalFemale, ageSum, ageRate);
  fillHtmlWithResult(filteredPeople);
}

function calculateMaleGender(result) {
  return result.reduce((accumulator, current) => {
    if (current.gender === "male") {
      accumulator++;
    }
    return accumulator;
  }, 0);
}

function calculateFemaleGender(result) {
  return result.reduce((accumulator, current) => {
    if (current.gender === "female") {
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
  let totalUsers = document.querySelector(".total-users");
  totalUsers.textContent = `${result.length} usuário(s) encontrado(s)`;
  let statistics = document.querySelector(".statistics");
  statistics.textContent = "Estatísticas";
  result.forEach((element) => {
    let list = document.getElementById("people");
    let liElement = document.createElement("li");
    let userImg = document.createElement("img");
    userImg.src = element.picture;
    liElement.textContent = `${element.name}, ${element.age} anos`;
    liElement.classList.add("collection-item");
    liElement.appendChild(userImg);
    list.appendChild(liElement);
  });
}

function fillHtmlStatistics(totalMale, totalFemale, ageSum, ageRate){
  let statisctisList = document.getElementById('statiscsList');
  let liTotalMale = document.createElement("li");
  liTotalMale.textContent = `Sexo masculino: ${totalMale}`;

  let liTotalFemale = document.createElement("li");
  liTotalFemale.textContent = `Sexo feminino: ${totalFemale}`;

  let liAgeSum = document.createElement("li");
  liAgeSum.textContent = `Soma das idades: ${ageSum}`;

  let liAgeRate = document.createElement("li");
  liAgeRate.textContent = `Média das idades: ${ageSum}`;

  statisctisList.appendChild(liTotalMale);
  statisctisList.appendChild(liTotalFemale);
  statisctisList.appendChild(liAgeSum);
  statisctisList.appendChild(liAgeRate);
}
