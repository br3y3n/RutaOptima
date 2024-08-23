import Ruta from "../model/ruta.js";

export const createRuta = async (req, res) => {
    try {
      const response = await Ruta.create({
        origen: req.body.origen,
        destino: req.body.destino,
        ruta: req.body.ruta,
      });
      return res.status(201).json({ response, msg:'Ruta optima guardada correctamente' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };


export  const getAllRuta = async (req, res) => {
    try {
      const rutas = await Ruta.findAll();
      return res.status(200).json({ rutas });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

export const getRutaById = async (req, res) => {
    const { id } = req.params;
    try {
      const ruta = await Ruta.findByPk(id);
      if (!ruta) {
        return res.status(404).json({ message: 'Ruta no encontrada' });
      }
      return res.status(200).json({ ruta });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };


export const updateRuta = async (req, res) => {
    const { id } = req.params;
    try {
      const ruta= await Ruta.update(
        req.body,
        { where: { id }, returning: true }
      );
      if (ruta[1]===1) {
        const rutaUpdate = await Ruta.findOne({ where: { id: id } });
      return res.status(200).json({ ruta: rutaUpdate });
      }
     
      return res.status(404).json({ msg: 'Ruta no encontrada' });
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: error.message });
    }
  };

export const deleteRuta= async (req, res) => {
    const { id } = req.params;
    try {
      const deletedRows = await Ruta.destroy({ where: { id } });
      if (deletedRows === 0) {
        return res.status(404).json({ message: 'Ruta no encontrada' });
      }
      return res.status(204).json({
        msg:"Ruta eliminada correctamente"
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };





