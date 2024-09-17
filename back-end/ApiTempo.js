

const apiLocationKey = "2cdadc3ccefb45fca92bb32fe6561483";
const apiWeatherKey="e1a0783237a3420634cabacb387c1461"



async function getLocation() {
    //Pegar o nome da cidade, nome do estado e nome do país do front
    city = `porto%alegre%rs`
    let apiLocationUrl = `https://api.geoapify.com/v1/geocode/search?text=${city}&format=json&apiKey=${apiLocationKey}`
    const resLoc = await fetch(apiLocationUrl);
    const dadosLoc = await resLoc.json();
    lat = dadosLoc.results[0].lat;
    long = dadosLoc.results[0].lon;
    return [lat,long];
}


async function getDados(lat,lon) {
    const apiUrl=`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiWeatherKey}&lang=pt_br `
    const res = await fetch(apiUrl)
    const dados = await res.json()
    return dados
}

let dadosClimaticos = [];
 async function getDadosClima() {
         const [x,y]= await getLocation()
         const dados = await getDados(x,y);
         dadosClimaticos = []
        
         dadosClimaticos.push({
             cidade: dados.city.name,
             data: dados.list[0].dt_txt,
             temperatura: dados.list[0].main.temp,
             sensacao_termica:dados.list[0].main.feels_like,
             umidade: dados.list[0].main.humidity,
             clima: dados.list[0].weather[0].main,
             clima_desc: dados.list[0].weather[0].description,
             icon: dados.list[0].weather[0].icon,
             velocidadeVento_M_S: dados.list[0].wind.speed,
             pais: dados.city.country
         });
         dados.list.map((item) => {
             if (item.dt_txt.split(' ')[1] === "18:00:00" && dados.list[0].dt_txt.split(' ')[0]!==item.dt_txt.split(' ')[0]) {
                 dadosClimaticos.push({
                     data: item.dt_txt,
                     temperatura: item.main.temp,
                     sensacao_termica:item.main.feels_like,
                     umidade: item.main.humidity,
                     clima: item.weather[0].main,
                     clima_desc: item.weather[0].description,
                     icon: item.weather[0].icon,
                     velocidadeVento_M_S: item.wind.speed,
                     pais: dados.city.country
                 });
             }
         })
         console.log(dadosClimaticos)
         return dadosClimaticos
        
 }

async function updateWeatherUI() {
    const dadosClimaticos = await getDadosClima();

    // Atualiza a previsão atual
    const currentWeather = dadosClimaticos[0];
    document.getElementById('current-temperature').innerText = `${Math.round(currentWeather.temperatura)}°C`;
    document.getElementById('current-weather').innerText = currentWeather.clima_desc;

    // Atualiza os cards de previsão (do 1º ao 5º)
    dadosClimaticos.slice(1, 6).forEach((item, index) => {
        const cardIndex = index + 1; // Começa do 1 ao invés de 0
        document.getElementById(`date${cardIndex}`).innerText = item.data.split(' ')[0]; // Data formatada
        document.getElementById(`temperature${cardIndex}`).innerText = `${Math.round(item.temperatura)}°C`;
        document.getElementById(`weather-icon${cardIndex}`).src = `https://openweathermap.org/img/wn/${item.icon}.png`; // Ícone do clima
    });
}



// Chama a função para atualizar a interface
updateWeatherUI();
getDadosClima()


