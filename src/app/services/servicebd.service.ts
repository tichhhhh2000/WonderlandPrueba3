import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable, Subject} from 'rxjs';
import { Roles } from '../modules/roles';
import { AlertServiceService } from './alert-service.service';
import { Usuarios } from '../modules/usuarios';
import { Productos } from '../modules/productos';
import { Carrito } from '../modules/carrito';
import { outputAst } from '@angular/compiler';
import { Favoritos } from '../modules/favoritos';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';


@Injectable({
  providedIn: 'root'
})
export class ServicebdService {

  //variable de conexión a la Base de Datos
  public database!: SQLiteObject;
  private stockCambiado = new Subject<void>(); // Nueva variable para eventos de stock
  private lastVentaId: number | null = null; // Nuevo: almacena el ID de la última venta


  // Observable al que los componentes se pueden suscribir
  stockCambiado$ = this.stockCambiado.asObservable();

  //variables de creación de tablas
  tablaRol: string = "CREATE TABLE IF NOT EXISTS tablaRol(id_rol INTEGER PRIMARY KEY AUTOINCREMENT, nombre_rol VARCHAR(100) NOT NULL);";

  tablaUsuario: string = `
  CREATE TABLE IF NOT EXISTS tablaUsuario (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario VARCHAR(100) NOT NULL,
    clave_usuario VARCHAR(100) NOT NULL,
    correo_usuario VARCHAR(100) NOT NULL,
    direccion VARCHAR(200),
    foto_perfil TEXT,
    pregunta_seguridad TEXT,
    respuesta_seguridad TEXT,
    id_rol INTEGER,
    FOREIGN KEY(id_rol) REFERENCES tablaRol(id_rol));`;


  tablaVenta: string = "CREATE TABLE IF NOT EXISTS tablaVenta(id_venta INTEGER PRIMARY KEY AUTOINCREMENT, fecha_venta DATE NOT NULL DEFAULT (datetime('now', 'localtime')), total_venta INTEGER NOT NULL, id_usuario INTEGER, FOREIGN KEY(id_usuario) REFERENCES tablaUsuario(id_usuario) ON DELETE CASCADE);";



  tablaArticuloVenta: string = "CREATE TABLE IF NOT EXISTS tablaArticuloVenta(id_articuloVenta INTEGER PRIMARY KEY AUTOINCREMENT, id_venta INTEGER NOT NULL, id_album INTEGER NOT NULL, cantidad INTEGER NOT NULL, FOREIGN KEY(id_venta) REFERENCES tablaVenta(id_venta) ON DELETE CASCADE, FOREIGN KEY (id_album) REFERENCES tablaProducto(id_album) ON DELETE CASCADE);";


  tablaProducto: string = "CREATE TABLE IF NOT EXISTS tablaProducto(id_album INTEGER PRIMARY KEY AUTOINCREMENT, nombre_artista VARCHAR(100) NOT NULL, nombre_album VARCHAR(100) NOT NULL, precio_album INTEGER NOT NULL, detalle_album TEXT, portada_album BLOB, stock INTEGER DEFAULT 0, visible INTEGER DEFAULT 1);";

  tablaCarrito: string = "CREATE TABLE IF NOT EXISTS tablaCarrito(id_carrito INTEGER PRIMARY KEY AUTOINCREMENT, cantidad INTEGER DEFAULT 1, id_album INTEGER NOT NULL, id_usuario INTEGER NOT NULL, FOREIGN KEY(id_usuario) REFERENCES tablaUsuario(id_usuario), FOREIGN KEY(id_album) REFERENCES tablaProducto(id_album));";

  tablaFavorito: string = "CREATE TABLE IF NOT EXISTS tablaFavorito(id_favorito INTEGER PRIMARY KEY AUTOINCREMENT, id_usuario INTEGER, id_album INTEGER, FOREIGN KEY(id_usuario) REFERENCES tablaUsuario(id_usuario), FOREIGN KEY (id_album) REFERENCES tablaProducto(id_album));";

  tablaHistorialCompras: string = `CREATE TABLE IF NOT EXISTS tablaHistorialCompras(id_historial INTEGER PRIMARY KEY AUTOINCREMENT,id_usuario INTEGER,fecha_compra DATE DEFAULT (datetime('now', 'localtime')),total_compra INTEGER,detalle_compra TEXT,FOREIGN KEY(id_usuario) REFERENCES tablaUsuario(id_usuario));`;


  //variables de insert por defecto en la bd  
  registroUsuario: string = "INSERT OR IGNORE INTO tablaUsuario(usuario, clave_usuario, correo_usuario, direccion, foto_perfil, id_rol) VALUES('admin', 'Fate123', 'admin@wonderland.com', NULL, NULL, 1)";

  registroRol: string = "INSERT OR IGNORE INTO tablaRol(id_rol,nombre_rol) VALUES(1,'Administrador'),(2,'Cliente')";

  registroVenta: string = "INSERT OR IGNORE INTO tablaVenta(id_venta, fecha_venta, total_venta) VALUES (NULL, datetime('now', 'localtime'), 0);";

  registroEstadoVenta: string = "INSERT OR IGNORE INTO tablaEstadoVenta(id_estado, nombre_estado) VALUES (1, 'Pendiente'), (2, 'Completado');";
  

