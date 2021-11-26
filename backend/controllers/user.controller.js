const db = require("../models");
const User = db.users;
const Playlist = db.playlists;
// const Op = db.Sequelize.Op;
const axios = require('axios');
// const {response} = require("express");
// const {response} = require("express");


const client_id = process.env.client_id
const client_secret = process.env.client_secret
const redirect_uri = process.env.redirect_uri

// Create and Save a new User
exports.scode = (req, res) => {
    let code = req.query.code
    console.log('15 ' + code)
    let url = 'https://accounts.spotify.com/api/token'
    const params = new URLSearchParams()
    params.append('grant_type','authorization_code')
    params.append('code',code)
    params.append('redirect_uri',redirect_uri)
    params.append('client_id',client_id)
    params.append('client_secret',client_secret)
    let access_token
    let refresh_token
    let username
    let nickname
    return axios.post(url,params
    )
        .then(response =>{
            console.log(response.data)
            access_token = response.data['access_token']
            refresh_token = response.data['refresh_token']
            let headers = {
                'Authorization': 'Bearer ' + access_token,
                'scope': 'user-read-private user-read-email'
            }
            console.log(headers)
            axios({
                url:'https://api.spotify.com/v1/me',
                method:'get',
                headers:headers
            })
                .then(response =>{
                console.log(response.data)
                let r = response.data
                    username = r['id']
                    nickname = r['display_name']

                User.findOrCreate({where:{spotyid:r['id'],country:r['country'],display_name:r['display_name']},defaults:{
                        access_token:access_token,refresh_token:refresh_token
                    }}).then(res.cookie('username',username,{expires:new Date(Date.now() + 3600000*24*365)}),res.cookie('access_token',access_token,{sameSite:'strict',expires:new Date(Date.now() + 3600000*24*7)}),res.cookie('country',r['country'],{expires:new Date(Date.now() + 3600000*24*365)}),res.cookie('nickname',nickname,{expires:new Date(Date.now() + 3600000*24*365)}),
                    res.redirect('/')).catch(error =>{
                    console.log('47 ' + error)
                })
            })
                .catch(error =>{
                    console.log('52 ' + error)
                })
        })
        .catch(error =>{
            console.log('33 ' + error)
        })

};

exports.refresh = (req,res) => {
    let username = req.params.username
    console.log(username)
    // let current_time = new Date().getTime()
    // let one_day = current_time.setHours(current_time.getHours() - 1)
    let url = 'https://accounts.spotify.com/api/token'
    return User.findOne({ where: { spotyid: username } }).then(function (user) {
        const params = new URLSearchParams()
        params.append('grant_type','refresh_token')
        params.append('refresh_token',user.refresh_token)
        params.append('client_id',client_id)
        params.append('client_secret',client_secret)
        axios.post(url,params)
            .then(response =>{
                let r = response.data
                res.cookie('access_token',r['access_token'],{sameSite:'strict',expires:new Date(Date.now() + 3600000*24*7)})
                user.update({access_token: r['access_token']}).then(res.json({'status':'success'}))
            })
            .catch(error => error.response)
    }).catch(error => console.log(error));

}

