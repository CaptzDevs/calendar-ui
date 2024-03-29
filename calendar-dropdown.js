//--------------------------------------

//Calendar [RELEASE]
//Version : v1.0.0 By Captz

//--------------------------------------
const _CALENDAR_DROPDOWN = ()=>{

let dropdown_arr = [
    'dropdown-section dropdown-section-date',
    'dropdown-section dropdown-section-month',
    'dropdown-section dropdown-section-year',
    'dropdown-body dropdown-date',
    'dropdown-body dropdown-month',
    'dropdown-body dropdown-year',
    'dropdown-items dropdown-item-date' , 
    'dropdown-items dropdown-item-month',
    'dropdown-items dropdown-item-year',
 ]
 
/*  console.log = function() {}  */
 const LANG= {
    th: {
        d: {
            full: {
                d_th: ["", "อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"],
            },
            sm: {
                d_th_sm: ["", "อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"],
            }
        },
        m: {
            full: {
                m_th: ["", "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม", ],
            },
            sm: {
                m_th_sm: ["", "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.", ],
            }
        }
    },
    en: {
        d: {
            full: {
                d_th: ["", "อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"],
            },
            sm: {
                d_th_sm: ["", "อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"],
            }
        },
        m: {
            full: {
                m_en: ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            },
            sm: {
                m_en_sm: ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],

            }
        }
    },
    d_th_null: [''],
    d_tnull: [''],
    d_en_null: [''],
    d_enull: [''],

    d_th_full: ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"],
    d_th_sm: ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"],
    d_en_full: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    d_en_sm: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],

    m_th_full: ["", "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม", ],
    m_th_sm: ["", "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.", ],
    m_en_full: ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    m_en_sm: ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    y_en_sm: (" " + new Date().getFullYear()).slice(-2),
    y_en_full: new Date().getFullYear(),
    y_th_sm: (" " + (new Date().getFullYear() + 543)).slice(-2),
    y_th_full: new Date().getFullYear() + 543,


}


function isNumber(n){
    return !isNaN(n) ? true : false
}

let dateEvent = new CustomEvent('dateChange', {
    value: 'Hello, world!'
});


const defaultOption = {
        
    lang: "th",
    
    month : 'full', //number , full ,small
    year : 'full',
    yearType: "BE",

    dateMin: 1,
    dateMax: 31,

    monthMin: 1,
    monthMax: 12,

    yearMin: 2500,
    yearMax: 2565,



    selectable: true,
    closeOnSelect: true,
    autoAdjustMaxMin: true,
    autoValue: true,

}

class CalendarDropdown{
    constructor(elem , option = {

        lang: String(),
        month : String(),
        year : String(),
        yearType: String(),

        dateMax: Number(),
        dateMin: Number(),

        monthMax: Number(),
        monthMin: Number(),

        yearMax: Number(),
        yearMin: Number(),

      
        selectable: Boolean(),
        closeOnSelect: Boolean(),
        autoAdjustMaxMin: Boolean(),
        autoValue: Boolean(),

    }){
        {
            this.elem = elem
            this._id  = (Math.random() + 1).toString(36).substring(2);

            this.dateInput = null
            this.monthInput = null
            this.yearInput = null

            this.elems = [] // set of parent element ex. input 

            this.value = null
            this.valueText = null
            this.fulldate = null

            this.dateValid = false

            this.dateData = {}

            
    
            this.option = {
                lang:                   option.lang              !== undefined  ? option.lang               :  defaultOption.lang,
                month :                 option.month             !== undefined  ? option.month              : defaultOption.month,
                year :                  option.year              !== undefined  ? option.year               : defaultOption.year,

                yearType:               option.yearType          !== undefined  ? option.yearType           :  defaultOption.yearType,
    
                dateMin:                 option.dateMin            !== undefined  ? option.dateMin             :  defaultOption.dateMin ,
                dateMax:                 option.dateMax            !== undefined  ? option.dateMax             :  defaultOption.dateMax ,
                monthMin:               option.monthMin          !== undefined  ? option.monthMin           :  defaultOption.monthMin ,
                monthMax:               option.monthMax          !== undefined  ? option.monthMax           :  defaultOption.monthMax ,
                yearMin:                option.yearMin           !== undefined  ? option.yearMin            :  defaultOption.yearMin ,
                yearMax:                option.yearMax           !== undefined  ? option.yearMax            :  defaultOption.yearMax ,

                selectable:             option.selectable        !== undefined  ? option.selectable         :  defaultOption.selectable,
                closeOnSelect:          option.closeOnSelect     !== undefined  ? option.closeOnSelect      :  defaultOption.closeOnSelect,
                autoAdjustMaxMin:       option.autoAdjustMaxMin  !== undefined  ? option.autoAdjustMaxMin   :  defaultOption.autoAdjustMaxMin,
                autoValue:              option.autoValue         !== undefined  ? option.autoValue          :  defaultOption.autoValue,
    
            } 

            this.arr_count = 0;
            this.init()
    }
}

