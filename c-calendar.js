

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
    [✅]    format :            [dd/mm/yyyy]    [...]
    [✅]    default :           [now]           [now , ...any date]     
    [✅]    separation : ,      [""]            [any string] 
    [✅]    lang : ,            [th]            [th,en] 
    [✅]    zoro : ,            [true]          [bool]
    [✅]    yearType :          [AD]            [AD,BE]
    [✅]     selectable  :       [true]           [bool]
    [✅]    showDay     :        [false]        [bool]
    [ ]     dayPanel :               [full]          [full,small]       // how date display in panel
    [ ]     monthPanel  :            [full]          [full,small]       // how date display in panel

    [ ]     dayDisplay :           [full]          [full,small]        // how date display in input
    [ ]     monthDisplay  :         [full]          [full,small]        // how date display in input
    [✅]    min  :              [anydate]       [anydate]
    [✅]    max  :              [anydate]       [anydate]
    [✅]    startWith  :         ['']            [any string]
    [ ]     closeOnselect   :    [true]           [bool]
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

const default_setting = {

            format : "dd/mm/yyyy",    
            default :  "now",            
            separation : "",           
            lang : "en",
            yearType : "AD",         
            selectable  : true,        
            day : 'full',          
            month : 'full',
           /*  min  : 20220715,    
            max  : 20221115, */
            min  : 0,    
            max  : 0,
            startWith  : '',
            showDay : 'sm'
    }

    jQuery.fn.Calendar = function(option = default_setting)
    
    {

    // setting 

    //bind click to element 

    $(document).ready(()=>{

      if(this.length == 1){

        this[0].addEventListener("click", (e) => {
           openCalendar(e , option)
        })
        }
        else if (this.length > 1){

        [...this].forEach((item,i)=>{

        item.addEventListener("click",(e)=>{
            openCalendar(e , option)
        })

    })
        } 
    })

    }



    $("#date_pay1").Calendar({
        separation : "/",
        lang : "en",
        showDay : 'sm',
        selectable : false,
        /* max : 20231115, 
        min : 20210715,  */
        
    })

    $("#date_pay2").Calendar({
        separation : "/",
        lang : "th",
        startWith : "วัน ",
        showDay : 'full'
        
    })

    

   let panel_arr = [
          'date-panel',"datepicker",'lbl_month','lbl_year' ,'btn btn-info btn-sm btnNextMonth' ,
           "btn btn-info btn-sm btnNextMonth",'btn btn-info btn-sm btnPreviousMonth','month-item','month-body','year-item'
           ,'year-body','month-header','date-body','date-header'
           ,'date-day-item','date-item disableSelect date-selected' , 'date-item disableSelect']

      $("body").click((e)=>{
          /* console.log(e.target.className) */
          if(!panel_arr.includes(e.target.className)){
              $(".date-panel").remove()
          }
      })



