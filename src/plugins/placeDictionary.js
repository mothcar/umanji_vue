export default {

  getPlace: function(zoom_level, placeName) {
    let returnFlag = false
    let filter = placeName

    switch(zoom_level){
      case 2:
        console.log('This level is 2')
      break
      case 3:
      break
      case 4:
      break
      case 5:
      break
      case 6:
      break
      case 7:
      break
      case 8:
      break
      case 9:
      break
      case 10:
      break
      case 11:
      break
      case 12:
        // if(){
        //   returnFlag = true
        // }
      break
      case 13:
        console.log('This level is 13')
      break
      case 14:
        console.log('This level is 14')
      break
      case 15:
        console.log('This level is 15')
        this.getSimpleWord(placeName)
      break
      case 16:
        console.log('This level is  16')
        this.getSimpleWord(placeName)
      break
      case 17:
        console.log('This level is  17')
      break
      case 18:
        console.log('This level is  18')
      break
      case 19:
        console.log('This level is  19')
      break
      case 20:
        console.log('This level is  20')
      break

    } // switch
    return returnFlag
  }, // getPlace

  getSimpleWord(word) {
    let endPosition = word.length
    let startPosition = 1

    if(/대학교/.exec(word)){
      let centerName = word.substring(endPosition-4, endPosition+1)
      if(centerName == '대학교'){
        console.log(" building is center Name : ", centerName)
        return centerName
      }
    } else if(/공원/.exec(word)){
      let centerName = word.substring(endPosition-2, endPosition+1)
      if(centerName == '공원'){
        console.log(" building is center Name : ", centerName)
        return centerName
      }
    }

  }, // getSimpleWord


  _getPlace(zoom_level, placeName) {
    let TAG = "compareLastWord"
    let type = ''

    let endPosition = placeName.length
    // sails.log.info(TAG+" building name end Position : ", endPosition)
    // start Position : buildingName.search('주민센터')
    let startPosition = 1
    if(/주민센터/.exec(placeName)){
      let centerName = placeName.substring(endPosition-4, endPosition+1)
      if(centerName == '주민센터'){
        console.log(TAG+" building is center Name : ", centerName)
        type = 'portal'
        return type
      }
    } else if(/구청/.exec(placeName)){
      let centerName = placeName.substring(endPosition-2, endPosition+1)
      if(centerName == '구청'){
        console.log(TAG+" building is center Name : ", centerName)
        type = 'portal'
        return type
      }
    } else if(/군청/.exec(placeName)){
      let centerName = placeName.substring(endPosition-2, endPosition+1)
      if(centerName == '군청'){
        console.log(TAG+" building is center Name : ", centerName)
        type = 'portal'
        return type
      }

    } else if(/시청/.exec(placeName)){
      let centerName = placeName.substring(endPosition-2, endPosition+1)
      if(centerName == '시청'){
        console.log(TAG+" building is center Name : ", centerName)
        type = 'portal'
        return type
      }

    } else if(/도청/.exec(placeName)){
      let centerName = placeName.substring(endPosition-2, endPosition+1)
      if(centerName == '도청'){
        console.log(TAG+" building is center Name : ", centerName)
        type = 'portal'
        return type
      }

    } else {
      type = 'place'
      return type
    }
  } // end of function


} // export default



// FUNCTIONS *********************************************************************

// check building or multi
function compareArrayWord(sets, word){

  let place_type = 'building'

  for(let i = 0; sets.length > i; i++){
    if(word.indexOf(sets[i])!=-1){
      // sails.log.info("compareArrayWord :: ", "there is "+sets[i])
      place_type = 'multi'
    }
  }
  // console.log('Iam function that i work compare array word place_type: ',place_type )
  return place_type;

}