    init(){
        this.renderCalendarDropDown()

        //Init class that not close when click on it
            dropdown_arr.push('dropdown-section dropdown-section-date dropdown-input-'+this._id+" input_focus")
            dropdown_arr.push('dropdown-section dropdown-section-month dropdown-input-'+this._id+" input_focus")
            dropdown_arr.push('dropdown-section dropdown-section-year dropdown-input-'+this._id+" input_focus")

            dropdown_arr.push('dropdown-section dropdown-section-date dropdown-input-'+this._id+" input_error input_focus")
            dropdown_arr.push('dropdown-section dropdown-section-month dropdown-input-'+this._id+" input_error input_focus")
            dropdown_arr.push('dropdown-section dropdown-section-year dropdown-input-'+this._id+" input_error input_focus")

            dropdown_arr.push('dropdown-section dropdown-section-date dropdown-input-'+this._id)
            dropdown_arr.push('dropdown-section dropdown-section-month dropdown-input-'+this._id)
            dropdown_arr.push('dropdown-section dropdown-section-year dropdown-input-'+this._id)
     
        //Init Event onclose
        addEventListener('click',(e)=>{
            
                if(!dropdown_arr.includes(e.target.className)){
                    $(".dropdown-body.dropdown-date").remove()
                    $(".dropdown-body.dropdown-month").remove()
                    $(".dropdown-body.dropdown-year").remove()
            }
        })

        addEventListener('touchend',(e)=>{
            if(!dropdown_arr.includes(e.target.className)){
                $(".dropdown-body.dropdown-date").remove()
                $(".dropdown-body.dropdown-month").remove()
                $(".dropdown-body.dropdown-year").remove()
            }
        })

    }

    checkLang(section){
        let lang = this.option.lang
        let size = this.option[section]
        let selectedLang = `${section.slice(0,1)}_${lang}_${size}`

        return selectedLang
        
    }

    isMobileDevice() {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
      };
      
    isValidDate(dateStr) {
        const date = new Date(dateStr);
        if (isNaN(date.getTime()) || dateStr.slice(5, 7) != date.getMonth() + 1 || dateStr.slice(0, 4) != date.getFullYear()) {
          return false;
        }
    
        return dateStr.slice(8) == date.getDate();
      }

    checkDateValidation(){

        let date = this.dateInput 
        let month = this.monthInput 
        let year = this.yearInput 
        let validateDate = `${year.dataset.year}-${("0"+month.dataset.month).slice(-2)}-${('0'+date.dataset.date).slice(-2)}`
        

        if(date.value != "" && month.value != "" && year.value != "" ){
            
            if(this.isValidDate(validateDate)){
                    console.log('Valid')

                    this.dateValid = true
                    this.value = `${year.dataset.year}-${("0"+month.dataset.month).slice(-2)}-${('0'+date.dataset.date).slice(-2)}`
                    this.valueText = `${date.dataset.value}/${(month.dataset.value)}/${(year.dataset.value)}`
                    this.fulldate = `${year.dataset.year}${("0"+month.dataset.month).slice(-2)}${('0'+date.dataset.date).slice(-2)}`

                    this.dateData = {dateValid : this.dateValid ,value: this.value , valueText : this.valueText , fulldate: this.fulldate,dateSet : {
                        date : date.dataset.date,
                        month : month.dataset.month,
                        monthText : month.dataset.value,
                        year : year.dataset.year,

                    }}

                    this.dateInput.classList.remove("input_error")
                    this.monthInput.classList.remove("input_error")
                    this.yearInput.classList.remove("input_error")

                    return {dateValid : this.dateValid ,value: this.value , valueText : this.valueText , fulldate: this.fulldate,dateSet : {
                        date : date.dataset.date,
                        month : month.dataset.month,
                        monthText : month.dataset.value,
                        year : year.dataset.year,

                    }}
                }else{
                    console.log('invalid')
                    this.dateValid = false

                    this.value = null
                    this.valueText = null
                    this.fulldate = null
                    this.dateInput.classList.add("input_error")
                    this.monthInput.classList.add("input_error")
                    this.yearInput.classList.add("input_error")

                    this.dateData = {dateValid : this.dateValid ,value: this.value , valueText : this.valueText , fulldate: this.fulldate,dateSet : {
                        date : date.dataset.date,
                        month : month.dataset.month,
                        monthText : month.dataset.value,
                        year : year.dataset.year,

                    }}
                    
                    return {dateValid : this.dateValid ,value: this.value , valueText : this.valueText , fulldate: this.fulldate}


                }   
            }

           
    }
    