  registroProducto: string = `
  INSERT OR IGNORE INTO tablaProducto (nombre_artista, nombre_album, precio_album, detalle_album, portada_album, stock) VALUES
  ('BTS', 'Wings', 21990, 'Incluye: Photocard, póster, CD, libro de letras', 'assets/icon/wings-detalle2.jpg', 20),
  ('V', 'Layover', 16990, 'Incluye: Photocard, póster, sticker', 'assets/icon/layover.jpg', 20),
  ('BTS', 'Proof', 79990, 'Incluye: 3 CDs, photobook, mini póster, photocards', 'assets/icon/proof.jpg', 20),
  ('BTS', 'Butter', 26990, 'Incluye: Photocard, póster, stickers', 'assets/icon/butter.jpg', 20),
  ('BTS', 'Love Yourself Her', 23990, 'Incluye: Photocard, póster, libro de letras', 'assets/icon/Love-Her-detalle.jpg', 20),
  ('BTS', 'Love Yourself Tear', 23990, 'Incluye: Photocard, póster, libro de letras', 'assets/icon/love_your_tear.jpg', 20),
  ('BTS', 'Love Yourself Answer', 24990, 'Incluye: 2 CDs, photocard, póster', 'assets/icon/love_your_answer.jpg', 20),
  ('BTS', 'Map Of The Soul 7', 31990, 'Incluye: Photocard, póster, stickers, photobook', 'assets/icon/map_of_the_soul.jpg', 20),
  ('JIN', 'The Astronaut', 23990, 'Incluye: Photocard, póster, stickers', 'assets/icon/astronaut.jpg', 20),
  ('Agust D', 'D-DAY', 25990, 'Incluye: Photocard, póster, libro de letras', 'assets/icon/d_day.jpg', 20),
  ('JIMIN', 'FACE', 26990, 'Incluye: Photocard, póster, libro de letras', 'assets/icon/face.jpg', 20),
  ('J-Hope', 'Jack In The Box', 24990, 'Incluye: Photocard, póster, libro de letras', 'assets/icon/jack_in_the_box.jpg', 20),
  ('JungKook', 'Golden', 29990, 'Incluye: Photocard, póster, stickers', 'assets/icon/jk_golden.jpg', 20),
  ('JIMIN', 'Muse', 29990, 'Incluye: Photocard, póster, stickers', 'assets/icon/muse.jpg', 20),
  ('BTS', 'Are You Late Too [O!RUL8,2]', 23990, 'Incluye: Photocard, póster, libro de letras', 'assets/icon/ohareyou.jpg', 20),
  ('BTS', '2 COOL 4 SKOOL', 17990, 'Incluye: Photocard, póster, stickers', 'assets/icon/2kool4.jpg', 20),
  ('BTS', 'Dark & Wild', 25990, 'Incluye: Photocard, póster, libro de letras', 'assets/icon/dark_wild.jpg', 20),
  ('BTS', 'Map Of The Soul Persona', 24990, 'Incluye: Photocard, póster, stickers', 'assets/icon/persona.jpg', 20),
  ('BTS', 'Skool Luv Affair', 23990, 'Incluye: Photocard, póster, stickers', 'assets/icon/skool_luv.jpg', 20),
('BTS', 'The Most Beautiful Moment in Life PT.1', 20990, 'Incluye: Photocard, póster, stickers', 'assets/icon/the_most_1.jpg', 20),
  ('BTS', 'The Most Beautiful Moment in Life PT.2', 20990, 'Incluye: Photocard, póster, stickers', 'assets/icon/the_most_2.jpg', 20),
  ('RM', 'Indigo', 26990, 'Incluye: Photocard, póster, stickers', 'assets/icon/indigo.jpg', 20),
  ('ATEEZ', 'Golden Hour Part.1', 29990, 'Incluye: Photocard, póster, libro de letras', 'assets/icon/golden_hour.jpg', 20),
  ('ATEEZ', 'The World Ep.Fin : Will', 27990, 'Incluye: Photocard, póster, stickers', 'assets/icon/michinpum.jpg', 20),
  ('ATEEZ', 'The World Ep.2 : Outlaw', 28990, 'Incluye: Photocard, póster, stickers', 'assets/icon/bouncy.jpg', 20),
  ('ATEEZ', 'The World Ep.1 : Movement', 27990, 'Incluye: Photocard, póster, stickers', 'assets/icon/guerrilla.jpg', 20),
  ('ATEEZ', 'Zero : Fever Part.1', 32990, 'Incluye: Photocard, póster, libro de letras', 'assets/icon/fever_1.jpg', 20),
  ('ATEEZ', 'Zero : Fever Part.2', 29990, 'Incluye: Photocard, póster, stickers', 'assets/icon/fever_2.jpg', 20),
  ('ATEEZ', 'Zero : Fever Part.3', 29990, 'Incluye: Photocard, póster, stickers', 'assets/icon/fever_3.jpg', 20),
  ('ATEEZ', 'Beyond : Zero (Limited Edition)', 40990, 'Incluye: Photocard, póster, stickers', 'assets/icon/rocky.jpg', 20),
  ('MINGI', '(Pre-Venta) Fix On / Off', 64990, 'Incluye: Photocard, póster, edición limitada', 'assets/icon/Mingi.jpg', 20),
  ('ATEEZ', 'Treasure Ep.1 : All To Zero', 20990, 'Incluye: Photocard, póster, libro de letras', 'assets/icon/treasure_1.jpg', 20),
  ('ATEEZ', 'Treasure Ep.2 : Zero To One', 24990, 'Incluye: Photocard, póster, stickers', 'assets/icon/treasure_2.jpg', 20),
  ('ATEEZ', 'Treasure Ep.3 : One To All', 17990, 'Incluye: Photocard, póster, stickers', 'assets/icon/treasure_3.jpg', 20),
  ('ATEEZ', 'Treasure Ep.Fin : All To Action', 20990, 'Incluye: Photocard, póster, libro de letras', 'assets/icon/treasure_fin_all.jpg', 20),
  ('ENHYPEN', 'Romance : Untold', 28990, 'Incluye: Photocard, póster, stickers', 'assets/icon/xo.jpg', 20),
  ('ENHYPEN', 'Orange Blood', 26990, 'Incluye: Photocard, póster, stickers', 'assets/icon/orange_blood.jpg', 20),
  ('ENHYPEN', 'Dark Blood', 27990, 'Incluye: Photocard, póster, stickers', 'assets/icon/dark_blood.jpg', 20),
  ('ENHYPEN', 'Border : Day One', 31990, 'Incluye: Photocard, póster, stickers', 'assets/icon/given_taken.jpg', 20),
  ('ENHYPEN', 'Dimension : Dilema', 16990, 'Incluye: Photocard, póster, stickers', 'assets/icon/dimension_dilemma.jpg', 20),
  ('ENHYPEN', 'Memorabilia', 31990, 'Incluye: Photocard, póster, stickers', 'assets/icon/memorabilia.jpg', 20);
`;



