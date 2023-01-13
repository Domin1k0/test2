const THUMBNAILS = document.querySelectorAll(".thumbnail img");
const POPUP = document.querySelector(".popup");
const POPUP_CLOSE = document.querySelector(".popup__close");
const POPUP_IMG = document.querySelector(".popup__img");
const ARROW_LEFT = document.querySelector(".popup__arrow--left");
const ARROW_RIGHT = document.querySelector(".popup__arrow--right");

let currentImgIndex;

const showNextImg = () => {
    if(currentImgIndex === THUMBNAILS.length - 1) {      //dlugosc indeksu tablicy!!!
        currentImgIndex = 0
    } else {
        currentImgIndex = currentImgIndex + 1;
    }
    POPUP_IMG.src = THUMBNAILS[currentImgIndex].src;
}

const showPreviousImg = () => {
    if(currentImgIndex === 0) {      //dlugosc indeksu tablicy!!!
        currentImgIndex = THUMBNAILS.length - 1
    } else {
        currentImgIndex = currentImgIndex - 1;
    }
    POPUP_IMG.src = THUMBNAILS[currentImgIndex].src;
}

const closePopup = () =>{
    POPUP.classList.add("fade-out");
    setTimeout(()=>{
        POPUP.classList.add("hidden");
        POPUP.classList.remove("fade-out");
        THUMBNAILS.forEach(element => {
            element.setAttribute("tabindex", 1);
        });
    }, 300);
    
}

THUMBNAILS.forEach((thumbnail, index) => {
    const showPopup = (e) => {
        POPUP.classList.remove("hidden");
        POPUP_IMG.src = e.target.src;
        currentImgIndex = index;
        //alert(currentImgIndex);                        popup z indexem obrazka
        THUMBNAILS.forEach(element => {
            element.setAttribute("tabindex", -1);
        });
    };

    thumbnail.addEventListener ("click", showPopup);

    thumbnail.addEventListener("keydown", (e) =>{
        if (e.code === "Enter" || e.keyCode === 13){
            showPopup(e);                           // ewent z enterem :>
        }
    })
});

POPUP_CLOSE.addEventListener("click", closePopup);

ARROW_RIGHT.addEventListener("click", showNextImg);

ARROW_LEFT.addEventListener("click", showPreviousImg);

//klawiatura prawo i lewo i zamykanie popup

document.addEventListener("keydown", (e) =>{
    if(!POPUP.classList.contains("hidden")){         //CZY POPUP JEST OTWARTY  
        if (e.code === "ArrowRight" || e.keyCode === 39){  // dwie wartosci z konsoli
            showNextImg();
        }

        if(e.code === "ArrowLeft" || e.keyCode === 37){
            showPreviousImg();
        }

        if(e.code === "Escape" || e.keyCode === 27){
            closePopup();
        }
    }
});

POPUP.addEventListener("click", (e)=>{          //klikanie wylaczania popupa po kliknieciu w tlo
    if (e.target === POPUP) {
        closePopup();
    }
})
