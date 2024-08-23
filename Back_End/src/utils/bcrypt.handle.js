import pkg from 'bcryptjs';
const { compareSync, hashSync } = pkg;

const encrypt = async (contrasenaPlano) => {
  const contrasenaHash =  hashSync(contrasenaPlano, 10);
  return contrasenaHash;
};

const verified = async (contrasenaPlano, contraHash) => {
  const esCorrecto = compareSync(contrasenaPlano, contraHash);
  return esCorrecto;
};

export { encrypt, verified };
