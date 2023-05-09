
// creat
class validate{

    constructor(elem,option = {},elemCheckText){
        this.elem = elem
        this.value = ''
        this.maxOption = 0
        this._id  = (Math.random() + 1).toString(36).substring(2);
        this.stateIconCheck = `<i class='fa-solid fa-check'></i>`
        this.stateIconUnCheck = `<i class='fa-solid fa-xmark'></i>`

        this.elemCheckText =   typeof elemCheckText !== 'undefined' ? elemCheckText : '._none_' 
        this.check = false
        this.option = {
            
            matchTo :                       typeof option.matchTo                       !==  "undefined"   ? option.matchTo                      : '' ,
            matchToAll :                     typeof option.matchToAll                       !==  "undefined"   ? option.matchToAll                      : '' ,
            duplicate :                     typeof option.duplicate                       !==  "undefined"   ? option.duplicate                      : '' ,


            length :                        typeof option.length                        !== "undefined" ? option.length                     : 3 ,
            startWithNumber :               typeof option.startWithNumber               !== "undefined" ? option.startWithNumber            : false ,
            startWithUpperCase :            typeof option.startWithUpperCase            !== "undefined" ? option.startWithUpperCase         : false ,
            startWithLowerCase :            typeof option.startWithLowerCase            !== "undefined" ? option.startWithLowerCase         : false ,
            startWithSpecialCharecter :      typeof option.startWithSpecialCharecter    !== "undefined" ? option.startWithSpecialCharecter   : false ,

            noNumber :                      typeof option.noNumber                      !== "undefined" ? option.noNumber                   : false ,
            noUpperCase :                   typeof option.noUpperCase                   !== "undefined" ? option.noUpperCase                : false ,
            noLowerCase :                   typeof option.noLowerCase                   !== "undefined" ? option.noLowerCase                : false ,
            noSpecialCharecter :             typeof option.noSpecialCharecter           !== "undefined" ? option.noSpecialCharecter          : false ,

            containsNumber :                typeof option.containsNumber                !== "undefined" ? option.containsNumber             : false ,
            containsUpperCase :             typeof option.containsUpperCase             !== "undefined" ? option.containsUpperCase          : false ,
            containsLowerCase :             typeof option.containsLowerCase             !== "undefined" ? option.containsLowerCase          : false ,
            containsSpecialCharecter :       typeof option.containsSpecialCharecter     !== "undefined" ? option.containsSpecialCharecter    : false ,

            email :                         typeof option.email                         !== "undefined" ? option.email                      : false ,
            youtubeLink :                   typeof option.youtubeLink                   !== "undefined" ? option.youtubeLink                : false ,

            whitespace :                    typeof option.whitespace                    !== "undefined" ? option.whitespace                 : true ,
            empty :                         typeof option.empty                         !== "undefined" ? option.empty                      : true ,

        }

        this.lang = {
            en : {
                length :  `At least ${this.option.length} charecters`,
                startWithNumber :   'Start with number',
                startWithUpperCase : "Start with uppercase"       ,
                startWithLowerCase : "Start with lowercase"       ,
                startWithSpecialCharecter : "Start with special charecter" ,
                noNumber : "No number"                 ,
                noUpperCase : "No uppercase"              ,
                noLowerCase : "No lowercase"              ,
                noSpecialCharecter : "No specialcharecter"        ,
                containsNumber : "Contains number"           ,
                containsUpperCase : "Contains uppercase"        ,
                containsLowerCase : "Contains lowercase"        ,
                containsSpecialCharecter : "Contains special charecter"  ,
                email :'Email',
                youtubeLink :"Youtube Link" ,
                whitespace :"No whitespace",
                empty :"No Empty",
                matchTo :"Matched One",
                matchToAll :"Matched All",
                duplicate :"No Duplicate",

            }

        }

        this.newLang = {}

        this.optionArr = []
        this.res = {

            empty: this.elem.value.length > 0 ? false : true,
            optionList : {
                match: undefined,
                matchAll: undefined,
                duplicate: undefined,
                length : undefined,

            },
            options: undefined,
            pass: undefined,
            result: undefined,
            value: this.elem.value,

        }

        this.inputData =  this.res


        //prerender method
        this.init()
    }

 
    initLang(lang,newLangOption){

        for(let item in newLangOption){
            this.lang[lang][item]  = newLangOption[item]
        }
        
        this.renderText()
    }

