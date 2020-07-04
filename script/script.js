let arrComputers = [];
let allDevice;
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.key("saveArr") === "saveArr") {
    let x = JSON.parse(localStorage.getItem("saveArr"));
    for (let i = 0; i < x.length; i++) {
      if (x[i].typeDevice === "pc") {
        allDevice = new Computer(
          x[i].typeDevice,
          x[i].year,
          x[i].processor,
          x[i].typeRam,
          x[i].os,
          x[i].typeRom,
          x[i].graphicsСard,
          x[i].powerSupply,
          x[i].monitor,
          x[i].keyboard
        );
        arrComputers.push(allDevice);
      } else {
        allDevice = new Laptop(
          x[i].typeDevice,
          x[i].year,
          x[i].processor,
          x[i].typeRam,
          x[i].os,
          x[i].typeRom,
          x[i].graphicsСard,
          x[i].brend,
          x[i].screenMatrix,
          x[i].diagonal
        );
        arrComputers.push(allDevice);
      }
    }
  }
  display("information");
  printInfo(arrComputers);
});

function display(visibleId) {
  switch (visibleId) {
    case "create_сomputer":
      document.getElementById("information").style.display = "none";
      document.getElementById("all_info").style.display = "none";
      document.getElementById("create_сomputer").style.display = "block";
      break;
    case "all_info":
      document.getElementById("information").style.display = "none";
      document.getElementById("all_info").style.display = "block";
      document.getElementById("create_сomputer").style.display = "none";
      break;
    case "information":
      document.getElementById("information").style.display = "block";
      document.getElementById("all_info").style.display = "none";
      document.getElementById("create_сomputer").style.display = "none";
      break;
  }
}

function printInfo(arrComputers) {
  let form = document
    .getElementById("information")
    .getElementsByTagName("form");
  if (arrComputers.length === 0) {
    form[0].innerHTML = `<div class="text_description">
            <div class="typeDevice">Тип устройства</div>
            <div class="year">Год выпуска</div>
            <div class="os">Операционная система</div>
            <div class="to_do"></div>
        </div>`;
    form[0].innerHTML += `<div>
            <h2>Данные отстутствуют!</h2>
        </div>`;
    form[0].innerHTML += `<input type="button" class="btn btn-primary newComputerButton" id="newComputerButton" value="Добавить новое устройство">`;

    document
      .getElementById("newComputerButton")
      .addEventListener("click", function () {
        display("create_сomputer");
        clearInput();

        document.getElementById("editSpan").style.color = "black";
        document.getElementById("addSpan").style.color = "blue";
      });
  } else {
    form[0].innerHTML = `<div class="text_description">
            <div class="typeDevice">Тип устройства</div>
            <div class="year">Год выпуска</div>
            <div class="os">Наличие операционной системы</div>
            <div class="to_do"></div>
        </div>`;
    for (let i = 0; i < arrComputers.length; i++) {
      form[0].innerHTML += `<div class="info_text_description">
            <div class="typeDevice" id="typeDevice${i}"> ${
        arrComputers[i].addTypeDevice
      } </div>
            <div class="year" id="year${i}"> ${arrComputers[i].addYear} </div>
            <div class="os" id="os${i}"> ${
        arrComputers[i].addOs === "true" ? "да" : "нет"
      } </div>
            <div class="btn_toDo">
                <input type="button" class="btn btn-secondary edit" id="edit${i}" style="margin-right: 30px;" value="Редактировать" />
                <input type="button" class="btn btn-danger remove" id="remove${i}" value="Удалить" />
            </div>
        </div>`;
    }
    form[0].innerHTML += `<br/><input type="button" class="btn btn-primary newComputerButton" id="newComputerButton" value="Добавить новое устройство">`;

    for (let i = 0; i < arrComputers.length; i++) {
      let typeDevice = `typeDevice${i}`;
      let edit = `edit${i}`;
      let remove = `remove${i}`;

      document.getElementById(typeDevice).style.color = "blue";

      document
        .getElementById(typeDevice)
        .addEventListener("click", function () {
          printSelectInfo(i, arrComputers);
        });

      document.getElementById(edit).addEventListener("click", function () {
        editComputer(i);
      });

      document.getElementById(remove).addEventListener("click", function () {
        deleteComputer(i, arrComputers);
      });
    }

    document
      .getElementById("newComputerButton")
      .addEventListener("click", function () {
        display("create_сomputer");

        document.getElementById("createComputer").style.display =
          "inline-block";
        document.getElementById("editComputer").style.display = "none";
        document.getElementById("fromGroupTypeDevice").style.display = "flex";

        document.getElementById("editSpan").style.color = "black";
        document.getElementById("addSpan").style.color = "blue";
        clearInput();
      });
  }
}

