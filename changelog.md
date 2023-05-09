# Change LOG
### Bug 
    [Calendar]

### Task 
    - Release v1.0.0
    - make html are same both Full calendar and Static Calendar
    - Add Start with Day
    - Change all sm option to small


## ----------------
## RELEASE 1.0.0@1.2.0-beta.6
## ----------------

## - 1.2.0-beta.6

    Fix -------
    - cover all fucntion 
    - [ calendar dropdown ] cover all class with fuction
    - [ calendar dropdown ] change LANG2 to LANG 
    - [ calendar dropdown ] slideTo method in year input it's not working properly
    - [ calendar dropdown ] hard code for lang option

    Add ------
    - [ calendar dropdown ] add date,month ,year event change in dropdown



## - 1.2.0-beta.5

    Fix -------
    - [ calendar static ]  showing invalid month for month option full,small in mobile 
    - check year type when select date

## - 1.2.0-beta.4

    FIX -------
    - type date by keyboard not working cause no fulldate dataset
    - selectable Conflict with closeOnSelect

    Change -------
    - Day label now is render by array

## - 1.2.0-beta.3

    FIX -------
    - can use startWith option without using showDay option

    REMOVE -------
    - remove day option cause unuse Option
    - remove month option cause duplicate with monthPanel Option
    - remove dayPanel option cause unuse Option

## - 1.2.0-beta.2

    Fix -------
    - opacity of year panel see more clearly
    - [ calendar static ] app crash when use option.yearType = 'BE' cause checkDisableDate()

    Change -------
    - split year and custom amount of year per panael in year panel 


## - 1.2.0-beta.1

    Fix -------
    - value not change when select year and month in calendar type = static
    - value not show the valid year in calendar type = static
    - initDate() is set date in exception date 
    - default date transform to AD is return NaN
    - [ calendar static ] disable auoValue
    - [ calendar static ] month date is change to 01 when select year in section ='my'
    - [ calendar static ] remove year label for section = 'm'

    Add -------
    - New Event dateChange trigger when select date 
    - Add string prototype to event.value of exportValue method noew can use event.value.exportValue(format,separation)
    - Add 2digit export in exportValue() 
    

---------------------------------
## - 1.2.0-beta
    Add -------
    [calendar]
    - static calendar
    - staic date
    - static month
    - static year

    Remove ------
    [calendar]
    - can render date via script

--------------------------------

## - 1.1.0-beta
    Add -------
    [calendar]
    - static calendar
    - can render date via script
    - can export valueText 


    Fix -------
    [calendar]
    - default date is show invalid year in BE yeartype
    - change methode how selected date is highlight 

    [dropdown]
    - month not show in monthinput if input 1 digit  

    Remove -------
    [calendar]
        - factorial function ???
        
--------------------------------
## - 1.0.0-beta 

## - 0.0.4
    Fix -------
    [dropdown]
    - data-month display full month instead numbers in keyup event 

--------------------------------

## - 0.0.3
    Fix -------
    [dropdown]
        - prevent input '0' in date input
        - autofill year to max when enter value digit < 4  
        - check date is valid if invalid output will be null
        - convent onchange date , month , year inputs handler to checkDateValidation()
        - select by dropdown and valueText is undefined

    Remove -------
    [dropdown]
        - unuse parameter

    Add -------
    [dropdown]
        - change Log file
    
---------------------------------

## - 0.0.2
    Fix -------
    [dropdown]
        - close dropdown onclose 
        - check invalid value onpaste value in month input.
    Remove -------
    [dropdown]
        - remove unuse function and condition in onclose dropdown eventlistener.

---------------------------------

## - 0.0.1
    Fix ------- 
    [dropdown]
        - dropdown date event , validate. 
        - dropdown month in option.month = 'number' can render month number.

    Add -------
    [dropdown]
        - dropdown type style
            -dropdown-type-1 -section
            -dropdown-type-2 -combine
            -dropdown-type-3 -big-section


---------------------------------
