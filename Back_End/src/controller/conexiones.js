import Conexiones from "../model/conexiones.js";

export const createConexion = async (req, res) => {
    try {
      const response = await Conexiones.create({
        valor: req.body.valor,
        distancia: req.body.distancia,
        ubicacionA: req.body.ubicacionB,
        ubicacionB: req.body.ubicacionB
      });
      return res.status(201).json({ msg:'ubicaciones guardadas correctamente' , resId: response.id});
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };


export  const getAllConexion = async (req, res) => {
    try {
      const conexiones = await Conexiones.findAll();
      return res.status(200).json({ conexiones });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

export const getConexionById = async (req, res) => {
    const { id } = req.params;
    try {
      const conexion = await Conexiones.findByPk(id);
      if (!conexion) {
        return res.status(404).json({ message: 'conexion no encontrada' });
      }
      return res.status(200).json({ conexion });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };


export const updateConexion = async (req, res) => {
    const { id } = req.params;
    try {
      const conexion= await Conexiones.update(
        req.body,
        { where: { id }, returning: true }
      );
      if (conexion[1]===1) {
        const conexionUpdate = await Conexiones.findOne({ where: { id: id } });
      return res.status(200).json({ ruta: conexionUpdate });
      }
     
      return res.status(404).json({ msg: 'Conexion no encontrada' });
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: error.message });
    }
  };

export const deleteConexion= async (req, res) => {
    const { id } = req.params;
    try {
      const deletedRows = await Ruta.destroy({ where: { id } });
      if (deletedRows === 0) {
        return res.status(404).json({ message: 'conexion no encontrada' });
      }
      return res.status(204).json({
        msg:"Conexion eliminada correctamente"
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };


