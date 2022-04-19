import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[]=[]

  async getAll(): Promise<Peli[]> {
    const json = await jsonfile.readFile("./pelis.json");
    this.data  = json
    return json;
  }
  async getById(id: number): Promise<Peli> {
    const json = await this.getAll();
    const resultado = json.find( el => { return (el.id == id)});
    return resultado;
  }
  
  async search(options: any) {
    const json = await this.getAll();
    if (options.title) {
      function filterItemsByTitle(query:string) {
        const resultado = json.filter( element => {
          const tituloDeBusqueda = element.title;
          const queryToLC        = query;
          
          return tituloDeBusqueda.indexOf(queryToLC) > -1;
        })
        
        return resultado;
      }
      const resultadoSearch = filterItemsByTitle(options.title);
      
      return resultadoSearch;
    }
    // puede o peude que no lleve el else if
    if (options.tag) {
      function filterItemsByTag(query:string){
        const resultado = json.filter( element => {
          const tagsDeBusqueda = element.tags.map(el=> {return el});
          const queryToLC      = query
          
          return tagsDeBusqueda.indexOf(queryToLC) > -1;
        })
        
        return resultado
      }
      const resultadoSearchTag = filterItemsByTag(options.tag)
      
      return resultadoSearchTag
    }
  }

  async add(peli:Peli): Promise<Boolean> {
    this.getAll()
    const promesa1 = await this.getById(peli.id)
    if (promesa1 == undefined){
      this.data.push(peli)
      const promesa2 =jsonfile.writeFile("./pelis.json",this.data)
      return promesa2.then(()=>{return true})
    }else{
      return false
    }
    
  }
}


export { PelisCollection, Peli };


// const colecctionDePelis = new PelisCollection

// console.log(colecctionDePelis.getAll())


// const peli = new Peli
// peli.id=10
// peli.tags=["hola","ke", "ase"]
// peli.title="holakease"
// const konstante2 = colecctionDePelis.getById(124).then(el=>{console.log(el)})
// // const konstante3 = colecctionDePelis.add(peli).then(el=>{console.log("el",el)})

// // const option1={tag:"Comedia"}
// // const konstante3 = colecctionDePelis.search(option1).then(el=>{console.log("el",el)})




//   const collection = new PelisCollection();
// (async()=>{ 
//   const all = await collection.getAll();
//   const a = all[0];
//   const b = await collection.search({ title: "title" });
//   const ids = b.map((b) => b.id);

//   console.log("a",a,"b",b,"ids",ids)
// })()

