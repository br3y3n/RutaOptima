import Ubicacion from "../model/ubicacion.js";


export const createUbicacion= async (req, res) => {
    try {
      const response = await Ubicacion.create({
        posicionX: req.body.posicionX,
        posicionY: req.body.posicionY,
        nombre: req.body.nombre,
      });
      return res.status(201).json({ response });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };


export  const getAllUbicacion = async (req, res) => {
    try {
      const ubicaciones = await Ubicacion.findAll();
      return res.status(200).json({ ubicaciones });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

export const getUbicacionById = async (req, res) => {
    const { id } = req.params;
    try {
      const ubicacion = await Ubicacion.findByPk(id);
      if (!ubicacion) {
        return res.status(404).json({ message: 'Ubicacion no encontrada' });
      }
      return res.status(200).json({ ubicacion });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };


export const updateUbicacion = async (req, res) => {
    const { id } = req.params;
    try {
      const ubicacion= await Ubicacion.update(
        req.body,
        { where: { id }, returning: true }
      );
      if (ubicacion[1]===1) {
        const ubicacionUpdate = await Ubicacion.findOne({ where: { id: id } });
      return res.status(200).json({ ubicacion: ubicacionUpdate });
      }
     
      return res.status(404).json({ msg: 'ubicacion no encontrada' });
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: error.message });
    }
  };

export const deleteUbicacion= async (req, res) => {
    const { id } = req.params;
    try {
      const deletedRows = await Ubicacion.destroy({ where: { id } });
      if (deletedRows === 0) {
        return res.status(404).json({ message: 'ubicacion no encontrada' });
      }
      return res.status(204).json({
        msg:"ubicacion eliminada correctamente"
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };





