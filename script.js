const containerCards = document.getElementById("container-cards");
const daynight = document.getElementById("daynight");
const searchInput = document.getElementById("search"); // Убедись, что input имеет id="search"

let countries = []; // Сюда сохраним все данные из API

async function fetchAPI() {
    try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();
        countries = data; // Сохраняем массив стран
        console.log(countries);
        generator(countries); // Отрисовываем карточки
    } catch (error) {
        console.log(error);
    }
}

fetchAPI();

function generator(products) { 
    containerCards.innerHTML = ''; // Очищаем контейнер перед новой генерацией
    products.forEach(element => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${element.flags.png}" alt="flag">
            <h3>${element.name.common}</h3>
        `;
        containerCards.appendChild(card);
    });
}

searchInput.addEventListener("input", () => {
    const searchQuery = searchInput.value.toLowerCase();
    const filteredCountries = countries.filter(country =>
        country.name.common.toLowerCase().includes(searchQuery)
    );
    generator(filteredCountries);
});

// Загружаем тему из localStorage
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
}

daynight.addEventListener("click", () => {
    if (document.body.classList.toggle("dark-mode")) {
        daynight.textContent = " Light mode☀️";
    } else {
        daynight.textContent = " Dark mode🌙";
    }
    document.body.classList.toggle("light-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});



