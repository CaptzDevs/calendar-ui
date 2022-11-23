

/* 
date format 

ds = 1st
dds = 01st

d = 1 
dd = 01

D = จ. , mon 
DD = จันทร์  , Monday

m = 9
mm = 09

M =  ก.ย. , sep
MM = กันยายน , september

yyyy = 2565 ,2022
yy   = 65 , 22

setting {
    [✅]    format :            [dd/mm/yyyy]        [...]
    [✅]    default :           [now]               [now , ...any date]     
    [✅]    separation : ,      [""]                [any string] 
    [✅]    lang : ,            [th]                [th,en] 
    [✅]    yearType :          [AD]                [AD,BE]
    [✅]    selectable  :       [true]              [bool]
    [✅]    showDay     :       [full]              [full,small]
    [✅]    monthPanel  :       [full]              [full,small]       // how month display in panel
    [✅]    yearPanel  :        [full]              [full,small]       // how year display in panel
    [✅]    min  :              [anydate]           [anydate]
    [✅]    max  :              [anydate]           [anydate]
    [✅]    startWith  :        ['']                [any string]
    [✅]    closeOnSelect   :   [true]              [bool]
}
   
    01/09/2022 [default]
    
    separation : '',
    lang : "th",

        1 กันยายน 2565
        1 ก.ย. 2565
        วันที่ 1 กันยายน 2565
        วัน จันทร์ ที่ 1 กันยายน 2565
        วัน จ. ที่ 1 กันยายน 2565 
        วัน จ. ที่ 1 ก.ย 2565 
        จ. 1 ก.ย 2565 


*/



    /*
         date format 

ds = 1st
dds = 01st

d = 1 
dd = 01

D = จ. , mon 
DD = จันทร์  , Monday

m = 9
mm = 09

M =  ก.ย. , sep
MM = กันยายน , september

yyyy = 2565 ,2022
yy   = 65 , 22
    */



    /*

      weekday : 
        long : วันอาทิตย์  
        narrow : อา
        short : อา.

      day :
        numeric : 9
        2-digit : 09

      month : 
        long : กันยายน
        short , narrow : ก.ย
        2-digit : 09
        numeric : 9

      year : 
        numeric : 2565
        2-digit : 65

      */


/*       let date1 = new Date(2022,9-1,18)
      console.log(date1.toLocaleDateString('en-US' , {
        weekday : "short",
        year : "numeric",
        month : "short", 
        day : "numeric"
      })) */


