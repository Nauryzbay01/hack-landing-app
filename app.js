
let fullName = document.querySelector("#FIO");
let email = document.querySelector("#email");
let phoneNumber = document.querySelector("#tel");
let subBtn = document.querySelector(".form-btn");
let responsesRadio = document.querySelectorAll(".radio");
let responsesSelect = document.querySelectorAll(".select");
(function () {
    const header = document.querySelector('.header');
    window.onscroll = () => {
        if (header&&window.pageYOffset > 50) {
            header.classList.add('header-sec');
        } else{
            header.classList.remove('header-sec');
        }
    };
  }());
  document.addEventListener("DOMContentLoaded", function () {

    var eventCalllback = function (e) {

        var el = e.target,
        clearVal = el.dataset.phoneClear,
        pattern = el.dataset.phonePattern,
        matrix_def = "+7(___) ___-__-__",
        matrix = pattern ? pattern : matrix_def,
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = e.target.value.replace(/\D/g, "");
        
        if (clearVal !== 'false' && e.type === 'blur') {
            if (val.length < matrix.match(/([\_\d])/g).length) {
                e.target.value = '';
                return;
            }
        }
        if (def.length >= val.length) val = def;
        e.target.value = matrix.replace(/./g, function (a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
        });
    }

    var phone_inputs = document.querySelectorAll('[data-phone-pattern]');
    for (let elem of phone_inputs) {
        for (let ev of ['input', 'blur', 'focus']) {
            elem.addEventListener(ev, eventCalllback);
        }
    }
});



let inputs = document.querySelectorAll(".form_input");

subBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        let fullNameValue = fullName.value;
        let emailValue = email.value;   
        let phoneValue = phoneNumber.value;
        let counter = 0;
        inputs.forEach(elem => {
            if(!elem.value == ""){
                counter++;
            }
        })
        let infoObj = {};
        infoObj.fullName = fullNameValue;
        infoObj.email = emailValue;
        infoObj.phoneNumber = phoneValue;
        
        responsesRadio.forEach(element => {
            if(element.checked){
                if(element.closest('.diplom')){
                    if(element.value == 0){
                        element.value = "";
                    }
                    infoObj.diploma = !!element.value;
                }
                if(element.closest('.major')){
                    if(element.value == 0){
                        element.value = "";
                    }
                    infoObj.majorIT = !!element.value;
                }
                if(element.closest('.programmingParticipation')){
                    if(element.value == 0){
                        element.value = "";
                    }
                    infoObj.programmingParticipation = !!element.value;
                }
            }
            
        });
        responsesSelect.forEach(element => {
                if(element.closest('.experienceProgramming')){
                    infoObj.comExp = element.value;
                }
                if(element.closest('.experienceTimeProgramming')){
                    infoObj.programming = element.value;
                }
                if(element.closest('.stack')){
                    infoObj.stack = element.value;
                }
                if(element.closest('.englishLevel')){
                    infoObj.englishLevel = element.value;
                }
            
        });
        
        if(counter === 3){
            let result = await fetch("http://164.92.192.48:8090/students/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*' ,
            },
            body: JSON.stringify(infoObj),

            })
            let resJson =  result;
            if(result.status === 200){
                alert("Ваша заявка принята")
            }else{
                alert("Заявка не принята, ошибка сервера")
            }
            console.log(resJson)
        }
        else{
            alert("Заполняйте все поля");
        }

        console.log(infoObj)
    })

    


   


        
    


    