    onDateChange(callback){
        Array(this.dateInput,this.monthInput,this.yearInput).forEach(item=>{
            item.addEventListener('dateChange',(e)=>{
                        callback(this.checkDateValidation())
               })
          }) 
    }
    renderCalendarDropDown(){
       
        this.elem.classList.add('d-none')
        
        this.elem.insertAdjacentHTML('afterend',`    
        <div class="calendar-dropdown dropdown-type-1">
            <div class="dropdown-wraper dropdown-wraper-date">
                <input class="dropdown-section dropdown-section-date dropdown-input-${this._id}" type="text" placeholder="dd" autocomplete="off">
            </div>
        
            <div class="dropdown-wraper dropdown-wraper-month">
                <input class="dropdown-section dropdown-section-month dropdown-input-${this._id}" type="text" placeholder="mm" autocomplete="off">
            </div>

            <div class="dropdown-wraper dropdown-wraper-year">
                <input class="dropdown-section dropdown-section-year dropdown-input-${this._id}" type="text" placeholder="yyyy" autocomplete="off">
            </div>

        </div>`
      )

        this.dateInput = document.querySelector(`.dropdown-section-date.dropdown-input-${this._id}`) 
        this.monthInput = document.querySelector(`.dropdown-section-month.dropdown-input-${this._id}`) 
        this.yearInput = document.querySelector(`.dropdown-section-year.dropdown-input-${this._id}`) 

     
      //add event 

   

      this.dateInput.addEventListener('change',(e)=>{
       this.checkDateValidation()
       e.target.dispatchEvent(dateEvent)
      })

      this.monthInput.addEventListener('change',(e)=>{
        this.checkDateValidation()
       e.target.dispatchEvent(dateEvent)

      })


      this.yearInput.addEventListener('change',(e)=>{
        this.checkDateValidation()
       e.target.dispatchEvent(dateEvent)

      })


     /*  if(this.isMobileDevice()){
        this.dateInput.addEventListener("focus",(e)=>{
                    $("body").css('transform','translateY(-150px)')

        })
        this.monthInput.addEventListener("focus",(e)=>{
                    $("body").css('transform','translateY(-150px)')

        })
        this.yearInput.addEventListener("focus",(e)=>{
                    $("body").css('transform','translateY(-150px)')

        })

        this.dateInput.addEventListener("blur",(e)=>{
                    $("body").css('transform','translateY(0px)')

        })
        this.monthInput.addEventListener("blur",(e)=>{
                    $("body").css('transform','translateY(0px)')

        })
        this.yearInput.addEventListener("blur",(e)=>{
                    $("body").css('transform','translateY(0px)')

        })
     
    } */

    //-------------------Date Event------------------------
    this.dateInput.addEventListener("focus",(e)=>{
  
        this.dateInput.classList.add("input_focus")
        this.monthInput.classList.remove("input_focus")
        this.yearInput.classList.remove("input_focus")

        this.isMobileDevice() ? this.dateInput.blur() : this.dateInput.select()

        this.renderDate()

        let min = +this.option.dateMin
        let max = +this.option.dateMax


        this.dateInput.addEventListener('keyup',(e)=>{

            let value = this.dateInput.value

            if(isNumber(value)){
                if(value.length === 1 && e.key === "Enter"  ){
                    value = ("0"+value).slice(-2)
                }
                if(value.length >= 2){
                    if( value >= min && value <= max ) {
                        
                        console.log(value)
                        this.dateInput.value = value
                        this.dateInput.setAttribute('data-date',value)
                        this.dateInput.setAttribute('data-value',value)
                        
                        this.monthInput.focus()

                    }
                    else{
                        this.dateInput.value = max
                        this.dateInput.setAttribute('data-date',max)
                        this.dateInput.setAttribute('data-value',max)
                        this.monthInput.focus()

                    }
                }
            }
            else{
                e.target.value = ''
            }
        })

        this.dateInput.addEventListener("change",(e)=>{
            let value = this.dateInput.value
            if(value.length === 1 && value !== '0'){
                value = ("0"+value).slice(-2)
                this.dateInput.value = value
                this.dateInput.setAttribute('data-date',value)
                this.dateInput.setAttribute('data-value',value)
                  
                this.monthInput.focus()
            }
        })

        $(".dropdown-body.dropdown-month").remove()
        $(".dropdown-body.dropdown-year").remove()

    })

    //------------------Month Event------------------------------
    
    this.monthInput.addEventListener("focus",(e)=>{

        this.dateInput.classList.remove("input_focus")
        this.monthInput.classList.add("input_focus")
        this.yearInput.classList.remove("input_focus")


        this.renderMonth()


        if( ! this.isMobileDevice() ){

        let min = +this.option.monthMin
        let max = +this.option.monthMax
        
        let checkLang = this.checkLang('month')

        console.log(checkLang)
        if(this.option.month !== "number"){
            if(this.monthInput.value !== ''){
                console.log(this.monthInput.value)
                let index = LANG[checkLang].indexOf(this.monthInput.value)
                
                this.monthInput.value = ('0'+index).slice(-2)
                this.monthInput.setAttribute("value",('0'+index).slice(-2))
                this.monthInput.setAttribute("data-value",('0'+index).slice(-2))
                this.monthInput.setAttribute('data-month',('0'+index).slice(-2))

            }
        }

        this.monthInput.addEventListener('blur',(e)=>{
            let value = this.monthInput.value
  
            if(isNumber(value) && value.length === 1){
                console.log('b1')

                value = ("0"+value).slice(-2)
                this.monthInput.value = value
                this.monthInput.setAttribute('value',value)
                this.monthInput.setAttribute('data-value',value)
                this.monthInput.setAttribute('data-month',value)
            }
            
             if(this.option.month !== "number" && isNumber(this.monthInput.value) && this.monthInput.value.length === 2){
                console.log('b2')

                 this.monthInput.value = LANG[checkLang][+value]
                 this.monthInput.setAttribute("value",LANG[checkLang][+value])
                 this.monthInput.setAttribute("data-value",LANG[checkLang][+value])
                 this.monthInput.setAttribute('data-month',('0'+value).slice(-2))
           

                this.monthInput.dispatchEvent(new Event('change'))
                
            }
          
        })
       
    
        this.monthInput.addEventListener('keyup',(e)=>{

                let value = this.monthInput.value

               
                if(isNumber(value) && value.length > 2){

                    this.monthInput.value = ''
                    this.monthInput.setAttribute('value','')
                    this.monthInput.setAttribute('data-value','')
                    this.monthInput.setAttribute('data-month','')

                }
                if((!isNumber(value) && !LANG[checkLang].includes(value)) ){

                    console.log('e',value)
                    this.monthInput.value = ''
                    this.monthInput.setAttribute('value','')
                    this.monthInput.setAttribute('data-value','')
                    this.monthInput.setAttribute('data-month','')

                }
                else if(isNumber(value)){
                    if(value.length === 1 && e.key === "Enter"){
                        console.log('1')
                            value = ("0"+value).slice(-2)
                    }
                    if(value.length === 2 ){
                        if( +value >= min && +value <= max ) {
                            console.log('2')
                            
                            if(this.option.month !== 'number'){
                                console.log('21')
                                this.monthInput.value = LANG[checkLang][+value]
                                this.monthInput.setAttribute('value',LANG[checkLang][+value])
                                this.monthInput.setAttribute('data-value',LANG[checkLang][+value])
                            }else{
                                console.log('22')
                                this.monthInput.value = value
                                this.monthInput.setAttribute('value',value)
                                this.monthInput.setAttribute('data-value',value)
                            }
                            
                            this.monthInput.setAttribute('data-month',value)
                            this.yearInput.focus()
                        }
                        else{
                            console.log('3')
                            //if input is more than or less than limit maxmin option

                            this.monthInput.value = max
                            this.monthInput.setAttribute('value',max)
                            this.monthInput.setAttribute('data-value',max)
                            this.monthInput.setAttribute('data-month',max)

                            if(this.option.month !== 'number'){
                                this.monthInput.value = LANG[checkLang][+this.monthInput.dataset.month]
                                this.monthInput.setAttribute('value',LANG[checkLang][+this.monthInput.dataset.month])
                                this.monthInput.setAttribute('data-value',LANG[checkLang][+this.monthInput.dataset.month])
                                
                            }
                            this.yearInput.focus()

                        }
                    }
                }else if(this.option.month !== 'number' && isNumber(this.monthInput.value)){
                    console.log('3')
                        this.monthInput.value = LANG[checkLang][+value]
                        this.monthInput.setAttribute("value",LANG[checkLang][+value])
                        this.monthInput.setAttribute("data-value",LANG[checkLang][+value])

                        this.monthInput.setAttribute('data-month',value)
                        this.yearInput.focus()

                    
                }
             
            })

       

        this.monthInput.select()
    }else{
        this.monthInput.blur()
    }

        $(".dropdown-body.dropdown-date").remove()
        $(".dropdown-body.dropdown-year").remove()
    })

    //--------------------Year Event----------------------------


    this.yearInput.addEventListener("focus",(e)=>{

        this.dateInput.classList.remove("input_focus")
        this.monthInput.classList.remove("input_focus")
        this.yearInput.classList.add("input_focus")

        this.isMobileDevice() ? this.yearInput.blur() : this.yearInput.select()

        this.renderYear()

        let min = +this.option.yearMin
        let max = this.option.yearMax

        this.yearInput.addEventListener("keyup",(e)=>{

            let value = +e.target.value

            if(!isNaN(e.target.value)){
                if(e.target.value.length >= 4){
                    if( value >= min && value <= max ) {

            
                         this.yearInput.setAttribute('value',value)
                         this.yearInput.setAttribute('data-value',value)
                         this.yearInput.setAttribute('data-year',value)

                         $(".dropdown-body.dropdown-year").remove()
                         this.yearInput.blur()

                    }
                    else{
                        e.target.value = max
                        this.yearInput.setAttribute('value',max)
                        this.yearInput.setAttribute('data-value',max)
                        this.yearInput.setAttribute('data-year',max)

                        this.yearInput.classList.remove('input_focus')
                        this.yearInput.blur()
                        this.yearInput.dispatchEvent(new Event('change'))

                        $(".dropdown-body.dropdown-year").remove() 

                    }
                }
            }
            else{
                e.target.value = ''
            }
        })

        this.yearInput.addEventListener('change',(e)=>{
            if(this.yearInput.value.length < 4){

                e.target.value = max
                this.yearInput.setAttribute('value',max)
                this.yearInput.setAttribute('data-value',max)
                this.yearInput.setAttribute('data-year',max)

                this.yearInput.classList.remove('input_focus')
                this.yearInput.blur()

                $(".dropdown-body.dropdown-year").remove() 
                this.yearInput.dispatchEvent(new Event('change'))

            }
        })

    
            $(".dropdown-body.dropdown-date").remove()
            $(".dropdown-body.dropdown-month").remove()

        })

       
}


