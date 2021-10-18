/** @format */

// elements initialize
const filterByRegion = document.getElementById("filter_region");
const searchInput = document.getElementById("search_input");
const result = document.querySelector(".result");

// adding event listener
searchInput.addEventListener("keypress", (e) => {
	if (e.keyCode === 13) {
		searchCountries();
	}
});
filterByRegion.addEventListener("change", filterCountries);

let data = [];

async function getCountries() {
	const response = await fetch("https://restcountries.com/v3.1/all");
	let data = await response.json();
	console.log(data);
}

// Searching Country
async function searchCountries() {
	const response = await fetch(
		`https://restcountries.com/v3.1/name/${searchInput.value}`
	);
	let data = await response.json();
	displayCountries(data);
}

const displayCountries = (data) => {
	data.forEach((country) => {
        // result.innerHTML = "";
        const div = document.createElement("div");
        div.className = "container rounded-lg shadow-lg bg-white ";
        div.innerHTML = `
                    <img src="${country.flags.svg}" class="h-1/2 w-full rounded-tl-lg rounded-tr-lg" alt="${country.name.common}" />
                    <div class="p-4">
                        <h2 class="text-xl font-bold mb-4">${country.name.common}</h2>
                        <p class="font-semibold">Population : <span class="text-gray-700 ">${country.population}</span></p>
                        <p class="font-semibold">Region : <span class="text-gray-700 ">${country.region}</span></p>
                        <p class="font-semibold">Capital : <span class="text-gray-700 ">${country.capital}</span></p>
                    </div>
        `;
        result.appendChild(div);
	});
};


// Filter countries by region Done
async function filterCountries() {
	const response = await fetch(
		`https://restcountries.com/v3.1/region/${filterByRegion.value}`
	);
	let data = await response.json();
	displayCountries(data);
}
