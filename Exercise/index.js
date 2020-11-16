function convertToJSON(response) {
  return response.json();
}

/**
 * Group by region
 *
 * @param {Array} data contains all countries
 */
function groupByRegion(data) {
  let regions = {};

  for (let i = 0; i < data.length; i++) {
    const country = data[i];

    const regionCountries = regions[country.region];
    if (regionCountries === undefined) {
      regions[country.region] = [];
    }

    regions[country.region].push(country);
  }

  return regions;
}

function prepareLayoutForCountries(countries) {
  const wrapper = document.createElement('div');

  countries.forEach((country) => {
    const countryInfoEl = document.createElement('div');
    countryInfoEl.innerHTML = country.name;
    wrapper.appendChild(countryInfoEl);
  });

  return wrapper;
}

fetch('https://restcountries.eu/rest/v2/all')
  .then(convertToJSON) // response => response.json()
  .then((data) => {
    const regions = groupByRegion(data);

    const contailerEl = document.getElementById('container');

    Object.keys(regions).forEach((region) => {
      const regionContainerEl = document.createElement('div');
      const regionNameEl = document.createElement('h1');

      let regionName = region;
      if (regionName.length === 0) {
        regionName = 'Unkown region';
      }

      regionNameEl.innerHTML = regionName;
      regionContainerEl.appendChild(regionNameEl);

      const countyWrapper = prepareLayoutForCountries(regions[region]);
      regionContainerEl.appendChild(countyWrapper);

      contailerEl.appendChild(regionContainerEl);
    });
  })
  .catch(error => alert(`Something happened. Error is: ${error}`));