    getCurrentSlide(section) {
        const slideshow = document.querySelector('.dropdown-'+section);
        const slides = document.querySelectorAll('.dropdown-items');
        const viewportTop = slideshow.scrollTop;
        const viewportBottom = viewportTop + slideshow.clientHeight;
        
        let currentSlideIndex = 0;
  

        slides.forEach((item,i)=>{
            const slideTop = item.offsetTop;
            const slideBottom = slideTop + item.clientHeight;

            if (slideTop <= viewportTop+100 ) {
                currentSlideIndex = item;
            }
        })

    
      
        return currentSlideIndex;
    }

    slideTo(section,index){
        console.log(section,index)
            const slideshow = document.querySelector('.dropdown-'+section);
            const slides = document.querySelectorAll('.dropdown-items');
            const targetOffset = (index-1) * slides[0].offsetHeight-30; //mark1 -30
            slideshow.scrollTop = targetOffset
    }



//--------------------Render DropDown------------------
    renderDate(){
        this.dateInput.parentElement.insertAdjacentHTML("beforeend",`
            <div class="dropdown-body dropdown-date">
            </div>
        `)

        let min = +this.option.dateMin
        let max = +this.option.dateMax

        let current = this.dateInput.dataset.date || 1

        this.dateInput.dataset.min = min
        this.dateInput.dataset.max = max

            $(`.dropdown-date`).append(`<button disabled class="dropdown-items dropdown-item-date" data-date='${("0"+min).slice(-2)}'>Date</button>`)

            for ( let i = min; i <= max; i++ ){
                $(`.dropdown-date`).append(`<button tabindex='-1' class="dropdown-items dropdown-item-date" id=${i}  data-date = '${("0"+i).slice(-2)}' }>${i}</button>`)
            }

            $(`.dropdown-date`).append(`<button disabled class="dropdown-items dropdown-item-date" data-date='${("0"+max).slice(-2)}'>^</button>`)


            $(".dropdown-item-date").click((e)=>{

                let value = e.target.dataset.date
                this.dateInput.value = value
                this.dateInput.setAttribute('value',value)
                this.dateInput.setAttribute('data-value',value)
                this.dateInput.setAttribute('data-date',value)
                this.dateInput.dispatchEvent(new Event('change'));

                this.monthInput.focus()
            })
            

       
          
         
            if( this.isMobileDevice() ){
            $(`.dropdown-date`).on('scroll',()=>{
                    let optionSelected = this.getCurrentSlide('date')
                    let value = optionSelected.dataset.date
                    this.dateInput.value = value !== undefined ? value : ''
                    this.dateInput.setAttribute('data-date',value)
                    this.dateInput.dispatchEvent(new Event('change'));

                })
            }
     
        
        this.slideTo('date',current)
            
     }

