//@ts-nocheck
//burger
const burger = document.querySelector("#burger");
const mobile_nav = document.querySelector(".mobile_nav");

burger.addEventListener("click", () => {
    burger.classList.contains("burger--closed")
    ?
    nav("closed")
    :
    nav("open")
});

function nav(condition) {
    if (condition == "open") {
        mobile_nav.classList.add("nav--closed");
        mobile_nav.classList.remove("nav--opened");

        burger.classList.add("burger--closed");
        burger.classList.remove("burger--opened");
    }
    else {
        mobile_nav.classList.add("nav--opened");
        mobile_nav.classList.remove("nav--closed");

        burger.classList.add("burger--opened");
        burger.classList.remove("burger--closed");
    }
}


//phone
function mask(input) {
    input.addEventListener("mouseover", () => {
        input.placeholder = "+7 (___) ___-__-__"
    })
    
    input.addEventListener("mouseout", () => {
        input.placeholder = "Телефон*"
    })
    
    const prefixNumber = (str) => {
        if (str === "7") {
          return "7 (";
        }
        if (str === "8") {
          return "7 (";
        }
        if (str === "9") {
          return "7 (9";
        }
        return "7 (";
    };
    
    input.addEventListener("input", (e) => {
        const value = input.value.replace(/\D+/g, "");
        const numberLength = 11;
      
        let result;
        if (input.value.includes("+8") || input.value[0] === "8") {
          result = "";
        } else {
          result = "+";
        }
      
        //
        for (let i = 0; i < value.length && i < numberLength; i++) {
          switch (i) {
            case 0:
              result += prefixNumber(value[i]);
              continue;
            case 4:
              result += ") ";
              break;
            case 7:
              result += "-";
              break;
            case 9:
              result += "-";
              break;
            default:
              break;
          }
          result += value[i];
        }
        //
        input.value = result;
    });
    
    input.addEventListener("keyup", (e) => {
        if (e.key === "Backspace" || e.key === "Delete") {
            if (input.value === "+7 (" || input.value === "+") {
                input.value = "";
            }
        }
    })
}
const phone_input = document.querySelector("#phone")
const pop_input = document.querySelector("#pop_phone")
mask(phone_input);
mask(pop_input);

//counter
const stats = document.querySelector(".stats");
const calc_start = (widht) => {
    if (widht < 900) { 
        return stats.offsetTop - 230
    }
    return stats.offsetTop - 600
}


const age = document.querySelector("#age");
const clients = document.querySelector("#clients");
const systems = document.querySelector("#systems");
const start_anim_height = calc_start(window.innerWidth);
let showed = false


const age_Count = new CountUp('age', 0, 12, 0, 2)
const clients_Count = new CountUp('clients', 0, 600, 0, 2)
const systems_Count = new CountUp('systems', 0, 950, 0, 2)

window.addEventListener("scroll", (e) => {
    if (window.scrollY >= start_anim_height) {
        if (!showed) {
            showed = true;
            age_Count.start();
            clients_Count.start();
            systems_Count.start();
        }
    }
})



//certificates and pop-up
function toggle(classname, on) {
    if (on) {
        document.querySelector(classname).classList.remove("sert_overlay_closed");
        document.querySelector(classname).classList.add("sert_overlay_opened");
    }
    else {
        document.querySelector(classname).classList.remove("sert_overlay_opened");
        document.querySelector(classname).classList.add("sert_overlay_closed");
    }
}

function toggle_overlay(on) {
    if (on) {
        document.querySelector(".overlay").classList.remove("hide_overlay");
        document.querySelector(".overlay").classList.add("show_overlay");
    }
    else {
        document.querySelector(".overlay").classList.remove("show_overlay");
        document.querySelector(".overlay").classList.add("hide_overlay");
    }
}

function toggle_pop(on) {
    toggle_overlay(on)
    show_pop(on)
}

function show(element, on) {
    if (on) {
        element.classList.add("scaled");
    }
    else {
        element.classList.remove("scaled");
    }
}

function show_pop(on) {
    if (on) {
        document.querySelector(".pop_form").classList.remove("hide_pop");
        document.querySelector(".pop_form").classList.add("show_pop");
    }
    else {
        document.querySelector(".pop_form").classList.remove("show_pop");
        document.querySelector(".pop_form").classList.add("hide_pop");
    }
}

const sertificates = document.querySelectorAll(".sertificate")
for(let i = 0; i < sertificates.length; i++) {
    sertificates[i].addEventListener("mouseover", () => {
        toggle(`.over${i+1}`, true);
    })
    sertificates[i].addEventListener("mouseout", () => {
        toggle(`.over${i+1}`, false);
    })

    sertificates[i].addEventListener("click", () => {
        console.log(sertificates[i].childNodes[3])
        show(sertificates[i].childNodes[3], true)
        toggle_overlay(true)
    })
}

document.querySelector(".overlay").addEventListener("click", () => {
    document.querySelector(".scaled")
    ? 
    show(document.querySelector(".scaled"), false)
    :
    show_pop(false)
    toggle_overlay(false)
});

document.querySelector(".close_icon").addEventListener("click", () => {
    toggle_pop(false)
})

//карта
ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [55.150844, 61.385827],
            zoom: 16.5
        }, {
            searchControlProvider: 'yandex#search'
        }),

        myPlacemark = new ymaps.Placemark(myMap.getCenter());

    myMap.geoObjects.add(myPlacemark)
});

//form send
function sendemail(data) {
    const message = `Пришла новая заявка с сайта:<br>Имя - ${data.name || "Не указано"}<br>Телефон - ${data.phone || "Не указано"}<br>Комментарий - ${data.message || "Отсутствует"}`
    
    const SecureToken = "14a5a4b8-0388-4708-be77-5a62bb2a3c3b"
    const To = "sib-alpiks@sib-alpiks.ru"
    const From = "sib-alpiks@sib-alpiks.ru"
    const Subject = "Новая Заявка"

    
    Email.send({SecureToken, To, From, Subject, Body: message})
    .then(message => {
        console.log(message);
    })
}

const forms = document.querySelectorAll("form");
forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formdata = new FormData(form);
        const phone = formdata.get("phone");
        let data = { phone };
        if (form.id == "main_form") {
            const name = formdata.get("name");
            const message = formdata.get("message");
            data.name = name;
            data.message = message;
        }


        document.querySelector(".pop_main-form").innerHTML = "<h3>Спасибо за обращение!<br> Мы обработаем его в ближайшее время.</h3>"
        const submitButton = document.querySelector("button[type='submit']")
        submitButton.innerText = "Спасибо!";
        submitButton.disabled = true;

        sendemail(data);
        console.log(data);
    })
})