// редактирование
function editComputer(i) {
  display("create_сomputer");

  document.getElementById("editSpan").style.color = "blue";
  document.getElementById("addSpan").style.color = "black";

  document.getElementById("createComputer").style.display = "none";
  document.getElementById("editComputer").style.display = "inline-block";
  document.getElementById("fromGroupTypeDevice").style.display = "none";

  document.getElementById("year").value = arrComputers[i].addYear;
  document.getElementById("processor").value = arrComputers[i].addProcessor;
  document.getElementById("typeRam").value = arrComputers[i].addTypeRam;
  arrComputers[i].addOs = checkedBtnOS();
  document.getElementById("typeRom").value = arrComputers[i].addTypeRom;
  document.getElementById("graphicsСard").value =
    arrComputers[i].addGraphicsСard;

  switch (arrComputers[i].addTypeDevice) {
    case "pc":
      selectDevice("pc");
      document.getElementById("powerSupply").value =
        arrComputers[i].addPowerSupply;
      arrComputers[i].addMonitor = checkedBtnMonitor();
      arrComputers[i].addKeyboard = checkedBtnKeyboard();
      break;
    case "laptop":
      selectDevice("laptop");
      document.getElementById("brend").value = arrComputers[i].addBrend;
      document.getElementById("screenMatrix").value =
        arrComputers[i].addScreenMatrix;
      document.getElementById("diagonal").value = arrComputers[i].addDiagonal;
      break;
  }

  document
    .getElementById("editComputer")
    .addEventListener("click", function () {
      if (emptiness(arrComputers[i].typeDevice) === true) {
        arrComputers[i].addYear = document.getElementById("year").value;
        arrComputers[i].addProcessor = document.getElementById(
          "processor"
        ).value;
        arrComputers[i].addTypeRam = document.getElementById("typeRam").value;
        arrComputers[i].addOs = checkedBtnOS();
        arrComputers[i].addTypeRom = document.getElementById("typeRom").value;
        arrComputers[i].addGraphicsСard = document.getElementById(
          "graphicsСard"
        ).value;

        if (arrComputers[i].addTypeDevice === "pc") {
          arrComputers[i].addPowerSupply = document.getElementById(
            "powerSupply"
          ).value;
          arrComputers[i].addMonitor = checkedBtnMonitor();
          arrComputers[i].addKeyboard = checkedBtnKeyboard();
        } else {
          arrComputers[i].addBrend = document.getElementById("brend").value;
          arrComputers[i].addScreenMatrix = document.getElementById(
            "screenMatrix"
          ).value;
          arrComputers[i].addDiagonal = document.getElementById(
            "diagonal"
          ).value;
        }

        printInfo(arrComputers);
        display("information");

        document.getElementById("createComputer").style.display =
          "inline-block";
        document.getElementById("editComputer").style.display = "none";
        document.getElementById("fromGroupTypeDevice").style.display = "flex";
        localStorage.setItem("saveArr", JSON.stringify(arrComputers));
      }
    });
}

// удаление
function deleteComputer(i, arrComputers) {
  arrComputers.splice(i, 1);

  localStorage.setItem("saveArr", JSON.stringify(arrComputers));
  printInfo(arrComputers);
}

