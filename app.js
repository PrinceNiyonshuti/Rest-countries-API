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


function getCountries() {
	fetch("https://restcountries.com/v3.1/all")
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		console.log(data);
		displayCountries(data);
	});
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
	result.innerHTML = "";
    data.forEach((country) => {

		// console.log(country);
        
        // Destructuring value for country
		const {
			flags,
			name,
			capital,
			region,
			continents,
			population,
			currencies,
			languages,
        } = country;
        
        const currencyNames = currencies[Object.keys(currencies)[0]];

		const langNames = languages[Object.keys(languages)[0]];

        lang = JSON.stringify(languages);
        console.log(langNames);

		const div = document.createElement("div");
		div.className ="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4";
        div.innerHTML = `
                    <a href="" class="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
						<div class="relative pb-48 overflow-hidden">
							<img class="absolute inset-0 h-full w-full object-cover" src="${flags.svg}" alt="${name.common}">
						</div>
						<div class="p-4">
							<h2 class="mt-2 mb-2 font-bold">${name.common}</h2>
							<p class="text-sm"></p>
							<p class="font-semibold">Capital : <span class="text-gray-700 ">${capital}</span></p>
							<p class="font-semibold">Region : <span class="text-gray-700 ">${region}</span></p>
							<p class="font-semibold">Continent : <span class="text-gray-700 ">${continents}</span></p>
							<p class="font-semibold">Population : <span class="text-gray-700 ">${population.toLocaleString("en")}</span></p>
							<p class="font-semibold">Currency Name : <span class="text-gray-700 ">${currencyNames.name}</span></p>
							<p class="font-semibold">Symbol : <span class="text-gray-700 ">${currencyNames.symbol}</span></p>
							<p class="font-semibold">Main Language : <span class="text-gray-700 ">${langNames}</span></p>
						</div>
					</a>
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
