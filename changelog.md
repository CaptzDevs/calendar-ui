# Change LOG
### Bug 
    - slideTo method in year input it's not working properly
    
---------------------------------

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

## - 1.0.0-beta --------------------------------------------------------

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
