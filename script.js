const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const container = document.querySelector(".buttons");

let yesScale = 1;
let noScale = 1;

/* Distancia entre botones */
function distance(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
}

/* Mover y encoger NO */
function moveNo(e) {
    if (e) e.preventDefault();

    const containerRect = container.getBoundingClientRect();
    const yesRect = yesBtn.getBoundingClientRect();

    let x, y;
    let tries = 0;

    do {
        x = Math.random() * (containerRect.width - noBtn.offsetWidth);
        y = Math.random() * (containerRect.height - noBtn.offsetHeight);
        tries++;
    } while (
        distance(
            x,
            y,
            yesRect.left - containerRect.left,
            yesRect.top - containerRect.top
        ) < 160 && tries < 30
    );

    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;

    /* Encoger NO */
    noScale -= 0.22;
    if (noScale <= 0.12) {
        noBtn.style.transform = "scale(0)";
        noBtn.style.opacity = "0";
        noBtn.style.pointerEvents = "none";
    } else {
        noBtn.style.transform = `scale(${noScale})`;
    }

    /* Agrandar SÍ fuerte */
    yesScale = Math.min(yesScale + 0.55, 4.5);
    yesBtn.style.transform = `scale(${yesScale})`;
}

/* Eventos */
noBtn.addEventListener("mouseenter", moveNo);
noBtn.addEventListener("touchstart", moveNo);
noBtn.addEventListener("click", moveNo);

/* Click en SÍ */
yesBtn.addEventListener("click", () => {
    document.body.innerHTML = `
        <div style="
            min-height:100vh;
            display:flex;
            justify-content:center;
            align-items:center;
            background:linear-gradient(135deg,#ff9a9e,#fad0c4);
            padding:30px;
        ">
            <div style="
                background:rgba(255,255,255,0.28);
                backdrop-filter:blur(18px);
                border-radius:32px;
                padding:45px 35px;
                max-width:460px;
                width:100%;
                text-align:center;
                box-shadow:0 25px 50px rgba(0,0,0,0.18);
                font-family:'Segoe UI', sans-serif;
            ">

            <img src="love.gif" style="
                width:170px;
                margin-bottom:30px;
            ">


                <h1 style="
                    color:white;
                    font-size:2.4rem;
                    margin-bottom:15px;
                ">
                    Sabía que dirías que sí 💕
                </h1>

                <p style="
                    color:white;
                    font-size:1.15rem;
                    margin-bottom:25px;
                ">
                    Desde este momento, cada latido tiene tu nombre.
                </p>

                <hr style="
                    border:none;
                    height:1px;
                    background:rgba(255,255,255,0.4);
                    margin:25px 0;
                ">

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

                <p style="
                    color:white;
                    font-size:0.9rem;
                    margin-top:15px;
                    opacity:0.85;
                ">
                    — Gustavo Adolfo Bécquer
                </p>
            </div>
        </div>
    `;
});

