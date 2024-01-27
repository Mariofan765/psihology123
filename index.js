$(document).ready(function() {

    const cardsContainer = $(document).find('#cards-container');
    const cards = $(document).find('.card')
    const menu = $(document).find('#menu')
    let slider = document.getElementById("myRange");
    let output = document.getElementById("demo");
    output.innerHTML = slider.value + "%";

    slider.oninput = function() {
        output.innerHTML = this.value + "%";
    }

    cards.each((i, card) => {
        $(card).click(() => {
            $(card).html() === "kpt" ? toggleMenu(menu) : null;
        })
    })
    $(document).find('.back').click(function () {
        console.log(this)
        visibleCardsContainer()
        let btns = $(menu).find('div').find('button')
        btns.each((i, el) => {
            $(el).off('click')
        })
    })

    function toggleMenu(item) {
        visibleCardsContainer()
        $('html, body').animate({
            scrollTop: $(item).offset().top
        }, 100)

        let btns = $(item).find('div').find('button')
        btns.each((i, el) => {
            $(el).click(() => {
                switch (i) {
                    case 0: openTextBlock(item)
                        break
                    case 1: openTableBlock(item)
                        break
                    case 2: openDnevnik(item)
                        break

                }
            })
        })
    }
    function openTextBlock(item) {
        $(item).find("div").find("button").each((i, item) => {
            $(item).toggleClass("d-flex")
            $(item).toggleClass("d-none")
        })
        $(document).find('#text-block').toggleClass("d-flex")
        $(document).find('#text-block').toggleClass("d-none")

        $(document).find('#text-block').find(".exit").click(() => {
            $(document).find('#text-block').toggleClass("d-flex")
            $(document).find('#text-block').toggleClass("d-none")
            $(item).find("div").find("button").each((i, item) => {
                $(item).toggleClass("d-flex")
                $(item).toggleClass("d-none")
            })
            $(document).find('#text-block').find("button").off("click")
        })
    }

    function openTableBlock(item) {
        $(item).find("div").find("button").each((i, item) => {
            $(item).toggleClass("d-flex")
            $(item).toggleClass("d-none")
        })
        $(document).find('#table-block').toggleClass("d-flex")
        $(document).find('#table-block').toggleClass("d-none")

        $(document).find('#table-block').find(".exit").click(() => {
            $(document).find('#table-block').toggleClass("d-flex")
            $(document).find('#table-block').toggleClass("d-none")
            $(item).find("div").find("button").each((i, item) => {
                $(item).toggleClass("d-flex")
                $(item).toggleClass("d-none")
            })
            $(document).find('#table-block').find("button").off("click")
        })

    }

    function openDnevnik(item) {
        $(item).find("div").find("button").each((i, item) => {
            $(item).toggleClass("d-flex")
            $(item).toggleClass("d-none")
        })
        $(document).find('#dnevnik-block').toggleClass("d-flex")
        $(document).find('#dnevnik-block').toggleClass("d-none")

        $(document).find('#dnevnik-block').find(".exit").click(() => {
            $(document).find('#dnevnik-block').toggleClass("d-flex")
            $(document).find('#dnevnik-block').toggleClass("d-none")
            $(item).find("div").find("button").each((i, item) => {
                $(item).toggleClass("d-flex")
                $(item).toggleClass("d-none")
            })
            $(document).find('#dnevnik-block').find("button").off("click")
        })

    }

    //write logAndReg system with admin and user permissions

    function visibleCardsContainer() {
        if(cardsContainer.css('opacity') > 0) {
            $(cardsContainer).animate({
                opacity: 0
            }, 300, function() {
                cardsContainer.toggleClass("d-flex");
                cardsContainer.toggleClass("d-none");

                menu.toggleClass("opacity-0");
                menu.toggleClass("d-none");
                menu.toggleClass("d-flex");
            })
        } else {
            cardsContainer.toggleClass("d-flex");
            cardsContainer.toggleClass("d-none");
            menu.toggleClass("d-flex")
            menu.toggleClass("d-none")
            menu.toggleClass("opacity-0")
            $(cardsContainer).animate({
                opacity: 1
            }, 500)
        }
    }


    $('.modal-footer').click(() => {
        let newCaption = {
            date: '',
            situation: '',
            mind: '',
            emotion: '',
            strong: '',
            idUser: '',
        }

        $('#newMind').find('input').each((i, item) => {
            switch (i) {
                case 0: newCaption.date = $(item).val()
                    break;
                case 1: newCaption.date = newCaption.date + ' ' + $(item).val()
                    break;
                case 2: newCaption.situation = $(item).val()
                    break;
                case 3: newCaption.mind = $(item).val()
                    break;
                case 4: newCaption.emotion = $(item).val()
                    break
                case 5: newCaption.strong = $(item).val()
            }
            $(item).val('')
        })
        fetch("http://psihology.tplinkdns.com:8080/hello", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCaption),
        })
    })

    $("#registerForm").on('submit', function(e){
        e.preventDefault();
    });

    $("#loginForm").on('submit', function(e){
        e.preventDefault();
    });

    let database = {};

    // Register
    $('#registerForm').on('submit', function(e) {
        e.preventDefault();
        let username = $('#regUsername').val();
        let password = $('#regPassword').val();
        let user = {
            username: username,
            password: password
        }
        $("#registerModal").modal('hide');

        fetch('http://psihology.tplinkdns.com:8080/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
    });

    // Login
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        let username = $('#loginUsername').val();
        let password = $('#loginPassword').val();
        let user = {
            username: username,
            password: password
        }
        $("#loginModal").modal('hide');

        fetch('http://psihology.tplinkdns.com:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
    });

    fetch("http://psihology.tplinkdns.com:8080/suggetions", {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            $(data.suggetions).each((i, item) => {
                $('#suggestions').append(`<option value=${item.suggetion}>`)
                console.log(item.suggetion)
            })
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

    function xui () {
        fetch("htpps//bd").then(res => res.json())
            .then(data => data.size)
        for(let i =0; i < 4; i++) {
            createNewMainBlockWithConent()
        }
    }

})
