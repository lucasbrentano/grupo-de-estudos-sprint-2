const apiLocationKey = "2cdadc3ccefb45fca92bb32fe6561483"



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

async  function mostraLat(){

    const [x,y]= await getLocation()
    console.log(x)
    console.log(y)
}

mostraLat()