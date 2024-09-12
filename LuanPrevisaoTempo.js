

const apiLocationKey = "2cdadc3ccefb45fca92bb32fe6561483";



async function getLocation() {
    //Pegar o nome da cidade, nome do estado e nome do país do front
    city = `Porto%Alegre%RS%Brasil`
    let apiLocationUrl = `https://api.geoapify.com/v1/geocode/search?text=${city}&format=json&apiKey=${apiLocationKey}`
    const resLoc = await fetch(apiLocationUrl);
    const dadosLoc = await resLoc.json();
    lat = dadosLoc.results[0].lat;
    long = dadosLoc.results[0].lon;

    return [lat,long];
}


async function getDados(lat,lon) {
    const apiUrl=`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=e1a0783237a3420634cabacb387c1461&lang=pt_br `

    const res = await fetch(apiUrl)
    const dados = await res.json()
    return dados
}
async function MostraTempo() {
        const [x,y]= await getLocation()
        console.log(x)
        console.log(y)
        const data = await getDados(x,y);
        console.log(data.city.name)
        console.log(data.list[0].dt_txt)
        console.log("/////////////////////")
        console.log(`dia ${0}`)
        console.log(`   temperatura:`, data.list[0].main.temp)
        console.log(`   umidade:`,data.list[0].main.humidity)
        console.log(`   clima:`,data.list[0].weather[0].main)
        console.log(`   descrição do clima:`,data.list[0].weather[0].description)
        console.log(`   icone:`,data.list[0].weather[0].icon)
        console.log(`   velocidade:`,data.list[0].wind.speed)
        console.log(`   pais:`,data.city.country)
        data.list.map((item) => {
            if (item.dt_txt.split(' ')[1] === "18:00:00") {
                console.log("/////////////////////")
                console.log(item.dt_txt)
                console.log(`dia ${item.dt_txt}`)
                console.log(`   temperatura:`, item.main.temp)
                console.log(`   umidade:`,item.main.humidity)
                console.log(`   clima:`,item.weather[0].main)
                console.log(`   descrição do clima:`,item.weather[0].description)
                console.log(`   icone:`,item.weather[0].icon)
                console.log(`   velocidade:`,item.wind.speed)
                console.log(`   pais:`,data.city.country)
            }
        })
     }
MostraTempo()