// Create and Save a new User
exports.globalviral = (req, res) => {
    let cookies = req.headers.cookie;
    let viralAustralia = '37i9dQZEVXbO5MSE9RdfN2'
    let viralArgentina = '37i9dQZEVXbJajpaXyaKll'
    let viralAustria = '2XsImO7JKucXwlYYMIrprM'
    let viralBelgium = '37i9dQZEVXbJx9hUtTN0Sj'
    let viralBolivia = '37i9dQZEVXbMTKZuy8ORFV'
    let viralBrazil = '37i9dQZEVXbMOkSwG072hV'
    let viralBulgaria = '37i9dQZEVXbJcpVBLdFV7m'
    let viralCanada = '37i9dQZEVXbKfIuOAZrk7G'
    let viralColombia = '37i9dQZEVXbKrooeK9WSFF'
    let viralChile = '37i9dQZEVXbJs8e2vk15a8'
    let viralCzechRepublic = '37i9dQZEVXbMBUm3g7j4Kb'
    let viralCostaRica = '37i9dQZEVXbKOefHPXPMyf'
    let viralDenmark = '37i9dQZEVXbMA8BIYDeMkD'
    let viralEcuador = '37i9dQZEVXbJpRQ294oZ9N'
    let viralDominican = '37i9dQZEVXbJWZV7aRNQck'
    let viralElSalvador = '7iXdvqCdHev0ONm2oQYwpf'
    let viralFrance = '37i9dQZEVXbJmRv5TqJW16'
    let viralFinland = '37i9dQZEVXbMBNcyQCfU4w'
    let viralEstonia = '37i9dQZEVXbK4KA2JSuft7'
    let viralEgypt = '37i9dQZEVXbJSvmuZN9Jja'
    let viralGreece = '37i9dQZEVXbLOov4J0GutU'
    let viralGlobal = '37i9dQZEVXbLiRSasKsNU9'
    let viralGermany = '37i9dQZEVXbNv6cjoMVCyg'
    let viralHongKong = '2HQhQNAa4qTF20jWscOINc'
    let viralHonduras = '53M3EPSkZEk05ZO1xkfaD7'
    let viralGuatemala = '0otOpY9wJjnKLhzkYtYsgL'
    let viralIndonesia = '37i9dQZEVXbKpV6RVDTWcZ'
    let viralIceland = '37i9dQZEVXbMHnoaLVkVuk'
    let viralHungary = '37i9dQZEVXbLuey1EKVv9I'
    let viralItaly = '37i9dQZEVXbKbvcwe5owJ1'
    let viralIsrael = '37i9dQZEVXbNGlbFNNXxgC'
    let viralIreland = '5JU1CyH7Ue8kkOwUWXariJ'
    let viralLuxembourg = '1eBfbQXPKDg3w362Ya8eoI'
    let viralLithuania = '5NDesWYuDXDqEva7q28jNm'
    let viralLatvia = '37i9dQZEVXbIUY6VUoboP4'
    let viralJapan = '37i9dQZEVXbINTEnbFeb8d'
    let viralNetherlands = '37i9dQZEVXbMQaPQjt027d'
    let viralMorocco = '0lelgT5b43opUKIqlugB0T'
    let viralMexico = '37i9dQZEVXbLuUZrygauiA'
    let viralMalaysia = '37i9dQZEVXbLRmg3qDbY1H'
    let viralParaguay = '37i9dQZEVXbNxY4E5g33Gy'
    let viralPanama = '72oufharq0EKvIZAIPv3Qc'
    let viralNorway = '37i9dQZEVXbOcsE2WCaJa2'
    let viralNicaragua = '5wKlm01ePoSZqxrOEFppOg'
    let viralNewZealand = '37i9dQZEVXbJ7gPAehey5W'
    let viralRomania = '37i9dQZEVXbNwDVyEEfWV3'
    let viralPortugal = '37i9dQZEVXbKHoaIcElSSA'
    let viralPoland = '37i9dQZEVXbNGGDnE9UFTF'
    let viralPhilippines = '37i9dQZEVXbJv2Mvelmc3I'
    let viralPeru = '37i9dQZEVXbN7gfhgaomhA'
    let viralSlovakia = '37i9dQZEVXbK3Iy2zvpfp4'
    let viralSingapore = '37i9dQZEVXbJVi45MafAu0'
    let viralSaudiArabia = '5vTptlHUeFynGYqJonU19B'
    let viralRussia = '37i9dQZEVXbMNKGj6aCCDm'
    let viralSouthAfrica = '37i9dQZEVXbNaCk6h5bujZ'
    let viralTaiwan = '3QbwXf6j6DSk3SGt8wE7la'
    let viralSwitzerland = '37i9dQZEVXbNjqq6Tw4Fb0'
    let viralSweden = '37i9dQZEVXbIPOivNiyjjS'
    let viralSpain = '37i9dQZEVXbMfVLvbaC3bj'
    let viralSouthKorea = '37i9dQZEVXbM1H8L6Tttw9'
    let viralUkraine = '4pVqQcRbWKsJWVliWYvEuD'
    let viralTurkey = '37i9dQZEVXbMIJZxwqzod6'
    let viralThailand = '37i9dQZEVXbMnf7ONzeQWM'
    let viralUAE = '37i9dQZEVXbN6kflPvZZn0'
    let viralVietnam = '37i9dQZEVXbL1G1MbPav3j'
    let viralUSA = '37i9dQZEVXbKuaTI1Z1Afx'
    let viralUruguay = '6DIOFLdtezQ1OeoI18XVFU'
    let viralUnitedKingdom = '37i9dQZEVXbL3DLHfQeDmV'

    let globalAustralia = '37i9dQZEVXbJPcfkRz0wJ0'
    let globalArgentina = '37i9dQZEVXbMMy2roB9myp'
    let globalAustria = '37i9dQZEVXbKNHh6NIXu36'
    let globalBelgium = '37i9dQZEVXbJNSeeHswcKB'
    let globalBolivia = '37i9dQZEVXbJqfMFK4d691'
    let globalBrazil = '37i9dQZEVXbMXbN3EUUhlg'
    let globalBulgaria = '37i9dQZEVXbNfM2w2mq1B8'
    let globalCanada = '37i9dQZEVXbKj23U1GF4IR'
    let globalColombia = '37i9dQZEVXbOa2lmxNORXQ'
    let globalChile = '37i9dQZEVXbL0GavIqMTeb'
    let globalCzechRepublic = '37i9dQZEVXbIP3c3fqVrJY'
    let globalCostaRica = '37i9dQZEVXbMZAjGMynsQX'
    let globalDenmark = '37i9dQZEVXbL3J0k32lWnN'
    let globalEcuador = '37i9dQZEVXbJlM6nvL1nD1'
    let globalDominican = '37i9dQZEVXbKAbrMR8uuf7'
    let globalElSalvador = '37i9dQZEVXbLxoIml4MYkT'
    let globalEstonia = '37i9dQZEVXbJqdarpmTJDL'
    let globalEgypt = '37i9dQZEVXbLn7RQmT5Xv2'
    let globalFrance = '37i9dQZEVXbIPWwFssbupI'
    let globalFinland = '37i9dQZEVXbMxcczTSoGwZ'
    let globalGreece = '37i9dQZEVXbJqdarpmTJDL'
    let globalGlobal = '37i9dQZEVXbMDoHDwVN2tF'
    let globalGermany = '37i9dQZEVXbJiZcmkrIHGU'
    let globalHongKong = '37i9dQZEVXbLwpL8TjsxOG'
    let globalHonduras = '37i9dQZEVXbJp9wcIM9Eo5'
    let globalGuatemala = '37i9dQZEVXbLy5tBFyQvd4'
    let globalIndonesia = '37i9dQZEVXbObFQZ3JLcXt'
    let globalIceland = '37i9dQZEVXbKMzVsSGQ49S'
    let globalHungary = '37i9dQZEVXbNHwMxAkvmF8'
    let globalItaly = '37i9dQZEVXbIQnj7RRhdSX'
    let globalIsrael = '37i9dQZEVXbJ6IpvItkve3'
    let globalIreland = '37i9dQZEVXbKM896FDX8L1'
    let globalLuxembourg = '37i9dQZEVXbKGcyg6TFGx6'
    let globalLithuania = '37i9dQZEVXbMx56Rdq5lwc'
    let globalLatvia = '37i9dQZEVXbJWuzDrTxbKS'
    let globalJapan = '37i9dQZEVXbKXQ4mDTEBXq'
    let globalNetherlands = '37i9dQZEVXbKCF6dqVpDkS'
    let globalMorocco = '37i9dQZEVXbJU9eQpX8gPT'
    let globalMexico = '37i9dQZEVXbO3qyFxbkOE1'
    let globalMalaysia = '37i9dQZEVXbJlfUljuZExa'
    let globalParaguay = '37i9dQZEVXbNOUPGj7tW6T'
    let globalPanama = '37i9dQZEVXbKypXHVwk1f0'
    let globalNorway = '37i9dQZEVXbJvfa0Yxg7E7'
    let globalNicaragua = '37i9dQZEVXbISk8kxnzfCq'
    let globalNewZealand = '37i9dQZEVXbM8SIrkERIYl'
    let globalRomania = '37i9dQZEVXbNZbJ6TZelCq'
    let globalPortugal = '37i9dQZEVXbKyJS56d1pgi'
    let globalPoland = '37i9dQZEVXbN6itCcaL3Tt'
    let globalPhilippines = '37i9dQZEVXbNBz9cRCSFkY'
    let globalPeru = '37i9dQZEVXbJfdy5b0KP7W'
    let globalSlovakia = '37i9dQZEVXbKIVTPX9a2Sb'
    let globalSingapore = '37i9dQZEVXbK4gjvS1FjPY'
    let globalSaudiArabia = '37i9dQZEVXbLrQBcXqUtaC'
    let globalRussia = '37i9dQZEVXbL8l7ra5vVdB'
    let globalSouthAfrica = '37i9dQZEVXbMH2jvi6jvjk'
    let globalTaiwan = '37i9dQZEVXbMnZEatlMSiu'
    let globalSwitzerland = '37i9dQZEVXbJiyhoAPEfMK'
    let globalSweden = '37i9dQZEVXbLoATJ81JYXz'
    let globalSpain = '37i9dQZEVXbNFJfN1Vw8d9'
    let globalSouthKorea = '37i9dQZEVXbNxXF4SkHj9F'
    let globalUkraine = '37i9dQZEVXbKkidEfWYRuD'
    let globalTurkey = '37i9dQZEVXbIVYVBNw9D5K'
    let globalThailand = '37i9dQZEVXbMnz8KIWsvf9'
    let globalUAE = '37i9dQZEVXbM4UZuIrvHvA'
    let globalVietnam = '37i9dQZEVXbLdGSmz6xilI'
    let globalUSA = '37i9dQZEVXbLRQDuF5jeBp'
    let globalUruguay = '37i9dQZEVXbMJJi3wgRbAy'
    let globalUnitedKingdom = '37i9dQZEVXbLnolsZ8PSNw'
    let globalviral = [viralAustralia,viralArgentina,viralAustria,viralBelgium,viralBolivia,viralBrazil,viralBulgaria,
        viralCanada,viralColombia,viralChile,viralCzechRepublic,viralCostaRica,viralDenmark,viralEcuador,viralDominican,
        viralElSalvador,viralFrance,viralFinland, viralEstonia,viralEgypt,viralGreece,viralGlobal,viralGermany,
        viralHongKong,viralHonduras,viralGuatemala,viralIndonesia, viralIceland,viralHungary,viralItaly,viralIsrael,
        viralIreland,viralLuxembourg,viralLithuania,viralLatvia,viralJapan,viralNetherlands, viralMorocco,viralMexico,
        viralMalaysia,viralParaguay,viralPanama,viralNorway,viralNicaragua,viralNewZealand,viralRomania,viralPortugal,
        viralPoland,viralPhilippines,viralPeru,viralSlovakia,viralSingapore,viralSaudiArabia,viralRussia,viralSouthAfrica,
        viralTaiwan,viralSwitzerland,viralSweden,viralSpain,viralSouthKorea,viralUkraine,viralTurkey,viralThailand,viralUAE,
        viralVietnam,viralUSA,viralUruguay,viralUnitedKingdom,globalAustralia,globalArgentina,globalAustria,globalBelgium,
        globalBolivia,globalBrazil,globalBulgaria, globalCanada,globalColombia,globalChile,globalCzechRepublic,
        globalCostaRica,globalDenmark,globalEcuador, globalDominican,globalElSalvador,globalFrance,globalFinland,
        globalEstonia,globalEgypt,globalGreece,globalGlobal, globalGermany,globalHongKong,globalHonduras,globalGuatemala,
        globalIndonesia, globalIceland,globalHungary, globalItaly,globalIsrael,globalIreland,globalLuxembourg,
        globalLithuania,globalLatvia,globalJapan,globalNetherlands, globalMorocco,globalMexico,globalMalaysia,
        globalParaguay,globalPanama,globalNorway,globalNicaragua, globalNewZealand,globalRomania,globalPortugal,
        globalPoland,globalPhilippines,globalPeru,globalSlovakia, globalSingapore,globalSaudiArabia,globalRussia,
        globalSouthAfrica, globalTaiwan,globalSwitzerland,globalSweden, globalSpain,globalSouthKorea,globalUkraine,
        globalTurkey,globalThailand,globalUAE, globalVietnam,globalUSA, globalUruguay,globalUnitedKingdom]
    // console.log('247')
    // console.log(globalviral)
    for (let i=0;i <  globalviral.length;i++){
        axios({
            url:'https://api.spotify.com/v1/playlists/'+ globalviral[i] +'?fields=description,id,images,name,onwer,tracks(items(track(album(artists,id,images,name),artists(id,name),images,name,id,preview_url)))',
            method:'get',
            headers :{
                'Authorization': 'Bearer ' + cookies.replace(/(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/, "$1")}
            }).then(response => {
            Playlist.findOrCreate({where:{sid:globalviral[i]},defaults:{body:response.data,
                }}).catch(error =>{
                console.log('258 ' + error)
            })
        })
            .catch(error =>{
                console.log('52 ' + error)
            })}
            res.redirect('/')
}










// // Retrieve all User from the database.
// exports.findAll = (req, res) => {
//
// };
//
// // Find a single User with an id
// exports.findOne = (req, res) => {
//     const id = req.params.id;
//
//     User.findByPk(id)
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Error retrieving User with id=" + id
//             });
//         });
// };
//
// // Update a User by the id in the request
// exports.update = (req, res) => {
//     const id = req.params.id;
//
//     User.update(req.body, {
//         where: { id: id }
//     })
//         .then(num => {
//             if (num == 1) {
//                 res.send({
//                     message: "User was updated successfully."
//                 });
//             } else {
//                 res.send({
//                     message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Error updating User with id=" + id
//             });
//         });
// };
//
// // Delete a Tutorial with the specified id in the request
// exports.delete = (req, res) => {
//
// };