function printSelectInfo(i, arrComputers) {
  display("all_info");

  let form = document.getElementById("all_info").getElementsByTagName("form");

  if (arrComputers[i].addTypeDevice === "pc") {
    form[0].innerHTML = `<div class="text_description">
            <div class="typeDevice">Тип устройства</div>
            <div class="year">Год выпуска</div>
            <div class="processor">Название процессора</div>
            <div class="typeRam">Тип ОЗУ</div>
            <div class="os">Наличие ОС</div>
            <div class="typeRom">Тип ПЗУ</div>
            <div class="graphicsСard">Графическая карта</div>
            <div class="powerSupply">Мощность блока питания</div>
            <div class="monitor">Наличие монитора</div>
            <div class="keyboard">Наличие клавиатуры</div>
        </div>`;
    form[0].innerHTML += `<div class="info_text_description">
            <div class="typeDevice" id="typeDevice${i}">${
      arrComputers[i].addTypeDevice
    }</div>
            <div class="year" id="year${i}">${arrComputers[i].addYear}</div>
            <div class="processor" id="processor${i}">${
      arrComputers[i].addProcessor
    }</div>
            <div class="typeRam" id="typeRam${i}">${
      arrComputers[i].addTypeRam
    }</div>
            <div class="os" id="os${i}">${
      arrComputers[i].addOs === "true" ? "да" : "нет"
    }</div>
            <div class="typeRom" id="typeRom${i}">${
      arrComputers[i].addTypeRom
    }</div>
            <div class="graphicsСard" id="graphicsСard${i}">${
      arrComputers[i].addGraphicsСard
    }</div>
            <div class="powerSupply" id="powerSupply${i}">${
      arrComputers[i].addPowerSupply
    } W</div>
            <div class="monitor" id="monitor${i}">${
      arrComputers[i].addMonitor === "true" ? "да" : "нет"
    }</div>
            <div class="keyboard" id="keyboard${i}">${
      arrComputers[i].addKeyboard === "true" ? "да" : "нет"
    }</div>
        </div>`;
  } else {
    form[0].innerHTML = `<br/><div class="text_description">
            <div class="typeDevice">Тип устройства</div>
            <div class="year">Год выпуска</div>
            <div class="processor">Название процессора</div>
            <div class="typeRam">Тип ОЗУ</div>
            <div class="os">Наличие ОС</div>
            <div class="typeRom">Тип ПЗУ</div>
            <div class="graphicsСard">Графическая карта</div>
            <div class="brend">Наименование бренда</div>
            <div class="screenMatrix">Тип матрицы</div>
            <div class="diagonal">Диагональ экрана</div>
        </div>`;
    form[0].innerHTML += `<div class="info_text_description">
            <div class="typeDevice" id="typeDevice${i}">${
      arrComputers[i].addTypeDevice
    }</div>
            <div class="year" id="year${i}">${arrComputers[i].addYear}</div>
            <div class="processor" id="processor${i}">${
      arrComputers[i].addProcessor
    }</div>
            <div class="typeRam" id="typeRam${i}">${
      arrComputers[i].addTypeRam
    }</div>
            <div class="os" id="os${i}">${
      arrComputers[i].addOs === "true" ? "да" : "нет"
    }</div>
            <div class="typeRom" id="typeRom${i}">${
      arrComputers[i].addTypeRom
    }</div>
            <div class="graphicsСard" id="graphicsСard${i}">${
      arrComputers[i].addGraphicsСard
    }</div>
            <div class="brend" id="brend${i}">${arrComputers[i].addBrend}</div>
            <div class="screenMatrix" id="screenMatrix${i}">${
      arrComputers[i].addScreenMatrix
    }</div>
            <div class="diagonal" id="diagonal${i}">${
      arrComputers[i].addDiagonal
    }"</div>
        </div>`;
  }

  form[0].innerHTML += `<input type="button" class="btn btn-dark mainMenu2" id="mainMenu2" style=" margin-top: 20px;" value="Главное меню">`;

  document.getElementById("mainMenu2").addEventListener("click", function () {
    display("information");
  });
}

