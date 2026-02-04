const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const container = document.querySelector(".buttons");

let yesScale = 1;
let noScale = 1;

function moveAndShrinkNo(e) {
    if (e) e.preventDefault();

    const maxX = container.offsetWidth - noBtn.offsetWidth;
    const maxY = container.offsetHeight - noBtn.offsetHeight;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;

    // NO se encoge hasta desaparecer
    noScale -= 0.15;
    if (noScale <= 0.15) {
        noBtn.style.transform = "scale(0)";
        noBtn.style.opacity = "0";
    } else {
        noBtn.style.transform = `scale(${noScale})`;
    }

    // SÍ crece FUERTE
    yesScale = Math.min(yesScale + 0.4, 4);
    yesBtn.style.transform = `translateX(-120%) scale(${yesScale})`;
}

// Desktop
noBtn.addEventListener("mouseenter", moveAndShrinkNo);

// Mobile
noBtn.addEventListener("touchstart", moveAndShrinkNo);

// Blindar click en NO
noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    moveAndShrinkNo(e);
});

// Click final en SÍ
yesBtn.addEventListener("click", () => {
    document.body.innerHTML = `
        <div style="
            height:100vh;
            display:flex;
            justify-content:center;
            align-items:center;
            background:linear-gradient(135deg,#ff9a9e,#fad0c4);
            padding:30px;
        ">
            <div style="
                background:rgba(255,255,255,0.25);
                backdrop-filter:blur(15px);
                border-radius:30px;
                padding:45px 35px;
                max-width:450px;
                text-align:center;
                box-shadow:0 20px 40px rgba(0,0,0,0.15);
                font-family:'Segoe UI', sans-serif;
            ">
                <h1 style="color:white;font-size:2.6rem;margin-bottom:15px;">
                    Sabía que dirías que sí 💕
                </h1>

                <p style="color:white;font-size:1.2rem;margin-bottom:25px;">
                    Porque cuando dos corazones se eligen,  
                    no hace falta insistir… solo sentir.
                </p>

                <hr style="border:none;height:1px;background:rgba(255,255,255,0.4);margin:25px 0;">

                <p style="
                    color:white;
                    font-size:1.05rem;
                    font-style:italic;
                    line-height:1.6;
                ">
                    “¿Qué es poesía?, dices mientras clavas<br>
                    en mi pupila tu pupila azul.<br>
                    ¡Qué es poesía! ¿Y tú me lo preguntas?<br>
                    Poesía… eres tú.”
                </p>

                <p style="color:white;font-size:0.9rem;margin-top:15px;opacity:0.85;">
                    — Gustavo Adolfo Bécquer
                </p>
            </div>
        </div>
    `;
});
