


//sorry, still wroking on js part 



// Foursquare API Info
const clientId = 'your-client-id';
const clientSecret = 'your-client-secret';
const url = 'https://api.foursquare.com/v2/venues/explore';

// OpenWeather Info
const openWeatherKey = 'your-openweather-api-key';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Fetch functions
const getVenues = async () => {
  const city = $input.val();
  const urlToFetch = `${url}?near=${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20220501`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const venues = jsonResponse.response.groups[0].items.map(item => item.venue);
      renderVenues(venues);
    } else {
      throw new Error('Foursquare API request failed');
    }
  } catch (error) {
    console.log(error);
  }
};

const getForecast = async () => {
  const city = $input.val();
  const urlToFetch = `${weatherUrl}?q=${city}&appid=${openWeatherKey}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      renderForecast(jsonResponse);
    } else {
      throw new Error('OpenWeather API request failed');
    }
  } catch (error) {
    console.log(error);
  }
};

// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    let venueContent = '';
    const venue = venues[index];
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
    venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
    $venue.html(venueContent);
  });
  $destination.html(`<h2>${venues[0].location.city}</h2>`);
};

const renderForecast = (day) => {
  let weatherContent = createWeatherHTML(day);
  $weatherDiv.html(weatherContent);
};

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues();
  getForecast();
  return false;
};

$submit.click(executeSearch);