     renderMonth(){
        this.monthInput.parentElement.insertAdjacentHTML("beforeend",`
            <div class="dropdown-body dropdown-month">
            </div>
        `)

        let min = +this.option.monthMin
        let max = +this.option.monthMax
        let current = this.monthInput.dataset.month || 1

        this.monthInput.dataset.min = min
        this.monthInput.dataset.max = max

        let checkLang = this.checkLang('month')
      
        $(`.dropdown-month`).append(`<button disabled class="dropdown-items dropdown-item-month">Month</button>`)

        if(this.option.month === 'number'){
            for ( let i = min; i <= max; i++ ){
                $(`.dropdown-month`).append(`<button tabindex='-1' class="dropdown-items dropdown-item-month" data-value="${i}"  data-month='${("0"+i).slice(-2)}'>${i}</button>`)
            }
        }else if(this.option.month !== "number"){
            for ( let i = min; i <= max; i++ ){
                $(`.dropdown-month`).append(`<button tabindex='-1' class="dropdown-items dropdown-item-month" data-value="${LANG[checkLang][i]}"  data-month='${("0"+i).slice(-2)}'>${LANG[checkLang][i]}</button>`)
            }
        }

        $(`.dropdown-month`).append(`<button disabled class="dropdown-items dropdown-item-month">^</button>`)

            $(".dropdown-item-month").click((e)=>{
                let checkLang = this.checkLang('month')
                let value = this.option.month === 'number' ? e.target.dataset.month : LANG[checkLang][+e.target.dataset.month]
                this.monthInput.value = value
                this.monthInput.setAttribute('value',value)
                this.monthInput.setAttribute('data-value',value)
                this.monthInput.setAttribute('data-month',e.target.dataset.month)

                this.yearInput.focus()
              
                this.monthInput.dispatchEvent(new Event('change'));


            })

            
        if( this.isMobileDevice() ){
            $(`.dropdown-month`).on('scroll',()=>{

                    let value = this.getCurrentSlide('month').dataset
                    this.monthInput.value = value.value !== undefined ? value.value : ''

                    this.monthInput.setAttribute('data-month',value.month) 
                    this.dateInput.dispatchEvent(new Event('change'));

                })
        }
     
        this.slideTo('month',current)

     }

