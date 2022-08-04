export interface Service {
  // solo debe recibir un argumento (un Dto)
  // TODO: devolver una promesa ??
  run(arg: any): any
}
