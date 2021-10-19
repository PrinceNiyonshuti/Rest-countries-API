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

//getting all countries at the start
async function getCountries() {
	const response = await fetch("https://restcountries.com/v3.1/all");
	let data = await response.json();
	displayCountries(data);
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
        const langNames = currencies[Object.keys(languages)[0]];
        console.log(languages);
		const div = document.createElement("div");
		div.className =
			"w-full mb-4  sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 rounded container rounded-lg shadow-lg bg-white pb-4";
        div.innerHTML = `
                    <img src="${flags.svg}" class="h-1/2 w-full rounded-tl-lg rounded-tr-lg" alt="${name.common}" />
                    <div class="p-4 h-auto">
                        <h2 class="text-xl font-bold mb-4">${name.common}</h2>
                        <p class="font-semibold">Capital : <span class="text-gray-700 ">${capital}</span></p>
                        <p class="font-semibold">Region : <span class="text-gray-700 ">${region}</span></p>
                        <p class="font-semibold">Continent : <span class="text-gray-700 ">${continents}</span></p>
                        <p class="font-semibold">Population : <span class="text-gray-700 ">${population.toLocaleString("en")}</span></p>
                        <p class="font-semibold">Currency Name : <span class="text-gray-700 ">${currencyNames.name}</span></p>
                        <p class="font-semibold">Symbol : <span class="text-gray-700 ">${currencyNames.symbol}</span></p>
                        <p class="font-semibold">Main Language : <span class="text-gray-700 ">${languages}</span></p>
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