  //variables para guardar los registros resultantes de los select
  listadoUsuario = new BehaviorSubject([]);

  // Cambia esta línea
  listadoProducto = new BehaviorSubject<Productos[]>([]);


  usuarioUnico = new BehaviorSubject([]);

  listadoCarrito = new BehaviorSubject<Carrito[]>([]);

  listadoFavorito = new BehaviorSubject([]);




  //variable para manipular el estado de la Base de Datos (solo se crea UNA variable de este tipo)
  private idDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private alerta: AlertServiceService, private storage: NativeStorage) { 
    this.crearBD();
  }

   // Método para emitir cambios de stock
   emitirCambioStock() {
    this.stockCambiado.next();
  }

  //funciones de retorno de observables
  fetchUsuario(): Observable<Usuarios[]> {
    return this.listadoUsuario.asObservable();
  }

  fetchUsuarioUnico(){
    return this.usuarioUnico.asObservable();
  }

  fetchProducto(): Observable<Productos[]> {
    this.listadoProducto.subscribe(items => {
      console.log('Productos obtenidos:', items); // Verifica que cada producto tenga stock
    });
    return this.listadoProducto.asObservable();
  }
  

  fetchCarrito(): Observable<Carrito[]> {
    return this.listadoCarrito.asObservable()
  }

  fetchFavoritos(): Observable<Favoritos[]> {
    return this.listadoFavorito.asObservable()
  }
  

  //val observable de la bd
  dbState() {
    return this.idDBReady.asObservable();
  }


  // el chat recomienda agregar async y await
  crearBD() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'Wonderland60.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        this.creartablas();
        this.idDBReady.next(true);
      }).catch(e => {
        this.alerta.GenerarAlerta("Creacion de BD", "error creando la BD: " + JSON.stringify(e))
      });
    });
  }

  async creartablas() {
    try {
        await this.database.executeSql(this.tablaRol, []);

        await this.database.executeSql(this.registroRol, []);

        await this.database.executeSql(this.tablaUsuario, []);

        await this.database.executeSql(this.registroUsuario, []);

        await this.database.executeSql(this.tablaProducto, []);

        await this.database.executeSql(this.tablaCarrito, []);

        await this.database.executeSql(this.tablaFavorito, []);

        await this.database.executeSql(this.tablaVenta, []);

        await this.database.executeSql(this.tablaArticuloVenta, []);

        await this.database.executeSql(this.tablaHistorialCompras, []);
        
        // Inserciones por defecto
        
        console.log('Se añadieron los album')
        const albumExiste = await this.database.executeSql('SELECT COUNT(*) FROM tablaProducto', []);

        if(albumExiste.rows.item(0)['COUNT(*)'] === 0) {
          await this.database.executeSql(this.registroProducto, []);
        } else {
          console.log('Ya no se crearán datos nuevos de productos')
        }

    } catch (e) {
        this.alerta.GenerarAlerta("Creacion de tabla", "Error creando las tablas: " + JSON.stringify(e));
    }
}

  // USUARIO
  consultarUsuario(usuario: string, clave: string) {
    return this.database.executeSql('SELECT * FROM tablaUsuario WHERE usuario = ? AND clave_usuario = ?', [usuario, clave]).then(res => {
      let usuario = null;
      if(res.rows.length > 0) {
        usuario = {
          id_usuario: res.rows.item(0).id_usuario,
          usuario: res.rows.item(0).usuario,
          clave_usuario: res.rows.item(0).clave_usuario,
          correo_usuario: res.rows.item(0).correo_usuario,
          direccion: res.rows.item(0).direccion,
          id_rol: res.rows.item(0).id_rol
        }
      }
      return usuario;
    }).catch(e=> {
      this.alerta.GenerarAlerta('Error', 'Error en consulta de usuario: ' + JSON.stringify(e))
      return null;
    }) 
  }

  consultarUsuarioPorCorreo(correo: string, clave: string) {
    return this.database.executeSql('SELECT * FROM tablaUsuario WHERE correo_usuario = ? AND clave_usuario = ?', [correo, clave]).then(res => {
      if (res.rows.length > 0) {
        return {
          id_usuario: res.rows.item(0).id_usuario,
          usuario: res.rows.item(0).usuario,
          clave_usuario: res.rows.item(0).clave_usuario,
          correo_usuario: res.rows.item(0).correo_usuario,
          direccion: res.rows.item(0).direccion,
          id_rol: res.rows.item(0).id_rol
        };
      }
      return null;
    }).catch(e => {
      this.alerta.GenerarAlerta('Error', 'Error en consulta de usuario: ' + JSON.stringify(e));
      return null;
    });
  }


  consultarUsuarioPorID(idUsuario: number, password: string): Promise<boolean> {
    return this.database.executeSql(
      'SELECT * FROM tablaUsuario WHERE id_usuario = ? AND clave_usuario = ?',
      [idUsuario, password]
    ).then(res => res.rows.length > 0)
    .catch(e => {
      console.error('Error al consultar usuario:', e);
      return false;
    });
  }


  actualizarContrasena(idUsuario: number, nuevaContrasena: string): Promise<boolean> {
    return this.database.executeSql(
      'UPDATE tablaUsuario SET clave_usuario = ? WHERE id_usuario = ?',
      [nuevaContrasena, idUsuario]
    ).then(res => res.rowsAffected > 0)
    .catch(e => {
      console.error('Error al actualizar contraseña:', e);
      return false;
    });
  }
  
  
  

  insertarUsuario(usuario: string, correo: string, password: string, direccion: string, respuestaSeguridad: string) {
    return this.database.executeSql(
      'INSERT INTO tablaUsuario (usuario, clave_usuario, correo_usuario, direccion, foto_perfil, pregunta_seguridad, respuesta_seguridad, id_rol) VALUES (?, ?, ?, ?, NULL, "¿Cuál es el apellido de tu abuelo?", ?, 2)',
      [usuario, password, correo, direccion, respuestaSeguridad]
    );
  }


    // Método para obtener el ID del usuario logueado desde el almacenamiento local
  obtenerIDUsuario(): Promise<number> {
      return this.storage.getItem('usuario_logueado').then(id => id as number);
  }

  obtenerIdPorCorreo(correo: string): Promise<number | null> {
    return this.database.executeSql(
      'SELECT id_usuario FROM tablaUsuario WHERE correo_usuario = ?',
      [correo]
    ).then(res => {
      if (res.rows.length > 0) {
        return res.rows.item(0).id_usuario;
      }
      return null;
    }).catch(e => {
      console.error('Error al obtener ID por correo:', e);
      return null;
    });
  }
  
  

  verificarUsuarioCorreo(usuario: string, correo: string) {
    return this.database.executeSql('SELECT * FROM tablaUsuario WHERE usuario = ? AND correo_usuario = ?', [usuario, correo]).then(res=>{
      return res.rows.length > 0 
    }).catch(e=> {
      this.alerta.GenerarAlerta('Error', 'Error en verificar usuario o correo' + JSON.stringify(e))
      return false;
    })
  }

  modificarUsuario(id_usuario: number, usuario: string, direccion: string) {
    return this.database.executeSql(
      'UPDATE tablaUsuario SET usuario = ?, direccion = ? WHERE id_usuario = ?',
      [usuario, direccion, id_usuario]
    ).then(res => {
      return res.rowsAffected > 0;  // Devuelve true si la modificación fue exitosa
    }).catch(e => {
      this.alerta.GenerarAlerta('Error', 'Error en la modificación del usuario: ' + JSON.stringify(e));
      return false;
    });
  }
  

  eliminarUsuario(id_usuario: number) {
    return this.database.executeSql(
      'DELETE FROM tablaUsuario WHERE id_usuario = ?', 
      [id_usuario]
    ).then(res => {
      return res.rowsAffected > 0;  // Devuelve true si la eliminación fue exitosa
    }).catch(e => {
      this.alerta.GenerarAlerta('Error', 'Error al eliminar el usuario: ' + JSON.stringify(e));
      return false;
    });
  }

  //PRODUCTO
  consultarProducto(): Promise<void> {
    return this.database.executeSql('SELECT * FROM tablaProducto', []).then(res => {
      let items: Productos[] = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          const album = {
            id_album: res.rows.item(i).id_album,
            nombre_artista: res.rows.item(i).nombre_artista,
            nombre_album: res.rows.item(i).nombre_album,
            precio_album: res.rows.item(i).precio_album,
            detalle_album: res.rows.item(i).detalle_album,
            portada_album: res.rows.item(i).portada_album,
            stock: res.rows.item(i).stock || 0,
            visible: +res.rows.item(i).visible // Asegúrate de que visible es numérico
          };
          items.push(album);
        }
      }
      this.listadoProducto.next(items);
    }).catch(e => {
      console.error('Error al consultar productos:', e);
    });
  }
  
  
  
  
  
  verificarProducto(nombre_album: string, precio_album: number) {
    return this.database.executeSql('SELECT * FROM tablaProducto WHERE nombre_album = ? AND precio_album = ?', [nombre_album, precio_album]).then(res => {
      return res.rows.length > 0;  // Devuelve true si el producto existe
    }).catch(e => {
      this.alerta.GenerarAlerta('Error', 'Error al verificar producto: ' + JSON.stringify(e));
      return false;
    });
  }
  

  insertarProducto(nombre_artista: string, nombre_album: string, detalle_album: string, precio_album: number, portada_album: string | null, stock: number) {
    return this.database.executeSql(
      'INSERT INTO tablaProducto (nombre_artista, nombre_album, detalle_album, precio_album, portada_album, stock) VALUES (?, ?, ?, ?, ?, ?)', 
      [nombre_artista, nombre_album, detalle_album, precio_album, portada_album, stock]
    ).then(res => {
      return res.rowsAffected > 0;  // Devuelve true si la inserción fue exitosa
    }).catch(e => {
      this.alerta.GenerarAlerta('Error', 'Error al insertar producto: ' + JSON.stringify(e));
      return false;
    });
  }

  
  modificarProducto(
  id_album: number,
  nombre_artista: string,
  nombre_album: string,
  detalle_album: string,
  precio_album: number,
  portada_album: string | null,
  stock: number
) {
  return this.database.executeSql(
    'UPDATE tablaProducto SET nombre_artista = ?, nombre_album = ?, detalle_album = ?, precio_album = ?, portada_album = ?, stock = ? WHERE id_album = ?',
    [nombre_artista, nombre_album, detalle_album, precio_album, portada_album, stock, id_album]
  ).then(res => {
    return res.rowsAffected > 0; // Verificar si la modificación fue exitosa
  }).catch(e => {
    console.error('Error al modificar el producto:', e);
    return false;
  });
}

  
  

  
ocultarProducto(id_album: number) {
  return this.database.executeSql(
    'UPDATE tablaProducto SET visible = 0 WHERE id_album = ?',
    [id_album]
  ).then(res => {
    return res.rowsAffected > 0;
  }).catch(e => {
    this.alerta.GenerarAlerta('Error', 'Error al ocultar el álbum: ' + JSON.stringify(e));
    return false;
  });
}