    renderText(){
        if(this.elemCheckText != '._none_'){
            let validateText = document.querySelector(this.elemCheckText)
            validateText.innerHTML = ''

            this.optionArr.forEach((item,i)=>{
                console.log(`${i+1} : ${item}`)

                this.renderCheckText(validateText,item)
            })
        }
    }

    
    renderCheckText(validateText,optionText,stateIcon = this.stateIconUnCheck){

        if(validateText){

            validateText.insertAdjacentHTML("afterbegin",
    
            ` <span id="validate-check-${optionText}-${this._id}">${stateIcon} ${this.lang.en[optionText]}</span>`
            
            )
        }
    }


    init(){
        let c= 0
        
        for(let key in this.option){
            if (Object.hasOwn(this.option, key)) {

                if(typeof this.option[key] === 'boolean' && this.option[key] === true){
                        this.optionArr.push(key)
                }
                if(typeof this.option[key] === 'boolean'){
                    c++
                }
             }
        }

        if(this.option.length > -1){
            this.optionArr.push('length')
            c++
         }
         
         if(this.option.matchTo.length > 0){
            this.optionArr.push('matchTo')
            c++
         }

                 
         if(this.option.matchToAll.length > 0){
            this.optionArr.push('matchToAll')
            c++
         }

         if(typeof this.option.duplicate === 'function'){
            this.optionArr.push('duplicate')

         }


        this.maxOption  = this.optionArr.length

        console.log("+------------------------------------+")
        console.log(`Includes ${this.optionArr.length} / ${c} Options`)
        
        this.renderText()

        console.log("+------------------------------------+")

        this.initEvent('change')
        this.initEvent('keyup')
        this.initEvent('paste')

        this.elem.addEventListener('checkMatch',(e)=>{
           /*  console.log('checkMatch Trigger !!!') */
          this.match()
          
        })

        this.elem.addEventListener('checkMatchAll',(e)=>{
         /*    console.log('checkMatchAll Trigger !!!') */
          this.matchAll()
          
        })

    }


    match(){
        if(this.value.length > 0){

        let  filterMatch = $(this.option.matchTo).toArray().filter(item =>  this.elem.value === item.value && item )
   
        $(this.option.matchTo).removeClass("input-error")
        $(this.option.matchTo).removeClass("input-valid")

        if(filterMatch.length > 0){
            filterMatch.forEach((item)=>{

                $(item).addClass("input-valid")
            })

            this.checkingText('matchTo')
            this.res.optionList.match = true
            return true
        }else{
            $(this.option.matchTo).addClass("input-error")

            this.unCheckingText('matchTo')
            this.res.optionList.match = false

            return false
        }
    }
    }

    matchAll(){
        if(this.value.length > 0){

            let  filterAllMatch = $(this.option.matchToAll).toArray().every(item =>  this.elem.value === item.value && item )

            if(filterAllMatch){
                this.checkingText('matchToAll')
                this.res.optionList.matchAll = true

                return true
            }else{
                this.unCheckingText('matchToAll')
                this.res.optionList.matchAll = false

                return false
            }
        }
    }

    checkDuplicate(callbackApi){

        if(callbackApi){
            this.unCheckingText('duplicate')
            return true
        }else{

            this.checkingText('duplicate')
            return false

        }
    }

    //* Use Outside Class
    customCheckText(section,text){
        let elemCheck =  document.querySelector(`#validate-check-${section}-${this._id}`)
        if(elemCheck){
            let newText =  elemCheck.innerHTML.split(' | ')
            elemCheck.innerHTML = `${newText[0]} | ${text}`
        }
    }

    checkingText(section ){

        let elemCheck =  document.querySelector(`#validate-check-${section}-${this._id}`)
        if(elemCheck){
            elemCheck.innerHTML = `<i class="fa-solid fa-check"></i> | ${this.lang.en[section]}`
            elemCheck.classList.add("text-valid")
            elemCheck.classList.remove("text-error")
        }
        
    }

   
    unCheckingText(section){

        let elemCheck =  document.querySelector(`#validate-check-${section}-${this._id}`)
        if(elemCheck){
            elemCheck.innerHTML = `<i class="fa-solid fa-xmark"></i> | ${this.lang.en[section]}`
            elemCheck.classList.add("text-error")
            elemCheck.classList.remove("text-valid")
        }
    }

