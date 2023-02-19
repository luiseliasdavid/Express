const { v4: uuidv4 } = require('uuid');
const path = require('path')


const subirArchivo = (files, extencionesValidas =['png','jpg','jpeg','gif'],carpeta='' ) => {

    return new Promise((resolve, reject)=>{

        const {archivo} = files
  const nombreCortado = archivo.name.split('.')
  const extencion = nombreCortado[nombreCortado.length-1];

  //validar la extencion
  
  if (!extencionesValidas.includes(extencion)){
    return res.status(400).json({
      msg: 'La extencion no es valida'
    })
  }

  const nombreTemp = uuidv4() + '.' + extencion;


  uploadPath = path.join( __dirname , '../uploads/', carpeta , nombreTemp)

  archivo.mv(uploadPath, (err)=> { 
    if (err) {
      reject(err);
    }

    resolve(nombreTemp);

    })


 })
}

module.exports = {
    subirArchivo
}

