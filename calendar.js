//Calendar [DEV]
//Version 0.1


//error code 
/* 
    code 1 error in date pannel
    code 2 error in input 
*/

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

let panel_arr = [
    'date-panel', "datepicker", 'lbl_month', 'lbl_year', 'btn btn-sm btnNextMonth',
    "btn btn-sm btnNextMonth", 'btn btn-sm btnPreviousMonth', 'month-item', 'month-body', 
    'year-item', 'year-body', 'month-header', 'date-body', 'date-header', 'date-day-item', 
    'date-item disableSelect date-selected', 'date-item disableSelect', 'date-icon'
]
const DATE = new Date()

class Calendar {

    constructor(elem, option = {
        format: String(),
        default: String() ,
        separation: String(),
        lang: String(),
        yearType: String(),
        showDay: String(), // full,small ,none
        day: String(),
        month: String(),
        startWith: String(),
        dayPanel: String(),
        monthPanel: String(),
        yearPanel: String(),
        min: Number(),
        max: Number(),
        selectable: Boolean(),
        closeOnSelect: Boolean(),
        autoAdjustMaxMin: Boolean(),
    }) {

        this.elem = elem
        this.elems = [] // set of parent element ex. input 
        this.defaultOption = {
            format: "dd/mm/yyyy",
            default: "now",
            separation: "/",
            lang: "th",
            yearType: "BE",
            showDay: 'none', // full,small ,none
            day: 'full',
            month: 'full',
            startWith: '',
            dayPanel: 'full',
            monthPanel: 'full',
            yearPanel: 'full',
            max: 21000101,
            min: 20001112,
           /*  max: 25700101,
            min: 20001112, */
            selectable: true,
            closeOnSelect: true,
            autoAdjustMaxMin: true,
            autoValue: true,

        }

        this.option = {
            format:                 option.format               || this.defaultOption.format,
            default:                option.default              || this.defaultOption.default,
            separation:             option.separation           || this.defaultOption.separation,
            lang:                   option.lang                 || this.defaultOption.lang,
            yearType:               option.yearType             || this.defaultOption.yearType,
            showDay:                option.showDay              || this.defaultOption.showDay,
            day:                    option.day                  || this.defaultOption.day,
            month:                  option.month                || this.defaultOption.month,
            min:                    option.min                  || this.defaultOption.min,
            max:                    option.max                  || this.defaultOption.max,
            startWith:              option.startWith            || this.defaultOption.startWith,
            dayPanel:               option.dayPanel             || this.defaultOption.dayPanel,
            monthPanel:             option.monthPanel           || this.defaultOption.monthPanel,
            yearPanel:              option.yearPanel            || this.defaultOption.yearPanel,
            selectable:             option.selectable           || this.defaultOption.selectable,
            closeOnSelect:          option.closeOnSelect        || this.defaultOption.closeOnSelect,
            autoAdjustMaxMin:       option.autoAdjustMaxMin     || this.defaultOption.autoAdjustMaxMin,
            autoValue:              option.autoValue            || this.defaultOption.autoValue,

        } 
     
        this.BEYear = 543*10**4
        this.todayInt = +`${DATE.getFullYear()}${('0'+(DATE.getMonth()+1)).slice(-2)}${('0'+DATE.getDate()).slice(-2)}`
        this.value =  this.option.yearType === "AD" ? this.todayInt : +this.todayInt+543*10**4
        this.exceptionDate = [ 20230301,20230305, 20230321,20230325, 20230327,20230425]
        this.exceptionDate2 = [{start : 20230301,end :20230305},{start : 20230321,end :20230325},{start : 20230327,end :20230425}]
        this.exceptionDateAll  = []



        this.option.max = this.value > this.option.max ? +(String(this.value).slice(0,4)+'1231')+10*10**4 : this.option.max
        this.option.min = this.value > this.option.min ? +(String(this.value).slice(0,4)+'1231')-50*10**4 : this.option.min

    

        console.log(this.option.max,this.option.min)

        this.init()

    }

    //Utility Method

