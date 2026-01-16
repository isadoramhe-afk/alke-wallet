// ---------- DATOS INICIALES ----------
if (!localStorage.getItem("saldo")) {
    localStorage.setItem("saldo", 100000);
}

if (!localStorage.getItem("movimientos")) {
    localStorage.setItem("movimientos", JSON.stringify([]));
}

// ---------- LOGIN ----------
const btnLogin = document.getElementById("btnLogin");

if (btnLogin) {
    btnLogin.addEventListener("click", () => {
        const usuario = document.getElementById("usuario").value;
        const password = document.getElementById("password").value;

        if (usuario === "admin" && password === "1234") {
            window.location.href = "menu.html";
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    });
}

// ---------- DEPOSITO ----------
const btnDepositar = document.getElementById("btnDepositar");

if (btnDepositar) {
    btnDepositar.addEventListener("click", () => {
        const monto = Number(document.getElementById("montoDeposito").value);
        let saldo = Number(localStorage.getItem("saldo"));

        if (monto > 0) {
            saldo += monto;
            localStorage.setItem("saldo", saldo);

            guardarMovimiento("Depósito", monto);
            alert("Depósito realizado");
        }
    });
}

// ---------- ENVIO ----------
const btnEnviar = document.getElementById("btnEnviar");

if (btnEnviar) {
    btnEnviar.addEventListener("click", () => {
        const contacto = document.getElementById("contacto").value;
        const monto = Number(document.getElementById("montoEnvio").value);
        let saldo = Number(localStorage.getItem("saldo"));

        if (monto > 0 && monto <= saldo) {
            saldo -= monto;
            localStorage.setItem("saldo", saldo);

            guardarMovimiento(`Envío a ${contacto}`, -monto);
            alert("Dinero enviado");
        } else {
            alert("Saldo insuficiente");
        }
    });
}

// ---------- MOVIMIENTOS ----------
const tabla = document.getElementById("tablaMovimientos");

if (tabla) {
    const movimientos = JSON.parse(localStorage.getItem("movimientos"));

    movimientos.forEach(mov => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${mov.fecha}</td>
            <td>${mov.descripcion}</td>
            <td>${mov.monto}</td>
        `;

        tabla.appendChild(fila);
    });
}

// ---------- FUNCION ----------
function guardarMovimiento(descripcion, monto) {
    const movimientos = JSON.parse(localStorage.getItem("movimientos"));

    movimientos.push({
        fecha: new Date().toLocaleDateString(),
        descripcion,
        monto
    });

    localStorage.setItem("movimientos", JSON.stringify(movimientos));
}
// ---------- SALDO EN MENU ----------
const saldoMenu = document.getElementById("saldoMenu");

if (saldoMenu) {
    saldoMenu.innerText = "$" + Number(localStorage.getItem("saldo")).toLocaleString();
}