const default_setting = {

            format : "dd/mm/yyyy",    
            default :  "now",            
            separation : "",           
            lang : "en",
            yearType : "AD",         
            selectable  : true,        
            showDay : 'sm',
            day : 'full',          
            month : 'full',
            min  : 19000101,    
            max  : 21000101, 
            startWith  : '',
            closeOnSelect : true,
            dayPanel : 'full',
            monthPanel : 'full',
            yearPanel : 'full',
    }


   let panel_arr = [
          'date-panel',"datepicker",'lbl_month','lbl_year' ,'btn btn-sm btnNextMonth' ,
           "btn btn-sm btnNextMonth",'btn btn-sm btnPreviousMonth','month-item','month-body','year-item'
           ,'year-body','month-header','date-body','date-header'
           ,'date-day-item','date-item disableSelect date-selected' , 'date-item disableSelect','date-icon']

 
    const findOverflows = () => {
            if($(".date-panel").length > 0){
            const documentWidth = document.documentElement.offsetWidth;
            const documentHeight = document.documentElement.offsetHeight;
    
                let element = $(".date-panel")[0]
                const box = element.getBoundingClientRect();
                let fullsize = box.right-box.left;
                let fullHeight = box.bottom-box.top
    
                if (box.left < 0 || box.right > documentWidth) {
                    element.style.right = 1*box.left-20+"px"
                    console.log(element);
                    element.style.border = '1px solid red';
                }
                if(box.bottom < 0 || box.bottom > documentHeight){
                     element.style.top = (-1*(fullHeight+10))+"px" 
                }
            }
        };
    
      
        $(window).on('resize',()=>{
            findOverflows()
        })
    
    function checkDateIsValidFormat(date = '',setting = default_setting){
            let yearType = setting.yearType ? setting.yearType : default_setting.yearType 
        
            let format = setting.format ? setting.format : default_setting.format
    
            format = format.split('/')
    
            let tranform_format = `${format[0].toLowerCase().slice(-1)}/${format[1].toLowerCase().slice(-1)}/${format[2].toLowerCase().slice(-1)}`
               
            tranform_format = tranform_format.split('/')
            date = date.split('/')
            let format_set = {}
    
            for (let i = 0; i <= 2; i++){
                format_set[ tranform_format[i] ] = date[i]
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
                    return false
                }
            }else{
                   return false
            }
        
    }
        

    function autoDate(e,setting){
        let check_format = checkDateIsValidFormat(e.target.value,setting)

        let yearType = setting.yearType ? setting.yearType : default_setting.yearType 
      
     /*    e.target.previousElementSibling.setAttribute('value',e.target.value) */
       if(check_format[0]){

            let full_date_display = selectDateFormat(check_format[1].d,check_format[1].m,check_format[1].y,setting)[0]

            let slitter = setting.separation  ? setting.separation : default_setting.separation
            let starter = setting.startWith ? setting.startWith : default_setting.startWith

               day_display = full_date_display[0]
               d_display = full_date_display[1]
               m_display = full_date_display[2]
               y_display = full_date_display[3]

               y_display = yearType === "AD" ? y_display : +y_display+543

               let date_display  = `${starter}${day_display}, ${d_display}${slitter}${m_display}${slitter}${y_display}`

               //set dataset value and value to input        

               e.target.value = date_display
               e.target.setAttribute("value" ,date_display)
               e.target.setAttribute('data-value',`${y_display}${("0"+check_format[1].m).slice(-2)}${check_format[1].d}`) 

               e.target.dataset.fulldate = `${check_format[1].y}${("0"+check_format[1].m).slice(-2)}${check_format[1].d}`

                $(".date-panel").attr('data-fulldate',`${check_format[1].y}${("0"+check_format[1].m).slice(-2)}${check_format[1].d}`)
                $(".date-panel").attr('data-date',`${check_format[1].d}`)



                 renderCalendar(+check_format[1].d,+check_format[1].m,+check_format[1].y,setting)   
               /*   e.target.setAttribute("readonly","readonly") */

           }
    }
    

    function changeDateByArrow(e,current,setting){

        let max = setting.max ? ''+setting.max : ''+default_setting.max
        let max_date = max.length > 0 ? [+max.slice(0,4), +max.slice(4,6),+max.slice(6,8)] : 0
        let max_month = max_date[0] != 0 ? max_date[1] : 12
        let max_year = max_date[0] != 0 ? max_date[0] : yearType === 'AD' ? 2100 : 2600
    
        let min = setting.min ? ''+setting.min : ''+default_setting.min
        let min_date = min.length > 0 ? [+min.slice(0,4), +min.slice(4,6),+min.slice(6,8)] : 0
        let min_month = min_date[0] != 0 ? min_date[1] : 12
        let min_year = min_date[0] != 0 ? min_date[0] : yearType === 'AD' ? 2100 : 2600

        let yearType = setting.yearType ? setting.yearType : default_setting.yearType 
        let curentDate = ("0"+current.getDate()).slice(-2)
        let curentMonth=  ("0"+(current.getMonth()+1)).slice(-2)
        let curentYear = current.getFullYear()

        let [curentDateDisplay,curentMonthDisplay,curentYearDisplay] = selectDateFormat(curentDate,curentMonth,curentYear,setting)[1]
        console.log(curentDate)
        curentYearDisplay = yearType === "AD" ? curentYear : curentYear+543

        if(
            (max_date[2] >= +curentDate || max_month != +curentMonth  || max_year != +curentYear) &&
            (min_date[2] <= +curentDate || +curentMonth != min_month  || +curentYear != min_year )
        )
        {
    
            e.target.value =  `${ curentDateDisplay }/${curentMonthDisplay}/${curentYearDisplay}`
            e.target.setAttribute("value" ,`${ curentDateDisplay }/${curentMonthDisplay}/${curentYearDisplay}`)
            e.target.setAttribute("data-value" ,`${curentYearDisplay}${curentMonth}${curentDate}`) 
            e.target.setAttribute("data-fulldate" ,`${curentYear}${curentMonth}${curentDate}`) 

            renderCalendar(curentDate,curentMonth,curentYear,setting)

         }

    }
    
    
    


    jQuery.fn.Calendar = function(setting = default_setting){

    this[0].insertAdjacentHTML('afterend', `<div class="date-icon" ><i class="fa-duotone fa-calendar"></i></div>`);

    // setting 
    //bind click to element 

    $(document).ready(()=>{
        // Execute findOverflows to find overflows on the page.
      if(this.length === 1){

        
    let max = setting.max ? ''+setting.max : ''+default_setting.max
    let max_date = max.length > 0 ? [+max.slice(0,4), +max.slice(4,6),+max.slice(6,8)] : 0
    let max_month = max_date[0] != 0 ? max_date[1] : 12
    let max_year = max_date[0] != 0 ? max_date[0] : yearType === 'AD' ? 2100 : 2600


    let min = setting.min ? ''+setting.min : ''+default_setting.min
    let min_date = min.length > 0 ? [+min.slice(0,4), +min.slice(4,6),+min.slice(6,8)] : 0
    let min_month = min_date[0] != 0 ? min_date[1] : 12
    let min_year = min_date[0] != 0 ? min_date[0] : yearType === 'AD' ? 2100 : 2600


        this[0].addEventListener('keyup',(e)=>{
            this[0].nextElementSibling.click()

            let fullDate = e.target.dataset.fulldate
            let date = 0
            let yearType = setting.yearType ? setting.yearType : default_setting.yearType 


            let [year_s,month_s,date_s] = [fullDate.slice(0,4),fullDate.slice(4,6),fullDate.slice(6,8)]

           /*  year_s = yearType === "AD" ? year_s : year_s-543
            console.log(year_s) */
            
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

                    if((max_date[2] != this_date || max_month != this_month  || max_year != this_year  )){
                        let current = d.configDate(1,"add")
                        changeDateByArrow(e,current,setting)
                    }
                }
                //left 
                if (e.keyCode === 37) {

                    let fulldate = e.target.dataset.fulldate
                    let [this_date, this_month, this_year] = [+fulldate.slice(6,8),+fulldate.slice(4,6),+fulldate.slice(0,4)]

                    if(min_date[2] != this_date || this_month != min_month  || this_year != min_year ){

                        let current = d.configDate(1,"remove")
                        changeDateByArrow(e,current,setting)
                    }
                }
                //up
                if (e.keyCode === 38) {
           
                        let current = d.configDate(7,"remove")
                        changeDateByArrow(e,current,setting)
                }
                //down
                if (e.keyCode === 40) {

                        let current = d.configDate(7,"add")
                        changeDateByArrow(e,current,setting)
                        
                }
        })

        //click icon 
        this[0].nextElementSibling.addEventListener("click", (e) => {

                openCalendar(e , setting)
        })
        //click input
        this[0].addEventListener("click", (e) => {
           
            if(e.detail === 2){
                e.target.select()
            }

          if(e.target.value === ''){
                
                this[0].addEventListener('change', (e) => {
                    autoDate(e,setting)
                })

                this[0].addEventListener('blur', (e) => {
                    autoDate(e,setting)
                })

            }else if(e.target.value != ''){
      
                let yearType = setting.yearType ? setting.yearType : default_setting.yearType 
                let fullDate = e.target.dataset.fulldate

                let date = fullDate.slice(6,8)
                let month = fullDate.slice(4,6)
                let year = fullDate.slice(0,4)

                let checkYearType = yearType === "AD" ? +year : +year+543 

                let checkFormat = selectDateFormat(date,month,checkYearType,setting)[1]

                e.target.value = `${checkFormat[0]}/${checkFormat[1]}/${checkFormat[2]}`
                
                e.target.setAttribute("value" ,`${checkFormat[0]}/${checkFormat[1]}/${checkFormat[2]}`) 


                this[0].addEventListener('change', (e) => {

                        autoDate(e,setting)

                }) 

                this[0].addEventListener('blur', (e) => {
                
                        autoDate(e,setting)

                }) 
            }
        })

    }
    })
}

    $("#date_pay1").Calendar({
        separation : "/",
        lang : "th",
        showDay : 'small',
        closeOnSelect : true,   
        yearType : "AD",

        min : 20220927,  
        max : 20230105, 
        
    })

    $("#date_pay2").Calendar({
        separation : "/",
        lang : "th",
        showDay : 'small',
        yearType : "BE",
        
    })


    


    function selectDateFormat(d,m,y,setting,tranform_year){

            let yearType = setting.yearType ? setting.yearType : default_setting.yearType 
            let lang = setting.lang ? setting.lang : default_setting.lang 
            let formatter = setting.format ? setting.format.split('/') : default_setting.format.split('/')
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
    
                let show_day = setting.showDay  ? setting.showDay : default_setting.showDay ? default_setting.showDay : 'null'
    
    
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


function openCalendar(e,setting = default_setting){

    
    if($(".date-panel").length === 0){

        e.target.previousElementSibling.parentElement.style.position = "relative" 


    let yearType = setting.yearType ? setting.yearType : default_setting.yearType 

    let max = setting.max ? ''+setting.max : ''+default_setting.max
    let max_date = max.length > 0 ? [+max.slice(0,4), +max.slice(4,6),+max.slice(6,8)] : 0
    let max_month = max_date[0] != 0 ? max_date[1] : 12
    let max_year = max_date[0] != 0 ? max_date[0] : yearType === 'AD' ? 2100 : 2600


    let min = setting.min ? ''+setting.min : ''+default_setting.min
    let min_date = min.length > 0 ? [+min.slice(0,4), +min.slice(4,6),+min.slice(6,8)] : 0
    let min_month = min_date[0] != 0 ? min_date[1] : 12
    let min_year = min_date[0] != 0 ? min_date[0] : yearType === 'AD' ? 2100 : 2600

    let lang = setting.lang ? setting.lang : default_setting.lang 

    let formatter = setting.format ? setting.format : default_setting.format

    let dayHeader  = ''

    e.target.previousElementSibling.setAttribute("placeholder",formatter)

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

        let fulldate = ''+e.target.previousElementSibling.dataset.fulldate
        let [curentDate,curentMonth,curentYear] = [fulldate.slice(6,8), fulldate.slice(4,6),fulldate.slice(0,4)]

        if(
            (max_date[2] >= +curentDate || max_month != +curentMonth  || max_year != +curentYear) &&
            (min_date[2] <= +curentDate || +curentMonth != min_month  || +curentYear != min_year )
        ){
            renderCalendar(curentDate, curentMonth, curentYear, setting)   

        }else if((max_date[2] < +curentDate &&  max_month <= +curentMonth  &&  max_year <= +curentYear)){

            e.target.previousElementSibling.setAttribute("data-fulldate",`${max_date[0]}${('0'+max_date[1]).slice(-2)}${('0'+max_date[2]).slice(-2)}`)    
            renderCalendar(max_date[2], max_date[1], max_date[0], setting)
            
        }

         else if((min_date[2] > +curentDate && +curentMonth >= min_month  &&  +curentYear >= min_year )){

                renderCalendar(min_date[2], min_date[1], min_date[0], setting)
                e.target.previousElementSibling.setAttribute("data-fulldate",`${min_date[0]}${('0'+min_date[1]).slice(-2)}${('0'+min_date[2]).slice(-2)}`)    
        } 

  $(".lbl_year").click((ev)=>{
      renderYear(setting)
      let this_date = ev.target.parentElement.parentElement.dataset.date
      let this_month = ev.target.parentElement.parentElement.dataset.month
      let year = 0

      $(".year-panel").addClass('show-month')

        $(".year-item").click((e)=>{
        
        $(".year-panel").removeClass('show-month')
        
        year = yearType === "AD" ? +e.target.dataset.year  : +e.target.dataset.year-543 

        let checkYearType = yearType === "AD" ? +year : +year+543

        let full_date_display = selectDateFormat(this_date,this_month,checkYearType,setting,true)[0]

        let slitter = setting.separation  ? setting.separation : default_setting.separation
        let starter = setting.startWith ? setting.startWith : default_setting.startWith

          day_display = full_date_display[0]
          d_display = full_date_display[1]
          m_display = full_date_display[2]
          y_display = full_date_display[3]


          let date_display  = `${starter}${day_display}, ${d_display}${slitter}${m_display}${slitter}${y_display}`

          //set dataset value and value to input        
         e.target.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling.value = date_display

         e.target.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling.setAttribute("value" ,date_display)

         e.target.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling.setAttribute("data-value" ,`${checkYearType}${("0"+this_month).slice(-2)}${this_date}`)

         e.target.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling.dataset.fulldate = `${year}${("0"+this_month).slice(-2)}${this_date}`



            $(".date-panel").attr('data-fulldate',`${year}${("0"+this_month).slice(-2)}${this_date}`)
            $(".date-panel").attr('data-date',`${this_date}`)


          renderCalendar( this_date, this_month , year ,setting)

      })
  })

  $(".lbl_month").click((e)=>{

    let this_date = e.target.parentElement.parentElement.dataset.date
    let this_year = yearType === "AD" ? e.target.parentElement.parentElement.dataset.year : +e.target.parentElement.parentElement.dataset.year+543 
    let month = 0


        $(".month-panel").addClass('show-month')

        renderMonth(this_year,setting)

        $(".month-item").click((e)=>{

        let fullDate = e.target.dataset.fulldate 
        month = fullDate.slice(4,6)

        $(".month-panel").removeClass('show-month')


        let full_date_display = selectDateFormat(this_date,month,this_year,setting,true)[0]

        let slitter = setting.separation  ? setting.separation : default_setting.separation
        let starter = setting.startWith ? setting.startWith : default_setting.startWith
        
          day_display = full_date_display[0]
          d_display = full_date_display[1]
          m_display = full_date_display[2]
          y_display = full_date_display[3]

          let checkYearType = yearType === 'AD' ? this_year : this_year-543

          console.log(checkYearType)

          let date_display  = `${starter}${day_display}, ${d_display}${slitter}${m_display}${slitter}${y_display}`

          //set dataset value and value to input        
          e.target.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling.value = date_display
          e.target.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling.setAttribute("value" ,date_display)
          e.target.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling.setAttribute("data-value" ,`${checkYearType}${("0"+month).slice(-2)}${this_date}`)

          e.target.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling.dataset.fulldate = `${checkYearType}${("0"+month).slice(-2)}${this_date}`

            $(".date-panel").attr('data-fulldate',`${checkYearType}${("0"+month).slice(-2)}${this_date}`)
            $(".date-panel").attr('data-date',`${this_date}`)

            renderCalendar( this_date, month ,checkYearType ,setting)
            
        })

})

  $(".btnPreviousMonth").click((ev)=>{
      let this_date = +ev.target.parentElement.parentElement.dataset.date
      let this_month = +ev.target.parentElement.parentElement.dataset.month
      let this_year = +ev.target.parentElement.parentElement.dataset.year

      if(max_date[0] != 0 && this_month - min_month  > 0 || this_year - min_year  > 0 ){

      if(this_month == 1){
          this_month = 12
          this_year -= 1
      }else{
          this_month -= 1
      }
      
        renderCalendar(this_date,this_month,this_year,setting)
    }/* else{
        
      if(this_month == 1){
          this_month = 12
          this_year -= 1
      }else{
          this_month -= 1
      }
    } */



  })

  $(".btnNextMonth").click((ev)=>{


      let this_date = +ev.target.parentElement.parentElement.dataset.date
      let this_month = +ev.target.parentElement.parentElement.dataset.month
      let this_year = +ev.target.parentElement.parentElement.dataset.year

      if(max_date[0] != 0 && max_month - this_month > 0 || max_year - this_year > 0 ){

        if(this_month == 12){
            this_month = 1
            this_year += 1
        }else{
            this_month +=1
        }
        renderCalendar(this_date,this_month,this_year,setting)
    }/* else{
        if(this_month == 12){
            this_month = 1
            this_year += 1
        }else{
            this_month +=1
        }
    } */


 
})


findOverflows();

   
}
}


function check_lang(lang = 'en'){

    type.day = type.day || default_setting.day
    type.month = type.month || default_setting.month

    let resultArr = `${lang}_${section === 'd' ? type.day : type.month }`

    return resultArr 
}

//value   []  [any date , or month]
//section [] [d,m]
//lang 
//type = full , sm

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



    
function set_lang(value,section,lang,type = {day:"full",month:"full"}){
    type.day = type.day || default_setting.day
    type.month = type.month || default_setting.month

    let select_lang = `${section}_${lang}_${section === 'd' ? type.day : type.month}`

    return LANG[select_lang][value]
}

//###############################################################################
//################################# MAIN FUNCTION ##############################################
//###############################################################################


function renderCalendar(date = 0,month = 0,year = 0 ,setting = default_setting){
    let lang = setting.lang ? setting.lang : default_setting.lang 
    let yearType = setting.yearType ? setting.yearType : default_setting.yearType 
    let max = setting.max ? ''+setting.max : ''+default_setting.max
    let min = setting.min ? ''+setting.min : ''+default_setting.min

    let max_date = [+max.slice(0,4), +max.slice(4,6),+max.slice(6,8)]
    let max_month = max_date != 0 ? max_date[1] : 12
    let max_year = max_date != 0 ? max_date[0] : yearType == 'AD' ? 2100 : 2600

    let min_date = [+min.slice(0,4), +min.slice(4,6),+min.slice(6,8)]
    let min_month = min_date != 0 ? min_date[1] : 12
    let min_year = min_date != 0 ? min_date[0] : yearType == 'AD' ? 2100 : 2600

    let selectable = setting.selectable != undefined ? setting.selectable : default_setting.selectable

    let closeOnSelect = setting.closeOnSelect != undefined ? setting.closeOnSelect : default_setting.closeOnSelect

    let yearPanel = setting.yearPanel != undefined ? setting.yearPanel : default_setting.yearPanel


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


      //get first day of the month and first day of the year
      let fdm = new Date(this_year, this_month-1, 1).getDay(); //first day of month

      let fdnm = new Date(this_year, this_month, 1).getDay(); //first day of next month
      
      let date_number = new Date(this_year, this_month, 0).getDate() // amount of date in 
      let date_number_before = new Date(this_year, this_month-1, 0).getDate() // amount of date in 

      let last_date_of_month = new Date(this_year, this_month, 0).getDate();
   
      //set month lable and year label
      $(".lbl_month").text(set_lang(+this_month,'m',lang,{day : setting.day , month : setting.month }))

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
    for(let i = 1 ; min_date[0] != 0 && i != min_date[2] && (this_month == min_month && this_year == min_year) ; i++){
          $(".date-body").append(`<div class="date-item date-empty">${i}</div>`)
          startDate = i+1
    }

    //render all date //MAIN
    let count_all_date = 0
    for(let i = startDate ; i <= date_number ; i++){
          
        //check max date
        if(max_date[0] != 0 && i == max_date[2]+1 && (this_month == max_month && this_year == max_year)) break 

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
    if(selectable){
      let fulldate = e.target.dataset.fulldate

      let  y = fulldate.slice(0,4)
      let  m = fulldate.slice(4,6)
      let  d = fulldate.slice(6,8)

      let formatter = setting.format ? setting.format.split('/') : default_setting.format.split('/')

    function checkDateFormat(arr = []){

        let check_date_arr = ['d','dd',"D","DD",'m','mm','M','MM',"yy",'yyyy']

        let check1 = check_date_arr.includes(arr[0]) || false
        let check2 = check_date_arr.includes(arr[1]) || false
        let check3 = check_date_arr.includes(arr[2]) || false

        return check1 && check2 && check3 
    }


      let isValid= checkDateFormat([formatter[0], formatter[1] ,formatter[2]])

      if( isValid ){
            
       let full_date_display = selectDateFormat(d,m,y,setting)[0]

      // console.log(date_formated , date_lang )

            let slitter = setting.separation  ? setting.separation : default_setting.separation
            let starter = setting.startWith ? setting.startWith : default_setting.startWith

            day_display = full_date_display[0]
            d_display = full_date_display[1]
            m_display = full_date_display[2]
            y_display = full_date_display[3]


            let checkYearType = yearType === "AD" ? y_display :+y_display+543

            let date_display  = `${starter}${day_display}, ${d_display}${slitter}${m_display}${slitter}${checkYearType}`

            //set dataset value and value to input        

            e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.value = date_display

            e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.setAttribute("value" ,date_display)

            e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.setAttribute("data-value" ,`${checkYearType}${m}${d}`) 

            e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.dataset.fulldate = `${y}${m}${d}`
             /*  e.target.parentElement.parentElement.parentElement.parentElement.dataset.fulldate = `${y}${m}${d}` */

             /* closeOnSelect ? $(".date-panel").remove() : '' */
              

              $(".date-item").removeClass('date-selected')
              e.target.classList.add('date-selected')

              $(".date-panel").attr('data-fulldate',`${y}${("0"+m).slice(-2)}${d}`)
              $(".date-panel").attr('data-date',`${d}`)

        }else{
            console.log("Invalid date Format")
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

  function renderMonth(this_year,setting = default_setting){

    let lang = setting.lang ? setting.lang : default_setting.lang 

    let max = setting.max ? ''+setting.max : ''+default_setting.max

    let max_date = max.length > 0 ? [+max.slice(0,4), +max.slice(4,6),+max.slice(6,8)] : 0

    let max_month = max_date[0] != 0 ? max_date[1] : 12

    let monthPanel = setting.monthPanel !== undefined ? setting.monthPanel : default_setting.monthPanel

      $("#month_body").empty()

      for (let i = 1 ; i <= max_month; i++){

    let full_month
        if(lang === 'en' && monthPanel === 'small'){
            full_month = set_lang(i,'m',lang,{day : 'sm' , month :'sm'})
        }else if(lang === 'th' && monthPanel === 'small'){
            full_month = set_lang(i,'m',lang,{day : 'sm' , month :'sm'})
        }else{
            full_month = set_lang(i,'m',lang,{day:setting.day , month : setting.month })
        }
        
      $("#month_body").append(
          `
          <div class="month-item" data-fulldate=${this_year+("0"+[i]).slice(-2)}>${full_month}</div>
          `
      )
  }

  }



  function renderYear(setting = default_setting){
    let d = new Date()

    let yearType = setting.yearType ? setting.yearType : default_setting.yearType 

    let min = setting.min ? ''+setting.min : ''+default_setting.min
    let min_date = [+min.slice(0,4), +min.slice(4,6),+min.slice(6,8)]
    let min_year = min_date !== 0 ? min_date[0] : yearType === 'AD' ? 2100 : 2600

    let max = setting.max ? ''+setting.max : ''+default_setting.max
    let max_date = max.length > 0 ? [+max.slice(0,4), +max.slice(4,6),+max.slice(6,8)] : 0
    let max_year = max_date[0] !== 0 ? max_date[0] : yearType === 'AD' ? 2100 : 2600

    let this_year = yearType === 'AD' ? min_date[0] : min_date[0] > 0 ? min_date[0] : d.getFullYear()+543 

    let yearPanel = setting.yearPanel !== undefined ? setting.yearPanel : default_setting.yearPanel

      $("#year_body").empty()

      for (let i = this_year; i <= max_year; i++){

      $("#year_body").append(
          `
          <div class="year-item" data-year=${i}>${yearPanel === 'full' ? i : (''+i).slice(-2)}</div>
          `
      )
  }
  }