    checkDisableDate(selectedDate){
        let max = String(this.option.max)
        let min = String(this.option.min)
    
        selectedDate = this.option.yearType === 'AD' ? selectedDate : +selectedDate+this.BEYear
        console.log(selectedDate)
        
        //selectedDate is greater than min and lesser than max 
        if( (+selectedDate >= +min && +selectedDate <= +max ) && !(this.exceptionDateAll.includes(''+selectedDate))){
            //avalible date
            console.log(+selectedDate,"avalible")
            return false
        }
        //disable date 
        console.log(selectedDate,"disable")

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


    set_lang(value, section, lang, type = {
        day: "full",
        month: "full"
    }) {
        type.day = type.day || this.option.day
        type.month = type.month || this.option.month

        let select_lang = `${section}_${lang}_${section === 'd' ? type.day : type.month}`

        return LANG[select_lang][value]
    }

    extractFulldate(fulldate){
        
        let tranformedDate = {}
        fulldate = String(fulldate)
        if(fulldate.length == 8){
                tranformedDate = {d:fulldate.slice(6), m:fulldate.slice(4,6),y:fulldate.slice(0,4)}
        }
        
        return tranformedDate

    }

    combineDate(d,m,y){

      return `${y}${('0'+(m)).slice(-2)}${('0'+d).slice(-2)}`
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
            this.value = yearType === "AD" ? +this.elem.dataset.fulldate : +this.elem.dataset.fulldate+this.BEYear

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

                throw new Error('CODE 2 | Date value shoude be valid format Format :' + this.option.format)
            }

    }

