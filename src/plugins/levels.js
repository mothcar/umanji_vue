export default {

  areaToLevel(area) {
    switch(area){
      case 'world':
        return 5
      break
      case 'country':
        return 8
      break
      case 'city_do':
        return 11
      break
      case 'gu_gun':
        return 14
      break
      case 'adminDong':
        return 17
      break
    }
    console.log('FUNCTION CALLED - AREATOLEVEL', area )

  }, // areaToLevel

  setToStandardAddress(address) {

    return new Promise(function (resolve, reject) {
      let placeAddress = {}
      placeAddress.place_type = 'infocenter'
      placeAddress.place_name = address.adminDong
      placeAddress.country = 'KR'
      placeAddress.locality = address.city_do
      placeAddress.sublocality_level_1 = address.gu_gun
      placeAddress.sublocality_level_2 = address.adminDong
      placeAddress.sublocality_level_3 = address.ri
      resolve(placeAddress);
    });

  } // setToStandardAddress



} // export default

/*
world: '세계',
country: '대한민국',
city_do: '',
gu_gun: '',
adminDong: '',
*/
