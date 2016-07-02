import {observable} from 'mobx'

class SubjectStore {
  @observable activeSubject = { 
                                fullName : "", 
                                key      : "" 
                              }

  setActiveSubject = (fullName, subjectKey) => {
    this.activeSubject.fullName = fullName
    this.activeSubject.key = subjectKey        
  }

  removeActiveSubjectKey = () => {
     this.activeSubject.fullName = ""
    this.activeSubject.key = ""    
  }

}


const subjectStore = new SubjectStore()
export default subjectStore
   