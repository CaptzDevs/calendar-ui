class SwitchButton{

    constructor(elem, option = {} ){
        this.elem = elem
        this.switchElem = null
        this.switch = null
        this._id  = (Math.random() + 1).toString(36).substring(2);
        this.state = true

        this.option = {

            textOn : typeof option.textOn !== "undefined" ? option.textOn : 'ON',
            textOff : typeof option.textOff !== "undefined" ? option.textOff : 'OFF',
            iconOn : typeof option.iconOn !== "undefined" ? option.iconOn : 'fa-solid fa-check',
            iconOff : typeof option.iconOff !== "undefined" ? option.iconOff : 'fa-solid fa-xmark',
            
        }

        /* 
        //* textOn
        //* textOff

        //* iconOn
        //* iconOff

         */
        this.render()
    }
    
    turnOn(){

        let switchBody = this.switchElem
        let switchBtn = this.switchElem.children[0]

        let iconOn = this.option.iconOn.split(' ')[1]
        let iconOff = this.option.iconOff.split(' ')[1]
        let icon = $(`.switch[data-id="sw-${this._id}"] #switch-icon`)

        switchBody.dataset.state = 'false'

        switchBody.classList.add("switch-body-off")
        switchBody.classList.remove("switch-body-on")

        switchBtn.classList.add("switch-off")
        switchBtn.classList.remove("switch-on")

        switchBtn.classList.remove("switch-icon-on")
        switchBtn.classList.add("switch-icon-off")

        icon[0].classList.add(iconOff)
        icon[0].classList.remove(iconOn)
        this.state = true

        return true

    }

    turnOff(){
        let switchBody = this.switchElem
        let switchBtn = this.switchElem.children[0]

        let iconOn = this.option.iconOn.split(' ')[1]
        let iconOff = this.option.iconOff.split(' ')[1]
        let icon = $(`.switch[data-id="sw-${this._id}"] #switch-icon`)
        switchBody.dataset.state = 'true'
        switchBody.classList.add("switch-body-on")
        switchBody.classList.remove("switch-body-off")

        switchBtn.classList.add("switch-body-on")
        switchBtn.classList.remove("switch-off")

        switchBtn.classList.remove("switch-icon-off")
        switchBtn.classList.add("switch-icon-on")
        
        icon[0].classList.add(iconOn)
        icon[0].classList.remove(iconOff)

        this.state = false
        return false
    }

    onclick(){

        $(this.switchElem).click((e)=>{

            let switchState = this.switchElem.dataset.state
           
            if(switchState == 'true'){

                    this.turnOn()
            }
            else if(switchState == 'false'){
                    this.turnOff()
            }
        })
    }

 
    render() {
        
        //* Validate data 

        if(this.elem.id.trim().length === 0){
            console.error(new Error(`The input should have an id attribute`))
        
            return 0
        }
        
        //------------------------

        if (this.elem) {
            let state = this.elem.dataset.state
            let checkBodyState = state == 'true' ? 'switch-body-on' : 'switch-body-off'
            let checkiconState = state == 'true' ? 'switch-icon-on' : 'switch-icon-off'

            let switchState = state == 'true' ? 'switch-on' : 'switch-off'

            let iconState = state == "true" ? this.option.iconOn : this.option.iconOff

            let bunttonHtml =
            `<div class="switch ${checkBodyState}" id="${this.elem.id}" data-id="sw-${this._id}" data-state='${state}'>
                <div class="switch-button ${checkiconState} ${switchState}">
                    <i class="${iconState}" id = 'switch-icon'></i>
                </div>
                <label class="switch-label-on">${this.option.textOn}</label>
                <label class="switch-label-off">${this.option.textOff}</label>
                
            </div>`

            this.elem.insertAdjacentHTML('afterend', bunttonHtml)

            this.switchElem = document.querySelector(`.switch[data-id="sw-${this._id}"]`)
            $(this.elem).remove()
            this.onclick()
        }
    }



}

Element.prototype.SwitchButton = function (option) {

    let d

    [this].forEach((item, i) => {
        d =  new SwitchButton(item)
    })

    return d

}

Object.prototype.SwitchButton = function(option) {

    let d

    this.forEach((item,i)=>{
         d =  new SwitchButton(item)
    })
    
    return d
}



document.querySelectorAll('.switch-btn').SwitchButton()
