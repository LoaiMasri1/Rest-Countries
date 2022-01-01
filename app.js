let btn = document.querySelector("#toggle_btn")
let label = document.querySelector(".dark_mode p")
let container = document.querySelector(".flag_container")
let textBox = document.querySelector("#text")
let select = document.querySelectorAll("#select")
let topBtn = document.getElementById("toTop")
let searchBtn=document.querySelector('#search_btn')

window.addEventListener("load", init)
window.addEventListener("load", filter)
window.addEventListener("scroll", scrollFunction)
btn.addEventListener("click", darkMode)
textBox.addEventListener("keyup", hitEnter)
searchBtn.addEventListener('click',searchFun)
topBtn.addEventListener("click", topFunction)

async function init() {
  try {
    let curl = "https://restcountries.com/v3.1/all"
    let response = await fetch(curl)
    let data = await response.json()
    container.innerHTML = " "
    data.forEach((city) => {
      let div = document.createElement("div")
      div.innerHTML = `<div class="card">
          <div class="card_img"><img src="${city.flags.png}" alt='${city.name.common} Flag'>
      </div>
      <div class="card_content">
          <h3 class="card_title">${city.name.common}</h3>
          <p>Population : <span class="population">${city.population}</span><br>
              Region : <span class="region">${city.region}</span><br>
              Capital : <span class="capital">${city.capital}</span>
          </p>
      </div>
  </div>`
      container.appendChild(div)
    })
  } catch (error) {
    console.error(error)
    alert('Plese Enter A Valid Country')
  }
}

async function search(name, CITY) {
  try {
    let curl = `https://restcountries.com/v2/${name}/${CITY}`
    let response = await fetch(curl)
    let data = await response.json()
    container.innerHTML = " "
    data.forEach((city) => {
      let div = document.createElement("div")
      div.innerHTML = `<div class="card">
            <div class="card_img"><img src="${city.flags.png}" alt="${city.name} Flag">
        </div>
        <div class="card_content">
            <h3 class="card_title">${city.name}</h3>
            <p>Population : <span class="population">${city.population}</span><br>
                Region : <span class="region">${city.region}</span><br>
                Capital : <span class="capital">${city.capital}</span>
            </p>
        </div>
    </div>`
      container.appendChild(div)
    })
  } catch (error) {
      console.error(error)
    alert('Plese Enter A Valid Country')

  }
}

function filter() {
  select.forEach((option) => {
    option.addEventListener("change", () => {
      if (option.value === "All") {
        init()
      } else {
        let value = option.value
        search("region", value)
      }
    })
  })
}

function darkMode() {
  document.body.classList.toggle("dark")
  if(document.body.classList.contains('dark')){
    label.textContent = "Light Mode"
  }else{
    label.textContent = "Dark Mode"
  }
}

function hitEnter(event) {
  if (event.keyCode === 13) {
    let value = textBox.value
    textBox.value = ""
    search("name", value)
    event.preventDefault()
  }
}

function searchFun(event){
    event.preventDefault()
    let value = textBox.value
    textBox.value = ""
    search("name", value)
}

function scrollFunction() {
  if (
    document.body.scrollTop > 500 ||
    document.documentElement.scrollTop > 500
  ) {
    topBtn.style.bottom = "30px"
  } else {
    topBtn.style.bottom = "-100px"
  }
}

function topFunction() {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
}
