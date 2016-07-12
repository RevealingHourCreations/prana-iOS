import {observable} from 'mobx'

class Pranastore {
  @observable activeSubject = {
                                fullName : "",
                                key      : ""
                              }

  @observable reportTime  = {

                         startTime : 0,
                         endTime : 0
     }


   @observable currentUser = {

                      uid : 0,
                      email : null
   }

  setReportTime = (startTime, endTime) => {
    this.reportTime.startTime = startTime
    this.reportTime.endTime = endTime
  }

  setActiveSubject = (fullName, subjectKey) => {
    this.activeSubject.fullName = fullName
    this.activeSubject.key = subjectKey
  }

 setCurrentUser = (uid, email) => {
    this.currentUser.uid = uid
    this.currentUser.email = email
  }

  removeActiveSubjectKey = () => {
     this.activeSubject.fullName = ""
     this.activeSubject.key = ""
  }

}


const PranaStore = new Pranastore()
export default PranaStore
