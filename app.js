let btn = document.querySelector("#toggle_btn");
let label = document.querySelector(".dark_mode p");
let container = document.querySelector(".flag_container");
let textBox = document.querySelector("#text");
btn.addEventListener("click", darkMode);
window.addEventListener("load", init);

textBox.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    let value = textBox.textContent;
    search(value);
  }
});

async function init() {
  let curl = "https://restcountries.com/v3.1/all";
  let response = await fetch(curl);
  let data = await response.json();
  console.log(data[0].population);
  data.forEach((city) => {
    let div = document.createElement("div");
    div.innerHTML = `<div class="card">
        <div class="card_img"><img src="${city.flags.png}">
    </div>
    <div class="card_content">
        <h3 class="card_title">${city.name.common}</h3>
        <p>Population : <span class="population">${city.population}</span><br>
            Region : <span class="region">${city.region}</span><br>
            Capital : <span class="capital">${city.capital}</span>
        </p>
    </div>
</div>`;
    container.appendChild(div);
  });
}

async function search(CITY) {
  try {
    let curl = `https://restcountries.com/v2/name/${CITY}`;
    let response = await fetch(curl);
    let data = await response.json();
    container.innerHTML = " ";
    data.forEach((city) => {
      let div = document.createElement("div");
      div.innerHTML = `<div class="card">
            <div class="card_img"><img src="${city.flags.png}">
        </div>
        <div class="card_content">
            <h3 class="card_title">${city.name.common}</h3>
            <p>Population : <span class="population">${city.population}</span><br>
                Region : <span class="region">${city.region}</span><br>
                Capital : <span class="capital">${city.capital}</span>
            </p>
        </div>
    </div>`;
      container.appendChild(div);
    });
  } catch (error) {
    alert(error);
  }
}

function darkMode() {
  document.body.classList.toggle("dark");
  label.textContent = "Light Mode";
}