document.getElementById("device").addEventListener("click", function () {
  selectDevice(document.getElementById("device").value);
});

// вывод дополнительной информации
function selectDevice(device) {
  switch (device) {
    case "pc":
      document.getElementById("device").value = "pc";
      document.getElementById("form_computer").style.display = "block";
      document.getElementById("form_laptop").style.display = "none";
      break;
    case "laptop":
      document.getElementById("device").value = "laptop";
      document.getElementById("form_computer").style.display = "none";
      document.getElementById("form_laptop").style.display = "block";
      break;
  }
}

function checkedBtnMonitor() {
  if (document.getElementById("monitor_true").checked) {
    return document.getElementById("monitor_true").value;
  } else {
    return document.getElementById("monitor_false").value;
  }
}

function checkedBtnKeyboard() {
  if (document.getElementById("keyboard_true").checked) {
    return document.getElementById("keyboard_true").value;
  } else {
    return document.getElementById("keyboard_false").value;
  }
}

function emptiness(type) {
  switch (type) {
    case "pc":
      if (document.getElementById("powerSupply").value > 18) {
        if (
          document.getElementById("powerSupply").value.trim() === "" ||
          document.getElementById("year").value === ""
        ) {
          alert("Заполните все поля!");
        } else {
          return true;
        }
      } else {
        alert("Мощность блока питания должна быть больше 18W!");
      }
      break;
    case "laptop":
      if (document.getElementById("diagonal").value > 12) {
        if (
          document.getElementById("year").value === "" ||
          document.getElementById("diagonal").value === ""
        ) {
          alert("Заполните все поля!");
        } else {
          return true;
        }
      } else {
        alert("Диагональ экрана должна быть не менее 12 дюймов!");
      }
      break;
  }
}

function checkedBtnOS() {
  if (document.getElementById("os_true").checked) {
    return document.getElementById("os_true").value;
  } else {
    return document.getElementById("os_false").value;
  }
}

function clearInput() {
  document.getElementById("year").value = "";
  document.getElementById("powerSupply").value = "";
  document.getElementById("diagonal").value = "";
}

document
  .getElementById("createComputer")
  .addEventListener("click", function () {
    let device = document.getElementById("device").value;
    let year = document.getElementById("year").value;
    let processor = document.getElementById("processor").value;
    let typeRam = document.getElementById("typeRam").value;
    let os = checkedBtnOS();
    let typeRom = document.getElementById("typeRom").value;
    let graphicsСard = document.getElementById("graphicsСard").value;

    if (emptiness(device) === true) {
      switch (device) {
        case "pc":
          let powerSupply = document.getElementById("powerSupply").value;
          let monitor = checkedBtnMonitor();
          let keyboard = checkedBtnKeyboard();

          allDevice = new Computer(
            device,
            year,
            processor,
            typeRam,
            os,
            typeRom,
            graphicsСard,
            powerSupply,
            monitor,
            keyboard
          );
          arrComputers.push(allDevice);
          printInfo(arrComputers);
          display("information");
          alert("Добавили новое устройство");

          localStorage.setItem("saveArr", JSON.stringify(arrComputers));
          break;
        case "laptop":
          let brend = document.getElementById("brend").value;
          let screenMatrix = document.getElementById("screenMatrix").value;
          let diagonal = document.getElementById("diagonal").value;

          allDevice = new Laptop(
            device,
            year,
            processor,
            typeRam,
            os,
            typeRom,
            graphicsСard,
            brend,
            screenMatrix,
            diagonal
          );
          arrComputers.push(allDevice);
          printInfo(arrComputers);
          display("information");
          alert("Добавили новое устройство");

          localStorage.setItem("saveArr", JSON.stringify(arrComputers));
          break;
      }
    }
  });

document.getElementById("mainMenu").addEventListener("click", function () {
  display("information");
});