mostrarProducto(id_album: number) {
  return this.database.executeSql(
    'UPDATE tablaProducto SET visible = 1 WHERE id_album = ?',
    [id_album]
  ).then(res => {
    return res.rowsAffected > 0;
  }).catch(e => {
    this.alerta.GenerarAlerta('Error', 'Error al mostrar el álbum: ' + JSON.stringify(e));
    return false;
  });
}




restaurarProducto(id_album: number) {
  return this.database.executeSql(
    'UPDATE tablaProducto SET visible = 1 WHERE id_album = ?',
    [id_album]
  ).then(res => {
    return res.rowsAffected > 0; // Devuelve true si la actualización fue exitosa
  }).catch(e => {
    this.alerta.GenerarAlerta('Error', 'Error al restaurar el álbum: ' + JSON.stringify(e));
    return false;
  });
}


  

traerUsuario(idUsuario: number) {
  return this.database.executeSql(
    'SELECT usuario, correo_usuario, direccion, foto_perfil FROM tablaUsuario WHERE id_usuario = ?;', 
    [idUsuario]
  ).then(res => {
    if (res.rows.length > 0) {
      return {
        usuario: res.rows.item(0).usuario,
        correo_usuario: res.rows.item(0).correo_usuario,
        direccion: res.rows.item(0).direccion,
        foto_perfil: res.rows.item(0).foto_perfil || 'assets/icon/foto-perfil.jpg' // Default path if no profile picture
      };
    } else {
      this.alerta.GenerarAlerta('ERROR', 'Usuario no encontrado');
      return null;
    }
  }).catch(e => {
    this.alerta.GenerarAlerta('ERROR', 'Problema buscando usuario: ' + JSON.stringify(e));
    return null;
  });
}





  
  

  // PERFIL
  consultarPerfil(id_usuario: number) {
    return this.database.executeSql('SELECT * FROM tablaUsuario WHERE id_usuario = ?', [id_usuario]).then(res => {
      let perfil = null;
      if (res.rows.length > 0) {
        perfil = {
          id_usuario: res.rows.item(0).id_usuario,
          usuario: res.rows.item(0).usuario,
          clave_usuario: res.rows.item(0).clave_usuario,
          correo_usuario: res.rows.item(0).correo_usuario,
          direccion: res.rows.item(0).direccion,
          foto_perfil: res.rows.item(0).foto_perfil
        };
      }
      return perfil;
    }).catch(e => {
      this.alerta.GenerarAlerta('Error', 'Error al consultar el perfil: ' + JSON.stringify(e));
      return null;
    });
  }

  verificarPerfil(usuario: string, correo_usuario: string) {
    return this.database.executeSql('SELECT * FROM tablaUsuario WHERE usuario = ? OR correo_usuario = ?', [usuario, correo_usuario]).then(res => {
      return res.rows.length > 0;  // Devuelve true si el perfil ya existe
    }).catch(e => {
      this.alerta.GenerarAlerta('Error', 'Error al verificar el perfil: ' + JSON.stringify(e));
      return false;
    });
  }

  
  modificarPerfil(id_usuario: number, usuario: string, clave_usuario: string, correo_usuario: string, direccion: string, foto_perfil: string | null) {
  return this.database.executeSql(
    'UPDATE tablaUsuario SET usuario = ?, clave_usuario = ?, correo_usuario = ?, direccion = ?, foto_perfil = ? WHERE id_usuario = ?',
    [usuario, clave_usuario, correo_usuario, direccion, foto_perfil, id_usuario]
  ).then(res => {
    console.log('Perfil actualizado');
    return res.rowsAffected > 0;
  }).catch(e => {
    console.error('Error al modificar el perfil: ', e);
  });
}


  
  eliminarPerfil(id_usuario: number) {
    return this.database.executeSql(
      'DELETE FROM tablaUsuario WHERE id_usuario = ?',
      [id_usuario]
    ).then(res => {
      return res.rowsAffected > 0;  // Devuelve true si la eliminación fue exitosa
    }).catch(e => {
      this.alerta.GenerarAlerta('Error', 'Error al eliminar el perfil: ' + JSON.stringify(e));
      return false;
    });
  }


  async actualizarFotoPerfil(id_usuario: number, foto: string) {
    try {
      const res = await this.database.executeSql(
        'UPDATE tablaUsuario SET foto_perfil = ? WHERE id_usuario = ?',
        [foto, id_usuario]
      );
      console.log('Foto de perfil actualizada correctamente');
      return res.rowsAffected > 0; // Devuelve true si la actualización fue exitosa
    } catch (e) {
      this.alerta.GenerarAlerta('Error', 'Error al actualizar la foto de perfil: ' + JSON.stringify(e));
      return false;
    }
  }
  
  
  async obtenerFotoPerfil(id_usuario: number): Promise<string | null> {
    try {
      const res = await this.database.executeSql(
        'SELECT foto_perfil FROM tablaUsuario WHERE id_usuario = ?',
        [id_usuario]
      );
      if (res.rows.length > 0) {
        return res.rows.item(0).foto_perfil;
      }
      return null;
    } catch (e) {
      console.error('Error al obtener la foto de perfil:', e);
      return null;
    }
  }
  



  //CARRITO

  obtenerStockActual(id_album: number): Promise<number> {
    return this.database.executeSql(
        'SELECT stock FROM tablaProducto WHERE id_album = ?',
        [id_album]
    ).then(res => {
        return res.rows.length > 0 ? res.rows.item(0).stock : 0;
    }).catch(e => {
        console.error('Error al obtener stock en tiempo real:', e);
        return 0;
    });
}