    autoDate(e){
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

               let showDay = this.option.showDay === 'none' ? '' :`${starter}${day_display}, `
               let date_display = `${showDay}${d_display}${separation}${m_display}${separation}${y_display}`

               //set dataset value and value to input     
               
               let selectedDate = +`${y_display}${m_display}${d_display}`

            if(this.checkDisableDate(selectedDate)){
                this.initDate('today')
                this.value = yearType === "AD" ? +this.elem.dataset.fulldate : +this.elem.dataset.fulldate+this.BEYear

            }else if( selectedDate >= +min && selectedDate <= +max ){


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

    initDate(option = 'today'){
         //-----------------------------

         let checkDefaultDate = this.option.default == "now" ? String(this.todayInt) : this.option.default

         let fulldate = '' + ( this.elem.dataset.fulldate || checkDefaultDate)
         if(option === 'today') fulldate = String(this.todayInt)

         let [curentDate, curentMonth, curentYear] = [fulldate.slice(6, 8), fulldate.slice(4, 6), fulldate.slice(0, 4)]
 
          this.elem.setAttribute("data-fulldate", `${curentYear}${curentMonth}${curentDate}`)
 
 
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
 
             let checkYearType = this.option.yearType === "AD" ? y_display : +y_display + 543
 
             let showDay = this.option.showDay === 'none' ? '' :`${starter}${day_display}, `
             let date_display = `${showDay}${d_display}${separation}${m_display}${separation}${checkYearType}`
 
             //set dataset value and value to input        
 
             let parent = this.elem
 
             parent.value = date_display
 
             parent.setAttribute("value", date_display)
 
             /* parent.setAttribute("data-value", `${checkYearType}${m}${d}`) */
 
             parent.dataset.fulldate = `${y}${m}${d}`
             
             $(".date-panel").attr('data-fulldate', `${y}${("0"+m).slice(-2)}${d}`)
             $(".date-panel").attr('data-date', `${d}`)
 
         } else {
             console.error("Invalid date Format")
         }
 
         //----------------------------
    }

    
    //MAIN---------------------------------------

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
                console.log('1')
                /* console.log(element);
                element.style.border = '1px solid red'; */
            }else{
                element.style.right = 0+"%"
            }
            if(box.bottom > documentHeight){
                console.log('2')
                let offest = ((-1*fullHeight/2))
                console.log(offest)
                 element.style.top = offest+"px"
            }
           /*  else{
                element.style.right = 0+"%"
            } */
        }

    };

  
 

    init() {

        let checkYearType = this.option.yearType === 'AD' ? 0 : 543*10**4
        let c = 0
        for (let i = 0 ; c < this.exceptionDate.length-1; i++){
            this.getAllDate(''+(this.exceptionDate[c]-checkYearType),''+(this.exceptionDate[c+1]-checkYearType))
            c += 2
        } 
   

        /* this.exceptionDate.map((item)=>{
            this.getAllDate(''+item.start,''+item.end)
        }) */
        
     


   /*      this.elem.addEventListener('click', (e) => {
            this.openCalendar(e)
            this.findOverflows()

        })
 */

        //eventLBL 
        addEventListener('resize',(e)=>{
            /* this.findOverflows() */
        })

        let formatter = this.option.format
        this.elem.setAttribute("placeholder", formatter)

        this.initDate()
       
        this.elem.insertAdjacentHTML('afterend', `<div class="date-icon" ><i class="fa-duotone fa-calendar"></i></div>`);
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
    
    
            this.elem.addEventListener('keydown',(e)=>{
                /* this.elem.nextElementSibling.click() */
    
                    let fullDate = e.target.dataset.fulldate
                    let date = 0
                    let yearType = this.option.yearType
    

                    let [year_s,month_s,date_s] = [fullDate.slice(0,4),fullDate.slice(4,6),fullDate.slice(6,8)]

    
                    Date.prototype.configDate = function(days,option) {
                        date = new Date(`${year_s}-${month_s}-${date_s}`);
    
                        if(option === 'add'){
                            date.setDate(date.getDate() + days);
                        }else if(option === 'remove'){
                            date.setDate(date.getDate() - days);
                        }
                        return date;
                    }
    
                    Date.prototype.configMonth = function(month,option) {
                        months = new Date(`${+fullDate.slice(0,4)}-${fullDate.slice(4,6)}-${fullDate.slice(6,8)}`);
                        if(option === 'add'){
                            months.setMonth(months.getMonth() + month);
                        }else if(option === 'remove'){
                            months.setMonth(months.getMonth() - month);
                        }
    
                        return months;
                    }
    
    
                    let  d = new Date();
                        //right  
                        if (e.keyCode === 39) {
    
                            let fulldate = e.target.dataset.fulldate
                            let [this_date, this_month, this_year] = [+fulldate.slice(6,8),+fulldate.slice(4,6),+fulldate.slice(0,4)]
                            let checkYearType =  yearType == "AD" ? +this_year : +this_year+543
                            
                            if((max_date[2] != this_date || max_month != this_month  || max_year != checkYearType  )){
                                let current = d.configDate(1,"add")
                                this.changeDateByArrow(e,current)
                            }

                        }
                        //left 
                        if (e.keyCode === 37) {
    
                            let fulldate = e.target.dataset.fulldate
                            let [this_date, this_month, this_year] = [+fulldate.slice(6,8),+fulldate.slice(4,6),+fulldate.slice(0,4)]
    
                            let checkYearType =  yearType == "AD" ? +this_year : +this_year+543
    
                            if(min_date[2] != this_date || this_month != min_month  || checkYearType != min_year ){
    
                                let current = d.configDate(1,"remove")
                                this.changeDateByArrow(e,current)
                            }

                        }
                        //up
                        if (e.keyCode === 38) {
                        
                                let current = d.configDate(7,"remove")
                                this.changeDateByArrow(e,current)
                        }
                        //down
                        if (e.keyCode === 40) {
    
                                let current = d.configDate(7,"add")
                                this.changeDateByArrow(e,current)
                        }

                        if(e.key === 'Enter' && e.target.value == ''){
                            e.target.value =  `${('0'+DATE.getDate()).slice(-2) }${this.option.separation}${('0'+(DATE.getMonth()+1)).slice(-2)}${this.option.separation}${this.option.yearType === 'AD' ? DATE.getFullYear() : DATE.getFullYear()+543}`
                            this.autoDate(e)
                        }

                        setTimeout(() => {
                            $('.date-panel').length = 0
                        }, 1000);

                        if(e.key === 'Enter'){
                            $('.date-panel').remove()
                        }
                })
    
            //click icon 
            this.elem.nextElementSibling.addEventListener("click", (e) => {

                this.openCalendar(e)
                /* this.findOverflows() */
            })

            this.elem.addEventListener('focus',(e)=>{
                let yearType = this.option.yearType
                let fullDate = this.elem.dataset.fulldate
               
                if(this.checkDisableDate(fullDate)){
                    this.initDate('today')
                    this.value = yearType === "AD" ? +this.elem.dataset.fulldate : +this.elem.dataset.fulldate+this.BEYear
                    console.log('adsa')

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
                    e.target.select()
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

            $("body")[0].insertAdjacentHTML('beforeend', `
                <div class="date-panel">
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

            let checkDefaultDate = defaultDate == "now" ? String(this.todayInt) : defaultDate

            let fulldate = '' + ( this.elem.dataset.fulldate || checkDefaultDate)
            let [curentDate, curentMonth, curentYear] = [fulldate.slice(6, 8), fulldate.slice(4, 6), fulldate.slice(0, 4)]

             this.elem.setAttribute("data-fulldate", `${curentYear}${curentMonth}${curentDate}`)


            if (
                (max_date[2] >= +curentDate || max_month != +curentMonth || max_year != +curentYear) &&
                (min_date[2] <= +curentDate || +curentMonth != min_month || +curentYear != min_year)
            ) {
                this.render(curentDate, curentMonth, curentYear)

            } else if ((max_date[2] < +curentDate && max_month <= +curentMonth && max_year <= +curentYear)) {

                e.target.previousElementSibling.setAttribute("data-fulldate", `${max_date[0]}${('0'+max_date[1]).slice(-2)}${('0'+max_date[2]).slice(-2)}`)
                this.render(max_date[2], max_date[1], max_date[0])

            } else if ((min_date[2] > +curentDate && +curentMonth >= min_month && +curentYear >= min_year)) {

                this.render(min_date[2], min_date[1], min_date[0])
                e.target.previousElementSibling.setAttribute("data-fulldate", `${min_date[0]}${('0'+min_date[1]).slice(-2)}${('0'+min_date[2]).slice(-2)}`)

            }

            // event for label
            $(".lbl_year").click((ev) => {
                this.renderYear()

                let this_date = ev.target.parentElement.parentElement.dataset.date || ev.target.parentElement.parentElement.parentElement.dataset.date
                let this_month = ev.target.parentElement.parentElement.dataset.month || ev.target.parentElement.parentElement.parentElement.dataset.date
                let year = 0

                $(".year-panel").addClass('show-month')

                $(".year-item").click((e) => {

                    $(".year-panel").removeClass('show-month')

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


                    let showDay = this.option.showDay === 'none' ? '' :`${starter}${day_display}, `
                    let date_display = `${showDay}${d_display}${separation}${m_display}${separation}${y_display}`

                    //set dataset value and value to input        

                    let parent = this.elem

                    parent.value = date_display

                    parent.setAttribute("value", date_display)

                    /* parent.setAttribute("data-value", `${checkYearType}${("0"+this_month).slice(-2)}${this_date}`) */

                    parent.setAttribute("data-fulldate", `${year}${("0"+this_month).slice(-2)}${this_date}`)

                    $(".date-panel").attr('data-fulldate', `${year}${("0"+this_month).slice(-2)}${this_date}`)
                    $(".date-panel").attr('data-date', `${this_date}`)

                   

                    this.render(this_date, this_month, year)

                    $(".month-item").click((e) => {

                        let fullDate = e.target.dataset.fulldate

                        let this_year = fullDate.slice(0, 4)
                        let month = fullDate.slice(4, 6)

                        $(".month-panel").removeClass('show-month')

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

                        $(".date-panel").attr('data-fulldate', `${checkYearType}${("0"+month).slice(-2)}${this_date}`)
                        $(".date-panel").attr('data-date', `${this_date}`)

                        this.render(this_date, month, checkYearType)

                    })
                })
            })


            $(".lbl_month").click((e) => {
                let this_date = e.target.parentElement.parentElement.dataset.date
                let this_year = this.option.yearType === "AD" ? e.target.parentElement.parentElement.dataset.year : +e.target.parentElement.parentElement.dataset.year + 543
                let month = 0

                $(".month-panel").addClass('show-month')

                this.renderMonth(this_year)

                $(".month-item").click((e) => {


                    let fullDate = e.target.dataset.fulldate
                    month = fullDate.slice(4, 6)

                    $(".month-panel").removeClass('show-month')

                    let full_date_display = this.selectDateFormat(this_date, month, this_year, true)[0]

                    let separation = this.option.separation
                    let starter = this.option.startWith
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

                    $(".date-panel").attr('data-fulldate', `${checkYearType}${("0"+month).slice(-2)}${this_date}`)
                    $(".date-panel").attr('data-date', `${this_date}`)

                    this.render(this_date, month, checkYearType)

                })

            })

            $("#btnPreviousMonth").click((ev) => {
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

            $("#btnNextMonth").click((ev) => {
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

            if (!panel_arr.includes(e.target.className)) {
                    $(".date-panel").remove()
            }

        })
        addEventListener('touchend',e=>{
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
        if (date == 0 || month == 0 || year == 0) {
            this_day = d.getDate();
            this_month = d.getMonth() + 1;
            this_year = d.getFullYear()
        } else {
            this_day = +date
            this_month = +month;
            this_year = +year
        }


        let checkYearType = yearType == "AD" ? +this_year : +this_year + 543
        let checkYearTypeN = yearType == "AD" ? 0:  543*10**4

        //get first day of the month and first day of the year
        let fdm = new Date(this_year, this_month - 1, 1).getDay(); //first day of month

        let fdnm = new Date(this_year, this_month, 1).getDay(); //first day of next month

        let date_number = new Date(this_year, this_month, 0).getDate() // amount of date in 
        let date_number_before = new Date(this_year, this_month - 1, 0).getDate() // amount of date in 

        let last_date_of_month = new Date(this_year, this_month, 0).getDate();

        //set month lable and year label
        $(".lbl_month").text(this.set_lang(+this_month, 'm', lang, {
            day: this.option.day,
            month: this.option.month
        }))

        let displayYear = yearType == 'AD' ? this_year : this_year + 543

        $(".lbl_year").text(yearPanel == 'full' ? displayYear : ('' + displayYear).slice(-2))

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
                $(".date-body").append(`<div class="date-item date-empty">${i}</div>`)
            }
        }

        //render for min date
        let startDate = 1
        for (let i = 1; min_date[0] != 0 && i != min_date[2] && (this_month == min_month && checkYearType == min_year); i++) {
            $(".date-body").append(`<div class="date-item date-empty">${i}</div>`)
            startDate = i + 1
        }

        //render all date //MAIN
        let count_all_date = 0
        for (let i = startDate; i <= date_number; i++) {

            
            //check max date
            if (max_date[0] != 0 && i == max_date[2] + 1 && (this_month == max_month && checkYearType == max_year)) {
                console.log('d')
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

 

        
       

            
            $(".date-body").append(`<div class="date-item ${disableSelect}" data-date=${("0"+i).slice(-2)}  data-fulldate=${fulldateData} >${i}</div>`)

            count_all_date++
        }

        //render dates after of max date
        for (let i = startDate + count_all_date; i <= last_date_of_month; i++) {
            $(".date-body").append(`<div class="date-item date-empty">${i}</div>`)
        }

        //render next month date 

        if (fdnm > 0) {

            for (let i = 1; i <= 7 - fdnm; i++) {
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
        $(".date-panel").attr('data-fulldate', `${this_year}${("0"+this_month).slice(-2)}${("0"+this_day).slice(-2)}`)
        $(".date-panel").attr('data-date', `${("0"+this_day).slice(-2)}`)
        $(".date-panel").attr('data-month', `${("0"+this_month).slice(-2)}`)
        $(".date-panel").attr('data-year', `${this_year}`)



        //select date 
        $(".date-item").each((i,item)=>{
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
    
                        let showDay = this.option.showDay === 'none' ? '' :`${starter}${day_display}, `
                        let date_display = `${showDay}${d_display}${separation}${m_display}${separation}${checkYearType}`
    
                        //set dataset value and value to input        
    
                        let parent = this.elem
    
                        parent.value = date_display
    
                        parent.setAttribute("value", date_display)
    
                        /* parent.setAttribute("data-value", `${checkYearType}${m}${d}`) */
    
                        parent.dataset.fulldate = `${y}${m}${d}`
    
                        /*  e.target.parentElement.parentElement.parentElement.parentElement.dataset.fulldate = `${y}${m}${d}` */
    
                        /* closeOnSelect ? $(".date-panel").remove() : '' */
    
                        $(".date-item").removeClass('date-selected')
                        e.target.classList.add('date-selected')
    
                        $(".date-panel").attr('data-fulldate', `${y}${("0"+m).slice(-2)}${d}`)
                        $(".date-panel").attr('data-date', `${d}`)
    
                    } else {
                        console.error("Invalid date Format")
                    }
                }
            })
        })
        
        $(".date-item").click((e) => {
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

                    let showDay = this.option.showDay === 'none' ? '' :`${starter}${day_display}, `
                    let date_display = `${showDay}${d_display}${separation}${m_display}${separation}${checkYearType}`

                    //set dataset value and value to input        

                    let parent = this.elem

                    parent.value = date_display

                    parent.setAttribute("value", date_display)

                    /* parent.setAttribute("data-value", `${checkYearType}${m}${d}`) */

                    parent.dataset.fulldate = `${y}${m}${d}`

                    /*  e.target.parentElement.parentElement.parentElement.parentElement.dataset.fulldate = `${y}${m}${d}` */

                    /* closeOnSelect ? $(".date-panel").remove() : '' */

                    $(".date-item").removeClass('date-selected')
                    e.target.classList.add('date-selected')

                    $(".date-panel").attr('data-fulldate', `${y}${("0"+m).slice(-2)}${d}`)
                    $(".date-panel").attr('data-date', `${d}`)

                } else {
                    console.error("Invalid date Format")
                }
                this.value = yearType === "AD" ? +this.elem.dataset.fulldate : +this.elem.dataset.fulldate+this.BEYear
            }


        })

        //set selected date color

        $(".date-item").each((i, item) => {
            let selectedData = this.extractFulldate(this.elem.dataset.fulldate)
            if (item.dataset.fulldate === `${selectedData.y}${selectedData.m}${selectedData.d}`) {
                item.classList.add('date-selected')
            } else {
                item.classList.remove('date-selected')
            }
        })

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

        $("#month_body").empty()


        if (this_year == min_date[0]) {

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
                        day: this.option.day,
                        month: this.option.month
                    })
                }

                $("#month_body").append(
                    `
                  <div class="month-item" data-fulldate=${this_year+("0"+[i]).slice(-2)}>${full_month}</div>
                  `
                )
            }
        } else if (this_year == max_date[0]) {

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
                        day: this.option.day,
                        month: this.option.month
                    })
                }

                $("#month_body").append(
                    `
                    <div class="month-item" data-fulldate=${this_year+("0"+[i]).slice(-2)}>${full_month}</div>
                    `
                )
            }
        } else {
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
                        day: this.option.day,
                        month: this.option.month
                    })
                }

                $("#month_body").append(
                    `
                    <div class="month-item" data-fulldate=${this_year+("0"+[i]).slice(-2)}>${full_month}</div>
                    `
                )
            }
        }

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
        $("#year_body").empty()


        for (let i = max_year; i >= this_year; i--) {
            yearSelected = curentYear === i ? ' _selected' : ''
            $("#year_body").append(
                `
              <div class="year-item${yearSelected}" data-year=${i}>${yearPanel === 'full' ? i : (''+i).slice(-2)}</div>
              `
            )
        }
    }
}

    Element.prototype.Calendar = function (option) {
        let d
        [this].forEach((item, i) => {
            d =  new Calendar(item,option)
        })
        return d

    }
    Object.prototype.Calendar = function(option) {
        let d

        this.forEach((item,i)=>{
             d =  new Calendar(item,option)
        })
        return d
    }


//test
let d = document.querySelectorAll('.datepicker#ctest1').Calendar({showDay:'full'})
let d2 = document.querySelectorAll('.datepicker#ctest2').Calendar({showDay:'small',yearType:'AD'})

setInterval(() => {
  document.querySelector('#sp1').innerHTML = d.value
  document.querySelector('#sp2').innerHTML = d2.value
}, 100);