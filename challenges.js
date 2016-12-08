/* global animal color name1 name2 iFrame animatecss $*/

const challenges = [
  {
    number: 1,
    name: "#1 Bienvenido a 'Hour of Code'!",
    instructions: [
      "En esta aventura, ¡jugaremos con un animal mediante código!",
      "Escoge tu animal, y un color.",
      "<div class='animal-container'><div class='monkey'><span>Monkey</span> <img class='animal' src='assets/monkey.svg' alt='monkey'></div><div class='horse'><span>Horse</span> <img class='animal' src='assets/horse.svg' alt='horse'></div><div class='tiger'><span>Tiger</span> <img class='animal' src='assets/tiger.svg' alt='tiger'></div></div>",
      "<div class='color-container'><div class='red'>Red</div><div class='green'>Green</div><div class='blue'>Blue</div></div>",
      "Crea un animal debajo cambiando <span class='inline-code'>animal</span> y <span class='inline-code'>color</span> a los que quieras, dejando las comillas."
    ],
    seed: {
      code: [
        "<div id='preview-container'>",
        "<link rel='stylesheet' href='preview-style.css'>",
        "<img style='width: 150px; height: 150px' id='img-cont' onerror='this.src=`assets/err.png`'>",
        "<script type='text/javascript'>",
        "var img = document.getElementById('img-cont');var body = document.getElementsByTagName('body')[0];",
        "function createAnimal(animal) {img.src = `assets/${animal.toLowerCase().trim()}.svg`;}",
        "function chooseColor(color) {body.className=color.toLowerCase().trim();}",
        "createAnimal('animal');",
        "chooseColor('color');",
        "",
        "</script>",
        "</div>"
      ],
      hiddenLines: [
        {start: -1, end: 6}, {start: 9, end: 20}
      ]
    },
    tests: [
      {
        test: "$('#preview').contents().find('#img-cont')[0].src.match(/monkey.svg/ig) || $('#preview').contents().find('#img-cont')[0].src.match(/horse.svg/ig) || $('#preview').contents().find('#img-cont')[0].src.match(/tiger.svg/ig)",
        message: "¿Cambiaste el animal a 'monkey', 'horse' o 'tiger'?\n Verifica que no tienes espacios adicionales."
      },
      {
        test: "$('#preview').contents().find('body')[0].className === 'red' || $('#preview').contents().find('body')[0].className === 'green' || $('body').className === 'green' || $('#preview').contents().find('body')[0].className === 'blue'",
        message: "¿Cambiaste el color a 'red', 'green' o 'blue'?"
      }
    ],
    callbacks: [
      () => { animal = /\/(\w+)\.svg/.exec($('#preview').contents().find('#img-cont')[0].src)[1]; },
      () => { color = $('#preview').contents().find('body')[0].className; },
    ]
  },
  {
    number: 2,
    name: "#2 Haciendo amigos",
    instructions: [
      () => `¡Tu animal debe sentirse un poco solo! Puedes crear más animales rápidamente con un ciclo. Este ciclo hace 5 animales.`,
      "<pre class='codeblock'>var num = 1;\n\nwhile (num <= 5) {\n\n   createAnimal('animal');\n\n}</pre>",
      "Intenta jugar con <span class='inline-code'>num = 1</span> y <span class='inline-code'>(num <= 1)</span>!"
    ],
    seed: {
      code: [
        () => `<body class='${color}' style="padding:50px;"><link rel='stylesheet' href='preview-style.css'>`,
        "<style>img { width: 33%; margin: auto; }</style>",
        "<script type='text/javascript'>",
        "var cont = document.body;",
        "function createAnimal(animal) {cont.appendChild(document.createElement('img')); cont.lastElementChild.src = `assets/${animal.toLowerCase()}.svg`; cont.lastElementChild.class = 'animal'}",
        "var num = 1;",
        "",
        "while (num <= 1) {",
        () => `
  createAnimal('${animal}');`,
        "",
        "  num = num + 1;",
        "",
        "}",
        "",
        "</script></body>",
      ],
      hiddenLines: [
        {start: -1, end: 4}, {start: 10, end: 11 }, {start: 14, end: 17}
      ]
    },
    tests: [{
      test: "$('#preview').contents().find('img').length > 1",
      message: "Parece que tu animal sigue un poco solo.\n¿Intentaste modificar el número cerca del ciclo while?"
    }],
    callbacks: []
  },
  {
    number: 3,
    name: "#3 Nombres para Todos",
    instructions: [
      () => `Sabes que, es un poco raro seguirle llamando animal.\nNo sabíamos quién era quien en ese último reto.`,
      "¿Qué tal si le damos un nombre <i>nombre</i> ? Podemos crear variables para guardar información de la siguiente manera:",
      `<pre class='codeblock'>
      var name = "value";</pre>`,
      "Ahora cuando accedamos a <span class='inline-code'>name</span> obtenemos <span class='inline-code'>\"value\"</span>.",
      () => `Cuando queremos cambiar el nombre cambiamos lo que está entre las comillas. Vamos a tratar de nombrar nuestros animales.`
    ],
    seed: {
      code: [
        // div must be put before JS or the DOM won't be available to manipulate
        () => `<body class='${color}'>
          <div><p id="name1"></p><img src="assets/${animal}.svg"></div>
          <div><p id="name2"></p><img src="assets/${animal}.svg"></div>`,
        `<script>`,
        `// Recuerda mantener las comillas para saber que es una palabra
// Sólo tienes que agregar los nombres
`,
        `var name1 = "";`,
        `var name2 = "";`,
        "",
        `if (name1) { document.getElementById("name1").textContent = name1 }; if (name2) { document.getElementById("name2").textContent = name2 }; parent.iFrame = window;`,
        `</script><style>`,
          `body { height: 90%; weight: 99%; display: flex; justify-content: center; align-items: center; }`,
          `img { width: 150px; height: 150px; }`,
          `p { font-size: 20px; font-family: arial; font-weight: bold; text-align: center; margin: 0; }`,
          `.red { background-color: palevioletred; }
          .green { background-color: palegreen; }
          .blue { background-color: paleturquoise; }`,
        `</style></body>`,
      ],
      hiddenLines: [{start: -1, end: 3}, {start: 9, end: 30}]
    },
    tests: [{
      test: "(typeof iFrame.name1 === 'string') && (typeof iFrame.name2 === 'string')",
      message: "¿Agregaste comillas alrededor de tus variables?"
    }, {
      test: "($('#preview').contents().find('#name1')[0].textContent.length > 0) && ($('#preview').contents().find('#name2')[0].textContent.length > 0)",
      message: "¿Estás seguro de que ambos animales tienen nombres?"
    }, {
      test: "$('#preview').contents().find('#name1')[0].textContent !== $('#preview').contents().find('#name2')[0].textContent",
      message: "Asegúrate de que sus nombres son distintos."
    }],
    callbacks: [
      () => { name1 = iFrame.name1; },
      () => { name2 = iFrame.name2; }
    ],
  },
  {
    number: 4,
    name: "#4 ¡Está VIVO!",
    instructions: [
      "Seguro están un poco ansiosos. ¡Vamos a mover un poco las cosas!",
      () => `Para seleccionar un animal: <span class='inline-code'>document.getElementById("name")</span>`,
      `Para hacerlo moverse, añade <span class="inline-code">.animate("animation");</span>`,
      `Sustituye <span class="inline-code">animation</span> con la animación que quieras.`,
      `Aquí hay una lista de animaciones que puedes usar:`,
      `<span class="inline-code">bounce flash pulse rubberBand shake headShake swing tada wobble jello</span>`,
      () => `¡Intenta hacer que tanto <b>${name1}</b> como <b>${name2}</b> se muevan!`
    ],
    seed: {
      code: [
        () => `<body class='${color}'>
          <div><p>${name1}</p><img id="${name1}" src="assets/${animal}.svg" class="animated infinite "></div>
          <div><p>${name2}</p><img id="${name2}" src="assets/${animal}.svg" class="animated infinite "></div><script>var name1 = "${name1}"; var name2 = "${name2}";
            Element.prototype.animate = function(k) {
this.className += k.toLowerCase().trim();
}`,
          "// Recuerda cambiar NAME.",
          "// Puedes escribir el nombre o usar",
          "// las variables name1 and name2 (y borrar las comillas).",
          "",
          `document.getElementById("NAME").animate("ANIMATION");`,
          `document.getElementById("NAME").animate("ANIMATION");`,
          "",
          "",
        `</script><style>`,
          `body { height: 90%; display: flex; justify-content: center; align-items: center; }`,
          `img { width: 150px; height: 150px; text-align: center;}`,
          `p { font-size: 20px; font-family: arial; font-weight: bold; text-align: center; margin: 0; }`,
          `.red { background-color: palevioletred; }
          .green { background-color: palegreen; }
          .blue { background-color: paleturquoise; }
          ${animatecss}`,
        `</style></body>`,
      ],
      hiddenLines: [
        {start: -1, end: 5}, {start: 13, end: 1000}
      ]
    },
    tests: [{
      test: () => $('#preview').contents().find(`#${name1}`)[0].className.match(/animated infinite (\w+)/) && $('#preview').contents().find(`#${name2}`)[0].className.match(/animated infinite (\w+)/),
      message: `¿Cambiaste NAME adecuadamente?`
    }, {
      test: () => $('#preview').contents().find(`#${name1}`)[0].className.match(/animated infinite (\w+)/)
      && $('#preview').contents().find(`#${name2}`)[0].className.match(/animated infinite (\w+)/)
      && animationList.includes($(`#preview`).contents().find(`#${name1}`)[0].className.match(/animated infinite (\w+)/)[1].toLowerCase().trim())
      && animationList.includes($(`#preview`).contents().find(`#${name2}`)[0].className.match(/animated infinite (\w+)/)[1].toLowerCase().trim()),
      message: '¿Usaste una de las animaciones en la lista?'
    }],
    callbacks: [
      () => { ani1 = $('#preview').contents().find(`#${name1}`)[0].className; ani2 = $('#preview').contents().find(`#${name2}`)[0].className; }
    ]
  },
  {
    number: 5,
    name: "#5 Introduciendo bordes",
    instructions: [
      "Ahora que se mueven, deberíamos asegurarnos de que no huyan! Intenta cambiar el <span class='inline-code'>style</span>, <span class='inline-code'>size</span>, y <span class='inline-code'>color</span> del borde hasta que encuentres alguno que te guste. Los estilos son:",
      "<img src='http://www.vanseodesign.com/blog/wp-content/uploads/2011/10/border-styles.png' style='height: 250px;'>",
      "PISTA: <span class='inline-code'>px</span> viene de <span class='inline-code'>pixels</span> una medida de ancho."
    ],
    seed: {
      code: [
        `<style>`,
          `  body {`,
            `    border-style: none;`,
            `    border-width: 0px;`,
            `    border-color: black;`,
          `  }`,
        `</style>`,
        "",
        `<style>body { height: 97%; box-sizing: border-box; }</style>`
      ],
      hiddenLines: [{start: 7, end: 8}]
    },
    tests: [{
      test: () => ($("iframe").contents().find("body").css("border-top-style") !== "none"),
      message: "Escoge un border-style de la imagen que no sea \"none\"."
    }, {
      test: () => (/(\d+)px/g.exec($("iframe").contents().find("body").css("border-top-width"))) && +(/(\d+)px/g.exec($("iframe").contents().find("body").css("border-top-width"))[1]) > 0,
      message: "¿Dejaste 'px' después de tu ancho?"
    }],
    callbacks: [
      () => borderStyle.push($("iframe").contents().find("body").css("border-top-style"), $("iframe").contents().find("body").css("border-top-width"), $("iframe").contents().find("body").css("border-top-color"))
    ],
  },
  {
    number: 6,
    name: "#6 Un Cambio de Imagen",
    instructions: [
      "Probablemente ya estés cansado de ese fondo... ¿Qué tal si usamos una foto?",
      "<img src='assets/terrain.jpg' style='height: 150px;'>",
      () => `¡Cambia <span class='inline-code'>IMAGE</span> por un suelo que le guste a tu animal!`
    ],
    seed: {
      code: [
        "<body id='background'></body>",
        "<script>",
        "Element.prototype.setImage = function(k) {this.style.backgroundImage = 'url(assets/' + k.toLowerCase() + '.jpg)';}",
        "document.getElementById('background').setImage('IMAGE');",
        "</script>",
        () => `<style>body { height: 97%; box-sizing: border-box; background-size: cover; border: ${borderStyle[1]} ${borderStyle[0]} ${borderStyle[2]};}</style>`,
      ],
      hiddenLines: [{start: -1, end: 2}, {start: 3, end: 5}]
    },
    tests: [{
      test: () => {
        const url = $("iframe").contents().find("body").css("background-image").slice(-18).toLowerCase().trim();
        return (url === '/assets/dirt.jpg")') || (url === 'assets/grass.jpg")') || (url === 'assets/stone.jpg")');
      },
      message: "¿Cambiaste IMAGE por uno de los tres tipos: dirt, grass, or stone?\nRecuerda usar el formato en las instrucciones: url('assets/IMAGE.jpg');"
    }],
    callbacks: [
      () => bg = $("iframe").contents().find("body").css("background-image"),
      () => color = (color === "red") ? "palevioletred" : ((color === "green") ? "palegreen" : "paleturquoise")
    ],
  },
  {
    number: 7,
    name: "#7 Making Signs",
    // introduce html element, maybe just <h1></h1>, font-size, color, background-color
    instructions: [
      "Mmm... esto empieza a verse bien. Creo que deberíamos colgar un cartel en algún lado, para que más gente pueda encontrar este lugar. Creo que deberíamos colgar un cartel en algún lado,para que más gente pueda encontrar este lugar.",
      "Vamos a crear un elemento header. Cualquier cosa que escribas entre etiquetas <code class='inline-code'>h1</code> se mostrará como un título.",
      "Hemos agregado algunos estilos más para que los cambies, así que asegúrate de llenarlos. Recuerda que <code class='inline-code'>px</code> es una unidad de medida, así que asegúrate de mantenerla junto a tu font-size."
    ],
    seed: {
      code: [
        `<h1>TITLE</h1>`,
        "",
        `<style>`,
          `  h1 {`,
            () => `    background-color: ${color};`,
            `    font-size: 0px;`,
            `    color: black;`,
          `  }`,
        `</style>`,
        "",
        () => `<style>body { height: 97%; box-sizing: border-box; background-image: ${bg}; background-size: cover; border: ${borderStyle[1]} ${borderStyle[0]} ${borderStyle[2]};}</style>`,
        `<style>h1 { font-family: arial, sans-serif; font-weight: bold; z-index: 3; position: absolute; top: 50px; left: 50%; transform: translateX(-50%); padding: 20px;}</style>`
      ],
      hiddenLines: [{start: 9, end: 14}]
    },
    tests: [{
      test: () => $("iframe").contents().find("h1")[0].textContent.length > 0,
      message: "Asegúrate de haber escrito algo entre las etiquetas h1!"
    }, {
      test: () => +(/(\d+)px/g.exec($("iframe").contents().find("h1").css("font-size"))[1]) > 0,
      message: "¿Especificaste un font-size correcto?"
    }],
    callbacks: [
      () => title.push($("iframe").contents().find("h1")[0].textContent, $("iframe").contents().find("h1").css("font-size"), $("iframe").contents().find("h1").css("background-color"), $("iframe").contents().find("h1").css("color"))
    ],
  },
  {
    number: 8,
    name: "#8 Agreguemos Pacotilla",
    instructions: [
      () => `Puesto que estamos casi en Navidad deberíamos decorar un poco el lugar.`,
      "<img src='assets/presents.jpg' style='margin: -15px 0 -10px 0; height: 300px;'>",
      `Hora de usar etiquetas <code class='inline-code'>img</code>. Cambia el código justo antes de <code class='inline-code'>.png</code> para seleccionar tu regalo.
      Esta vez también tenemos que darles <code class='inline-code'>id</code>s.`
    ],
    seed: {
      code: [
        `<!-- Los IDs deberían ser todos distintos`,
        `     Intenta hacer al menos dos regalos! -->`,
        "",
          `<img src='assets/p0.png' id='present1'
                     onerror='this.src="assets/err.png"'>`,
          `<img src='assets/p0.png' id='present1'
                     onerror='this.src="assets/err.png"'>`,
            "",
        () => `<style>img { height: 100px; } body { display: flex; justify-content: center; align-items: center; flex-wrap: wrap; height: 97%; box-sizing: border-box; background-image: ${bg}; background-size: cover; border: ${borderStyle[1]} ${borderStyle[0]} ${borderStyle[2]};}</style>`,
        () => `<h1>${title[0]}</h1><style>h1 { font-size: ${title[1]}; background-color: ${title[2]}; color: ${title[3]}; font-family: arial, sans-serif; font-weight: bold; z-index: 3; position: absolute; top: 50px; left: 50%; transform: translateX(-50%); padding: 20px; }</style>`
      ],
      hiddenLines: [{start: 7, end: 20}]
    },
    tests: [{
      test: () => {
        presents = [];
        var valid = 0;
        const arr = $("iframe").contents().find("img");
        const pres = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9"];
        for (var i = 0; i < arr.length; i++) {
          if (pres.includes(arr[i].src.slice(-6, -4).toLowerCase())) {
            presents.push(arr[i].src);
            valid++;
          }
          if (i === arr.length - 1)
          return (valid >= 2);
        }
      },
      message: "No pareces tener al menos dos imágenes válidas. Verifica tu src."
    }, {
      test: () => {
        ids = [];
        var valid = 0;
        const arr = $("iframe").contents().find("img");
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].id && !ids.includes(arr[i].id)) {
                ids.push(arr[i].id);
                valid++;
            }
            if (i === arr.length - 1)
                return (valid >= 2);
            }
        },
      message: "Necesitas al menos dos ids únicos.\nCada regalo debería tener un id distinto."
    }, {
      test: () => presents.length === ids.length,
      message: "El número de regalos no es el mismo que el número de ids únicos."
    }],
    callbacks: []
  },
  {
    number: 9,
    name: "#9 ¡Hala y empuja!",
    instructions: [
      "Es aburrido tenerlo todo apretado así en el centro. Vamos a reubicar las decoraciones.",
      `Aquí es donde los IDs se vuelven importantes. Vamos a usarlos para mover un poco los elementos.`,
      `Puedes agregar las propiedades <code class='inline-code'>top</code>, <code class='inline-code'>bottom</code>, <code class='inline-code'>left</code>, o <code class='inline-code'>right</code>.`,
      `Por ejemplo:`,
      `<pre class='codeblock'>#id {
            top: 50px;
            right: 20%;
      }</pre>
      Recuerda que puedes usar px como unidades.`
    ],
    seed: {
      code: ()  => {
            var p = presents, id = ids;
            var result = [`<style>`, ""];
            for (var i = 0; i < id.length; i++) {
                result.push(`#${id[i]} {`, "", `}`, "")
            }
            result.push("</style>", '',
            `<style>
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      height: 97%;
      box-sizing: border-box;
      background-image: ${bg};
      background-size: cover;
      border: ${borderStyle[1]} ${borderStyle[0]} ${borderStyle[2]};
    }
    img {
      position: absolute;
      height: 100px;
    }
  </style>`,
            `
<h1>${title[0]}</h1>

<style>
  h1 {
    font-size: ${title[1]};
    background-color: ${title[2]};
    color: ${title[3]};
    font-family: arial, sans-serif;
    font-weight: bold;
    z-index: 3;
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    padding: 20px;
  }

  .animated {
    width: 150px;
    height: 150px;
  }

  p {
     font-size: 20px;
     font-family: arial;
     font-weight: bold;
     text-align: center;
     margin: 0;
   }
</style>
`);
      for (var i = 0; i < p.length; i++) {
          result.push(`<img src="${p[i]}" id="${id[i]}" onerror='this.src="assets/err.png"'>`);
      }
      result.push('', `<img src='assets/p1.png' id='ref' style='opacity:0'>`);
      return result;
      },
      hiddenLines: () => [{start: (presents.length * 5), end: 500}]
    },
    tests: [{
      test: () => {
        var top = false, bot = false, left = false, right = false;
        var topref = $("iframe").contents().find(`#ref`).css("top");
        var botref = $("iframe").contents().find(`#ref`).css("bottom");
        var leftref = $("iframe").contents().find(`#ref`).css("left");
        var rightref = $("iframe").contents().find(`#ref`).css("right");
        var pass = true;
        for (var i = 0; i < presents.length; i++) {
          top = $("iframe").contents().find(`#${ids[i]}`).css("top");
          bot = $("iframe").contents().find(`#${ids[i]}`).css("bottom");
          left = $("iframe").contents().find(`#${ids[i]}`).css("left");
          right = $("iframe").contents().find(`#${ids[i]}`).css("right");
          if ((top === topref) && (bot === botref) && (left === leftref) && (right === rightref)) {
            pass = false;
          }
       }
       return pass;
      },
      message: "Intenta mover cada caja con top, bottom, left o right."
    }, ],
    callbacks: [
      () => ed = $('.CodeMirror')[0].CodeMirror.getValue()
    ],
  },
  {
    number: 10,
    name: "#10 La Gran Revelación",
    instructions: [
      "¡Mira quiénes han vuelto! Supongo que los regalos sirvieron para atraerlos de vuelta. Creo que hemos terminado con la decoración, pero tu aventura no tiene por qué terminar aquí. ",
      "Hay montones de recursos acerca de etiquetas HTML y estilos CSS si esto te pareció divertido. Por ejemplo, puedes visitar FreeCodeCamp, Codecademy, Khan Academy, o preguntar a tus mentores!",
      "",
      `Puedes jugar un poco más con el de abajo. Sólo asegúrate de mantener el código CSS entre las etiquetas <code class="inline-code">style</code> y el Javascript entre etiquetas <code class="inline-code">script</code>.`
    ],
    seed: {
      code: [
        `<style>${animatecss}</style>`,
        () => `
<div style="position: absolute; left: 50%;
            transform: translate(-100%, -25%);">
  <p>${name1}</p>
  <img id="${name1}" src="assets/${animal}.svg"
       style="position: static; height: 150px;"
       class="${ani1}">
 </div>`,
        () => `
<div style="position: absolute; left: 50%;
            transform: translate(0, -25%);">
  <p>${name2}</p>
  <img id="${name2}" src="assets/${animal}.svg"
       style="position: static; height: 150px;"
       class="${ani2}">
</div>
        `,
        () => ed
      ],
      hiddenLines: [{start: -1, end: 670}
      ]
    },
  }
  // so on ...
];