     renderYear(){
        this.yearInput.parentElement.insertAdjacentHTML("beforeend",`
            <div class="dropdown-body dropdown-year">
            </div>
        `)

        let min = +this.option.yearMin
        let max = +this.option.yearMax
        let index = 1  
        let current = this.yearInput.dataset.index || 1

       this.yearInput.setAttribute("data-min",min)
       this.yearInput.setAttribute("data-max",max)

                 $(`.dropdown-year`).append(`<button disabled class="dropdown-items dropdown-item-year">Year</button>`)

            for ( let i = max; i >= min; i-- ){
                $(`.dropdown-year`).append(`<button tabindex='-1' class="dropdown-items dropdown-item-year" data-index="${index}"  data-year='${i}'>${i}</button>`)
                index++
                console.log(index)
            }

                $(`.dropdown-year`).append(`<button disabled class="dropdown-items dropdown-item-year">^</button>`)

            $(".dropdown-item-year").click((e)=>{

                let value = e.target.dataset.year
                let yearIndex= e.target.dataset.index

                    this.yearInput.value = value
                    this.yearInput.setAttribute('value',value)
                    this.yearInput.setAttribute('data-value',value)
                    this.yearInput.setAttribute('data-year',value)
                    this.yearInput.setAttribute('data-index',yearIndex)


                if(this.dateInput.value === '') this.dateInput.focus()

                    $(".dropdown-body.dropdown-year").remove()
                    this.yearInput.classList.remove("input_focus")
                    this.yearInput.dispatchEvent(new Event('change'));

            })

            if( this.isMobileDevice() ){
            
                $(`.dropdown-year`).on('scroll',()=>{

                    let value = this.getCurrentSlide('year').dataset.year
                    this.yearInput.value = value !== undefined ? value : ''
                    this.yearInput.setAttribute('data-year',value)
                    this.dateInput.dispatchEvent(new Event('change'));

                })
            }

            this.slideTo('year',current)
     
     }
    
}


   /*  Element.prototype.CalendarDropdown = function (option) {
        let d
        option = option ? option : defaultOption
        [this].forEach((item, i) => {
            d =  new CalendarDropdown(item,option)
        })
        return d

    }

    Object.prototype.CalendarDropdown = function(option) {
        let d
        option = option ? option : defaultOption

        this.forEach((item,i)=>{
             d =  new CalendarDropdown(item,option)
        })
        return d
    } */


    Element.prototype.CalendarDropdown = function (option) {
        option = option ? option : defaultOption

        let d
        [this].forEach((item, i) => {
            d =  new CalendarDropdown(item,option)
        })
        return d

    }

    Object.prototype.CalendarDropdown = function(option) {
        option = option ? option : defaultOption

        let d
        this.forEach((item,i)=>{
             d =  new CalendarDropdown(item,option)
        })
        return d
    }

//test

document.addEventListener("DOMContentLoaded",(e)=>{



/*  setInterval(() => {
    document.querySelector('#sp1').innerHTML = "value     : "+dd2.value
    document.querySelector('#sp2').innerHTML = "valueText : "+dd2.valueText
    document.querySelector('#sp3').innerHTML = "fulldate  : "+dd2.fulldate
    document.querySelector('#sp4').innerHTML = "validate  : "+dd2.dateValid


}, 20);  */

function isValidDate(dateStr) {
    const date = new Date(dateStr);
    if (isNaN(date.getTime()) || dateStr.slice(5, 7) != date.getMonth() + 1 || dateStr.slice(0, 4) != date.getFullYear()) {
      return false;
    }

    return dateStr.slice(8) == date.getDate();
  }

 /*  console.log(isValidDate('2020-02-29')) */


})
}

_CALENDAR_DROPDOWN()

/* let dd1 = document.querySelectorAll('.datepicker.dropdown#dd1').CalendarDropdown({month:'full'})
let dd2 = document.querySelectorAll('.datepicker.dropdown#dd2').CalendarDropdown({month:'full',lang:'en'}) */