    initEvent(event,callback){


            const startWithNumber = /^[0-9]/;
            const startWithUpperCase = /^[A-Z]/;
            const startWithLowerCase = /^[a-z]/;
            const startWithSpecialCharecter = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

            const containsNumber = /[0-9]/;
            const containsUpperCase = /[A-Z]/;
            const containsLowerCase = /[a-z]/;
            const containsSpecialCharecter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
            

            const noNumber = /^[^0-9]*$/;
            const noUpperCase = /^[^A-Z]*$/;
            const noLowerCase = /^[^a-z]*$/;
            const noSpecialCharecter = /^[^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;


            const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const youtubeLink = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;

            const whitespace = /^\S*$/;
            //* --/--/----


            this.elem.addEventListener(event,(e) => {
            
        
            let value = this.elem.value
            let pass = 0
            let max = this.maxOption

            this.value = this.elem.value
            
            //* necessary  option
            if(value.length >= this.option.length && this.option.length > -1){
                console.log('✅ | Length')
                this.checkingText('length')
                this.res.optionList.length = true
                pass++
            }else {
                this.unCheckingText('length')
                this.res.optionList.length = false
            }

            if(value.length > 0 ){
                console.log('✅ | No Empty')
                this.checkingText('empty')
                pass++
            }else {
                this.unCheckingText('empty')
            }


            if(whitespace.test(value) && value.length > 0 ){
                console.log("✅ | No white space ")
                this.checkingText('whitespace')
                this.res.whitespace = false

                pass++
            }else {
                this.unCheckingText('whitespace')
                this.res.whitespace = true
            }


            //*------------------------------------------------------------------

            if(this.match() && this.option.matchTo && this.elem.value.length > 0){
                console.log('✅ | matchTo')

                $(this.option.matchTo).on('change, keyup',(e)=>{
               
                        this.elem.dispatchEvent(new Event('checkMatch'))
                })
                
                this.res.optionList.match = true
                pass++

            }else {

                $(this.option.matchTo).on('change, keyup',(e)=>{
                    this.elem.dispatchEvent(new Event('checkMatch'))

                })

                this.res.optionList.match = false
                
            }

            //*------------------------------------------------------------------

            if(this.matchAll() && this.option.matchToAll && this.elem.value.length > 0){
                console.log('✅ | matchToAll')

                $(this.option.matchToAll).on('change, keyup',(e)=>{
                        this.elem.dispatchEvent(new Event('checkMatchAll'))
                })

               this.res.optionList.matchAll = true
                pass++

            }else {
                $(this.option.matchToAll).on('change, keyup',(e)=>{
                    this.elem.dispatchEvent(new Event('checkMatchAll'))
                })
                
               this.res.optionList.matchAll = false
                
            }

            //*------------------------------------------------------------------

            if( typeof this.option.duplicate === 'function' && this.checkDuplicate(this.option.duplicate(this.value))){
                console.log('✅ | Duplicate')
                this.res.optionList.duplicate = true
                pass++

            }else {

                this.res.optionList.duplicate = false
                
            }


          


    
            
            //*----------------------------------------------

            if(startWithNumber.test(value) && this.option.startWithNumber){
                console.log("✅ | startWith Number")
                this.checkingText('startWithNumber')
                this.res.optionList.startWithNumber = true

                pass++
            }else {
                this.unCheckingText('startWithNumber')
                this.res.optionList.startWithNumber = false
            }

            if(startWithUpperCase.test(value) && this.option.startWithUpperCase){

            this.res.optionList.startWithNumber = false
                console.log("✅ | startWith UpperCase ")
                this.res.optionList.startWithUpperCase = true

                this.checkingText('startWithUpperCase')
                pass++
            }else {
                this.res.optionList.startWithUpperCase = false
                this.unCheckingText('startWithUpperCase')
            }

            if(startWithLowerCase.test(value) && this.option.startWithLowerCase){
                console.log("✅ | startWith LowerCase ")
                this.res.optionList.startWithLowerCase = true

                this.checkingText('startWithLowerCase')
                pass++
            }else {
                this.res.optionList.startWithLowerCase = false
                this.unCheckingText('startWithLowerCase')
            }

            if(startWithSpecialCharecter.test(value) && this.option.startWithSpecialCharecter){

                console.log("✅ | startWith )cter ")
                this.res.optionList.startWithNumber = true

                this.checkingText('startWithSpecialCharecter')
                pass++
            }else {
                this.res.optionList.startWithNumber = false
                this.unCheckingText('startWithSpecialCharecter')
            }

            //*----------------------------------------------

            if(noNumber.test(value) && this.option.noNumber){
                console.log("✅ | no Number")
                this.res.optionList.noNumber = true
                this.checkingText('noNumber')
                pass++
            }else {
                this.unCheckingText('noNumber')
                this.res.optionList.noNumber = false
            }

            if(noUpperCase.test(value) && this.option.noUpperCase){
                console.log("✅ | no UpperCase ")
                this.res.optionList.noUpperCase = true

                this.checkingText('noUpperCase')
                pass++
            }else {
                this.res.optionList.noUpperCase = false
                this.unCheckingText('noUpperCase')
            }

            if(noLowerCase.test(value) && this.option.noLowerCase){
                console.log("✅ | no LowerCase ")
                this.res.optionList.noLowerCase = true

                this.checkingText('noLowerCase')
                pass++
            }else {
                this.res.optionList.noLowerCase = false
                this.unCheckingText('noLowerCase')
            }

            if(noSpecialCharecter.test(value) && this.option.noSpecialCharecter){
                console.log("✅ | no SpecialCharecter ")
                this.res.optionList.noSpecialCharecter = true

                this.checkingText('noSpecialCharecter')
                pass++
            }else {
                this.res.optionList.noSpecialCharecter = false
                this.unCheckingText('noSpecialCharecter')
            }
            
            

            //*----------------------------------------------

            if(containsNumber.test(value) && this.option.containsNumber){
                console.log("✅ | contains Number")
                this.res.optionList.containsNumber = true

                this.checkingText('containsNumber')
                pass++
            }else {
                this.res.optionList.containsNumber = false
                this.unCheckingText('containsNumber')
            }

            if(containsUpperCase.test(value) && this.option.containsUpperCase){
                console.log("✅ | contains UpperCase")
                this.res.optionList.containsUpperCase = true

                this.checkingText('containsUpperCase')
                pass++
            }else {
                this.res.optionList.containsUpperCase = false
                this.unCheckingText('containsUpperCase')
            }

            if(containsLowerCase.test(value) && this.option.containsLowerCase){
                console.log("✅ | contains LowerCase")
                this.res.optionList.containsLowerCase = true

                this.checkingText('containsLowerCase')
                pass++
            }else {
                this.res.optionList.containsLowerCase = false
                this.unCheckingText('containsLowerCase')
            }

            if(containsSpecialCharecter.test(value) && this.option.containsSpecialCharecter){
                console.log("✅ | contains SpecialCharecter ")
                this.res.optionList.containsSpecialCharecter = true

                this.checkingText('containsSpecialCharecter')
                pass++
            }else {
                this.res.optionList.containsSpecialCharecter = false
                this.unCheckingText('containsSpecialCharecter')
            }


            //*----------------------------------------------


      

            
            if(email.test(value) && this.option.email){
                console.log("✅ | Email ")
                this.res.optionList.emailumber = true

                this.checkingText('email')
                pass++
            }else {
                this.res.optionList.emailumber = false
                this.unCheckingText('email')
            }

            if(youtubeLink.test(value) && this.option.youtubeLink){
                console.log("✅ | Youtube Link ")
                this.res.optionList.youtubeLink = true

                this.checkingText('youtubeLink')
                pass++
            }else {
                this.res.optionList.youtubeLink = false
                this.unCheckingText('youtubeLink')
            }


      
            if(value.startsWith('kuy')){
                console.log("✅ | match startsWith ")
                pass++
            }

            if(value.endsWith('eiei')){
                console.log("✅ | match endsWith ")
                pass++
            }

            console.log(`Pass : ${pass} / ${max}`)
            console.log("--------------------------")

       
                this.res.value = value
                this.res.empty = value.length > 0 ? false : true
                this.res.pass = pass
                this.res.options = max
                this.res.result = pass === max ? true : false
    

            this.inputData = this.res

            if(typeof callback === 'function'){
                callback(this.res)
            }
        })
        
    }

}

Element.prototype.validate = function (option,elemCheckText) {

    let d

    [this].forEach((item, i) => {
        d =  new validate(item,option,elemCheckText)
    })

    return d

}

Object.prototype.validate = function (option,elemCheckText) {

    let d

    this.forEach((item,i)=>{
         d =  new validate(item,option,elemCheckText)
    })
    
    return d
}


function checkUserRegist(value){

    if(value === '123'){
        return true
    }
    
    return  false

}

let username = document.querySelector('#username').validate({matchTo : '#password',matchToAll : '.password-check',duplicate : checkUserRegist},'.validationText')
let password = document.querySelector('#password').validate({matchTo : '#username'})



String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}



username.initLang('en',{duplicate:"Test No Duplicate"})


username.initEvent('keyup',(res)=>{

  console.log(res)


})


password.initEvent('keyup',(res)=>{
    
    console.log(username.res)

})




