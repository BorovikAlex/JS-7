class BaseClass {
  constructor(typeDevice, year, processor, typeRam, os, typeRom, graphicsСard) {
    this.typeDevice = typeDevice;
    this.year = year;
    this.processor = processor;
    this.typeRam = typeRam;
    this.os = os;
    this.typeRom = typeRom;
    this.graphicsСard = graphicsСard;
  }

  set addTypeDevice(newTypeDevice) {
    this.typeDevice = newTypeDevice;
  }
  get addTypeDevice() {
    return this.typeDevice;
  }

  set addYear(newYear) {
    this.year = newYear;
  }
  get addYear() {
    return this.year;
  }

  set addProcessor(newProcessor) {
    this.processor = newProcessor;
  }
  get addProcessor() {
    return this.processor;
  }

  set addTypeRam(newTypeRam) {
    this.typeRam = newTypeRam;
  }
  get addTypeRam() {
    return this.typeRam;
  }

  set addOs(newOs) {
    this.os = newOs;
  }
  get addOs() {
    return this.os;
  }

  set addTypeRom(newTypeRom) {
    this.typeRom = newTypeRom;
  }
  get addTypeRom() {
    return this.typeRom;
  }

  set addGraphicsСard(newGraphicsСard) {
    this.graphicsСard = newGraphicsСard;
  }
  get addGraphicsСard() {
    return this.graphicsСard;
  }
}

class Computer extends BaseClass {
  constructor(
    typeDevice,
    year,
    processor,
    typeRam,
    os,
    typeRom,
    graphicsСard,
    powerSupply,
    monitor,
    keyboard
  ) {
    super(typeDevice, year, processor, typeRam, os, typeRom, graphicsСard);
    this.powerSupply = powerSupply;
    this.monitor = monitor;
    this.keyboard = keyboard;
  }

  set addPowerSupply(newPowerSupply) {
    this.powerSupply = newPowerSupply;
  }
  get addPowerSupply() {
    return this.powerSupply;
  }

  set addMonitor(newMonitor) {
    this.monitor = newMonitor;
  }
  get addMonitor() {
    return this.monitor;
  }

  set addKeyboard(newKeyboard) {
    this.keyboard = newKeyboard;
  }
  get addKeyboard() {
    return this.keyboard;
  }
}

class Laptop extends BaseClass {
  constructor(
    typeDevice,
    year,
    processor,
    typeRam,
    os,
    typeRom,
    graphicsСard,
    brend,
    screenMatrix,
    diagonal
  ) {
    super(typeDevice, year, processor, typeRam, os, typeRom, graphicsСard);
    this.brend = brend;
    this.screenMatrix = screenMatrix;
    this.diagonal = diagonal;
  }

  set addBrend(newBrend) {
    this.brend = newBrend;
  }
  get addBrend() {
    return this.brend;
  }

  set addScreenMatrix(newScreenMatrix) {
    this.screenMatrix = newScreenMatrix;
  }
  get addScreenMatrix() {
    return this.screenMatrix;
  }

  set addDiagonal(newDiagonal) {
    this.diagonal = newDiagonal;
  }
  get addDiagonal() {
    return this.diagonal;
  }
}
