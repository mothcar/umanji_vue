export default {

  getPlace: function(zoom_level, placeName) {
    let returnFlag = false
    let dictionary = []

    console.log('......... ', placeName)

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
        // console.log('This level is 12')
        dictionary = ['대학교', '공원', '에버랜드', '컨트리클럽']
      break
      case 13:
        // console.log('This level is 13')
        dictionary = ['대학교', '공원', '에버랜드', '컨트리클럽']
      break
      case 14:
        // console.log('This level is 14')
        dictionary = ['국립서울현충원', '대학교', '공원', '에버랜드', '컨트리클럽']
      break
      case 15:
        // console.log('This level is 15')
        dictionary = ['초등학교', '중학교', '고등학교', '국회의사당', '국립중앙박물관', '국립서울현충원', '대학교', '공원', '에버랜드', '컨트리클럽']
      break
      case 16:
        // console.log('This level is  16')
        dictionary = ['초등학교', '중학교', '고등학교', '아파트', '삼성 래미안', '국회의사당', '국립중앙박물관', '국립서울현충원', '대학교', '공원', '에버랜드', '컨트리클럽']
      break
      default:
        console.log('This is switch defatul - level is  : ', zoom_level)
        return this.isBuildingName(placeName)
    } // switch

    let result=[];
    let isWord
    let returnVal = false
    let word = ''

    for(var i=0; dictionary.length>i; i++){
      isWord = placeName.search(dictionary[i])
      // console.log('.................. word isWord : ', isWord)
        if(isWord >= 0){
          word = dictionary[i]
          console.log("From Wordservice this is BuILDING array ", dictionary[i])
          // console.log(".....................From Wordservice", isWord[0])
          returnVal = true
        } 
    }  // for
    return [returnVal, word]
  }, // getPlace

  isBuildingName(word){
    let infoList = ['자치회관', '주민센터', '구청', '시청', '군청', '서울특별시청']
    let checkInfo
    let returnVal = true
    let infoLevel = ''
    console.log('20180811 - isBuildingName : ', word)

    for(var j=0; infoList.length>j; j++){
      checkInfo = word.search(infoList[j])
      console.log('20180814 - for loop INFO CENTER  CHECK : ', checkInfo)

      if(checkInfo >= 0){
        console.log('20180811 - for loop INFO CENTER  if : ', checkInfo)
        infoLevel = infoList[j]
        returnVal = false
        break
      }
      // else{
      //   console.log('20180811 - for loop checkInfo else : ', checkInfo)
      //   return true
      //   break
      // }
    } // infoList for
    return [returnVal, infoLevel]

    // if(word.length >= 2){
    //   // console.log("From Wordservice this is BuILDING array ", word)
    //
    // } else {
    //   return false
    // }
  }, //isBuildingName


  getSimpleWord(zoom, word) {
    let endPosition = word.length
    let startPosition = 1

    switch(zoom){
      case 11: // Till this INFO CENTER ****************************************

      break

      case 12: // From this could be a SPACE ****************************************
      if(/대학교/.exec(word)){
        let centerName = word.substring(endPosition-3, endPosition+1)
        if(centerName == '대학교'){
          console.log(" building is center Name : ", centerName)
          return true
        } else {
          return false
        }
      } else if(/컨트리클럽/.exec(word)){
        let centerName = word.substring(endPosition-5, endPosition+1)
        if(centerName == '컨트리클럽'){
          console.log(" building is center Name : ", centerName)
          return true
        } else {
          return false
        }
      } // end of if else
      break

      case 15, 16, 17, 18, 19, 20:
        if(word.length > 2) {
          console.log(' THERE IS BUILDING NAME ................')
          return true
        } else {
          console.log(' THERE IS NO BUILDING NAME . SO YOU CAN NOT CREATE BUILDING.')
          return false
        }
      break

    } // switch

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