async agregarCarrito(id_album: number, id_usuario: number, cantidad: number): Promise<void> {
  // Primero, verifica que haya al menos una unidad en stock antes de agregar al carrito
  const stockDisponible = await this.obtenerStockActual(id_album);
  if (stockDisponible > 0) {
      // Si hay stock, permite agregar el producto al carrito
      await this.database.executeSql(
          'INSERT INTO tablaCarrito (cantidad, id_album, id_usuario) VALUES (?, ?, ?)',
          [cantidad, id_album, id_usuario]
      );
      console.log('Producto agregado al carrito');
  } else {
      // Si no hay stock, muestra un mensaje de error
      this.alerta.GenerarAlerta('Error', 'No hay stock disponible para agregar este producto al carrito.');
  }
}


  
  
  
  

  async mostrarCarrito(id_usuario: number): Promise<Carrito[]> {
    try {
      const res = await this.database.executeSql(
        `SELECT c.id_carrito, c.id_usuario, c.cantidad, p.id_album, 
                p.nombre_artista, p.nombre_album, p.precio_album, p.portada_album, p.stock 
         FROM tablaCarrito c 
         JOIN tablaProducto p ON c.id_album = p.id_album 
         WHERE c.id_usuario = ?`,
        [id_usuario]
      );

      let items: Carrito[] = [];
      for (let i = 0; i < res.rows.length; i++) {
        const item = res.rows.item(i);
        items.push({
          id_carrito: item.id_carrito,
          id_usuario: item.id_usuario,
          cantidad: item.cantidad,
          id_album: item.id_album,
          nombre_artista: item.nombre_artista,
          nombre_album: item.nombre_album,
          precio_album: item.precio_album,
          portada_album: item.portada_album,
        });
      }

      this.listadoCarrito.next(items);
      return items;

    } catch (e) {
      console.error('Error al mostrar carrito:', e);
      return [];
    }
}

  

  actualizarCantidad(cantidad: number, id_carrito: number): Promise<void> {
    return this.database.executeSql(
      'UPDATE tablaCarrito SET cantidad = ? WHERE id_carrito = ?',
      [cantidad, id_carrito]
    ).then(() => {
      console.log('Cantidad actualizada en el carrito');
    }).catch(e => {
      console.error('Error al actualizar la cantidad: ', e);
    });
  }
  
  

  eliminarCarrito(id_carrito:number){
    return this.database.executeSql('DELETE FROM tablaCarrito WHERE id_carrito = ?',[id_carrito]).then(()=>{
      console.log('funciona eliminacion carrito');
    }).catch(e=>{
      this.alerta.GenerarAlerta('Error','Error con eliminacion de carrito'+JSON.stringify(e))
    })
  }

  vaciarCarrito(id_usuario: number) {
    console.log('Intentando vaciar el carrito para el usuario:', id_usuario);
    return this.database.executeSql(
      'DELETE FROM tablaCarrito WHERE id_usuario = ?', 
      [id_usuario]
    ).then(() => {
      console.log('Carrito vaciado correctamente para el usuario:', id_usuario);
      this.listadoCarrito.next([]); // Limpia el observable para que la vista se actualice
    }).catch(e => {
      console.error('Error al vaciar el carrito:', e);
    });
  }
  
  


  verificarStockDisponible(id_album: number, cantidad: number): Promise<boolean> {
    return this.database.executeSql(
        'SELECT stock FROM tablaProducto WHERE id_album = ?',
        [id_album]
    ).then(res => {
        return res.rows.length > 0 && res.rows.item(0).stock >= cantidad;
    }).catch(e => {
        console.error('Error al verificar stock disponible:', e);
        return false;
    });
}

  
  
  


  //FAVORITOS
  consultarFavoritos(id_usuario: number) {
    return this.database.executeSql(
      `SELECT f.id_favorito, p.id_album, p.nombre_artista, p.nombre_album, 
       p.detalle_album, p.precio_album, p.portada_album 
       FROM tablaFavorito f 
       JOIN tablaProducto p ON f.id_album = p.id_album 
       WHERE f.id_usuario = ?`,
      [id_usuario]
    ).then(res => {
      let favoritos: Favoritos[] = [];
      for (let i = 0; i < res.rows.length; i++) {
        favoritos.push({
          id_favorito: res.rows.item(i).id_favorito,
          id_album: res.rows.item(i).id_album,
          nombre_artista: res.rows.item(i).nombre_artista,
          nombre_album: res.rows.item(i).nombre_album,
          detalle_album: res.rows.item(i).detalle_album,
          precio_album: res.rows.item(i).precio_album,
          portada_album: res.rows.item(i).portada_album
        });
      }
      this.listadoFavorito.next(favoritos as any); // Emitir la lista actualizada
    }).catch(e => {
      console.error('Error al consultar favoritos:', e);
    });
  }
  

  
  agregarFavorito(id_album: number, id_usuario: number) {
    return this.database.executeSql(
      'INSERT INTO tablaFavorito (id_usuario, id_album) VALUES (?, ?)',
      [id_usuario, id_album]
    ).then(() => {
      console.log('Álbum añadido a favoritos');
      return true;
    }).catch(e => {
      this.alerta.GenerarAlerta('Error', 'Error al añadir a favoritos: ' + JSON.stringify(e));
      return false;
    });
  }
  
  eliminarFavorito(id_album: number, id_usuario: number) {
    return this.database.executeSql(
      'DELETE FROM tablaFavorito WHERE id_usuario = ? AND id_album = ?',
      [id_usuario, id_album]
    ).then(() => {
      console.log('Álbum eliminado de favoritos');
      return true;
    }).catch(e => {
      this.alerta.GenerarAlerta('Error', 'Error al eliminar de favoritos: ' + JSON.stringify(e));
      return false;
    });
  }

  eliminarFavoritodeFavoritos(id_favorito:number){
    return this.database.executeSql('DELETE FROM tablaFavorito WHERE id_favorito = ?',[id_favorito]).then(()=>{
      console.log('Funciona la borracion del favorito');
    }).catch(e => {
      this.alerta.GenerarAlerta('Error', 'Error al eliminar de favoritos de favoritos: ' + JSON.stringify(e));
    });
  }
  
  verificarFavorito(id_album: number, id_usuario: number) {
    return this.database.executeSql(
      'SELECT * FROM tablaFavorito WHERE id_usuario = ? AND id_album = ?',
      [id_usuario, id_album]
    ).then(res => {
      return res.rows.length > 0;
    }).catch(e => {
      console.error('Error al verificar favorito:', e);
      return false;
    });
  }
  


  //RECUPERAR CONTRASEÑA
  verificarCorreo(correo: string): Promise<boolean> {
    return this.database.executeSql(
      'SELECT * FROM tablaUsuario WHERE correo_usuario = ?', [correo]
    ).then(res => {
      return res.rows.length > 0;
    }).catch(e => {
      console.error('Error verificando correo:', e);
      return false;
    });
  }
  


  
  

  //VENTA
  // Método para registrar ventas con actualización del stock
 // Método modificado para registrar ventas con actualización del stock y almacenar el ID de la venta
 async registrarVenta(id_usuario: number, total_venta: number, carrito: Carrito[]): Promise<void> {
  try {
    const resVenta = await this.database.executeSql(
      'INSERT INTO tablaVenta (total_venta, id_usuario) VALUES (?, ?)',
      [total_venta, id_usuario]
    );
    this.lastVentaId = resVenta.insertId; // Almacena el ID de la última venta
    const id_venta = resVenta.insertId;

    for (const album of carrito) {
      await this.database.executeSql(
        'INSERT INTO tablaArticuloVenta (id_venta, id_album, cantidad) VALUES (?, ?, ?)',
        [id_venta, album.id_album, album.cantidad]
      );
      await this.database.executeSql(
        'UPDATE tablaProducto SET stock = stock - ? WHERE id_album = ?',
        [album.cantidad, album.id_album]
      );
    }

    const detallesCompra = JSON.stringify(carrito.map(album => ({
      nombre_album: album.nombre_album,
      cantidad: album.cantidad,
      precio: album.precio_album,
    })));
    await this.database.executeSql(
      'INSERT INTO tablaHistorialCompras (id_usuario, total_compra, detalle_compra) VALUES (?, ?, ?)',
      [id_usuario, total_venta, detallesCompra]
    );
    
    this.emitirCambioStock();
    console.log('Venta registrada y stock actualizado correctamente.');

  } catch (e) {
    console.error('Error al registrar la venta:', e);
    throw e;
  }
}

