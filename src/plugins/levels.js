export default {

  areaToLevel(area) {
    switch(area){
      case 'world':
        return 3
      break
      case 'country':
        return 6
      break
      case 'city_do':
        return 12
      break
      case 'gu_gun':
        return 15
      break
      case 'adminDong':
        return 18
      break
    }
    console.log('FUNCTION CALLED - AREATOLEVEL', area )

  } // areaToLevel



} // export default

/*
world: '세계',
country: '대한민국',
city_do: '',
gu_gun: '',
adminDong: '',
*/
