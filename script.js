const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const container = document.querySelector(".buttons");

let yesScale = 1;
let noScale = 1;

function getDistance(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
}

function moveAndShrinkNo(e) {
    if (e) e.preventDefault();

    const containerRect = container.getBoundingClientRect();
    const yesRect = yesBtn.getBoundingClientRect();

    let x, y;
    let attempts = 0;

    do {
        x = Math.random() * (container.offsetWidth - noBtn.offsetWidth);
        y = Math.random() * (container.offsetHeight - noBtn.offsetHeight);
        attempts++;
    } while (
        getDistance(
            x,
            y,
            yesRect.left - containerRect.left,
            yesRect.top - containerRect.top
        ) < 120 && attempts < 20
    );

    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;

    /* NO se encoge hasta desaparecer */
    noScale -= 0.18;
    if (noScale <= 0.15) {
        noBtn.style.transform = "scale(0)";
        noBtn.style.opacity = "0";
        noBtn.style.pointerEvents = "none";
    } else {
        noBtn.style.transform = `scale(${noScale})`;
    }

    /* SÍ crece fuerte */
    yesScale = Math.min(yesScale + 0.45, 4);
    yesBtn.style.transform = `translateX(-120%) scale(${yesScale})`;
}

/* Desktop */
noBtn.addEventListener("mouseenter", moveAndShrinkNo);

/* Mobile */
noBtn.addEventListener("touchstart", moveAndShrinkNo);

/* Blindar click en NO */
noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    moveAndShrinkNo(e);
});

/* Click en SÍ */
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

                <img src="love.gif" class="gif">
                    width:170px;
                    margin-bottom:30px;
                ">

                <h1 style="color:white;font-size:2.5rem;margin-bottom:15px;">
                    Sabía que dirías que sí 💕
                </h1>

                <p style="color:white;font-size:1.2rem;margin-bottom:25px;">
                    Desde este momento, cada latido tiene tu nombre.
                </p>

                <hr style="border:none;height:1px;background:rgba(255,255,255,0.4);margin:25px 0;">

                <p style="
                    color:white;
                    font-size:1.15rem;
                    font-style:italic;
                    line-height:1.6;
                    margin-top:20px;
                    ">
                        “Podrá nublarse el sol eternamente;<br>
                        podrá secarse en un instante el mar;<br>
                        podrá romperse el eje de la tierra<br>
                        como un débil cristal.<br><br>
                        ¡Todo sucederá! Podrá la muerte<br>
                        cubrirme con su fúnebre crespón;<br>
                        pero jamás en mí podrá apagarse<br>
                        la llama de tu amor.”
                        </p>
                    <p style="color:white;font-size:0.9rem;margin-top:15px;opacity:0.85;">
                    — Gustavo Adolfo Bécquer
                    </p>
            </div>
        </div>
    `;
});

