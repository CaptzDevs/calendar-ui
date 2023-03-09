const LANG = {
    th : {
        d:{
            full: {
                d_th : ["","อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัสบดี","ศุกร์","เสาร์"],
            },
            sm:{
                d_th_sm : ["","อา","จ","อ","พ","พฤ","ศ","ส"],
            }
        },
        m:{
            full: {
                 m_th : [ "","มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม", ],
            },
            sm:{
                m_th_sm : ["", "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.", ],
            }
        }
    },
    en : {
        d:{
            full: {
                d_th : ["","อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัสบดี","ศุกร์","เสาร์"],
            },
            sm:{
                d_th_sm : ["","อา","จ","อ","พ","พฤ","ศ","ส"],
            }
        },
        m:{
            full: {
                m_en : ['','January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            },
            sm:{
               m_en_sm : ['','Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],

            }
        }
    }, 
    d_th_null : [''],
    d_tnull :   [''],
    d_en_null : [''],
    d_enull :   [''],

    d_th_full : ["อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัสบดี","ศุกร์","เสาร์"],
    d_th_sm : ["อา","จ","อ","พ","พฤ","ศ","ส"],
    d_en_full :['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    d_en_sm : ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],

    m_th_full : [ "","มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม", ],
    m_th_sm : ["", "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.", ],
    m_en_full : ['','January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    m_en_sm : ['','Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    y_en_sm : (" "+new Date().getFullYear()).slice(-2),
    y_en_full : new Date().getFullYear(),
    y_th_sm : (" "+(new Date().getFullYear()+543)).slice(-2),
    y_th_full : new Date().getFullYear()+543,

    
}

let panel_arr = [
    'date-panel',"datepicker",'lbl_month','lbl_year' ,'btn btn-sm btnNextMonth' ,
     "btn btn-sm btnNextMonth",'btn btn-sm btnPreviousMonth','month-item','month-body','year-item'
     ,'year-body','month-header','date-body','date-header'
     ,'date-day-item','date-item disableSelect date-selected' , 'date-item disableSelect','date-icon'
]
const DATE = new Date()

class Calendar{
    constructor(elem,option = {
            format : "dd/mm/yyyy",    
            default :  "now",            
            separation : "/",           
            lang : "th",
            yearType : "BE",         
            selectable  : true,        
            showDay : 'sm',
            day : 'full',          
            month : 'full',
            min  : 20000101,    
            max  : 21000101, 
            startWith  : '',
            closeOnSelect : true,
            dayPanel : 'full',
            monthPanel : 'full',
            yearPanel : 'full',
            autoAdjustMaxMin : false,
    }){

        this.elem = elem
        this.elems = [] // set of parent element ex. input 
        this.option = option
        this.todayInt = +`${this.option.yearType === 'AD' ? DATE.getFullYear() : DATE.getFullYear()+543}${('0'+(DATE.getMonth()+1)).slice(-2)}${('0'+DATE.getDate()).slice(-2)}`
        this.init()
    }

    //Utility Method
    set_lang(value,section,lang,type = {day:"full",month:"full"}){
        type.day = type.day || default_setting.day
        type.month = type.month || default_setting.month
    
        let select_lang = `${section}_${lang}_${section === 'd' ? type.day : type.month}`
    
        return LANG[select_lang][value]
    }
    
    selectDateFormat(d,m,y,tranform_year){
        let lang = this.option.lang
        let formatter = this.option.format.split('/') 
        let daySelected = 0
        if(tranform_year){
             daySelected = new Date(+y-543, +m-1, +d).getDay();
        }else{
            daySelected = new Date(+y, +m-1, +d).getDay();
        }



            let d_select = 0
            let m_select = 0
            let y_select = 0

            let date_type , month_type , year_type;

            if(formatter[0][0] === 'd') d_select = 0 
            else if(formatter[0][0] === 'm' || formatter[0][0] === 'M' ) d_select = 1
            else if(formatter[0][0] === 'y') d_select = 2

            if(formatter[1][0] === 'd') m_select = 0 
            else if(formatter[1][0] === 'm' || formatter[1][0] === 'M' ) m_select = 1
            else if(formatter[1][0] === 'y') m_select = 2


            if(formatter[2][0] === 'd' ) y_select = 0  
            else if(formatter[2][0] === 'm' || formatter[2][0] === 'M' ) y_select = 1
            else if(formatter[2][0] === 'y') y_select = 2


            for(let i =0 ;i < 3 ; i++){

                if((formatter[i][0] === 'M') && formatter[i].length === 2 ) month_type = 'full'
                if((formatter[i][0] === 'M') && formatter[i].length === 1 ) month_type = 'sm'

                if((formatter[i][0] === 'd') && formatter[i].length === 2 ) date_type = 'z'
                if((formatter[i][0] === 'd') && formatter[i].length === 1 ) date_type = 'n'

                if((formatter[i][0] === 'm') && formatter[i].length === 2 ) month_type = 'z'
                if((formatter[i][0] === 'm') && formatter[i].length === 1 ) month_type = 'n'

                if(formatter[i][0] === 'y' && formatter[i].length === 2) year_type = 'sm'
                if(formatter[i][0] === 'y' && formatter[i].length === 4) year_type = 'full'

            }

            let show_day = this.option.showDay ?  this.option.showDay :  'null'


            show_day = show_day === 'small' ? 'sm' : show_day

            let date_lang = {
                d :`d_${lang}_${show_day}` ,  
                m : `m_${lang}_${month_type}` ,
            }
            

            switch(date_lang.y){
                case "y_en_full": y-543 ;break
                case "y_en_sm":  (''+(y-543)).slice(-2);break
                case "y_th_full": y ;break
                case "y_th_sm": (''+(y)).slice(-2)  ;break
            }

            let check_section = ['d','m','y']
            
            let section_arr = [check_section[d_select] , check_section[m_select] , check_section[y_select]] // return order of date ex. d,m,y or m,d,y depends on format

            let date_arr = {
                d: date_type === 'z' ? d : +d,
                m: month_type != 'n' && month_type != 'z' ? LANG[date_lang[section_arr[section_arr.indexOf('m')]]] [+m] :  month_type === 'z' ? m : +m,
                y: year_type === 'full' ? y : y.slice(-2) 
            }


            let date_arr2 = {
                d: date_type === 'z' ? d : +d,
                m: month_type != 'n' && month_type != 'z' ?  m :  month_type === 'z' ? m : m,
                y: year_type === 'full' ? ''+y : ''+(y.slice(-2)) 
            }
         
        let FULL_DATE_DISPLAY = [

            LANG[date_lang.d] [!show_day || show_day != 'null' ? daySelected : 0] ,
            date_arr[section_arr[0]],
            date_arr[section_arr[1]],
            date_arr[section_arr[2]],
        ]

        let FULL_DATE_DISPLAY_NUMBER = [

            date_arr2[section_arr[0]],
            date_arr2[section_arr[1]],
            date_arr2[section_arr[2]],
        ]

         //    console.log(date_arr[d_select],date_arr[m_select],date_arr[y_select])
            return [FULL_DATE_DISPLAY,FULL_DATE_DISPLAY_NUMBER]

    }

    //MAIN---------------------------------------
    init(){
            this.elem.addEventListener('click',(e)=>{
                this.openCalendar(e)
            })
            this.elems.push(this.elem)

            //check if today date is lower or greater max min date 
            // if max date is lower than current date change max date to currentdate +100
            // if min date is greater than current date change max date to currentdate -100

            if(this.option.autoAdjustMaxMin){
                let current = this.todayInt

                if(this.option.max < current){
                    this.option.max = current + 10**5 // max is 7
                }

                if(this.option.min > current){
                    this.option.min = current - 10**5 // max is 7
                }
            }

    }

    

    openCalendar(e){
        if($(".date-panel").length === 0){
        //e.target.previousElementSibling.parentElement.style.position = "relative" 
    
        let defaultDate = this.option.default

        let max = String(this.option.max)
        let max_date = max.length > 0 ? [+max.slice(0,4), +max.slice(4,6),+max.slice(6,8)] : 0
        let max_month = max_date[0] != 0 ? max_date[1] : 12
        let max_year = max_date[0] != 0 ? max_date[0] : this.option.yearType === 'AD' ? 2100 : 2600
    
        let min = String(this.option.min)
        let min_date = min.length > 0 ? [+min.slice(0,4), +min.slice(4,6),+min.slice(6,8)] : 0
        let min_month = min_date[0] != 0 ? min_date[1] : 12
        let min_year = min_date[0] != 0 ? min_date[0] : this.option.yearType === 'AD' ? 2100 : 2600
    
        let lang = this.option.lang
    
        let formatter = this.option.format
    
        let dayHeader  = ''
    
        e.target.setAttribute("placeholder",formatter)
    
            if(lang === 'th'){
                dayHeader = `
     
                                      <div class="date-day-item">อา.</div>
                                      <div class="date-day-item">จ.</div>
                                      <div class="date-day-item">อ.</div>
                                      <div class="date-day-item">พ.</div>
                                      <div class="date-day-item">พฤ.</div>
                                      <div class="date-day-item">ศ.</div>
                                      <div class="date-day-item">ส.</div>
                          `
            }
            if(lang === 'en'){
                dayHeader = `
       
                                      <div class="date-day-item">Sun</div>
                                      <div class="date-day-item">Mon</div>
                                      <div class="date-day-item">Tue</div>
                                      <div class="date-day-item">Wed</div>
                                      <div class="date-day-item">Thu</div>
                                      <div class="date-day-item">Fri</div>
                                      <div class="date-day-item">Sat</div>
                              `
            }
    
    
            e.target.insertAdjacentHTML('afterend',`
            <div class="date-panel">
                <div class="date-header">
                    <div class="lbl_month" id="header_month">month</div>
                    <div class="lbl_year" id="header_year">year</div>
    
                    <button type="button" class="btn btn-sm btnPreviousMonth" id="btnPreviousMonth"> <i
                    class="fas fa-chevron-left"></i> </button>
                    
                    <button type="button" class="btn btn-sm btnNextMonth" id="btnNextMonth"><i
                            class="fas fa-chevron-right"></i></button>
                </div>
                <div class="month-panel">
                    <div class="month-header">
    
                        <div class="lbl_year">year</div>
    
                    </div>
    
                    <div class="month-body" id="month_body">
    
                    </div>
    
                </div>
                <div class="year-panel">
                    <div class="year-body" id="year_body">
                    </div>
    
                </div>
                <div class="date-day">
    
                ${dayHeader}
            </div>
    
                <div class="date-body">
                    <!--    <div class="year-panel"></div> -->
    
    
                </div>
    
            </div>
            `)
    
            let d = new Date();
            let checkDefaultDate = defaultDate == "now" ? `${d.getFullYear()}${d.getMonth()+1}${d.getDate()}` : defaultDate 
    
            let fulldate = ''+(e.target.dataset.fulldate || checkDefaultDate)
            let [curentDate,curentMonth,curentYear] = [fulldate.slice(6,8), fulldate.slice(4,6),fulldate.slice(0,4)]
    
            e.target.setAttribute("data-fulldate",`${curentYear}${curentMonth}${curentDate}`)    
    
            if(
                (max_date[2] >= +curentDate || max_month != +curentMonth  || max_year != +curentYear) &&
                (min_date[2] <= +curentDate || +curentMonth != min_month  || +curentYear != min_year )
            ){
                this.render(curentDate, curentMonth, curentYear)   
    
            }else if((max_date[2] < +curentDate &&  max_month <= +curentMonth  &&  max_year <= +curentYear)){
    
                e.target.previousElementSibling.setAttribute("data-fulldate",`${max_date[0]}${('0'+max_date[1]).slice(-2)}${('0'+max_date[2]).slice(-2)}`)    
                this.render(max_date[2], max_date[1], max_date[0])
    
            }
    
             else if((min_date[2] > +curentDate && +curentMonth >= min_month  &&  +curentYear >= min_year )){
    
                    this.render(min_date[2], min_date[1], min_date[0])
                    e.target.previousElementSibling.setAttribute("data-fulldate",`${min_date[0]}${('0'+min_date[1]).slice(-2)}${('0'+min_date[2]).slice(-2)}`)    
            } 
    
    // event for label
    $(".lbl_year").click((ev)=>{
        this.renderYear()
    
        let this_date = ev.target.parentElement.parentElement.dataset.date || ev.target.parentElement.parentElement.parentElement.dataset.date
        let this_month = ev.target.parentElement.parentElement.dataset.month || ev.target.parentElement.parentElement.parentElement.dataset.date
        let year = 0
        $(".year-panel").addClass('show-month')
    
        $(".year-item").click((e)=>{
            
            $(".year-panel").removeClass('show-month')
            
            year = this.option.yearType === "AD" ? +e.target.dataset.year  : +e.target.dataset.year-543 
    
            let checkYearType = this.option.yearType === "AD" ? +year : +year+543
            this.renderMonth(checkYearType)
    
            let full_date_display = this.selectDateFormat(this_date,this_month,checkYearType,true)[0]
    
            let separation = this.option.separation
            let starter = this.option.startWith
    
              let day_display = full_date_display[0]
              let d_display = full_date_display[1]
              let m_display = full_date_display[2]
              let y_display = full_date_display[3]
    
    
            let date_display  = `${starter}${day_display}, ${d_display}${separation}${m_display}${separation}${y_display}`
    
              //set dataset value and value to input        
    
            let parent = this.elems[0]
    
            parent.value = date_display
    
            parent.setAttribute("value" ,date_display)
    
            parent.setAttribute("data-value" ,`${checkYearType}${("0"+this_month).slice(-2)}${this_date}`)
    
            parent.setAttribute("data-fulldate" , `${year}${("0"+this_month).slice(-2)}${this_date}`)
    
            $(".date-panel").attr('data-fulldate',`${year}${("0"+this_month).slice(-2)}${this_date}`)
            $(".date-panel").attr('data-date',`${this_date}`)
    
    
            this.render( this_date, this_month , year)
    
            $(".month-item").click((e)=>{
    
                let fullDate = e.target.dataset.fulldate 
    
                this_year  = fullDate.slice(0,4)
                month = fullDate.slice(4,6)
    
                $(".month-panel").removeClass('show-month')
    
                let full_date_display = this.selectDateFormat(this_date,month,this_year,true)[0]
    
               
                  let day_display = full_date_display[0]
                  let d_display = full_date_display[1]
                  let m_display = full_date_display[2]
                  let y_display = full_date_display[3]
    
                  let checkYearType = this.option.yearType === 'AD' ? this_year : this_year-543
    
    
                  let date_display  = `${starter}${day_display}, ${d_display}${separation}${m_display}${separation}${y_display}`
    
                  //set dataset value and value to input        
                 let parent =  e.target.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling
                    parent.value = date_display
                    parent.setAttribute("value" ,date_display)
                    parent.setAttribute("data-value" ,`${checkYearType}${("0"+month).slice(-2)}${this_date}`)
                    parent.setAttribute("data-fulldate" ,`${checkYearType}${("0"+month).slice(-2)}${this_date}`)
    
                    $(".date-panel").attr('data-fulldate',`${checkYearType}${("0"+month).slice(-2)}${this_date}`)
                    $(".date-panel").attr('data-date',`${this_date}`)
    
                    this.render( this_date, month ,checkYearType)
                
            })
          })
      })
    
    
      $(".lbl_month").click((e)=>{
        let this_date = e.target.parentElement.parentElement.dataset.date
        let this_year = this.option.yearType === "AD" ? e.target.parentElement.parentElement.dataset.year : +e.target.parentElement.parentElement.dataset.year+543 
        let month = 0
    
            $(".month-panel").addClass('show-month')
    
            this.renderMonth(this_year)
    
            $(".month-item").click((e)=>{
    
    
            let fullDate = e.target.dataset.fulldate 
            month = fullDate.slice(4,6)
    
            $(".month-panel").removeClass('show-month')
    
            let full_date_display = this.selectDateFormat(this_date,month,this_year,true)[0]
    
            let separation = this.option.separation
            let starter = this.option.startWith
              let day_display = full_date_display[0]
              let d_display = full_date_display[1]
              let m_display = full_date_display[2]
              let y_display = full_date_display[3]
    
              let checkYearType = this.option.yearType === 'AD' ? this_year : this_year-543
    
    
              let date_display  = `${starter}${day_display}, ${d_display}${separation}${m_display}${separation}${y_display}`
    
              //set dataset value and value to input        
             let parent = this.elems[0]
                    parent.value = date_display
                parent.setAttribute("value" ,date_display)
                parent.setAttribute("data-value" ,`${checkYearType}${("0"+month).slice(-2)}${this_date}`)
                parent.setAttribute("data-fulldate" ,`${checkYearType}${("0"+month).slice(-2)}${this_date}`)
    
                $(".date-panel").attr('data-fulldate',`${checkYearType}${("0"+month).slice(-2)}${this_date}`)
                $(".date-panel").attr('data-date',`${this_date}`)
    
                this.render( this_date, month ,checkYearType)
                
            })
    
    })
    
      $(".btnPreviousMonth").click((ev)=>{
          let this_date = +ev.target.parentElement.parentElement.dataset.date
          let this_month = +ev.target.parentElement.parentElement.dataset.month
          let this_year = +ev.target.parentElement.parentElement.dataset.year
    
          let checkYearType =  this.option.yearType == "AD" ? this_year: this_year+543
    
          if(max_date[0] != 0 && this_month - min_month  > 0 || checkYearType - min_year  > 0 ){
    
          if(this_month == 1){
              this_month = 12
              this_year -= 1
          }else{
              this_month -= 1
          }
            this.render(this_date,this_month,this_year)
        }
    
      })
    
      $(".btnNextMonth").click((ev)=>{
    
          let this_date = +ev.target.parentElement.parentElement.dataset.date
          let this_month = +ev.target.parentElement.parentElement.dataset.month
          let this_year = +ev.target.parentElement.parentElement.dataset.year
    
          let checkYearType =  this.option.yearType == "AD" ? this_year : this_year+543
       
          if(max_date[0] != 0 && max_month - this_month > 0 || max_year - checkYearType > 0 ){
    
            if(this_month == 12){
                this_month = 1
                this_year += 1
            }else{
                this_month +=1
            }
    
            this.render(this_date,this_month,this_year)
            
    
        }/* else{
             this.render(max_date[2],max_month,max_year,setting) 
        } */
    
    })
    
    
    /* findOverflows(); */
     
    }
    }

 
    render(date = 0,month = 0,year = 0 ) {

        let lang = this.option.lang
        let yearType = this.option.yearType
        let max = String(this.option.max)
        let min = String(this.option.min)
        
        let max_date = [+max.slice(0,4), +max.slice(4,6),+max.slice(6,8)]
        let max_month = max_date != 0 ? max_date[1] : 12
        let max_year = max_date != 0 ? max_date[0] : yearType == 'AD' ? 2100 : 2600
    
        let min_date = [+min.slice(0,4), +min.slice(4,6),+min.slice(6,8)]
        let min_month = min_date != 0 ? min_date[1] : 12
        let min_year = min_date != 0 ? min_date[0] : yearType == 'AD' ? 2100 : 2600
    
        let selectable = this.option.selectable
        let closeOnSelect = this.option.closeOnSelect
        let yearPanel = this.option.yearPanel
    
        let disableSelect = ''
        if(!selectable){
            disableSelect = 'disableSelect'
        }
    
        $("body").click((e)=>{
            if (!closeOnSelect) {
               panel_arr.push('date-item date-selected')
            } 
    
            if (!panel_arr.includes(e.target.className)) {
                $(".date-panel").remove() 
            }
        })
    
    
          $(".date-body").empty()
    
          let d = new Date();
    
          let this_day = 0
          let this_month = 0;
          let this_year = 0;  
    
          //if no parameter set today to default date 
          if(date == 0 || month == 0 || year == 0){
               this_day = d.getDate();
               this_month = d.getMonth()+1;
               this_year =  d.getFullYear() 
          }else{
               this_day = date
               this_month = month;
               this_year =  +year
          }
    
    
        let checkYearType =  yearType == "AD" ? +this_year : +this_year+543
    
    
    
          //get first day of the month and first day of the year
          let fdm = new Date(this_year, this_month-1, 1).getDay(); //first day of month
    
          let fdnm = new Date(this_year, this_month, 1).getDay(); //first day of next month
          
          let date_number = new Date(this_year, this_month, 0).getDate() // amount of date in 
          let date_number_before = new Date(this_year, this_month-1, 0).getDate() // amount of date in 
    
          let last_date_of_month = new Date(this_year, this_month, 0).getDate();
       
          //set month lable and year label
            $(".lbl_month").text(this.set_lang(+this_month,'m',lang,{day : this.option.day , month : this.option.month }))
    
            let displayYear = yearType == 'AD' ? this_year : this_year+543 
    
            $(".lbl_year").text(yearPanel == 'full' ? displayYear : (''+displayYear).slice(-2)) 
    
        //render section -------------------------------------
       /*   let elem_length = 0;
    
        let eff_count = setInterval(() =>{ 
    
            $(`.date-item:eq(${elem_length})`).addClass('eff')
            if(elem_length > $(".date-item").length) clearInterval(eff_count)
            elem_length++
          
          },5)  */
          
        //render date of previous month
        if(fdm != 7){
          for(let i = date_number_before-fdm+1 ; i <= date_number_before ; i++){
              $(".date-body").append(`<div class="date-item date-empty">${i}</div>`)
            }
        }
    
        //render for min date
        let startDate = 1
        for(let i = 1 ; min_date[0] != 0 && i != min_date[2] && (this_month == min_month && checkYearType == min_year) ; i++){
              $(".date-body").append(`<div class="date-item date-empty">${i}</div>`)
              startDate = i+1
        }
    
    
        //render all date //MAIN
        let count_all_date = 0
        for(let i = startDate ; i <= date_number ; i++){
              
            //check max date
            if(max_date[0] != 0 && i == max_date[2]+1 && (this_month == max_month && checkYearType == max_year)) break 
    
            $(".date-body").append(`<div class="date-item ${disableSelect}" data-date=${("0"+i).slice(-2)}  data-fulldate=${(this_year)+("0"+this_month).slice(-2)+("0"+i).slice(-2)} >${i}</div>`)
           
            count_all_date++
        }
        
        //render dates after of max date
        for(let i = startDate+count_all_date ; i <= last_date_of_month ; i++){
            $(".date-body").append(`<div class="date-item date-empty">${i}</div>`)
        }
    
        //render next month date 
    
        if(fdnm > 0){
    
        for (let i = 1 ; i <= 7-fdnm; i++){
            $(".date-body").append(`<div class="date-item date-empty">${i}</div>`)
        
            }
        }
    
      /* setTimeout(() => {
        elem_length = 0;
    
        eff_count = setInterval(() =>{ 
    
           $(`.date-item:eq(${elem_length})`).removeClass('eff')
           if(elem_length > $(".date-item").length) clearInterval(eff_count)
           elem_length++
         
         },10) 
      }, 500); */
       
    
        //render section -------------------------------------
        
    
        //set dataset 
       $(".date-panel").attr('data-fulldate',`${this_year}${("0"+this_month).slice(-2)}${("0"+this_day).slice(-2)}`)
       $(".date-panel").attr('data-date',`${("0"+this_day).slice(-2)}`)
       $(".date-panel").attr('data-month',`${("0"+this_month).slice(-2)}`)
       $(".date-panel").attr('data-year',`${this_year}`)
    
        //select date 
        $(".date-item").click((e)=>{
        if( selectable ){
          let fulldate = e.target.dataset.fulldate
    
          let  y = fulldate.slice(0,4)
          let  m = fulldate.slice(4,6)
          let  d = fulldate.slice(6,8)
    
          let formatter = this.option.format.split('/') 
    
        function checkDateFormat(arr = []){
    
            let check_date_arr = ['d','dd',"D","DD",'m','mm','M','MM',"yy",'yyyy']
    
            let check1 = check_date_arr.includes(arr[0]) || false
            let check2 = check_date_arr.includes(arr[1]) || false
            let check3 = check_date_arr.includes(arr[2]) || false
    
            return check1 && check2 && check3 
        }
    
    
          let isValid= checkDateFormat( [formatter[0], formatter[1] ,formatter[2]] )
    
          if( isValid ){
                
            let full_date_display = this.selectDateFormat(d,m,y)[0]
            let separation = this.option.separation
            let starter = this.option.startWith
           
    
                let day_display = full_date_display[0]
                let d_display = full_date_display[1]
                let m_display = full_date_display[2]
                let y_display = full_date_display[3]
    
    
                let checkYearType = yearType === "AD" ? y_display : +y_display+543
    
                let date_display  = `${starter}${day_display}, ${d_display}${separation}${m_display}${separation}${checkYearType}`
    
                //set dataset value and value to input        
    
                let parent = this.elems[0]
    
                parent.value = date_display
    
                parent.setAttribute("value" ,date_display)
    
                parent.setAttribute("data-value" ,`${checkYearType}${m}${d}`) 
    
                parent.dataset.fulldate = `${y}${m}${d}`
    
                 /*  e.target.parentElement.parentElement.parentElement.parentElement.dataset.fulldate = `${y}${m}${d}` */
    
                 /* closeOnSelect ? $(".date-panel").remove() : '' */
                  
                  $(".date-item").removeClass('date-selected')
                  e.target.classList.add('date-selected')
    
                  $(".date-panel").attr('data-fulldate',`${y}${("0"+m).slice(-2)}${d}`)
                  $(".date-panel").attr('data-date',`${d}`)
    
            }else{
                console.error("Invalid date Format")
            }
        }
       })
    
       //set selected date color
     
       $(".date-item").each((i,item)=>{
    
          if(item.dataset.fulldate === $(".date-panel").attr('data-fulldate')){
              item.classList.add('date-selected')
          }else{
            item.classList.remove('date-selected')
    
          }
       })
    }

    renderMonth(this_year){

        let lang = this.option.lang
    
        let min = String(this.option.min)
        let min_date = [+min.slice(0,4), +min.slice(4,6),+min.slice(6,8)]
        let min_year = min_date[0] != 0 ? min_date[0] : yearType === 'AD' ? 2100 : 2600
    
        let max = String(this.option.max)
        let max_date = max.length > 0 ? [+max.slice(0,4), +max.slice(4,6),+max.slice(6,8)] : 0
        let max_month = max_date[0] != 0 ? max_date[1] : 12
    
        let monthPanel = this.option.monthPanel
    
        $("#month_body").empty()
    
    
        if(this_year == min_date[0]){
    
            for (let i = +min_date[1] ; i <= 12; i++){
        
            let full_month
                
            if(lang === 'en' && monthPanel === 'small'){
                full_month = this.set_lang(i,'m',lang,{day : 'sm' , month :'sm'})
            }else if(lang === 'th' && monthPanel === 'small'){
                full_month = this.set_lang(i,'m',lang,{day : 'sm' , month :'sm'})
            }else{
                full_month = this.set_lang(i,'m',lang,{day:this.option.day , month : this.option.month })
            }
                
              $("#month_body").append(
                  `
                  <div class="month-item" data-fulldate=${this_year+("0"+[i]).slice(-2)}>${full_month}</div>
                  `
              )
            } 
        }
    
        else if(this_year == max_date[0]){
    
            for (let i = 1 ; i <= max_month; i++){
        
                let full_month
                    
                if(lang === 'en' && monthPanel === 'small'){
                    full_month = this.set_lang(i,'m',lang,{day : 'sm' , month :'sm'})
                }else if(lang === 'th' && monthPanel === 'small'){
                    full_month = this.set_lang(i,'m',lang,{day : 'sm' , month :'sm'})
                }else{
                    full_month = this.set_lang(i,'m',lang,{day:this.option.day , month : this.option.month })
                }
                    
                $("#month_body").append(
                    `
                    <div class="month-item" data-fulldate=${this_year+("0"+[i]).slice(-2)}>${full_month}</div>
                    `
                )
            }
        }else{
            for (let i = 1 ; i <= 12; i++){
    
                let full_month
                    
                if(lang === 'en' && monthPanel === 'small'){
                    full_month = this.set_lang(i,'m',lang,{day : 'sm' , month :'sm'})
                }else if(lang === 'th' && monthPanel === 'small'){
                    full_month = this.set_lang(i,'m',lang,{day : 'sm' , month :'sm'})
                }else{
                    full_month = this.set_lang(i,'m',lang,{day:this.option.day , month : this.option.month })
                }
                    
                $("#month_body").append(
                    `
                    <div class="month-item" data-fulldate=${this_year+("0"+[i]).slice(-2)}>${full_month}</div>
                    `
                )
            }
        }
    
      }
    
    
    
    renderYear(){
        let d = new Date()
    
        let yearType = this.option.yearType 
    
        let min = String(this.option.min)
        let min_date = [+min.slice(0,4), +min.slice(4,6),+min.slice(6,8)]
        let min_year = min_date !== 0 ? min_date[0] : yearType === 'AD' ? 2100 : 2600
    
        let max = String(this.option.max)

        let max_date = max.length > 0 ? [+max.slice(0,4), +max.slice(4,6),+max.slice(6,8)] : 0
        let max_year = max_date[0] !== 0 ? max_date[0] : yearType === 'AD' ? 2100 : 2600
    
        let this_year = yearType === 'AD' ? min_date[0] : min_date[0] > 0 ? min_date[0] : d.getFullYear()+543 
    
        let yearPanel = this.option.yearPanel
        
        let curentYear = yearType === 'AD' ? d.getFullYear() : d.getFullYear()+543 
        let yearSelected = ''
        $("#year_body").empty()
        
       
          for (let i = max_year; i >= this_year; i--){
          yearSelected = curentYear === i ? '_selected' : ''
          $("#year_body").append(
              `
              <div class="year-item ${yearSelected}" data-year=${i}>${yearPanel === 'full' ? i : (''+i).slice(-2)}</div>
              `
          )
      }
      }
    

}

Element.prototype.Calendar = function(option) {
    [this].forEach((item,i)=>{
        new Calendar(item)
    })
}
/* Object.prototype.Calendar = function(option) {
    this.forEach((item,i)=>{
        new Calendar(item.className)
    })
} */



document.querySelector('#ctest').Calendar()

