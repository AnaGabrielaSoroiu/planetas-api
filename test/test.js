
const http = require("http");
const assert = require("assert");

const BASE_URL = "http://localhost:3000";

function getJSON(path) {
  return new Promise((resolve, reject) => {
    http.get(BASE_URL + path, (res) => {
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => {
        resolve({
          statusCode: res.statusCode,
          body: JSON.parse(data)
        });
      });
    }).on("error", reject);
  });
}

(async () => {
  try {
    console.log("🧪 Test estricto /planetas");

    const esperado = [
      { nombre: "Mercurio", orden: 1, tipo: "Rocoso" },
      { nombre: "Venus", orden: 2, tipo: "Rocoso" },
      { nombre: "Tierra", orden: 3, tipo: "Rocoso" }
    ];

    const res = await getJSON("/planetas");

    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(
      res.body.length,
      esperado.length,
      "❌ Número de planetas incorrecto"
    );

    res.body.forEach((p, i) => {
      const e = esperado[i];

      assert.strictEqual(p.nombre, e.nombre);
      assert.strictEqual(p.orden, e.orden);
      assert.strictEqual(p.tipo, e.tipo);
    });

    console.log("✅ OK (estricto)");
    process.exit(0);

  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
})();
