//--------------------------------------

//Calendar [RELEASE]
//Version : v1.0.0 By Captz

//--------------------------------------
//error code 
/* 
    code 1 error in date pannel
    code 2 error in input 
*/
/* console.log = function() {} */



const _CALENDAR_UI = ()=>{

    console.log = function() {};

const LANG = {
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

const defaultOptionCalendar = {
    type : "full", //static , full
    section : 'all', // all, date, month, year

    format: "dd/mm/yyyy",
    default: "today",
    separation: "/",
    lang: "th",
    yearType: "BE",
    showDay: 'none', // full,small ,none
    startWith: '',
    monthPanel: 'full',
    yearPanel: 'full',

    max: 21001231,
    min: 20000101,
    dayStartWith: 0,
    /*  max: 25700101,
    min: 20001112, */
    selectable: true,
    closeOnSelect: true,
    autoAdjustMaxMin: true,
    autoValue: false,
    
    exceptionDate : [],
    

}

let panel_arr = [
    'date-panel', "datepicker", 'lbl_month', 'lbl_year', 'btn btn-sm btnNextMonth',
    "btn btn-sm btnNextMonth", 'btn btn-sm btnPreviousMonth', 'month-item', 'month-body', 
    'year-item', 'year-body', 'month-header', 'date-body', 'date-header', 'date-day-item', 
    'date-item disableSelect date-selected', 'date-item disableSelect', 'date-icon'
]
const DATE = new Date()


let dateEvent = new CustomEvent('dateChange', {
        value: 'Hello, world!'
  });

  
class Calendar {

    constructor(elem, option = {
        type : String(),                //UI : ✅ 
        section : String(),             //UI : ✅
        format: String(),               //UI : ✅
        default: String() ,             //UI : ✅
        separation: String(),           //UI : ✅
        lang: String(),                 //UI : ✅
        yearType: String(),             //UI : ✅
        showDay: String(),              //UI : ✅
        startWith: String(),            //UI : ✅
        
        monthPanel: String(),
        yearPanel: String(),

        min: Number(),                  //UI : ✅
        max: Number(),                  //UI : ✅
        dayStartWith: Number(),         //UI : ✅

        selectable: Boolean(),          //UI : ✅
        closeOnSelect: Boolean(),       //UI : ✅
        autoAdjustMaxMin: Boolean(),    //UI : ✅
        autoValue: Boolean(),           //UI : ✅

        exceptionDate : Array()

    }) {
        this.elem = elem
        this.panel = ''
        this.elems = [] // set of parent element ex. input 
        

        this.option = {
            type:                   typeof option.type              !== 'undefined'  ? option.type : defaultOptionCalendar.type,
            section:                typeof option.section           !== 'undefined'  ? option.section : defaultOptionCalendar.section,
            format:                 typeof option.format            !== 'undefined'  ? option.format : defaultOptionCalendar.format,
            default:                typeof option.default           !== 'undefined'  ? option.default : defaultOptionCalendar.default,
            separation:             typeof option.separation        !== 'undefined'  ? option.separation : defaultOptionCalendar.separation,
            lang:                   typeof option.lang              !== 'undefined'  ? option.lang : defaultOptionCalendar.lang,
            yearType:               typeof option.yearType          !== 'undefined'  ? option.yearType : defaultOptionCalendar.yearType,
            showDay:                typeof option.showDay           !== 'undefined'  ? option.showDay : defaultOptionCalendar.showDay,
            startWith:              typeof option.startWith         !== 'undefined'  ? option.startWith : defaultOptionCalendar.startWith,
            
            min:                    typeof option.min               !== 'undefined'  ? option.min : defaultOptionCalendar.min,
            max:                    typeof option.max               !== 'undefined'  ? option.max : defaultOptionCalendar.max,
            dayStartWith:           typeof option.dayStartWith      !== 'undefined'  ? option.dayStartWith : defaultOptionCalendar.dayStartWith,


            monthPanel:             typeof option.monthPanel        !== 'undefined'  ? option.monthPanel : defaultOptionCalendar.monthPanel,
            yearPanel:              typeof option.yearPanel         !== 'undefined'  ? option.yearPanel : defaultOptionCalendar.yearPanel,
            selectable:             typeof option.selectable        !== 'undefined'  ? option.selectable : defaultOptionCalendar.selectable,
            closeOnSelect:          typeof option.closeOnSelect     !== 'undefined'  ? option.closeOnSelect : defaultOptionCalendar.closeOnSelect,
            autoAdjustMaxMin:       typeof option.autoAdjustMaxMin  !== 'undefined'  ? option.autoAdjustMaxMin : defaultOptionCalendar.autoAdjustMaxMin,
            autoValue:              typeof option.autoValue         !== 'undefined'  ? option.autoValue : defaultOptionCalendar.autoValue,

            exceptionDate:          typeof option.exceptionDate     !== 'undefined'  ? option.exceptionDate : defaultOptionCalendar.exceptionDate,

        } 
        this.staticElem = this.option.type === 'static' ? this.elem : null
        this.BEYear = 543*10**4
        this.todayInt = +`${DATE.getFullYear()}${('0'+(DATE.getMonth()+1)).slice(-2)}${('0'+DATE.getDate()).slice(-2)}`
        this.value =  this.option.autoValue ? this.option.yearType === "AD" ? this.todayInt : +this.todayInt+this.BEYear  : undefined
        this.exceptionDate = this.option.exceptionDate //[ 20221212,20230415]
        this.exceptionDate2 = [{start : 20230301,end :20230305},{start : 20230321,end :20230325},{start : 20230327,end :20230425}]
        this.exceptionDateAll  = []

        this.option.max = this.value > this.option.max ? +(String(this.value).slice(0,4)+'1231')+10*10**4 : this.option.max
        this.option.min = this.value > this.option.min ? +(String(this.value).slice(0,4)+'0101')-50*10**4 : this.option.min
        this._id  = (Math.random() + 1).toString(36).substring(2);

        this.panelClass =  this.option.type === 'static' ?  `.date-panel-static[data-id='${this._id}']` : `.date-panel[data-id='${this._id}']`
       
       /*  console.log(this.option) */
        this.init()

    }

    // * Utility Method

    extractFulldate(fulldate,separation){
        
        let tranformedDate = {}
        fulldate = String(fulldate)

        if(fulldate.length == 8){
                tranformedDate = {d:fulldate.slice(6), m:fulldate.slice(4,6),y:fulldate.slice(0,4)}
        }
        if(separation){
            fulldate.split(separation)
            tranformedDate = {d:fulldate[0], m:fulldate[1],y:fulldate[2]}
        }
        return tranformedDate

    }

    combineDate(d,m,y){

      return `${y}${('0'+(m)).slice(-2)}${('0'+d).slice(-2)}`
    }
  
    // * -----------------------------------------

 
    checkDisableDate(selectedDate){
        let max = String(this.option.max)
        let min = String(this.option.min)
    
        selectedDate = this.option.yearType === 'AD' ? selectedDate : +selectedDate+this.BEYear
        
        //selectedDate is greater than min and lesser than max 
        if( (+selectedDate >= +min && +selectedDate <= +max ) && !(this.exceptionDateAll.includes(''+selectedDate))){
            //avalible date
            /* console.log(+selectedDate,"avalible") */
            return false
        }
        //disable date 
       /*  console.log(selectedDate,"disable") */

        return true
    }
    getAllDate(start , end){

        const startDate = new Date(start.slice(0, 4), start.slice(4, 6) - 1, start.slice(6));
        const endDate = new Date(end.slice(0, 4), end.slice(4, 6) - 1, end.slice(6));

        // calculate the difference between the dates in milliseconds
        const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());

        // convert the difference to days
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

        this.exceptionDateAll.push(start)
        for (let i = 1 ; i < diffDays; i++){
            startDate.setDate(startDate.getDate() + 1)
            this.exceptionDateAll.push(`${startDate.getFullYear()}${('0'+(startDate.getMonth()+1)).slice(-2)}${('0'+startDate.getDate()).slice(-2)}`)
        }
        this.exceptionDateAll.push(end)
    }

    findOverflows(){
        if($(".date-panel").length > 0){

        const documentWidth = document.documentElement.offsetWidth;
        const documentHeight = document.documentElement.offsetHeight;
            let element = $(".date-panel")[0]
            const box = element.getBoundingClientRect();
            let fullsize = box.right-box.left;
            let fullHeight = box.bottom-box.top

            if (box.left < 0 || box.right > documentWidth || documentWidth < 350 ) {
                element.style.right = -10+"%"
                /* console.log(element);
                element.style.border = '1px solid red'; */
            }else{
                element.style.right = 0+"%"
            }
            if(box.bottom > documentHeight){
                let offest = ((-1*fullHeight/2))
                 element.style.top = offest+"px"
            }
           /*  else{
                element.style.right = 0+"%"
            } */
        }

    };

    // * Working Method

    set_lang(value, section, lang, type = {
        day: "full",
        month: "full"
    }) {
        type.month = type.month || this.option.monthPanel

        type.month =  type.month === "small" || type.month === 'sm' ? 'sm' : 'full'

        let select_lang = `${section}_${lang}_${type.month}`

        return LANG[select_lang][value]
    }

    selectDateFormat(d, m, y, tranform_year) {
        let lang = this.option.lang
        let formatter = this.option.format.split('/')
        let daySelected = 0

        if (tranform_year) {
            daySelected = new Date(+y - 543, +m - 1, +d).getDay();
        } else {
            daySelected = new Date(+y, +m - 1, +d).getDay();
        }


        let d_select = 0
        let m_select = 0
        let y_select = 0

        let date_type, month_type, year_type;

        if (formatter[0][0] === 'd') d_select = 0
        else if (formatter[0][0] === 'm' || formatter[0][0] === 'M') d_select = 1
        else if (formatter[0][0] === 'y') d_select = 2

        if (formatter[1][0] === 'd') m_select = 0
        else if (formatter[1][0] === 'm' || formatter[1][0] === 'M') m_select = 1
        else if (formatter[1][0] === 'y') m_select = 2


        if (formatter[2][0] === 'd') y_select = 0
        else if (formatter[2][0] === 'm' || formatter[2][0] === 'M') y_select = 1
        else if (formatter[2][0] === 'y') y_select = 2


        for (let i = 0; i < 3; i++) {

            if ((formatter[i][0] === 'M') && formatter[i].length === 2) month_type = 'full'
            if ((formatter[i][0] === 'M') && formatter[i].length === 1) month_type = 'sm'

            if ((formatter[i][0] === 'd') && formatter[i].length === 2) date_type = 'z'
            if ((formatter[i][0] === 'd') && formatter[i].length === 1) date_type = 'n'

            if ((formatter[i][0] === 'm') && formatter[i].length === 2) month_type = 'z'
            if ((formatter[i][0] === 'm') && formatter[i].length === 1) month_type = 'n'

            if (formatter[i][0] === 'y' && formatter[i].length === 2) year_type = 'sm'
            if (formatter[i][0] === 'y' && formatter[i].length === 4) year_type = 'full'

        }

        let show_day = this.option.showDay /* ? this.option.showDay : 'null' */

        show_day = show_day === 'small' ? 'sm' : show_day
        

        let date_lang = {
            d: `d_${lang}_${show_day}`,
            m: `m_${lang}_${month_type}`,
        }


        switch (date_lang.y) {
            case "y_en_full":
                y - 543;
                break
            case "y_en_sm":
                ('' + (y - 543)).slice(-2);
                break
            case "y_th_full":
                y;
                break
            case "y_th_sm":
                ('' + (y)).slice(-2);
                break
        }

        let check_section = ['d', 'm', 'y']

        let section_arr = [check_section[d_select], check_section[m_select], check_section[y_select]] // return order of date ex. d,m,y or m,d,y depends on format

        let date_arr = {
            d: date_type === 'z' ? d : +d,
            m: month_type != 'n' && month_type != 'z' ? LANG[date_lang[section_arr[section_arr.indexOf('m')]]][+m] : month_type === 'z' ? m : +m,
            y: year_type === 'full' ? y : y.slice(-2)
        }


        let date_arr2 = {
            d: date_type === 'z' ? d : +d,
            m: month_type != 'n' && month_type != 'z' ? m : month_type === 'z' ? m : m,
            y: year_type === 'full' ? '' + y : '' + (y.slice(-2))
        }

        let checlShowDay = show_day === 'none' ? '' : LANG[date_lang.d][!show_day || show_day != 'null' ? daySelected : 0]

        let FULL_DATE_DISPLAY = [
            checlShowDay,
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
        return [FULL_DATE_DISPLAY, FULL_DATE_DISPLAY_NUMBER]

    }

    changeDateByArrow(e,current){

        let max = String(this.option.max)
        let min = String(this.option.min)
        let yearType = this.option.yearType
        
        let [curentDate, curentMonth, curentYear] = [("0"+current.getDate()).slice(-2), ("0"+(current.getMonth()+1)).slice(-2), current.getFullYear()]

        let [curentDateDisplay, curentMonthDisplay, curentYearDisplay] = this.selectDateFormat(curentDate,curentMonth,curentYear)[1]

        let curentYearDisplayCheckYear = yearType === "AD" ? curentYear : curentYear+543

        let selectedDate = +`${curentYearDisplay}${curentMonth}${curentDate}`
        this.openCalendar(e)
        if( !this.checkDisableDate(selectedDate)){
            e.target.value = `${curentDateDisplay}/${curentMonthDisplay}/${curentYearDisplayCheckYear}`
            e.target.setAttribute("value", `${curentDateDisplay}/${curentMonthDisplay}/${curentYearDisplayCheckYear}`)
            /* e.target.setAttribute("data-value", `${curentYearDisplay}${curentMonth}${curentDate}`) */
            e.target.setAttribute("data-fulldate", `${curentYear}${curentMonth}${curentDate}`)
            this.value =  yearType === "AD" ? +this.elem.dataset.fulldate : +this.elem.dataset.fulldate+this.BEYear

            this.render(curentDate,curentMonth,curentYear)

        }
    }

    checkDateIsValidFormat(date = ''){
        //check format form date that valid

         
          /*    */

        let yearType = this.option.yearType
        let format = this.option.format.split('/')

        let tranform_format = `${format[0].toLowerCase().slice(-1)}/${format[1].toLowerCase().slice(-1)}/${format[2].toLowerCase().slice(-1)}`
           
            tranform_format = tranform_format.split('/')

            date = date.split('/')

        let format_set = {}
    
            for (let i = 0; i <= 2; i++){
                format_set[ tranform_format[i] ] = date[i]
            }
            if(format_set.d && format_set.d.length === 1){
                format_set.d = ('0'+format_set.d).slice(-2) 
            }
            if(format_set.m && format_set.m.length === 1){
                format_set.m = ('0'+format_set.m).slice(-2) 
            }

            format_set.y = yearType === "AD" ? ""+(+format_set.y) : ""+(+format_set.y-543)
            
            if(date.length === 3){

              if((format_set.m.length === 2 && format_set.m < 13) && format_set.y.length === 4){
                
                    let date_number = new Date(format_set.y, format_set.m, 0).getDate() 
                
                        if(format_set.d.length < 3 && +format_set.d > 0 && +format_set.d <= date_number){
                        
                            return [true,format_set]
                        }else{
                            return false
                        }
                }else{
                    let tmax = this.extractFulldate(this.option.max)
                    let tmin = this.extractFulldate(this.option.min)
                    setTimeout(() => {
                        this.initDate()
                    }, 2000);
                   
                    throw new Error(`CODE 2 | the input is outbound of min and max limit ${tmin.d}/${tmin.m}/${tmin.y} and ${tmax.d}/${tmax.m}/${tmax.y}`)

                }
            }else{
            
                setTimeout(() => {
                    this.initDate()
                }, 2000);

                throw new Error('CODE 2 | Date value should be valid format Format :' + this.option.format)
            }

    }

    autoDate(e){
        if(e.target.value != ''){

        let check_format = this.checkDateIsValidFormat(e.target.value) 
        let yearType = this.option.yearType
        let max = String(this.option.max)
        let max_date = max.length > 0 ? [+max.slice(0,4), +max.slice(4,6),+max.slice(6,8)] : 0
        let max_month = max_date[0] != 0 ? max_date[1] : 12
        let max_year = max_date[0] != 0 ? max_date[0] : yearType === 'AD' ? 2100 : 2600
    
        let min = String(this.option.min)
        let min_date = min.length > 0 ? [+min.slice(0,4), +min.slice(4,6),+min.slice(6,8)] : 0
        let min_month = min_date[0] != 0 ? min_date[1] : 12
        let min_year = min_date[0] != 0 ? min_date[0] : yearType === 'AD' ? 2100 : 2600

        /* e.target.previousElementSibling.setAttribute('value',e.target.value) */

            if(check_format[0]){

                let full_date_display = this.selectDateFormat(check_format[1].d,check_format[1].m,check_format[1].y)[0]
                let separation = this.option.separation
                let starter = this.option.startWith

                let day_display = full_date_display[0]
                let d_display = full_date_display[1]
                let m_display = full_date_display[2]
                let y_display = full_date_display[3]

                y_display = yearType === "AD" ? y_display : +y_display+543

                let showDay = this.option.showDay === 'none' ? '' :`${day_display}, `
                let date_display = `${starter}${showDay}${d_display}${separation}${m_display}${separation}${y_display}`

                //set dataset value and value to input     
                
                let selectedDate = +`${y_display}${m_display}${d_display}`
                let checkSelectDate = yearType === 'AD' ? selectedDate : selectedDate-this.BEYear

                if(this.checkDisableDate(checkSelectDate)){
                    this.initDate()
                    this.value = yearType === "AD" ? +this.elem.dataset.fulldate : +this.elem.dataset.fulldate+this.BEYear

                }else if(!this.checkDisableDate(checkSelectDate)){


                    e.target.value = date_display
                    e.target.setAttribute("value" ,date_display)

                    /* e.target.setAttribute('data-value',`${y_display}${("0"+check_format[1].m).slice(-2)}${check_format[1].d}`)  */
                    e.target.setAttribute('data-fulldate',`${check_format[1].y}${("0"+check_format[1].m).slice(-2)}${check_format[1].d}`)

                    $(".date-panel").attr('data-fulldate',`${check_format[1].y}${("0"+check_format[1].m).slice(-2)}${check_format[1].d}`)
                    $(".date-panel").attr('data-date',`${check_format[1].d}`)

                    this.render(+check_format[1].d,+check_format[1].m,+check_format[1].y)   

                    this.value = yearType === "AD" ? +this.elem.dataset.fulldate : +this.elem.dataset.fulldate+this.BEYear

                /*   e.target.setAttribute("readonly","readonly") */
                }else{
                        let tmax = this.extractFulldate(this.option.max)
                        let tmin = this.extractFulldate(this.option.min)

                        this.elem.value = 'input must between : '+`${tmax.d}/${tmax.m}/${tmax.y} and ${tmin.d}/${tmin.m}/${tmin.y}`
                        console.error(`the input is outbound of min and max limit ${tmin.d}/${tmin.m}/${tmin.y} and ${tmax.d}/${tmax.m}/${tmax.y}`)

                        setTimeout(() => {
                            this.initDate()
                        }, 3000);

                    }
            }
        }
    }

    initDate(option = 'today'){
         //-----------------------------


         let checkDefaultDate = this.option.default == "today" ? String(this.todayInt) : this.option.default

         let fulldate = '' + ( this.elem.dataset.fulldate || checkDefaultDate)
         if(option === 'today') fulldate = String(this.todayInt)

         let [curentDate, curentMonth, curentYear] = [fulldate.slice(6, 8), fulldate.slice(4, 6), fulldate.slice(0, 4)]
 
         
         if(this.checkDisableDate(`${curentYear}${curentMonth}${curentDate}`)){

            while(this.checkDisableDate(`${curentYear}${('0'+curentMonth).slice(-2)}${('0'+curentDate).slice(-2)}`)){

                curentDate = +curentDate+1

                if(+curentDate === 0){
                    let d = new Date(curentYear,curentMonth-1,0)
                    curentMonth = ('0'+(curentMonth-1)).slice(-2)
                    curentDate =  d.getDate()
                }

                if(+curentMonth === 0){
                    curentYear = String(curentYear-1)
                    curentMonth = String(12)
                    curentDate =  String( 31)
                }

                

               }

               fulldate = `${curentYear}${('0'+curentMonth).slice(-2)}${('0'+curentDate).slice(-2)}`

           
            }
 
         let y = fulldate.slice(0, 4)
         let m = fulldate.slice(4, 6)
         let d = fulldate.slice(6, 8)
 
         let formatterArr = this.option.format.split('/')
 
         function checkDateFormat(arr = []) {
 
             let check_date_arr = ['d', 'dd', "D", "DD", 'm', 'mm', 'M', 'MM', "yy", 'yyyy']
 
             let check1 = check_date_arr.includes(arr[0]) || false
             let check2 = check_date_arr.includes(arr[1]) || false
             let check3 = check_date_arr.includes(arr[2]) || false
 
             return check1 && check2 && check3
         }
 
 
         let isValid = checkDateFormat([formatterArr[0], formatterArr[1], formatterArr[2]])
 
         if (isValid) {

           
 
             let full_date_display = this.selectDateFormat(d, m, y)[0]
             let separation = this.option.separation
             let starter = this.option.startWith
 
 
             let day_display = full_date_display[0]
             let d_display = full_date_display[1]
             let m_display = full_date_display[2]
             let y_display = full_date_display[3]



            this.elem.setAttribute("data-fulldate", `${curentYear}${curentMonth}${d_display}`)
             let checkYearType = this.option.yearType === "AD" ? y_display : +y_display + 543
 
             let showDay = this.option.showDay === 'none' ? '' :`${starter}${day_display}, `
             let date_display = `${showDay}${d_display}${separation}${m_display}${separation}${checkYearType}`
 

             
             //set dataset value and value to input        
 
             let parent = this.elem
 
             parent.value = date_display
 
             parent.setAttribute("value", date_display)
 
             /* parent.setAttribute("data-value", `${checkYearType}${m}${d}`) */
 
             parent.dataset.fulldate = `${y}${m}${d}`
             
             this.value = `${y}${m}${d}`
             $(".date-panel").attr('data-fulldate', `${y}${("0"+m).slice(-2)}${d}`)
             $(".date-panel").attr('data-date', `${d}`)
 
         } else {
             console.error("Invalid date Format")
         }
 
         //----------------------------
    }

  
    // * -----------------------------------------
  
    //* MAIN Method
 
    init() {
        
        if(this.option.type !== 'static'){
            let newFormat = this.option.format.split('/')

           /*  var dateMask = IMask(this.elem, {
                mask: `00${this.option.separation}}00${this.option.separation}0000`,
                lazy: false,  // make placeholder always visible
                placeholderChar: '_'     // defaults to '_'
            }) */
    
        }

        let checkYearType = this.option.yearType === 'AD' ? 0 : 543*10**4

        let c = 0
        for (let i = 0 ; c < this.exceptionDate.length-1; i++){
            this.getAllDate(''+(this.exceptionDate[c]-checkYearType),''+(this.exceptionDate[c+1]-checkYearType))
            c += 2
        } 


   
        /* this.option.default = this.option.yearType === "AD" && !isNaN(+this.option.default) ? +this.option.default-this.BEYear  : this.todayInt */
        this.option.default = this.option.yearType === "AD" && !isNaN(+this.option.default) ? +this.option.default  : this.todayInt



        /* this.exceptionDate.map((item)=>{
            this.getAllDate(''+item.start,''+item.end)
        }) 

        this.elem.addEventListener('click', (e) => {
            this.openCalendar(e)
            this.findOverflows()

        })

         //eventLBL 
         addEventListener('resize',(e)=>{
            this.findOverflows()
        })
        */

        // init Event for Calendar

        let classP = this

        // [ev:kd] Keydown Event
        this.elem.addEventListener('dateChange',(e)=>{
            dateEvent.value = String(this.value)
            String.prototype.exportValue = function(option,separation,type){
                return classP.exportValue(option,separation,type)
            }

            /* dateEvent.value.exportValue = function(option,separation){
                return exportValue(option,separation)
            } */

        

        })
        // Setup Static Calendar

        if(this.option.type === 'static') this.openStaticCalendar() 

        //----------------------

        // Set placeholder For Calendar input  

            let formatter = this.option.format
            let type = this.option.type

            this.elem.setAttribute("placeholder", formatter)

            if(this.option.autoValue) {
                this.initDate()
                this.elem.dispatchEvent(dateEvent)
            }

            if(type !== "static") this.elem.insertAdjacentHTML('afterend', `<div class="date-icon" ><i class="fa-duotone fa-calendar"></i></div>`);

            //check if today date is lower or greater max min date 
            // if max date is lower than current date change max date to currentdate +100
            // if min date is greater than current date change max date to currentdate -100

        /*   if (this.option.autoAdjustMaxMin) {
                let current = this.todayInt

                current = this.option.yearType === 'AD' ? current : this.todayInt+(543*10**4)
                if (this.option.max < current) {
                    this.option.max = current + 10 ** 5 // max is 7
                }

                if (this.option.min > current) {
                    this.option.min = current - 10 ** 5 // max is 7
                }
                
            } */
    
        //-----------------------------
      
        // Setting the option for min,max range
        let max = String(this.option.max)
        let max_date = max.length > 0 ? [+max.slice(0, 4), +max.slice(4, 6), +max.slice(6, 8)] : 0
        let max_day = max_date[0] != 0 ? max_date[2] : 28
        let max_month = max_date[0] != 0 ? max_date[1] : 12
        let max_year = max_date[0] != 0 ? max_date[0] : this.option.yearType === 'AD' ? 2100 : 2600

        let min = String(this.option.min)
        let min_day = max_date[0] != 0 ? max_date[2] : 1
        let min_date = min.length > 0 ? [+min.slice(0, 4), +min.slice(4, 6), +min.slice(6, 8)] : 0
        let min_month = min_date[0] != 0 ? min_date[1] : 12
        let min_year = min_date[0] != 0 ? min_date[0] : this.option.yearType === 'AD' ? 2100 : 2600
    

    
        this.elem.addEventListener('keydown', (e) => {
                /* this.elem.nextElementSibling.click() */

                let fullDate = e.target.dataset.fulldate || String(this.todayInt)
                let date = 0
                let yearType = this.option.yearType

                let [year_s, month_s, date_s] = [fullDate.slice(0, 4), fullDate.slice(4, 6), fullDate.slice(6, 8)]


                Date.prototype.configDate = function (days, option) {
                    date = new Date(`${year_s}-${month_s}-${date_s}`);

                    if (option === 'add') {
                        date.setDate(date.getDate() + days);
                    } else if (option === 'remove') {
                        date.setDate(date.getDate() - days);
                    }
                    return date;
                }

                Date.prototype.configMonth = function (month, option) {
                    months = new Date(`${+fullDate.slice(0,4)}-${fullDate.slice(4,6)}-${fullDate.slice(6,8)}`);
                    if (option === 'add') {
                        months.setMonth(months.getMonth() + month);
                    } else if (option === 'remove') {
                        months.setMonth(months.getMonth() - month);
                    }

                    return months;
                }


                let d = new Date();
                //right  
                if (e.keyCode === 39) {
                    let fulldate = e.target.dataset.fulldate
                    let [this_date, this_month, this_year] = [+fulldate.slice(6, 8), +fulldate.slice(4, 6), +fulldate.slice(0, 4)]
                    let checkYearType = yearType == "AD" ? +this_year : +this_year + 543

                    if ((max_date[2] != this_date || max_month != this_month || max_year != checkYearType)) {
                        let current = d.configDate(1, "add")
                        this.changeDateByArrow(e, current)
                    }
                }
                //left 
                if (e.keyCode === 37) {

                    let fulldate = e.target.dataset.fulldate
                    let [this_date, this_month, this_year] = [+fulldate.slice(6, 8), +fulldate.slice(4, 6), +fulldate.slice(0, 4)]

                    let checkYearType = yearType == "AD" ? +this_year : +this_year + 543

                    if (min_date[2] != this_date || this_month != min_month || checkYearType != min_year) {

                        let current = d.configDate(1, "remove")
                        this.changeDateByArrow(e, current)
                    }
                }
                //up
                if (e.keyCode === 38) {
                    let current = d.configDate(7, "remove")
                    this.changeDateByArrow(e, current)
                }
                //down
                if (e.keyCode === 40) {
                    let current = d.configDate(7, "add")
                    this.changeDateByArrow(e, current)
                }

                //auto daye by enter
                if (e.key === 'Enter' && e.target.value == '') {
                    e.target.value = `${('0'+DATE.getDate()).slice(-2) }${this.option.separation}${('0'+(DATE.getMonth()+1)).slice(-2)}${this.option.separation}${this.option.yearType === 'AD' ? DATE.getFullYear() : DATE.getFullYear()+543}`
                    this.autoDate(e)
                }

                setTimeout(() => {
                    $('.date-panel').length = 0
                }, 1000);

                if (e.key === 'Enter') {
                    $('.date-panel').remove()
                }

        })

            this.elem.addEventListener('click',(e)=>{
                this.option.type === 'static' ? '' : e.target.setSelectionRange(0,2)


            })
            //click icon 
            if(this.option.type !== 'static'){
            this.elem.nextElementSibling.addEventListener("click", (e) => {

                this.openCalendar(e)
                /* this.findOverflows() */
            })
        }
         /*    this.elem.addEventListener(('mouseup'),(e)=>{
               

                console.log(`Selected text: ${this.elem.value.substring(e.target.selectionStart, e.target.selectionEnd)}`);

            }) */

        // [ev:fc] Focus Event

        this.elem.addEventListener('focus',(e)=>{
                let yearType = this.option.yearType
                let fullDate = this.elem.dataset.fulldate
                this.option.type === 'static' ? '' : e.target.setSelectionRange(0,2)


                if(this.checkDisableDate(fullDate)){
                    if(this.option.autoValue){
                        this.initDate('today')
                        this.value = yearType === "AD" ? +this.elem.dataset.fulldate : +this.elem.dataset.fulldate+this.BEYear
                    }
                }else{

                    let date = fullDate.slice(6,8)
                    let month = fullDate.slice(4,6)
                    let year = fullDate.slice(0,4)

                    let checkYearType = yearType === "AD" ? +year : +year+543 

                    
                    let checkFormat = this.selectDateFormat(date,month,checkYearType)[1]

                    e.target.value = `${checkFormat[0]}/${checkFormat[1]}/${checkFormat[2]}`
                    e.target.setAttribute("value" ,`${checkFormat[0]}/${checkFormat[1]}/${checkFormat[2]}`) 

                }

            })

            this.elem.addEventListener('change', (e) => {

                    this.autoDate(e)
                })  

            this.elem.addEventListener('blur', (e) => {

                    this.autoDate(e)
            }) 

            //click input
            this.elem.addEventListener("click", (e) => {
               
                if(e.detail === 2){
                    e.target.setSelectionRange(0,e.target.value.length)
                }
                if(e.target.value === ''){
                    this.elem.addEventListener('keydown', (e) => {
                        if(e.key === 'Enter'){
                            this.autoDate(e)
                            $('.date-panel').remove()
                        }
                    })
        
                    this.elem.addEventListener('change', (e) => {
                            this.autoDate(e)
                    })
        
                    this.elem.addEventListener('blur', (e) => {
                            this.autoDate(e)

                    })

                    
    
                }
            })
    }

    openStaticCalendar(){
        
            //e.target.previousElementSibling.parentElement.style.position = "relative" 
            let max = String(this.option.max)
            let max_date = max.length > 0 ? [+max.slice(0, 4), +max.slice(4, 6), +max.slice(6, 8)] : 0
            let max_day = max_date[0] != 0 ? max_date[2] : 28
            let max_month = max_date[0] != 0 ? max_date[1] : 12
            let max_year = max_date[0] != 0 ? max_date[0] : this.option.yearType === 'AD' ? 2100 : 2600

            let min = String(this.option.min)
            let min_date = min.length > 0 ? [+min.slice(0, 4), +min.slice(4, 6), +min.slice(6, 8)] : 0
            let min_day = min_date[0] != 0 ? min_date[2] : 1
            let min_month = min_date[0] != 0 ? min_date[1] : 12
            let min_year = min_date[0] != 0 ? min_date[0] : this.option.yearType === 'AD' ? 2100 : 2600
            let lang = this.option.lang


            let dayHeader = ''

            if (lang === 'th') {
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
            if (lang === 'en') {
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

            $(this.elem)[0].insertAdjacentHTML('beforeend', `
                <div class="date-panel-static" data-id='${this._id}'>
                    <div class="date-header">
                        <div class="lbl_month" id="header_month">month</div>
                        <div class="lbl_year" id="header_year">year</div>
        
                        <div class="button_group">
                            <button type="button" class="btn btn-sm btnPreviousMonth" id="btnPreviousMonth"> <i
                            class="fas fa-chevron-left"></i> </button>
                            
                            <button type="button" class="btn btn-sm btnNextMonth" id="btnNextMonth"><i
                                    class="fas fa-chevron-right"></i></button>
                        </div>
                    </div>
                    <div class="month-panel">
                        <div class="month-header">
                            <div class="lbl_year">year</div>
                        </div>
        
                        <div class="month-body" id="month_body"></div>
        
                    </div>
                    <div class="year-panel">
                       
                    </div>
                    <div class="date-day">
                        ${dayHeader}
                    </div>
        
                    <div class="date-body">
                        <!--    <div class="year-panel"></div> -->
                    </div>
                </div>
            `)

            let checkDefaultDate = this.option.default == "today" ? String(this.todayInt) : this.option.default

            let fulldate = '' + ( this.elem.dataset.fulldate || checkDefaultDate)


            let [curentDate, curentMonth, curentYear] = [fulldate.slice(6, 8), fulldate.slice(4, 6), fulldate.slice(0, 4)]
 
            if(this.option.section === 'all'){
 
            if(this.checkDisableDate(`${curentYear}${curentMonth}${curentDate}`)){
                
               while(this.checkDisableDate(`${curentYear}${('0'+curentMonth).slice(-2)}${('0'+curentDate).slice(-2)}`)){
   
                   curentDate = +curentDate+1
   
                   if(+curentDate === 0){

                        let d = new Date(curentYear,curentMonth-1,0)
                        curentMonth = ('0'+(curentMonth-1)).slice(-2)
                        curentDate =  d.getDate()
                    }

                    if(+curentMonth === 0){

                        curentYear = String(curentYear-1)
                        curentMonth = String(12)
                        curentDate =  String( 31)

                    }
   
                  }
   
                  fulldate = `${curentYear}${('0'+curentMonth).slice(-2)}${('0'+curentDate).slice(-2)}`
   
              
               }

            }

           if(this.option.autoValue){
            this.elem.setAttribute("data-fulldate", `${curentYear}${curentMonth}${curentDate}`)

            this.render(curentDate, curentMonth, curentYear)
           }

            if (
                (max_date[2] >= +curentDate || max_month != +curentMonth || max_year != +curentYear) &&
                (min_date[2] <= +curentDate || +curentMonth != min_month || +curentYear != min_year)
            ) {
                this.render(curentDate, curentMonth, curentYear)

            } else if ((max_date[2] < +curentDate && max_month <= +curentMonth && max_year <= +curentYear)) {
              this.elem.setAttribute("data-fulldate", `${max_date[0]}${('0'+max_date[1]).slice(-2)}${('0'+max_date[2]).slice(-2)}`)
                this.render(max_date[2], max_date[1], max_date[0])

            } else if ((min_date[2] > +curentDate && +curentMonth >= min_month && +curentYear >= min_year)) {

                this.render(min_date[2], min_date[1], min_date[0])
                this.elem.setAttribute("data-fulldate", `${min_date[0]}${('0'+min_date[1]).slice(-2)}${('0'+min_date[2]).slice(-2)}`)
            }



            //-----------------------SECTION MONTH-------------------------------

            if(this.option.section === 'm' || this.option.section === 'my' ){
                $(`${this.panelClass} .month-panel`).addClass('show-month')
                $(`${this.panelClass} .month-panel`).css('opacity', '100%')

                if(this.option.section === 'm'){
                    $(`${this.panelClass} .lbl_year`).remove()
                }

                this.renderMonth(3)
                
                $(`${this.panelClass} .month-item`).click((e) => {
                    let fullDate = e.target.dataset.fulldate
                  
                    let month = fullDate.slice(1, 3)
                    let year = $(`${this.panelClass}`).attr('data-year')
                  
                    let yearValue = this.option.yearType === 'AD' ? year : +year+543


             


                    
                    $(`${this.panelClass} .month-item`).removeClass('_selected')
                    e.target.classList.add('_selected')
                    
                    $(`${this.panelClass}`).attr('data-month', `${month}`)

                    this.value =  `${yearValue}${month}01`

                    this.render(1, +month, +year )

                })
            }


                //-----------------------SECTION YEAR-------------------------------
                if(this.option.section === 'y'){
                    
                    $(`${this.panelClass} .year-panel`).addClass('show-month')
                    $(`${this.panelClass} .year-panel`).css('opacity', '100%')
    
                    this.renderYear(DATE.getFullYear())

                    $(`${this.panelClass} .year-item`).click((e) => {
                    
                        let year = this.option.yearType === 'AD' ? e.target.dataset.year : +e.target.dataset.year-543
                   
                        let yearValue = +e.target.dataset.year

                        $(`${this.panelClass} .year-item`).removeClass('_selected')
                        e.target.classList.add('_selected')
                        
                        $(`${this.panelClass}`).attr('data-year', `${year}`)

                        this.value =  `${yearValue}0101`

                        this.render(1, 1, +year)
    
                    })
                }

                if(this.option.section === 'y' || this.option.section === 'my'){

                $(`${this.panelClass} .lbl_year`).click((ev) => {
                    $(`${this.panelClass} .year-panel`).addClass('show-month')
                    $(`${this.panelClass} .year-panel`).css('opacity', '100%')
    
                    this.renderYear(DATE.getFullYear())
                    
                    $(`${this.panelClass} .year-item`).click((e) => {

                       let month =  $(`${this.panelClass}`).attr('data-month')
                        let year = this.option.yearType === 'AD' ? e.target.dataset.year : +e.target.dataset.year-543

                        let yearValue = +e.target.dataset.year

                        $(`${this.panelClass} .year-item`).removeClass('_selected')
                        e.target.classList.add('_selected')
                        
                        $(`${this.panelClass}`).attr('data-year', `${year}`)

                        $(`${this.panelClass} .year-panel`).removeClass('show-month')

                        this.value =  `${yearValue}${month}01`

                        this.render(1, +month, +year)
    
                    })
                })

                }

         

            // event for label
        if(this.option.section === 'all' ){

            $(`${this.panelClass} .lbl_year`).click((ev) => {
                this.renderYear()

                let this_date = ev.target.parentElement.parentElement.dataset.date || ev.target.parentElement.parentElement.parentElement.dataset.date
                let this_month = ev.target.parentElement.parentElement.dataset.month || ev.target.parentElement.parentElement.parentElement.dataset.date
                let year = 0

                
                $(`${this.panelClass} .year-panel`).addClass('show-month')

                $(`${this.panelClass} .year-item`).click((e) => {
                    $(`${this.panelClass} .year-panel`).removeClass('show-month')

                    year = this.option.yearType === "AD" ? +e.target.dataset.year : +e.target.dataset.year - 543

                    let checkYearType = this.option.yearType === "AD" ? +year : +year + 543

                    if((+this_date > max_day || +this_month > max_month) && checkYearType >= max_year){
                        this_date = max_day
                        this_month = max_month

                    }
                   
                    if((+this_date < min_day || +this_month < min_month )&& checkYearType <= min_year){
                        this_date = min_day
                        this_month = min_month
                    }

                    this.renderMonth(checkYearType)

                    let full_date_display = this.selectDateFormat(this_date, this_month, checkYearType, true)[0]
                    let separation = this.option.separation
                    let starter = this.option.startWith

                    let day_display = full_date_display[0]
                    let d_display = full_date_display[1]
                    let m_display = full_date_display[2]
                    let y_display = full_date_display[3]


                    let showDay = this.option.showDay === 'none' ? '' :`${day_display}, `
                    let date_display = `${starter}${showDay}${d_display}${separation}${m_display}${separation}${y_display}`

                    //set dataset value and value to input        
                    let parent = this.elem

                    parent.value = date_display

                    parent.setAttribute("value", date_display)

                    /* parent.setAttribute("data-value", `${checkYearType}${("0"+this_month).slice(-2)}${this_date}`) */

                    parent.setAttribute("data-fulldate", `${year}${("0"+this_month).slice(-2)}${this_date}`)

                    $(`${this.panelClass} .date-panel`).attr('data-fulldate', `${year}${("0"+this_month).slice(-2)}${this_date}`)
                    $(`${this.panelClass} .date-panel`).attr('data-date', `${this_date}`)

                    this.value =  this.option.yearType  === "AD" ? +this.elem.dataset.fulldate : +this.elem.dataset.fulldate+this.BEYear
                   

                    this.render(this_date, this_month, year)

                    $(".month-item").click((e) => {

                        let fullDate = e.target.dataset.fulldate

                        let this_year = fullDate.slice(0, 4)
                        let month = fullDate.slice(4, 6)

                        $(`${this.panelClass} .month-panel`).removeClass('show-month')

                        let full_date_display = this.selectDateFormat(this_date, month, this_year, true)[0]


                        let day_display = full_date_display[0]
                        let d_display = full_date_display[1]
                        let m_display = full_date_display[2]
                        let y_display = full_date_display[3]

                        let checkYearType = this.option.yearType === 'AD' ? this_year : this_year - 543

                        let showDay = this.option.showDay === 'none' ? '' :`${starter}${day_display}, `
                        let date_display = `${showDay}${d_display}${separation}${m_display}${separation}${y_display}`

                        //set dataset value and value to input        
                        let parent = this.elem
                        parent.value = date_display
                        parent.setAttribute("value", date_display)
                        /* parent.setAttribute("data-value", `${checkYearType}${("0"+month).slice(-2)}${this_date}`) */
                        parent.setAttribute("data-fulldate", `${checkYearType}${("0"+month).slice(-2)}${this_date}`)

                        $(`${this.panelClass} .date-panel`).attr('data-fulldate', `${checkYearType}${("0"+month).slice(-2)}${this_date}`)
                        $(`${this.panelClass} .date-panel`).attr('data-date', `${this_date}`)

                        this.value =  this.option.yearType  === "AD" ? +this.elem.dataset.fulldate : +this.elem.dataset.fulldate+this.BEYear

                        this.render(this_date, month, checkYearType)

                    })
                })
            })
      

            $(`${this.panelClass} .lbl_month`).click((e) => {
                let this_date = e.target.parentElement.parentElement.dataset.date
                let this_year = this.option.yearType === "AD" ? e.target.parentElement.parentElement.dataset.year : +e.target.parentElement.parentElement.dataset.year + 543
                let month = 0

                $(`${this.panelClass} .month-panel`).addClass('show-month')

                this.renderMonth(this_year)

                $(`${this.panelClass} .month-item`).click((e) => {
                    let fullDate = e.target.dataset.fulldate
                    month = fullDate.slice(4, 6)

                    $(`${this.panelClass} .month-panel`).removeClass('show-month')

                    let full_date_display = this.selectDateFormat(this_date, month, this_year, true)[0]

                    let separation = this.option.separation
                    let starter = this.option.startWith
                    let day_display = full_date_display[0]
                    let d_display = full_date_display[1]
                    let m_display = full_date_display[2]
                    let y_display = full_date_display[3]

                    let checkYearType = this.option.yearType === 'AD' ? this_year : this_year - 543


                    let showDay = this.option.showDay === 'none' ? '' :`${day_display}, `
                    let date_display = `${starter}${showDay}${d_display}${separation}${m_display}${separation}${y_display}`

                    //set dataset value and value to input        
                    let parent = this.elem
                    parent.value = date_display
                    parent.setAttribute("value", date_display)
                    /* parent.setAttribute("data-value", `${checkYearType}${("0"+month).slice(-2)}${this_date}`) */
                    parent.setAttribute("data-fulldate", `${checkYearType}${("0"+month).slice(-2)}${this_date}`)

                    $(`${this.panelClass} .date-panel`).attr('data-fulldate', `${checkYearType}${("0"+month).slice(-2)}${this_date}`)
                    $(`${this.panelClass} .date-panel`).attr('data-date', `${this_date}`)

                    this.value =  this.option.yearType  === "AD" ? +this.elem.dataset.fulldate : +this.elem.dataset.fulldate+this.BEYear
                    this.render(this_date, month, checkYearType)

                })

            })

            $(`${this.panelClass} #btnPreviousMonth`).click((ev) => {
                let this_date = +ev.target.parentElement.parentElement.parentElement.dataset.date
                let this_month = +ev.target.parentElement.parentElement.parentElement.dataset.month
                let this_year = +ev.target.parentElement.parentElement.parentElement.dataset.year

                let checkYearType = this.option.yearType == "AD" ? this_year : this_year + 543

                if (max_date[0] != 0 && this_month - min_month > 0 || checkYearType - min_year > 0) {

                    if (this_month == 1) {
                        this_month = 12
                        this_year -= 1
                    } else {
                        this_month -= 1
                    }
                  
                    this.render(this_date, this_month, this_year)
                }

            })

            $(`${this.panelClass} #btnNextMonth`).click((ev) => {
                let this_date = +ev.target.parentElement.parentElement.parentElement.dataset.date
                let this_month = +ev.target.parentElement.parentElement.parentElement.dataset.month
                let this_year = +ev.target.parentElement.parentElement.parentElement.dataset.year

                let checkYearType = this.option.yearType == "AD" ? this_year : this_year + 543

                if (max_date[0] != 0 && max_month - this_month > 0 || max_year - checkYearType > 0) {

                    if (this_month == 12) {
                        this_month = 1
                        this_year += 1
                    } else {
                        this_month += 1
                    }
                    
                 
                    this.render(this_date, this_month, this_year)


                }
                /* else{
                             this.render(max_date[2],max_month,max_year,setting) 
                        } */

            })
        }

            /* findOverflows(); */

    }

    openCalendar(e) {
      
        if ($(".date-panel").length === 0) {
            //e.target.previousElementSibling.parentElement.style.position = "relative" 
            let defaultDate = this.option.default

 
            let max = String(this.option.max)
            let max_date = max.length > 0 ? [+max.slice(0, 4), +max.slice(4, 6), +max.slice(6, 8)] : 0
            let max_day = max_date[0] != 0 ? max_date[2] : 28
            let max_month = max_date[0] != 0 ? max_date[1] : 12
            let max_year = max_date[0] != 0 ? max_date[0] : this.option.yearType === 'AD' ? 2100 : 2600

            let min = String(this.option.min)
            let min_date = min.length > 0 ? [+min.slice(0, 4), +min.slice(4, 6), +min.slice(6, 8)] : 0
            let min_day = min_date[0] != 0 ? min_date[2] : 1
            let min_month = min_date[0] != 0 ? min_date[1] : 12
            let min_year = min_date[0] != 0 ? min_date[0] : this.option.yearType === 'AD' ? 2100 : 2600
            let lang = this.option.lang


            let dayHeader = ''


            let c = 0
            let i = this.option.dayStartWith 
            while(c < 7){
                if(i > 6){
                    i = 0
                }
                dayHeader += `<div class="date-day-item">${ LANG[`d_${lang}_sm`][i]}</div>`
                i++
                c++
            }
       /*  
            if (lang === 'th') {
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
            if (lang === 'en') {
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
 */

            let checkElem =  this.option.type === 'static' ? this.elem : 'body'
            $('body')[0].insertAdjacentHTML('beforeend', `
                <div class="date-panel" data-id='${this._id}'>
                    <div class="date-header">
                        <div class="lbl_month" id="header_month">month</div>
                        <div class="lbl_year" id="header_year">year</div>
        
                        <div class="button_group">
                            <button type="button" class="btn btn-sm btnPreviousMonth" id="btnPreviousMonth"> <i
                            class="fas fa-chevron-left"></i> </button>
                            
                            <button type="button" class="btn btn-sm btnNextMonth" id="btnNextMonth"><i
                                    class="fas fa-chevron-right"></i></button>
                        </div>
                    </div>
                    <div class="month-panel">
                        <div class="month-header">
                            <div class="lbl_year">year</div>
                        </div>
        
                        <div class="month-body" id="month_body"></div>
        
                    </div>
                    <div class="year-panel">
        
                    </div>
                    <div class="date-day">
                        ${dayHeader}
                    </div>
        
                    <div class="date-body">
                        <!--    <div class="year-panel"></div> -->
                    </div>
                </div>
            `)

            let checkDefaultDate = defaultDate == "today" ? String(this.todayInt) : defaultDate


            let fulldate = '' + ( this.elem.dataset.fulldate || checkDefaultDate)
            let [curentDate, curentMonth, curentYear] = [fulldate.slice(6, 8), fulldate.slice(4, 6), fulldate.slice(0, 4)]

        
            this.elem.setAttribute("data-fulldate", `${curentYear}${curentMonth}${curentDate}`)


            if (
                (max_date[2] >= +curentDate || max_month != +curentMonth || max_year != +curentYear) &&
                (min_date[2] <= +curentDate || +curentMonth != min_month || +curentYear != min_year)
            ) {
                this.render(curentDate, curentMonth, curentYear)

            } else if ((max_date[2] < +curentDate && max_month <= +curentMonth && max_year <= +curentYear)) {
              this.elem.setAttribute("data-fulldate", `${max_date[0]}${('0'+max_date[1]).slice(-2)}${('0'+max_date[2]).slice(-2)}`)
                this.render(max_date[2], max_date[1], max_date[0])

            } else if ((min_date[2] > +curentDate && +curentMonth >= min_month && +curentYear >= min_year)) {

                this.render(min_date[2], min_date[1], min_date[0])
              this.elem.setAttribute("data-fulldate", `${min_date[0]}${('0'+min_date[1]).slice(-2)}${('0'+min_date[2]).slice(-2)}`)

            }

         


            // event for label
            $(`${this.panelClass} .lbl_year`).click((ev) => {
                this.renderYear()
                let this_date = ev.target.parentElement.parentElement.dataset.date || ev.target.parentElement.parentElement.parentElement.dataset.date
                let this_month = ev.target.parentElement.parentElement.dataset.month || ev.target.parentElement.parentElement.parentElement.dataset.date
                let year = 0

                $(`${this.panelClass} .year-panel`).addClass('show-month')

                $(`${this.panelClass} .year-item`).click((e) => {

                    $(`${this.panelClass} .year-panel`).removeClass('show-month')

                    year = this.option.yearType === "AD" ? +e.target.dataset.year : +e.target.dataset.year - 543

                    let checkYearType = this.option.yearType === "AD" ? +year : +year + 543

                    if((+this_date > max_day || +this_month > max_month) && checkYearType >= max_year){
                        this_date = max_day
                        this_month = max_month

                    }
                   
                    if((+this_date < min_day || +this_month < min_month )&& checkYearType <= min_year){
                        this_date = min_day
                        this_month = min_month
                    }

                    this.renderMonth(checkYearType)

                    let full_date_display = this.selectDateFormat(this_date, this_month, checkYearType, true)[0]

                    let separation = this.option.separation
                    let starter = this.option.startWith

                    let day_display = full_date_display[0]
                    let d_display = full_date_display[1]
                    let m_display = full_date_display[2]
                    let y_display = full_date_display[3]


                    let showDay = this.option.showDay === 'none' ? '' :`${day_display}, `
                    let date_display = `${starter}${showDay}${d_display}${separation}${m_display}${separation}${y_display}`

                    //set dataset value and value to input        

                    let parent = this.elem

                    parent.value = date_display

                    parent.setAttribute("value", date_display)

                    /* parent.setAttribute("data-value", `${checkYearType}${("0"+this_month).slice(-2)}${this_date}`) */

                    parent.setAttribute("data-fulldate", `${year}${("0"+this_month).slice(-2)}${this_date}`)

                    $(`${this.panelClass} .date-panel`).attr('data-fulldate', `${year}${("0"+this_month).slice(-2)}${this_date}`)
                    $(`${this.panelClass} .date-panel`).attr('data-date', `${this_date}`)

                    this.value =  this.option.yearType === "AD" ? +this.elem.dataset.fulldate : +this.elem.dataset.fulldate+this.BEYear

                    this.render(this_date, this_month, year)

                    $(`${this.panelClass} .month-item`).click((e) => {

                        let fullDate = e.target.dataset.fulldate

                        let this_year = fullDate.slice(0, 4)
                        let month = fullDate.slice(4, 6)

                        $(`${this.panelClass} .month-panel`).removeClass('show-month')

                        let full_date_display = this.selectDateFormat(this_date, month, this_year, true)[0]


                        let day_display = full_date_display[0]
                        let d_display = full_date_display[1]
                        let m_display = full_date_display[2]
                        let y_display = full_date_display[3]

                        let checkYearType = this.option.yearType === 'AD' ? this_year : this_year - 543

                        let showDay = this.option.showDay === 'none' ? '' :`${starter}${day_display}, `
                        let date_display = `${showDay}${d_display}${separation}${m_display}${separation}${y_display}`

                        //set dataset value and value to input        
                        let parent = this.elem
                        parent.value = date_display
                        parent.setAttribute("value", date_display)
                        /* parent.setAttribute("data-value", `${checkYearType}${("0"+month).slice(-2)}${this_date}`) */
                        parent.setAttribute("data-fulldate", `${checkYearType}${("0"+month).slice(-2)}${this_date}`)

                        $(`${this.panelClass} .date-panel`).attr('data-fulldate', `${checkYearType}${("0"+month).slice(-2)}${this_date}`)
                        $(`${this.panelClass} .date-panel`).attr('data-date', `${this_date}`)

                        this.value =  this.option.yearType === "AD" ? +this.elem.dataset.fulldate : +this.elem.dataset.fulldate+this.BEYear
               

                        this.render(this_date, month, checkYearType)

                    })
                })
            })


            $(`${this.panelClass} .lbl_month`).click((e) => {
                let this_date = e.target.parentElement.parentElement.dataset.date
                let this_year = this.option.yearType === "AD" ? e.target.parentElement.parentElement.dataset.year : +e.target.parentElement.parentElement.dataset.year + 543
                let month = 0

                $(`${this.panelClass} .month-panel`).addClass('show-month')

                this.renderMonth(this_year)

                $(`${this.panelClass} .month-item`).click((e) => {


                    let fullDate = e.target.dataset.fulldate
                    month = fullDate.slice(4, 6)

                    $(`${this.panelClass} .month-panel`).removeClass('show-month')

                    let full_date_display = this.selectDateFormat(this_date, month, this_year, true)[0]

                    let separation = this.option.separation
                    let starter = this.option.startWith
                    let day_display = full_date_display[0]
                    let d_display = full_date_display[1]
                    let m_display = full_date_display[2]
                    let y_display = full_date_display[3]

                    let checkYearType = this.option.yearType === 'AD' ? this_year : this_year - 543

                    let showDay = this.option.showDay === 'none' ? '' :`${day_display}, `
                    let date_display = `${starter}${showDay}${d_display}${separation}${m_display}${separation}${y_display}`

                    //set dataset value and value to input        
                    let parent = this.elem
                    parent.value = date_display
                    parent.setAttribute("value", date_display)
                    /* parent.setAttribute("data-value", `${checkYearType}${("0"+month).slice(-2)}${this_date}`) */
                    parent.setAttribute("data-fulldate", `${checkYearType}${("0"+month).slice(-2)}${this_date}`)

                    $(`${this.panelClass} .date-panel`).attr('data-fulldate', `${checkYearType}${("0"+month).slice(-2)}${this_date}`)
                    $(`${this.panelClass} .date-panel`).attr('data-date', `${this_date}`)

                    this.value =  this.option.yearType === "AD" ? +this.elem.dataset.fulldate : +this.elem.dataset.fulldate+this.BEYear

                    this.render(this_date, month, checkYearType)

                })

            })

            $(`${this.panelClass} #btnPreviousMonth`).click((ev) => {
                let this_date = +ev.target.parentElement.parentElement.parentElement.dataset.date
                let this_month = +ev.target.parentElement.parentElement.parentElement.dataset.month
                let this_year = +ev.target.parentElement.parentElement.parentElement.dataset.year

                let checkYearType = this.option.yearType == "AD" ? this_year : this_year + 543

                if (max_date[0] != 0 && this_month - min_month > 0 || checkYearType - min_year > 0) {

                    if (this_month == 1) {
                        this_month = 12
                        this_year -= 1
                    } else {
                        this_month -= 1
                    }
                  
                    this.render(this_date, this_month, this_year)
                }

            })

            $(`${this.panelClass} #btnNextMonth`).click((ev) => {
                let this_date = +ev.target.parentElement.parentElement.parentElement.dataset.date
                let this_month = +ev.target.parentElement.parentElement.parentElement.dataset.month
                let this_year = +ev.target.parentElement.parentElement.parentElement.dataset.year

                let checkYearType = this.option.yearType == "AD" ? this_year : this_year + 543

                if (max_date[0] != 0 && max_month - this_month > 0 || max_year - checkYearType > 0) {

                    if (this_month == 12) {
                        this_month = 1
                        this_year += 1
                    } else {
                        this_month += 1
                    }
                    
                 
                    this.render(this_date, this_month, this_year)


                }
                /* else{
                             this.render(max_date[2],max_month,max_year,setting) 
                        } */

            })


            /* findOverflows(); */

        }
    }



    render(date = 0, month = 0, year = 0) {
        let lang = this.option.lang
        let yearType = this.option.yearType
        let max = String(this.option.max)
        let min = String(this.option.min)

        let max_date = [+max.slice(0, 4), +max.slice(4, 6), +max.slice(6, 8)]
        let max_month = max_date != 0 ? max_date[1] : 12
        let max_year = max_date != 0 ? max_date[0] : yearType == 'AD' ? 2100 : 2600

        let min_date = [+min.slice(0, 4), +min.slice(4, 6), +min.slice(6, 8)]
        let min_month = min_date != 0 ? min_date[1] : 12
        let min_year = min_date != 0 ? min_date[0] : yearType == 'AD' ? 2100 : 2600

        let selectable = this.option.selectable
        let closeOnSelect = this.option.closeOnSelect
        let yearPanel = this.option.yearPanel

        let disableSelect = ''

        if (!selectable) {
            disableSelect = 'disableSelect'
        }

        addEventListener('click',e=>{
            if (!closeOnSelect) {
                panel_arr.push('date-item date-selected')
            }

            if (!closeOnSelect && !selectable) {
                panel_arr.push('date-item')
            }


            if (!panel_arr.includes(e.target.className)) {
                    $(".date-panel").remove()
            }

        })
        addEventListener('touchend',e=>{
            if (!closeOnSelect) {
                panel_arr.push('date-item date-selected')
            }

            if (!panel_arr.includes(e.target.className)) {
                    $(`".date-panel"`).remove()
            }

        })


        $(`${this.panelClass} .date-body`).empty()

        let d = new Date();

        let this_day = 0
        let this_month = 0;
        let this_year = 0;

        //if no parameter set today to default date 
        if (date == 0 || month == 0 || year == 0) {
            this_day = d.getDate();
            this_month = d.getMonth() + 1;
            this_year = d.getFullYear()
        } else {
            this_day = +date
            this_month = +month;
            this_year = +year
        }


        let checkYearType = yearType === "AD" ? +this_year : +this_year + 543
        let checkYearTypeN = yearType === "AD" ? 0:  543*10**4

        //get first day of the month and first day of the year
        let fdm = new Date(this_year, this_month - 1, 1).getDay(); //first day of month
        let fdnm = new Date(this_year, this_month, 1).getDay(); //first day of next month
        let firstDayOfNextMonth = new Date(this_year, this_month, 1).getDay(); //first day of next month


        let date_number = new Date(this_year, this_month, 0).getDate() // amount of date in 
        let date_number_before = new Date(this_year, this_month - 1, 0).getDate() // amount of date in previous month

        let last_date_of_month = new Date(this_year, this_month, 0).getDate();
        let last_day_of_month = new Date(this_year, this_month, 0).getDay();


        fdm -= this.option.dayStartWith

        //set month lable and year label
        $(`${this.panelClass} .lbl_month`).text(this.set_lang(+this_month, 'm', lang, {
            month: this.option.monthPanel
        }))

        let displayYear = yearType === 'AD' ? this_year : this_year + 543

        $(`${this.panelClass} .lbl_year`).text(yearPanel === 'full' ? displayYear : ('' + displayYear).slice(-2))

        
        //render section -------------------------------------
        /*   let elem_length = 0;
    
        let eff_count = setInterval(() =>{ 
    
            $(`.date-item:eq(${elem_length})`).addClass('eff')
            if(elem_length > $(".date-item").length) clearInterval(eff_count)
            elem_length++
          
          },5)  */

        //render date of previous month
        if (fdm != 7) {
            for (let i = date_number_before - fdm + 1; i <= date_number_before; i++) {
                $(`${this.panelClass} .date-body`).append(`<div class="date-item date-empty">${i}</div>`)
            }
        }

        //render for min date
        let startDate = 1
        for (let i = 1; min_date[0] != 0 && i != min_date[2] && (this_month == min_month && checkYearType == min_year); i++) {
            $(`${this.panelClass} .date-body`).append(`<div class="date-item date-empty">${i}</div>`)
            startDate = i + 1
        }

        //render all date //MAIN
        let count_all_date = 0
        for (let i = startDate; i <= date_number; i++) {

            
            //check max date
            if (max_date[0] != 0 && i == max_date[2] + 1 && (this_month == max_month && checkYearType == max_year)) {
                break
            }

            let fulldateData = (this_year)+("0"+this_month).slice(-2)+("0"+i).slice(-2)

        /*     if(this.c < this.exceptionDate.length){
                if(this.exceptionDate[this.c].start <= fulldateData && this.exceptionDate[this.c].end >= fulldateData){
                         disableSelect = 'disableSelect'
                         if(this.exceptionDate[this.c].end == fulldateData){
                             this.c++
                         }
                 }else{
                     disableSelect = ''
                 }
            } */
           
            if(this.exceptionDateAll.includes(String(+fulldateData))){
                disableSelect = 'disableSelect'
            }else{
                disableSelect = ''
            }

            $(`${this.panelClass} .date-body`).append(`<div class="date-item ${disableSelect}" data-date=${("0"+i).slice(-2)}  data-fulldate=${fulldateData} >${i}</div>`)

            count_all_date++
        }

        //render dates after of max date
        for (let i = startDate + count_all_date; i <= last_date_of_month; i++) {
            $(`${this.panelClass} .date-body`).append(`<div class="date-item date-empty">${i}</div>`)
        }

        //render next month date 
        console.log(fdnm)
        if (fdnm > 0) {
            for (let i = 1; i <= 7 - fdnm; i++) {
                $(`${this.panelClass} .date-body`).append(`<div class="date-item date-empty">${i}</div>`)

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
 /*        $(".date-panel").attr('data-fulldate', `${this_year}${("0"+this_month).slice(-2)}${("0"+this_day).slice(-2)}`)
        $(".date-panel").attr('data-date', `${("0"+this_day).slice(-2)}`)
        $(".date-panel").attr('data-month', `${("0"+this_month).slice(-2)}`)
        $(".date-panel").attr('data-year', `${this_year}`) */
        let fulldateText = `${this_year}${("0"+this_month).slice(-2)}${("0"+this_day).slice(-2)}`

        /* this.elem.setAttribute('data-fulldate', fulldateText) */

        //for auto select
        /* this.value = yearType === "AD" ? +fulldateText: +fulldateText+this.BEYear */ 

        $(`${this.panelClass}`).attr('data-fulldate', fulldateText)
        $(`${this.panelClass}`).attr('data-date', `${("0"+this_day).slice(-2)}`)
        $(`${this.panelClass}`).attr('data-month', `${("0"+this_month).slice(-2)}`)
        $(`${this.panelClass}`).attr('data-year', `${this_year}`)

        //select date 
        $(`${this.panelClass} .date-item`).each((i,item)=>{

            item.addEventListener('touchend',(e)=>{
                if (selectable) {
                    let fulldate = e.target.dataset.fulldate
    
                    let y = fulldate.slice(0, 4)
                    let m = fulldate.slice(4, 6)
                    let d = fulldate.slice(6, 8)
    
                    let formatter = this.option.format.split('/')
    
                    function checkDateFormat(arr = []) {
    
                        let check_date_arr = ['d', 'dd', "D", "DD", 'm', 'mm', 'M', 'MM', "yy", 'yyyy']
    
                        let check1 = check_date_arr.includes(arr[0]) || false
                        let check2 = check_date_arr.includes(arr[1]) || false
                        let check3 = check_date_arr.includes(arr[2]) || false
    
                        return check1 && check2 && check3
                    }
    
    
                    let isValid = checkDateFormat([formatter[0], formatter[1], formatter[2]])
    
                    if (isValid) {
    
                        let full_date_display = this.selectDateFormat(d, m, y)[0]
                        let separation = this.option.separation
                        let starter = this.option.startWith
    
    
                        let day_display = full_date_display[0]
                        let d_display = full_date_display[1]
                        let m_display = full_date_display[2]
                        let y_display = full_date_display[3]
    
                        //la
                        let checkYearType = yearType === "AD" ? y_display : +y_display + 543
    
                        let showDay = this.option.showDay === 'none' ? '' :`${day_display}, `
                        let date_display = `${starter}${showDay}${d_display}${separation}${m_display}${separation}${y_display}`
    
                        //set dataset value and value to input        
    
                        let parent = this.elem
    
                        parent.value = date_display
    
                        parent.setAttribute("value", date_display)
    
                        /* parent.setAttribute("data-value", `${checkYearType}${m}${d}`) */
    
                        parent.dataset.fulldate = `${y}${m}${d}`
    
                        /*  e.target.parentElement.parentElement.parentElement.parentElement.dataset.fulldate = `${y}${m}${d}` */
    
                        /* closeOnSelect ? $(".date-panel").remove() : '' */
    
                        $(`${this.panelClass} .date-item`).removeClass('date-selected')
                        e.target.classList.add('date-selected')
    
                        $(`${this.panelClass}`).attr('data-fulldate', `${y}${("0"+m).slice(-2)}${d}`)
                        $(`${this.panelClass}`).attr('data-date', `${d}`)
                        
    
                    } else {
                        console.error("Invalid date Format")
                    }
                     this.value = yearType === "AD" ? +this.elem.dataset.fulldate : +this.elem.dataset.fulldate+this.BEYear
                     this.elem.dispatchEvent(dateEvent)

                }
            })
        })
        
        $(`${this.panelClass} .date-item`).click((e) => {
            if (selectable) {
                let fulldate = e.target.dataset.fulldate

                let y = fulldate.slice(0, 4)
                let m = fulldate.slice(4, 6)
                let d = fulldate.slice(6, 8)

                let formatter = this.option.format.split('/')

                function checkDateFormat(arr = []) {

                    let check_date_arr = ['d', 'dd', "D", "DD", 'm', 'mm', 'M', 'MM', "yy", 'yyyy']

                    let check1 = check_date_arr.includes(arr[0]) || false
                    let check2 = check_date_arr.includes(arr[1]) || false
                    let check3 = check_date_arr.includes(arr[2]) || false

                    return check1 && check2 && check3
                }


                let isValid = checkDateFormat([formatter[0], formatter[1], formatter[2]])

                if (isValid) {

                    let full_date_display = this.selectDateFormat(d, m, y)[0]
                    let separation = this.option.separation
                    let starter = this.option.startWith


                    let day_display = full_date_display[0]
                    let d_display = full_date_display[1]
                    let m_display = full_date_display[2]
                    let y_display = full_date_display[3]

                    //la
                    let checkYearType = yearType === "AD" ? y_display : +y_display + 543

                    let showDay = this.option.showDay === 'none' ? '' :`${day_display}, `
                    let date_display = `${starter}${showDay}${d_display}${separation}${m_display}${separation}${checkYearType}`

                    //set dataset value and value to input        

                    let parent = this.elem

                    parent.value = date_display

                    parent.setAttribute("value", date_display)
                    /* parent.setAttribute("data-value", `${checkYearType}${m}${d}`) */

                    parent.dataset.fulldate = `${y}${m}${d}`

                    /*  e.target.parentElement.parentElement.parentElement.parentElement.dataset.fulldate = `${y}${m}${d}` */

                    /* closeOnSelect ? $(".date-panel").remove() : '' */

                    $(`${this.panelClass} .date-item`).removeClass('date-selected')
                    e.target.classList.add('date-selected')

                    $(`${this.panelClass}`).attr('data-fulldate', `${y}${("0"+m).slice(-2)}${d}`)
                    $(`${this.panelClass}`).attr('data-date', `${d}`)


                } else {
                    console.error("Invalid date Format")
                }
                this.value = yearType === "AD" ? +this.elem.dataset.fulldate : +this.elem.dataset.fulldate+this.BEYear

                this.elem.dispatchEvent(dateEvent)

            }


        })

        //set selected date color


        $(`${this.panelClass} .date-item`).each((i, item) => {
             let selectedData = this.extractFulldate(isNaN(this.elem.dataset.fulldate) ? this.todayInt : this.elem.dataset.fulldate  ) 
            /* let selectedData = this.extractFulldate(      $(`${this.panelClass}`).attr('data-fulldate')) */


            if (item.dataset.fulldate === `${selectedData.y}${selectedData.m}${selectedData.d}`) {
                item.classList.add('date-selected')
            } else {
                item.classList.remove('date-selected')
            }
        })

    
       
        this.elem.dispatchEvent(dateEvent)

    }

    renderMonth(this_year) {

        let lang = this.option.lang
        let min = String(this.option.min)
        let min_date = [+min.slice(0, 4), +min.slice(4, 6), +min.slice(6, 8)]
        let min_year = min_date[0] != 0 ? min_date[0] : yearType === 'AD' ? 2100 : 2600

        let max = String(this.option.max)
        let max_date = max.length > 0 ? [+max.slice(0, 4), +max.slice(4, 6), +max.slice(6, 8)] : 0
        let max_month = max_date[0] != 0 ? max_date[1] : 12

        let monthPanel = this.option.monthPanel
        let monthSelected = ''
        let this_month = +this.extractFulldate(this.elem.dataset.fulldate).m
           

        $(`${this.panelClass} .month-body`).empty()

        if (this_year == min_date[0]) {
            console.log('1')
            for (let i = +min_date[1]; i <= 12; i++) {

                let full_month

                if (lang === 'en' && monthPanel === 'small') {
                    full_month = this.set_lang(i, 'm', lang, {
                        day: 'sm',
                        month: 'sm'
                    })
                } else if (lang === 'th' && monthPanel === 'small') {
                    full_month = this.set_lang(i, 'm', lang, {
                        day: 'sm',
                        month: 'sm'
                    })
                } else {

                    full_month = this.set_lang(i, 'm', lang, {
                        month: this.option.monthPanel
                    })
                }

                monthSelected = this_month === i ? ' _selected' : ''

                console.log(full_month)

                $(`${this.panelClass} .month-body`).append(
                    `
                  <div class="month-item${monthSelected}" data-fulldate=${this_year+("0"+[i]).slice(-2)}>${full_month}</div>
                  `
                )
            }
        } else if (this_year == max_date[0]) {
            console.log('2')

            for (let i = 1; i <= max_month; i++) {

                let full_month

                if (lang === 'en' && monthPanel === 'small') {
                    full_month = this.set_lang(i, 'm', lang, {
                        day: 'sm',
                        month: 'sm'
                    })
                } else if (lang === 'th' && monthPanel === 'small') {
                    full_month = this.set_lang(i, 'm', lang, {
                        day: 'sm',
                        month: 'sm'
                    })
                } else {
                    full_month = this.set_lang(i, 'm', lang, {
                        month: this.option.monthPanel
                    })
                }

                monthSelected = this_month === i ? ' _selected' : ''
                $(`${this.panelClass} .month-body`).append(
                    `
                    <div class="month-item${monthSelected}" data-fulldate=${this_year+("0"+[i]).slice(-2)}>${full_month}</div>
                    `
                )
            }
        } else {
            console.log('3')

            for (let i = 1; i <= 12; i++) {

                let full_month

                if (lang === 'en' && monthPanel === 'small') {
                    full_month = this.set_lang(i, 'm', lang, {
                        day: 'sm',
                        month: 'sm'
                    })
                } else if (lang === 'th' && monthPanel === 'small') {
                    full_month = this.set_lang(i, 'm', lang, {
                        day: 'sm',
                        month: 'sm'
                    })
                } else {
                    full_month = this.set_lang(i, 'm', lang, {
                        month: this.option.monthPanel
                    })
                }
                monthSelected = this_month === i ? ' _selected' : ''
                $(`${this.panelClass} .month-body`).append(
                    `
                    <div class="month-item${monthSelected}" data-fulldate=${this_year+("0"+[i]).slice(-2)}>${full_month}</div>
                    `
                )
            }
        }

    }
   

    slideToSelected(year) {
        const slideshow = document.querySelector(`${this.panelClass} .year-panel`);
        let slides 
        try{

            slides = document.querySelector(`${this.panelClass} .year-body .year-item[data-year='${year}']`).parentElement;

        }catch{
            return 0
        }

        const slideTop = slides.offsetTop;
        slideshow.scrollTo(0,slideTop)
    
    }

    renderYear() {
        let d = new Date()

        let yearType = this.option.yearType

        let min = String(this.option.min)
        let min_date = [+min.slice(0, 4), +min.slice(4, 6), +min.slice(6, 8)]
        let min_year = min_date !== 0 ? min_date[0] : yearType === 'AD' ? 2100 : 2600

        let max = String(this.option.max)

        let max_date = max.length > 0 ? [+max.slice(0, 4), +max.slice(4, 6), +max.slice(6, 8)] : 0

        let max_year = max_date[0] !== 0 ? max_date[0] : yearType === 'AD' ? 2100 : 2600

        let this_year = yearType === 'AD' ? min_date[0] : min_date[0] > 0 ? min_date[0] : d.getFullYear() + 543

        let yearPanel = this.option.yearPanel

        let curentYear = yearType === 'AD' ? d.getFullYear() : d.getFullYear() + 543
        let yearSelected = ''

        $(`${this.panelClass} .year-body`).empty()
        for (let j = 0 ; j < Math.floor((max_year-this_year)/15); j++){
        
       
        }
        let count = 0
        let first = max_year
        let yearPerPage = 15

        for (let i = max_year; i >= this_year; i--) {
            yearSelected = curentYear === i ? ' _selected' : ''

            count++

            if(count % yearPerPage == 0 ) {
                $(`${this.panelClass} .year-panel`).append(`
                    <div class="year-body"  data-max='${first}' data-min='${i}' > <label class='year-section-label'>${i} - ${first}<label> </div>`
                )
                first = i-1
            }
            

            if(first-this_year < yearPerPage && count % yearPerPage == 1) {
                $(`${this.panelClass} .year-panel`).append(`
                    <div class="year-body"  data-max='${first}' data-min='${this_year}' > <label class='year-section-label'>${this_year} - ${first}<label> </div>
                    `
                    
                )
            }

   
        }


        for (let i = max_year; i >= this_year; i--) {
            yearSelected = curentYear === i ? ' _selected' : ''

            $(`${this.panelClass} .year-body`).each((id,item)=>{
                if(item.dataset.max >= i && item.dataset.min <= i){

                    $(item).append(` <div class="year-item${yearSelected}" data-year=${i}> ${yearPanel === 'full' ? i : (''+i).slice(-2)}</div>`)
                }
            })
          
        }
        
        this.slideToSelected(curentYear)
    }

    isValidDate(dateStr) {
        dateStr = this.option.yearType === 'AD' ? dateStr : +dateStr-this.BEYear
        dateStr = String(dateStr)
        dateStr = `${dateStr.slice(0,4)}-${("0"+dateStr.slice(4,6)).slice(-2)}-${('0'+dateStr.slice(6,8)).slice(-2)}`

        const date = new Date(dateStr);

        if (isNaN(date.getTime()) || dateStr.slice(5, 7) != date.getMonth() + 1 || dateStr.slice(0, 4) != date.getFullYear()) {
          return false;
        }
    
        return dateStr.slice(8) == date.getDate();
      }

     exportValue(option = 'dmy',separator = '',type ){
        let date = this.extractFulldate(this.value)
        let checkvalidDate = this.isValidDate(this.value)

        console.log(this.value)

        if(type === 'AD'){
            date.y = +date.y-543 
        }
        if(type === 'BE'){
            date.y = +date.y+543 

        }
        if(!checkvalidDate){
            return 'Invalid Date'
        }else{


        let dateObject = {

            'd':`${date.d}`,
            'm':`${date.m}`,
            'y':`${date.y}`,

            'dm':`${date.d}${separator}${date.m}`,
            'dy':`${date.d}${separator}${date.y}`,

            'md':`${date.m}${separator}${date.d}`,
            'my':`${date.m}${separator}${date.y}`,

            'yd':`${date.y}${separator}${date.d}`,
            'ym':`${date.y}${separator}${date.m}`,


            'dmy':`${date.d}${separator}${date.m}${separator}${date.y}`,
            'dym':`${date.d}${separator}${date.y}${separator}${date.m}`,

            'mdy':`${date.m}${separator}${date.d}${separator}${date.y}`,
            'myd':`${date.m}${separator}${date.y}${separator}${date.d}`,

            'ymd':`${date.y}${separator}${date.m}${separator}${date.d}`,
            'ydm':`${date.y}${separator}${date.d}${separator}${date.m}`,

            'valueText': this.option.type === 'static' ? "no valueText for calendar type : 'STATIC'" : checkvalidDate ? this.elem.value : 'Invalid Date'
         }
         
        return dateObject[option]
    }
    }
}

    Element.prototype.Calendar = function (option) {
        option = option ? option : defaultOptionCalendar

        let d
        [this].forEach((item, i) => {
            d =  new Calendar(item,option)
        })
        return d

    }

    Object.prototype.Calendar = function(option) {
        option = option ? option : defaultOptionCalendar

        let d
        this.forEach((item,i)=>{
             d =  new Calendar(item,option)
        })
        return d
    }


    //test
/*  let d = document.querySelector('.datepicker.calendar#ctest1').Calendar({monthPanel:'full',showDay:'full',yearType:'BE',autoValue:true}) */
     /*
let d2 = document.querySelector('.datepicker.calendar#ctest2').Calendar({showDay:'small',yearType:'AD',default:"25660320"})

let d3 = document.querySelector('.calendar-static#static1').Calendar({yearType:'AD',type:'static',section:'all'})
let d4 = document.querySelector('.calendar-static#static2').Calendar({yearType:'AD',type:'static',section:'y'})
let d5 = document.querySelector('.calendar-static#static3').Calendar({yearType:'BE',type:'static',section:'y'})


d.elem.addEventListener('dateChange',(e)=>{
    console.log(e.value)
    console.log(e.value.exportValue('valueText'))
})

d2.elem.addEventListener('dateChange',(e)=>{
    console.log(e.value)
    console.log(e.value.exportValue('valueText'))

})

d3.elem.addEventListener('dateChange',(e)=>{
    console.log(e.value)
})

d4.elem.addEventListener('dateChange',(e)=>{
    console.log(e.value)

})


d5.elem.addEventListener('dateChange',(e)=>{
    console.log(e.value.exportValue('dmy','.'))
    console.log(e.value.exportValue('dmy','.','BE'))


})
 */







/* setInterval(() => {
  document.querySelector('#sp1').innerHTML = d.value
  document.querySelector('#sp2').innerHTML = d2.value
  document.querySelector('#sp3').innerHTML = d3.exportValue('ymd','-')
  document.querySelector('#sp4').innerHTML = d4.exportValue('ymd','-')
  document.querySelector('#sp5').innerHTML = d5.exportValue('ym','-')



}, 100); */

}

_CALENDAR_UI()