getLastVentaId(): number | null {
  return this.lastVentaId;
}

async obtenerDetallesVenta(id_venta: number): Promise<{usuario: any, total: number, albums: any[]}> {
  try {
    // Obtén la información del usuario y el total de la venta
    const ventaRes = await this.database.executeSql(
      `SELECT v.total_venta, u.usuario, u.correo_usuario 
       FROM tablaVenta v 
       JOIN tablaUsuario u ON v.id_usuario = u.id_usuario 
       WHERE v.id_venta = ?`,
      [id_venta]
    );

    if (ventaRes.rows.length === 0) {
      throw new Error('Venta no encontrada');
    }

    const usuario = {
      usuario: ventaRes.rows.item(0).usuario,
      correo_usuario: ventaRes.rows.item(0).correo_usuario,
    };
    const total = ventaRes.rows.item(0).total_venta;

    // Obtén los detalles de los álbumes comprados en la venta
    const albumRes = await this.database.executeSql(
      `SELECT p.nombre_album, p.nombre_artista, av.cantidad, p.precio_album 
       FROM tablaArticuloVenta av 
       JOIN tablaProducto p ON av.id_album = p.id_album 
       WHERE av.id_venta = ?`,
      [id_venta]
    );

    const albums = [];
    for (let i = 0; i < albumRes.rows.length; i++) {
      const album = albumRes.rows.item(i);
      albums.push({
        nombre_album: album.nombre_album,
        nombre_artista: album.nombre_artista,
        cantidad: album.cantidad,
        precio_album: album.precio_album,
      });
    }

    return { usuario, total, albums };

  } catch (e) {
    console.error('Error al obtener los detalles de la venta:', e);
    throw e;
  }
}

  
  
  
  
  
  
  // Método para obtener el historial de compras de un usuario
  consultarHistorialComprasPorUsuario(idUsuario: number): Promise<any[]> {
    return this.database.executeSql(
      'SELECT * FROM tablaHistorialCompras WHERE id_usuario = ? ORDER BY fecha_compra DESC',
      [idUsuario]
    ).then(res => {
      const historial: any[] = [];
      for (let i = 0; i < res.rows.length; i++) {
        const registro = res.rows.item(i);
        registro.detalle_compra = JSON.parse(registro.detalle_compra); // Convertir detalles de compra a un objeto JSON
        historial.push(registro);
      }
      return historial;
    }).catch(e => {
      console.error('Error al consultar el historial de compras:', e);
      return [];
    });
  }
  
  
  

  



  // Obtener historial de ventas para el administrador
  obtenerHistorialVentas(): Promise<any[]> {
    return this.database.executeSql(
      `SELECT v.id_venta, v.fecha_venta, v.total_venta, u.usuario AS comprador,
              av.cantidad, p.id_album, p.nombre_artista, p.nombre_album, p.precio_album, p.portada_album
       FROM tablaVenta v
       JOIN tablaArticuloVenta av ON v.id_venta = av.id_venta
       JOIN tablaProducto p ON av.id_album = p.id_album
       JOIN tablaUsuario u ON v.id_usuario = u.id_usuario`,
      []
    ).then(res => {
      let historial: any[] = [];
      for (let i = 0; i < res.rows.length; i++) {
        historial.push({
          id_venta: res.rows.item(i).id_venta,
          fecha_venta: res.rows.item(i).fecha_venta,
          total_venta: res.rows.item(i).total_venta,
          comprador: res.rows.item(i).comprador,
          cantidad: res.rows.item(i).cantidad,
          id_album: res.rows.item(i).id_album,
          nombre_artista: res.rows.item(i).nombre_artista,
          nombre_album: res.rows.item(i).nombre_album,
          precio_album: res.rows.item(i).precio_album,
          portada_album: res.rows.item(i).portada_album
        });
      }
      return historial;
    }).catch(e => {
      console.error('Error al obtener el historial de ventas:', e);
      return [];
    });
  }
  
  
  // Método para verificar respuesta de seguridad
  verificarRespuestaSeguridad(correo: string, respuesta: string): Promise<boolean> {
    return this.database.executeSql(
      'SELECT * FROM tablaUsuario WHERE correo_usuario = ? AND respuesta_seguridad = ?', 
      [correo, respuesta]
    ).then(res => {
      return res.rows.length > 0;
    }).catch(e => {
      console.error('Error al verificar la respuesta de seguridad:', e);
      return false;
    });
  }


  // Método para obtener la pregunta de seguridad por correo
  obtenerPreguntaSeguridad(correo: string): Promise<string> {
    return this.database.executeSql(
      'SELECT pregunta_seguridad FROM tablaUsuario WHERE correo_usuario = ?', [correo]
    ).then(res => {
      if (res.rows.length > 0) {
        return res.rows.item(0).pregunta_seguridad;
      } else {
        throw new Error('No se encontró la pregunta de seguridad para este correo');
      }
    }).catch(e => {
      console.error('Error al obtener la pregunta de seguridad:', e);
      throw e;
    });
  }

  
  


}
