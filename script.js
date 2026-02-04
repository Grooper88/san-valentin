const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const container = document.querySelector(".buttons");

let yesScale = 1;
let noScale = 1;

/* Distancia entre puntos */
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
        ) < 160 && tries < 40
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

/* Eventos para NO */
noBtn.addEventListener("mouseenter", moveNo);
noBtn.addEventListener("touchstart", moveNo);
noBtn.addEventListener("click", moveNo);

/* CLICK EN SÍ */
yesBtn.addEventListener("click", () => {
    // Limpia todo
    document.body.innerHTML = "";

    // Fondo
    const wrapper = document.createElement("div");
    wrapper.style.cssText = `
        min-height:100vh;
        display:flex;
        justify-content:center;
        align-items:center;
        background:linear-gradient(135deg,#ff9a9e,#fad0c4);
        padding:30px;
    `;

    // Carta (liquid glass)
    const card = document.createElement("div");
    card.style.cssText = `
        background:rgba(255,255,255,0.28);
        backdrop-filter:blur(18px);
        -webkit-backdrop-filter:blur(18px);
        border-radius:32px;
        padding:45px 35px;
        max-width:460px;
        width:100%;
        text-align:center;
        box-shadow:0 25px 50px rgba(0,0,0,0.18);
        font-family:'Segoe UI', sans-serif;
    `;

    // GIF FINAL (clave)
    const img = document.createElement("img");
    img.src = "./love.gif";
    img.alt = "Amor";
    img.style.width = "170px";
    img.style.display = "block";
    img.style.margin = "0 auto 30px auto";

    // Título
    const title = document.createElement("h1");
    title.textContent = "Sabía que dirías que sí 💕";
    title.style.color = "white";
    title.style.fontSize = "2.4rem";
    title.style.marginBottom = "15px";

    // Texto
    const text = document.createElement("p");
    text.textContent = "Desde este momento, cada latido tiene tu nombre.";
    text.style.color = "white";
    text.style.fontSize = "1.15rem";
    text.style.marginBottom = "25px";

    // Separador
    const hr = document.createElement("hr");
    hr.style.border = "none";
    hr.style.height = "1px";
    hr.style.background = "rgba(255,255,255,0.4)";
    hr.style.margin = "25px 0";

    // Poema
    const poem = document.createElement("p");
    poem.innerHTML = `
        “Podrá nublarse el sol eternamente;<br>
        podrá secarse en un instante el mar;<br>
        podrá romperse el eje de la tierra<br>
        como un débil cristal.<br><br>
        ¡Todo sucederá! Podrá la muerte<br>
        cubrirme con su fúnebre crespón;<br>
        pero jamás en mí podrá apagarse<br>
        la llama de tu amor.”
    `;
    poem.style.color = "white";
    poem.style.fontSize = "1.15rem";
    poem.style.fontStyle = "italic";
    poem.style.lineHeight = "1.6";
    poem.style.marginTop = "20px";

    // Autor
    const author = document.createElement("p");
    author.textContent = "— Gustavo Adolfo Bécquer";
    author.style.color = "white";
    author.style.opacity = "0.85";
    author.style.marginTop = "15px";
    author.style.fontSize = "0.9rem";

    // Ensamblar
    card.append(img, title, text, hr, poem, author);
    wrapper.appendChild(card);
    document.body.appendChild(wrapper);
});
