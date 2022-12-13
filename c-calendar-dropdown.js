

    const default_dropdown_setting = {

    }

    jQuery.fn.Calendar = function(type,setting = default_dropdown_setting){
        if(type === 'dropdown'){
            renderCalendarDropDown(this)
        }
    }

    let dropdown_arr = 
    ['dropdown-section dropdown-section-date','dropdown-section dropdown-section-month','dropdown-section dropdown-section-year',
    'dropdown-body dropdown-date','dropdown-body dropdown-month','dropdown-body dropdown-year',
    'dropdown-item dropdown-item-date' , 'dropdown-item dropdown-item-month','ddropdown-item dropdown-item-year'
     ]
 
 
    $(document).click((e)=>{

        console.log(e.target.className)
     if(!dropdown_arr.includes(e.target.className) )
         console.log('d')
     })


     function renderDate(date,month,year){
        $(`.dropdown-wraper-date`).append(`
            <div class="dropdown-body dropdown-date">
            </div>
        `)

        let min = 1;
        let max = 31; 

        $(`.dropdown-section-date`).attr("data-min",min)
        $(`.dropdown-section-date`).attr("data-max",max)


            for ( let i = min; i <= max; i++ ){
                $(`.dropdown-date`).append(`<div class="dropdown-items dropdown-item-date"  data-date = '${("0"+i).slice(-2)}' }>${i}</div>`)
            }


            $(".dropdown-item-date").click((e)=>{
                let input = e.target.parentElement.previousElementSibling
                let value = e.target.dataset.date
                input.value = value

                $(`.dropdown-section-month`).focus()
            })
            
     }
     
     function renderMonth(date,month,year){
        $(`.dropdown-wraper-month`).append(`
            <div class="dropdown-body dropdown-month">
            </div>
        `)

        let min = 1;
        let max = 12; 

        $(`.dropdown-section-month`).attr("data-min",min)
        $(`.dropdown-section-month`).attr("data-max",max)

            for ( let i = min; i <= max; i++ ){
                $(`.dropdown-month`).append(`<div class="dropdown-items dropdown-item-month"  data-month='${("0"+i).slice(-2)}'>${i}</div>`)
            }


            $(".dropdown-item-month").click((e)=>{
                let input = e.target.parentElement.previousElementSibling
                let value = e.target.dataset.month
                input.value = value
                input.setAttribute('value',value)

                $(`.dropdown-section-year`).focus()

            })
     }


     function renderYear(date,month,year){
        $(`.dropdown-wraper-year`).append(`
            <div class="dropdown-body dropdown-year">
            </div>
        `)

        let min = 2000;
        let max = 2022; 


        $(`.dropdown-section-year`).attr("data-min",min)
        $(`.dropdown-section-year`).attr("data-max",max)

            for ( let i = min; i <= max; i++ ){
                $(`.dropdown-year`).append(`<div class="dropdown-items dropdown-item-year"  data-year='${i}'>${i}</div>`)
            }

            $(".dropdown-item-year").click((e)=>{
                let input = e.target.parentElement.previousElementSibling
                let value = e.target.dataset.year
                input.value = value
                input.setAttribute('value',value)

                $(".dropdown-body.dropdown-year").remove()

            })


          


     }

    function renderCalendarDropDown(elem){
        let elem_id = ''
        elem.each((i,item)=>{
            elem_id = item.id
            item.classList.add('d-none')
            item.insertAdjacentHTML('afterend',`    
            <div class="calendar-dropdown dropdown-${elem_id}">
                <div class="dropdown-wraper dropdown-wraper-date">
                    <input class="dropdown-section dropdown-section-date" type="text" autocomplete="off">
                </div>

                <div class="dropdown-wraper dropdown-wraper-month">
                    <input class="dropdown-section dropdown-section-month" type="text" autocomplete="off">
                </div>

                <div class="dropdown-wraper dropdown-wraper-year">
                    <input class="dropdown-section dropdown-section-year" type="text" autocomplete="off">
                </div>

            </div>`
          )

          //add event 

  
          $(`.dropdown-section-date , .dropdown-section-month , .dropdown-section-year`).on('change',(e)=>{

                let date = $(".dropdown-section-date ").val() 
                let month = $(".dropdown-section-month ").val() 
                let year = $(".dropdown-section-year ").val() 

            if(date != "" && month != "" && year != "" ){
                    e.target.parentElement.parentElement.setAttribute("data-value",`${year}${("0"+month).slice(-2)}${('0'+date).slice(-2)}`)
            }
          }) 

        $(`.dropdown-section-date`).on('focus',(e)=>{

            e.target.select()
            renderDate()

            
            let min = +e.target.dataset.min
            let max = +e.target.dataset.max
        
            $(`.dropdown-section-date`).change((e)=>{

                let value = e.target.value

                if(!isNaN(value) ){
    
                    if(value.length == 1 && value < 10  ){
    
                        let input = e.target
                        let valueDisplay = ("0"+value).slice(-2)
                        
                        input.value = valueDisplay
                        input.setAttribute('value',valueDisplay)
                    }
    
                }else{
                  value = ''
                }
    
            })

            $(`.dropdown-section-date`).keyup((e)=>{
                let value = +e.target.value

                if(!isNaN(e.target.value)  ){
                    if(e.target.value.length >= 2){
                        if( value >= min && value <= max ) {

                            $(`.dropdown-section-month`).focus()

                        }
                        else{
                            e.target.value = max
                        }
                    }
                }
                else{
                    e.target.value = ''
                }
            })

            $(".dropdown-body.dropdown-month").remove()
            $(".dropdown-body.dropdown-year").remove()
        })

        //------------------------------------------------
        
        $(`.dropdown-section-month`).on('focus',(e)=>{

            e.target.select()
            renderMonth()


            let min = +e.target.dataset.min
            let max = +e.target.dataset.max
            

                $(`.dropdown-section-month`).change((e)=>{

                    if(!isNaN(e.target.value)){
                    
                        if(e.target.value.length == 1 && e.target.value < 10 ){
                        
                        let input = e.target
                        let value = ("0"+e.target.value).slice(-2)
                        
                        input.value = value
                        input.setAttribute('value',value)
                        }
                    
                    }else{
                      e.target.value = ''
                    }
                
                })
            
                $(`.dropdown-section-month`).keyup((e)=>{

                    let value = +e.target.value

                    if(!isNaN(e.target.value)  ){
                        if(e.target.value.length >= 2){
                            if( value >= min && value <= max ) {
    
                                $(`.dropdown-section-year`).focus()
    
                            }
                            else{
                                e.target.value = max
                            }
                        }
                    }
                    else{
                        e.target.value = ''
                    }
                })

            $(".dropdown-body.dropdown-date").remove()
            $(".dropdown-body.dropdown-year").remove()
        })

        //------------------------------------------------


        $(`.dropdown-section-year`).on('focus',(e)=>{

            e.target.select()
            renderYear()

            let min = +e.target.dataset.min
            let max = +e.target.dataset.max

            $(`.dropdown-section-year`).keyup((e)=>{

                let value = +e.target.value

                if(!isNaN(e.target.value)  ){
                    if(e.target.value.length >= 4){
                        if( value >= min && value <= max ) {

                            $(".dropdown-body.dropdown-year").remove()
                            $(`.dropdown-section-year`).blur()

                        }
                        else{
                            e.target.value = max
                            
                            $(".dropdown-body.dropdown-year").remove()
                            $(`.dropdown-section-year`).blur()
                        }
                    }
                }
                else{
                    e.target.value = ''
                }
            })

        
                $(".dropdown-body.dropdown-date").remove()
                $(".dropdown-body.dropdown-month").remove()

            })


            
        })
        
    }
    

    $(".datepicker.dropdown").Calendar('dropdown')
