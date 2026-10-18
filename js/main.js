(function () {
  var b = document.querySelector(".nav-toggle"),
    n = document.getElementById("nav");
  function set(o) {
    n.classList.toggle("open", o);
    b.setAttribute("aria-expanded", o);
    b.setAttribute("aria-label", o ? "Fechar menu" : "Abrir menu");
  }
  b.addEventListener("click", function () {
    set(!n.classList.contains("open"));
  });
  n.addEventListener("click", function (e) {
    if (e.target.tagName === "A") set(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") set(false);
  });
  var d = document;
  d.documentElement.classList.add("js");
  d.querySelectorAll("[data-from]").forEach(function (i) {
    var s = d.querySelector(i.dataset.from);
    if (s) i.src = s.src;
  });
  var io = new IntersectionObserver(
    function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  d.querySelectorAll(".rv").forEach(function (e) {
    io.observe(e);
  });
  var sp = d.querySelector(".space-wrap"),
    rm = matchMedia("(prefers-reduced-motion:reduce)").matches;
  function pr() {
    var r = sp.getBoundingClientRect();
    sp.style.setProperty(
      "--p",
      rm
        ? 1
        : Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight * 0.9))),
    );
  }
  pr();
  addEventListener("scroll", pr, { passive: true });
  addEventListener("resize", pr);
  var H = {
      0: [["12:00", "16:00"]],
      1: [
        ["11:30", "15:00"],
        ["18:00", "23:00"],
      ],
      2: [
        ["11:30", "15:00"],
        ["18:00", "23:00"],
      ],
      3: [
        ["11:30", "15:00"],
        ["18:00", "23:00"],
      ],
      4: [
        ["11:30", "15:00"],
        ["18:00", "23:00"],
      ],
      5: [
        ["11:30", "15:00"],
        ["18:00", "23:30"],
      ],
      6: [
        ["12:00", "16:00"],
        ["19:00", "23:30"],
      ],
    },
    DN = [
      "domingo",
      "segunda-feira",
      "terça-feira",
      "quarta-feira",
      "quinta-feira",
      "sexta-feira",
      "sábado",
    ],
    fd = d.getElementById("d"),
    ft = d.getElementById("h"),
    fm = d.getElementById("m1"),
    pd = function (n) {
      return (n < 10 ? "0" : "") + n;
    },
    nw = new Date(),
    td =
      nw.getFullYear() + "-" + pd(nw.getMonth() + 1) + "-" + pd(nw.getDate());
  fd.min = td;
  function vh() {
    ft.setCustomValidity("");
    fd.setCustomValidity("");
    fm.textContent = "";
    if (!fd.value) return;
    var dt = new Date(fd.value + "T12:00:00"),
      rg = H[dt.getDay()],
      msg = "";
    if (fd.value < td) {
      msg = "Escolha uma data a partir de hoje.";
      fd.setCustomValidity(msg);
      fm.textContent = "Atenção: " + msg;
      return;
    }
    if (!ft.value) return;
    if (
      !rg.some(function (r) {
        return ft.value >= r[0] && ft.value <= r[1];
      })
    )
      msg =
        "Neste dia (" +
        DN[dt.getDay()] +
        ") atendemos das " +
        rg
          .map(function (r) {
            return r[0] + " às " + r[1];
          })
          .join(" e das ") +
        ".";
    else if (fd.value === td) {
      var n2 = new Date();
      if (ft.value < pd(n2.getHours()) + ":" + pd(n2.getMinutes()))
        msg = "Esse horário de hoje já passou.";
    }
    if (msg) {
      ft.setCustomValidity(msg);
      fm.textContent = "Atenção: " + msg;
    }
  }
  fd.addEventListener("input", vh);
  ft.addEventListener("input", vh);
  d.getElementById("fr").addEventListener("submit", function (e) {
    e.preventDefault();
    var v = function (i) {
        return d.getElementById(i).value.trim();
      },
      dt = v("d").split("-").reverse().join("/"),
      t =
        "Olá! Gostaria de reservar uma mesa no Est! Est!! Est!!!\n\nNome: " +
        v("n") +
        "\nPessoas: " +
        v("p") +
        "\nData: " +
        dt +
        "\nHorário: " +
        v("h") +
        "\n\nPode confirmar a disponibilidade? Obrigado!",
      u = "https://wa.me/553125265852?text=" + encodeURIComponent(t),
      m = d.getElementById("m1");
    m.textContent = "Se o WhatsApp não abrir sozinho, toque no botão: ";
    var a = d.createElement("a");
    a.href = u;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.className = "btn";
    a.style.marginTop = "12px";
    a.textContent = "Enviar pelo WhatsApp";
    m.appendChild(a);
    a.click();
  });
  function G(s) {
    var g = [],
      c;
    s.split("\n").forEach(function (l) {
      if (l[0] === "#") {
        c = { t: l.slice(1), i: [] };
        g.push(c);
      } else if (l) c.i.push(l.split(";"));
    });
    return g;
  }
  function L(g, h) {
    return g
      .map(function (x) {
        var o =
          (x.t
            ? h
              ? '<h3 class="gt">' + x.t + "</h3>"
              : '<p class="gl">' + x.t + "</p>"
            : "") +
          '<ul class="mi">' +
          x.i
            .map(function (p) {
              return (
                "<li><span>" +
                p[0] +
                (p[2] ? "<small>" + p[2] + "</small>" : "") +
                "</span>" +
                (p[1] ? "<b>R$ " + p[1] + "</b>" : "") +
                "</li>"
              );
            })
            .join("") +
          "</ul>";
        return h
          ? '<div class="grp' + (x.t ? "" : " u") + '">' + o + "</div>"
          : o;
      })
      .join("");
  }
  var F = {
    Antipasto: `#
Couvert Est! Est!! Est!!!;34
Carpaccio di Manzo;82
Suppli al Telefono;55
Mix Affettati;76
Burrata;82
Insalata Caprese;68
Calamari Fritti;82
Gamberi in Guazzetto;88
Strangolapreti al Forno;64
Pallotte Cacio e Ova;62
Olive all'Ascolana;68
Formaggio Gratinato su Misticanza;68
Gnocchi alla Romana;58
Polenta con Funghi e Crema di Gorgonzola;78
Bruschetta al Pomodoro;52
Crostini di Parma e Funghi;72
Cestino di Pane;12`,
    "Primo Piatto": `#Pasta Asciutta (massa italiana seca)
Spaghetti alla Carbonara;94
Rigatoni all'Amatriciana;94
Rigatoni alla Zozzona;94
Rigatoni alla Genovese;94
Rigatoni alla Caprese;82
Spaghetti alla Puttanesca;94
Spaghetti alla Pescatora;120
Spaghetti Mare e Monti;120
Spaghetti Aglio, Olio e Peperoncino;76
Penne al Sugo / all'Arrabbiata;76
#Pasta Fresca (massa artesanal Est! Est!! Est!!!)
Linguine Gamberetti e Zucchine;108
Tagliatelle alla Chitarra Gamberi e Pomodorini;118
Cavatelli al Polipo;128
Cavatelli Salsiccia e Zafferano;98
Maltagliati ai Funghi;88
Tagliatelle alla Chitarra Quattro Formaggi;94
Tagliatelle alla Chitarra alla Bolognese;88
Garganelli alla Boscaiola;98
#Pasta Ripiena (massa recheada artesanal Est! Est!! Est!!!)
Ravioli di Ricotta e Spinaci al Sugo / al Burro;82
Plin di Salmone e Mascarpone al Limone;98
Fagottini di Zucca al Burro, Salvia e Noci;92
Casoncelli al Gorgonzola;92
Cappelletti al Pomodoro / al Brodo;82
Agnolotti di Parma;98
#Lasagna e Gnocchi
Gnocchi;;Nhoque de batata. Verificar molhos disponíveis e valores.
Lasagna alla Bolognese;88
Melanzane alla Parmigiana;82
#Risotto
Risotto alla Milanese;140
Risotto alla Norma Affumicato;92
Risotto all'Isolana;98
Risotto ai Frutti di Mare;120
Risotto Limone e Gamberetti;120
Risotto Zucca e Zola;92
Risotto ai Funghi;92
Risotto Salsiccia e Funghi;98`,
    "Secondo Piatto": `#
Straccetti al Gorgonzola;108
Galetto alla Diavola;98
Saltimbocca alla Romana;118
Scaloppine al Limone;108
Tagliata di Filetto ai Trifolati;118
Salmone al Forno;118
Baccalà alla Napoletana;164
Sogliola all'Acqua Pazza;98
Cotoletta alla Valdostana;98
Brasato di Maiale;106`,
    Dolce: `#
Semifreddo di Pistacchio;38
Pannacotta;28
Tiramisù;32
Salame di Cioccolato;32
Cannolo Siciliano;30`,
  };
  var B = `#Soft Drink
Coca-Cola, Coca-Cola Zero, Guaraná, Guaraná Zero, Tônica, Tônica Zero (350 ml);10
Red Bull (250 ml);18;Energy Drink · Sugarfree · Tropical · Melancia
#Acqua
Mineral com ou sem gás (300 ml);10
San Pellegrino com gás (750 ml);42
Acqua Panna sem gás (505 ml);28
#Succo
Suco Nobre Colheita (integral) (300 ml);18;Uva Tinto | Uva Branca | Uva Rosé | Tangerina, maçã e acerola | Amora e uva | Mirtilo e uva | Framboesa e uva branca
#Soda Italiana
Xarope Fabbri + água com gás;18;Abacaxi | Cranberry | Framboesa | Gengibre | Granadine | Laranja | Limão-Siciliano | Maçã Verde | Manga | Maracujá | Tangerina | Tropical Blue | Amarena Zero Açúcar | Baunilha Zero Açúcar
#Caffè
Caffè Espresso Illy;13
Caffè Illy Corretto con Grappa;19;Café "corrigido" com grappa
Caffè Illy Corretto con Sambuca;19;Café "corrigido" com Sambuca
#Birra
Paulaner Münchner Hell (500 ml);35
Paulaner Weissbier Dunkel (500 ml);35
Paulaner Weissbier (500 ml);35
Walls Copo Lagoinha (600 ml);24
Verace Pilsen (600 ml);24
Stella Artois Long Neck (330 ml);16
Paulaner Weissbier Zero (500 ml);35;Analcólica | Teor alcoólico: 0%
#Cocktail Alcolici
Spritz Aperol;34;Prosecco, Aperol, laranja
Spritz Campari;34;Prosecco, Campari, laranja
Spritz Cynar;34;Prosecco, Cynar, laranja
Americano;30;Campari, Martini Rosso, tônica
Negroni;34;Gin Gordon's, Martini Rosso, Campari
Negroni Sbagliato;42;Vodka Ketel One, Martini Rosso, Campari
Penicillin;42;Whisky Johnnie Walker Red Label, xarope Fabbri de Gengibre, suco de limão e toque de Whisky Johnnie Walker Double Black
Dry Martini;42;Gin Gordon's, Martini Dry, azeitona
Manhattan;46;Bourbon Bulleit, Martini Rosso, Angostura
Caipirinha Italiana;38;Grappa, limão-siciliano, açúcar
Caipirinha;30;Cachaça, limão, açúcar
Caipivodka;44;Vodka Ketel One, limão, açúcar
Gin Tonica Tanqueray;44;Gin Tanqueray London Dry, tônica, limão
Gin Tonica Royale;44;Gin Tanqueray Royale, tônica, limão
Gin Limoncello;42;Limoncello Est!, Gin Gordon's, xarope Fabbri mojito, água com gás, suco de limão
Singleton Té;44;Whisky Singleton, chá de pêssego, tônica, laranja
Johnnie Blonde Citrus;36;Whisky Johnnie Walker Blonde, refrigerante Citrus, suco de limão
Tropical Gin;46;Gin Gordon's, Red Bull Tropical e laranja
Melancita Gin;44;Gin Gordon's, Red Bull Melancia, limão e hortelã
#Cocktail Analcolici
Apple;26;Xarope Fabbri de maçã verde, suco de maçã integral e limão
Twist Energy Drink;36;Red Bull Energy Drink, suco de limão, xarope Fabbri de maçã verde, hortelã e água com gás
Twist Amarena;36;Red Bull Sugarfree, suco de limão, xarope Fabbri sem açúcar de Amarena, hortelã e água com gás
Twist Baunilha;36;Red Bull Sugarfree, suco de limão, xarope Fabbri sem açúcar de Baunilha, hortelã e água com gás
#Super Alcolici
Vodka Absolut;22
Vodka Ketel One;29
Vodka Belvedere Pure;29
Vodka Ciroc;29
Vodka Roberto Cavalli;34
Aguardente Gouveia Brasil;27
Aguardente Seleta;10
Aguardente Germana;16
Whisky Ballantine's 8 Anos;18
Whisky Ballantine's 17 Anos;59
Whisky J. Walker Black Label 12 Anos;27
Whisky J. Walker Double Black 12 Anos;32
Whisky J. Walker Gold Reserve 18 Anos;42
Whisky Chivas 12 Anos;22
Whisky Jameson 8 Anos;20
Whisky Old Parr 12 Anos;22
Whisky Dimple 15 Anos;58
Whisky Buchanan's 18 Anos;68
Whisky Single Malt Singleton 12 Anos;32
Bourbon Bulleit;32
Tennessee Whiskey Jack Daniel's;20
Tennessee Whiskey Gentleman Jack;26
#Grappa
Grappa Selezione Cuore Piave;32
Grappa Castagner Fuoriclassi Bianca;29
Grappa Castagner Fuoriclassi Barrique;39
Grappa Quaglia Classica Finissima;28
Grappa Francoli 12 Secca;30
Grappa Nobiluvae Moscato;37
Grappa Bottega Morbida;37
Grappa Bottega Barricata;43
Grappa Berta Villa Prato Invecchiata;41
Grappa Tenuta degli Dei;55
Grappa Berta Unica;64
#Aperitivi ed Amari Classici Italiani
Aperitivo Aperol;14
Aperitivo Campari;14
Aperitivo Punt e Mes;34
Aperitivo Martini;14
Aperitivo Cynar;14
Amaro Ramazzotti;22
Amaro Fernet-Branca;34
Amaro Nerone "L'Amaro di Romano";28
Amaro Lucano;32
Amaro Averna Siciliano;28
Amaro Grappamaro Lucano;32
#Liquori Classici Italiani
Liquore Amaretto Dell'Orso;20
Liquore Frangelico;32
Liquore Limoncello Massa;28
Liquore di Caffè Salvatore Longobardo;32
Liquore Strega;28
Liquore Sambuca;32;servido com grãos de café`;
  var bg = G(B);
  d.getElementById("db").innerHTML = L(bg, 1);
  var I = {
      Antipasto: "images/pratos/antipasto.webp",
      "Primo Piatto": "images/pratos/primo-piatto.webp",
      "Secondo Piatto": "images/pratos/secondo-piatto.webp",
      Dolce: "images/pratos/dolce.webp",
      "Da Bere": "images/pratos/da-bere.webp",
    },
    AL = {
      Antipasto: "Burrata com tomates vermelhos e amarelos e manjericão",
      "Primo Piatto": "Espaguete cremoso com pancetta e queijo",
      "Secondo Piatto": "Saltimbocca com purê de batata e farofa de pão",
      Dolce: "Tiramisù com cacau e chocolate",
      "Da Bere": "Spritz Aperol com gelo e fatia de laranja",
    };
  var S = function (k) {
    return k.toLowerCase().replace(/ /g, "-");
  };
  d.getElementById("mn").innerHTML = Object.keys(F)
    .concat("Da Bere")
    .map(function (k) {
      var q = k === "Da Bere";
      return (
        '<article class="dish rv' +
        (q ? " gl" : "") +
        '">' +
        (q
          ? '<div class="gw"><img class="dr2 gh" src="' +
            I[k] +
            '" alt="" aria-hidden="true" width="378" height="880"><img class="dr2" src="' +
            I[k] +
            '" alt="' +
            AL[k] +
            '" loading="lazy" width="378" height="880"><span class="bb" aria-hidden="true"></span></div>'
          : '<img src="' +
            I[k] +
            '" alt="' +
            AL[k] +
            '" loading="lazy" width="760" height="760">') +
        "<div><h3>" +
        k +
        '</h3><a class="btn" href="#' +
        (q ? "bebidas" : S(k)) +
        '">Ver cardápio</a></div></article>'
      );
    })
    .join("");
  d.querySelectorAll(".dish.rv").forEach(function (e) {
    io.observe(e);
  });
  var RL = "images/pratos/lasagna-reserva.webp";
  var rp = d.querySelector(".rs-plate"),
    sc = d.getElementById("reservas");
  if (rp) {
    rp.src = RL;
    if (!rm) {
      var rs = function () {
        var r = sc.getBoundingClientRect();
        rp.style.rotate =
          ((innerHeight / 2 - r.top) / innerHeight) * -30 + "deg";
      };
      rs();
      addEventListener("scroll", rs, { passive: true });
    }
  }
  var bb = d.querySelector(".bb");
  if (bb)
    for (var i = 0; i < 14; i++) {
      var s = d.createElement("span"),
        z = 2 + Math.random() * 3;
      s.style.cssText =
        "left:" +
        (8 + Math.random() * 82) +
        "%;width:" +
        z +
        "px;height:" +
        z +
        "px;--d:" +
        (3.5 + Math.random() * 3) +
        "s;--l:" +
        (2.6 + Math.random() * 4) +
        "s";
      bb.appendChild(s);
    }
  function rt() {
    var h = location.hash.slice(1),
      P = { bebidas: ["Da Bere", bg] };
    Object.keys(F).forEach(function (k) {
      P[S(k)] = [k, G(F[k])];
    });
    var p = P[h];
    d.body.classList.toggle("dr", !!p);
    if (p) {
      d.getElementById("t-beb").textContent = p[0];
      d.getElementById("db").innerHTML = L(p[1], 1);
      scrollTo(0, 0);
    } else if (h) {
      var t = d.getElementById(h);
      if (t) t.scrollIntoView();
    }
  }
  addEventListener("hashchange", rt);
  rt();
})();