function openCalendar(e,setting = default_setting){

    if($(".date-panel").length == 0){
        e.target.setAttribute("readonly","readonly")
        e.target.parentElement.style.position = "relative" 


    let yearType = setting.yearType ? setting.yearType : default_setting.yearType 

    let max = setting.max ? ''+setting.max : ''+default_setting.max
    let max_date = max.length > 0 ? [+max.slice(0,4), +max.slice(4,6),+max.slice(6,8)] : 0
    let max_month = max_date[0] != 0 ? max_date[1] : 12
    let max_year = max_date[0] != 0 ? max_date[0] : yearType == 'AD' ? 2100 : 2600


    let min = setting.min ? ''+setting.min : ''+default_setting.min
    let min_date = min.length > 0 ? [+min.slice(0,4), +min.slice(4,6),+min.slice(6,8)] : 0
    let min_month = min_date[0] != 0 ? min_date[1] : 12
    let min_year = min_date[0] != 0 ? min_date[0] : yearType == 'AD' ? 2100 : 2600


        let dayHeader  = ''
        
        if(setting.lang == 'th'){
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
        if(setting.lang == 'en'){
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
                <button type="button" class="btn btn-info btn-sm btnPreviousMonth" id="btnPreviousMonth"> <i
                        class="fas fa-chevron-left"></i> </button>

                <div class="lbl_month" id="header_month">month</div>
                <div class="lbl_year" id="header_year">year</div>

                <button type="button" class="btn btn-info btn-sm btnNextMonth" id="btnNextMonth"><i
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

  renderCalendar(e.target.dataset.fulldate.slice(6,8),+e.target.dataset.fulldate.slice(4,6),e.target.dataset.fulldate.slice(0,4),setting)   

  $(".lbl_year").click((ev)=>{
      renderYear(setting)
      let this_date = +ev.target.parentElement.parentElement.dataset.date
      let this_month = +ev.target.parentElement.parentElement.dataset.month

      $(".year-panel").addClass('show-month')

          $(".year-item").click((ev)=>{
          let year= ev.target.dataset.year 
          $(".year-panel").removeClass('show-month')
          renderCalendar( this_date, this_month , year ,setting)

      })
  })

  $(".lbl_month").click((e)=>{
    let this_date = +e.target.parentElement.parentElement.dataset.date
    let this_year = +e.target.parentElement.parentElement.dataset.year


    $(".month-panel").addClass('show-month')
    renderMonth(this_year,setting)

        $(".month-item").click((e)=>{

        let fullDate = e.target.dataset.fulldate 
        let year = $("#header_year").text()

        $(".month-panel").removeClass('show-month')
        renderCalendar( this_date, +fullDate.slice(4,6) ,year ,setting)

    })
})

  $(".btnPreviousMonth").click((ev)=>{
      let this_date = +ev.target.parentElement.parentElement.dataset.date
      let this_month = +ev.target.parentElement.parentElement.dataset.month
      let this_year = +ev.target.parentElement.parentElement.dataset.year

      if(max_date[0] !=  0 && this_month - min_month  > 0 || this_year - min_year  > 0 ){

      if(this_month == 1){
          this_month = 12
          this_year -= 1
      }else{
          this_month -= 1
      }
    }else{
        
      if(this_month == 1){
          this_month = 12
          this_year -= 1
      }else{
          this_month -= 1
      }
    }
    
    renderCalendar(this_date,this_month,this_year,setting)
  })

  $(".btnNextMonth").click((ev)=>{


      let this_date = +ev.target.parentElement.parentElement.dataset.date
      let this_month = +ev.target.parentElement.parentElement.dataset.month
      let this_year = +ev.target.parentElement.parentElement.dataset.year
      let fulldate = parseInt(`${this_year}${this_month}`)

      if(max_date[0] !=  0 && max_month - this_month > 0 || max_year - this_year > 0 ){

        if(this_month == 12){
            this_month = 1
            this_year += 1
        }else{
            this_month +=1
        }
    }else{
        if(this_month == 12){
            this_month = 1
            this_year += 1
        }else{
            this_month +=1
        }
    }
    renderCalendar(this_date,this_month,this_year,setting)
})



   

  
}
}


function check_lang(lang = 'en'){


    type.day = type.day || default_setting.day
    type.month = type.month || default_setting.month

    let resultArr = `${lang}_${section == 'd' ? type.day : type.month }`

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
    
    let m_en = ['','January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let m_en_sm = ['','Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];       
    let m_th = [ "","มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม", ];
    let m_th_sm = ["", "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.", ];
    let d_en = ['','Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let d_en_sm = ['','Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    let d_th = ["","อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัสบดี","ศุกร์","เสาร์"]
    let d_th_sm = ["","อา","จ","อ","พ","พฤ","ศ","ส"]

    type.day = type.day || default_setting.day
    type.month = type.month || default_setting.month

    let select_lang = `${section}_${lang}_${section == 'd' ? type.day : type.month}`



    //return LANG[lang][section][section == 'd' ? type.day : type.month][select_lang]
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

    let selectable = setting.hasOwnProperty('selectable') ? setting.selectable : default_setting.selectable

    let disableSelect = ''
    console.log(selectable)
    if(!selectable){
        disableSelect = 'disableSelect'
    }


    console.log(min_date)

      $(".date-body").empty()


      let d = new Date();

      let this_day = 0
      let this_month = 0;
      let this_year = 0;  

      //if no argument set today to default date 
      if(date == 0 || month == 0 || year == 0){
           this_day = d.getDate();
           this_month = d.getMonth()+1;
           this_year = yearType == 'AD' ? d.getFullYear() : d.getFullYear()+543 ;
      }else{
           this_day = date
           this_month = month;
           this_year =  yearType == 'AD' && +year > 2500 ? +year-543 : +year;  
      }

      let year_seach =  +year > 2500 ? +year-543 : +year


      //get first day of the month and first day of the year
      let fdm = new Date(year_seach, this_month-1, 1).getDay(); //first day of month
      let fdy = new Date(year_seach, 0, 1).getDay(); //first day of year
      
      let date_number = new Date(year_seach, this_month, 0).getDate() // amount of date in 
      let date_number_before = new Date(year_seach, this_month-1, 0).getDate() // amount of date in 

      let last_date_of_month = new Date(2022, this_month, 0).getDate();
   
      //set month lable and year label
      $(".lbl_month").text(set_lang(this_month,'m',lang,{day:setting.day , month : setting.month }))
      $(".lbl_year").text(this_year) 


    //render date of previous month
      for(let i = date_number_before-fdm ; i < date_number_before ; i++){

          $(".date-body").append(`<div class="date-item date-empty">${i}</div>`)
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

    

    //set dataset 
   $(".date-panel").attr('data-fulldate',`${this_year}${("0"+this_month).slice(-2)}${("0"+this_day).slice(-2)}`)
   $(".date-panel").attr('data-date',`${("0"+this_day).slice(-2)}`)
   $(".date-panel").attr('data-month',`${("0"+this_month).slice(-2)}`)
   $(".date-panel").attr('data-year',`${this_year}`)

    //select date 
    $(".date-item").click((e)=>{

    if(selectable){
    let d_th = ["","อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัสบดี","ศุกร์","เสาร์"]

      let fulldate = e.target.dataset.fulldate

      let  y = fulldate.slice(0,4)
      let  m = fulldate.slice(4,6)
      let  d = fulldate.slice(6,8)

      let day =  new Date(+y-543, +m-1, +d).getDay();
   
      let formatter = setting.format ? setting.format.split('/') : "dd/mm/yyyy".split('/')

      let format_d = formatter[0]
      let format_m = formatter[1]
      let format_y = formatter[2]

    function checkDateFormat(arr = []){

        let check_date_arr = ['d','dd',"D","DD",'m','mm','M','MM',"yy",'yyyy']

        let check1 = check_date_arr.includes(arr[0]) || false
        let check2 = check_date_arr.includes(arr[1]) || false
        let check3 = check_date_arr.includes(arr[2]) || false

        return check1 && check2 && check3 

    }

    function check_case(value){
        if(value == value.toLowerCase()){
            return 'sm'
        }else{
            return 'full'
        }
    }

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

     function selectDateFormat(value){

            let d_select = 0
            let m_select = 0
            let y_select = 0


            let date_type , month_type , year_type;


            if(formatter[0][0] == 'd') d_select = 0 
            else if(formatter[0][0] == 'm' || formatter[0][0] == 'M' ) d_select = 1
            else if(formatter[0][0] == 'y') d_select = 2

            if(formatter[1][0] == 'd') m_select = 0 
            else if(formatter[1][0] == 'm' || formatter[1][0] == 'M' ) m_select = 1
            else if(formatter[1][0] == 'y') m_select = 2


            if(formatter[2][0] == 'd' ) y_select = 0  
            else if(formatter[2][0] == 'm' || formatter[2][0] == 'M' ) y_select = 1
            else if(formatter[2][0] == 'y') y_select = 2


            for(let i =0 ;i < 3 ; i++){

                if((formatter[i][0] == 'M') && formatter[i].length == 2 ) month_type = 'full'
                if((formatter[i][0] == 'M') && formatter[i].length == 1 ) month_type = 'sm'

                if((formatter[i][0] == 'd') && formatter[i].length == 2 ) date_type = 'z'
                if((formatter[i][0] == 'd') && formatter[i].length == 1 ) date_type = 'n'

                if((formatter[i][0] == 'm') && formatter[i].length == 2 ) month_type = 'z'
                if((formatter[i][0] == 'm') && formatter[i].length == 1 ) month_type = 'n'

                if(formatter[i][0] == 'y' && formatter[i].length == 2) year_type = 'sm'
                if(formatter[i][0] == 'y' && formatter[i].length == 4) year_type = 'full'

            }


            let show_day = setting.showDay  ? setting.showDay : default_setting.showDay ? default_setting.showDay : 'null'


            let date_lang = {
                day :`d_${lang}_${show_day}` ,  
                m : `m_${lang}_${month_type}` ,
            }
            

            switch(date_lang.y){
                case "y_en_full": y-543 ;break
                case "y_en_sm":  (''+(y-543)).slice(-2);break
                case "y_th_full": y ;break
                case "y_th_sm": (''+(y)).slice(-2)  ;break
            }

            let check_section = ['d','m','y']
            
            let section_arr = [check_section[d_select] , check_section[m_select] , check_section[y_select]] // return ordet of date ex. d,m,y or m,d,y depends on format

            let date_arr = {
                d: date_type == 'z' ? d : +d,
                m: month_type != 'n' && month_type != 'z' ? LANG[date_lang[section_arr[0]]][+m] :  month_type == 'z' ? m : +m,
                y: year_type == 'full' ? y : y.slice(-2) 
            }



        let FULL_DATE_DISPLAY = [

            LANG[date_lang.day] [!show_day || show_day != 'null' ? day : 0] ,
            date_arr[section_arr[0]],
            date_arr[section_arr[1]],
            date_arr[section_arr[2]],
        ]
            

         //    console.log(date_arr[d_select],date_arr[m_select],date_arr[y_select])
             
             
             return FULL_DATE_DISPLAY

      }

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


      let isValid= checkDateFormat([formatter[0], formatter[1] ,formatter[2]])

      if( isValid){
            
       let full_date_display = selectDateFormat(formatter)

     
      // console.log(date_formated , date_lang )

            let slitter = setting.separation  ? setting.separation : default_setting.separation
            let starter = setting.startWith ? setting.startWith : default_setting.startWith
            setting.zero  = setting.zero ?  setting.zero  : default_setting.zero 

            day_display = full_date_display[0]
            d_display = full_date_display[1]
            m_display = full_date_display[2]
            y_display = full_date_display[3]


            let date_display  = `${starter}${day_display}, ${d_display}${slitter}${m_display}${slitter}${y_display}`

            //set dataset value and value to input        

            e.target.parentElement.parentElement.previousElementSibling.setAttribute("value" ,date_display)

            e.target.parentElement.parentElement.previousElementSibling.dataset.fulldate = `${y}${m}${d}`
             /*  e.target.parentElement.parentElement.parentElement.parentElement.dataset.fulldate = `${y}${m}${d}` */

              $(".date-panel").remove()

              $(".date-item").removeClass('date-selected')
              e.target.classList.add('date-selected')

              $(".date-panel").attr('data-fulldate',`${y}${m}${d}`)
              $(".date-panel").attr('data-date',`${d}`)

      }else{
        console.log("Invalid date Format")
      }
   



/*         console.log(check_and_compare_is_all_capital(format_d,"d"))
      console.log(format_m)
      console.log(format_y)  */
    }
   })

   //set selected date color
 
   $(".date-item").each((i,item)=>{

      if(item.dataset.fulldate == $(".date-panel").attr('data-fulldate')){
          item.classList.add('date-selected')
      }else{
        item.classList.remove('date-selected')

      }
   })

 /*  }else{
      let fulldate = `${this_year+543}${("0"+this_month).slice(-2)}${("0"+this_day).slice(-2)}`

      let  y = fulldate.slice(0,4)
      let  m = fulldate.slice(4,6)
      let  d = fulldate.slice(6,8)

    let day =  new Date(+y-543, +m-1, +d).getDay();
    $(elem).val(`วัน ${d_th[day+1]} ที่ ${d}/${m}/${y}`)
    $(elem).attr('data-fulldate',`${y}${m}${d}`)
  } */

   

     

  }

  function renderMonth(this_year,setting = default_setting){

    let lang = setting.lang ? setting.lang : default_setting.lang 

    let max = setting.max ? ''+setting.max : ''+default_setting.max

    let max_date = max.length > 0 ? [+max.slice(0,4), +max.slice(4,6),+max.slice(6,8)] : 0

    let max_month = max_date[0] != 0 ? max_date[1] : 12

      $("#month_body").empty()
      for (let i = 1 ; i <= max_month; i++){
      $("#month_body").append(
          `
          <div class="month-item" data-fulldate=${this_year+("0"+[i]).slice(-2)}>${set_lang(i,'m',lang,{day:setting.day , month : setting.month })}</div>
          `
      )
  }

  }



  function renderYear(setting = default_setting){
    let d = new Date()

    let yearType = setting.yearType ? setting.yearType : default_setting.yearType 

    let max = setting.max ? ''+setting.max : ''+default_setting.max

    let max_date = max.length > 0 ? [+max.slice(0,4), +max.slice(4,6),+max.slice(6,8)] : 0

    let max_year = max_date[0] != 0 ? max_date[0] : yearType == 'AD' ? 2100 : 2600



    let this_year = yearType == 'AD' ? d.getFullYear() : d.getFullYear()+543 ;

      $("#year_body").empty()

      for (let i = this_year; i <= max_year; i++){

      $("#year_body").append(
          `
          <div class="year-item" data-year=${i}>${i}</div>
          `
      )
  }
  }
