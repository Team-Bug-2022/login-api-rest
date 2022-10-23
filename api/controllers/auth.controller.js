import jwt from "jsonwebtoken";
import { comparePassword, encryptPassword } from "../utils/encrypt.js";
import { createResponse } from "../utils/response.js";
import Client from "../models/client.js";
import {
  deleteImage,
  getImageId,
  streamUpload,
} from "../utils/imageUploader.js";
import { needPalmarPrintLogin } from "../services/prediction.service.js";
import { comparePalmarPrint } from "../services/compare.service.js";

export const login = async (req, res) => {
  try {
    const body = req.body;
    let client = await Client.findById(body._id);
    if (client === null) {
      res.json(createResponse(0, "Código incorrecto", null));
    } else {
      if (comparePassword(body.password, client.password)) {
        jwt.sign(
          { exp: Math.floor(Date.now() / 1000) + 36000, _id: client._id },
          process.env.SECRET_KEY,
          (error, token) => {
            if (!error) {
              const clientDto = {
                _id: client._id,
                code: client.code,
                token: token,
              };
              res.json(createResponse(1, "Login exitoso", clientDto));
            } else {
              console.log(error);
              res.json(createResponse(-1, "Error en token", null));
            }
          }
        );
      } else {
        res.json(createResponse(0, "Contraseña incorrecta", null));
      }
    }
  } catch (e) {
    console.log(e);
    res.json(createResponse(-1, "Error en el servidor", null));
  }
};

export const palmPrintLogin = async (req, res) => {
  const { _id: _id } = req.query;
  try {
    let client = await Client.findById(_id);
    const result = await streamUpload(req);
    const imageId = getImageId(result);

    /*
    comparePalmarPrint({
      urlImageOld: client.palmPrint,
      urlImageNew: result,
    }).then(
      (data) => {
        console.log(result);
        if (data && data.match) {
          if (data.match === true) {
            deleteImage(imageId);
            jwt.sign(
              { exp: Math.floor(Date.now() / 1000) + 36000, _id: client._id },
              process.env.SECRET_KEY,
              (error, token) => {
                if (!error) {
                  const clientDto = {
                    _id: client._id,
                    code: client.code,
                    token: token,
                  };
                  res.json(createResponse(1, "Login exitoso", clientDto));
                } else {
                  console.log(error);
                  res.json(createResponse(-1, "Error en token", null));
                }
              }
            );
          }
        } else {
          res.json(createResponse(-1, "Error de autenticación", null));
          deleteImage(imageId);
        }
      },
      (error) => {
        console.log(error);
        deleteImage(imageId);
        res.json(createResponse(-1, "Error en el servidor", null));
      }
    );*/
    jwt.sign(
      { exp: Math.floor(Date.now() / 1000) + 36000, _id: client._id },
      process.env.SECRET_KEY,
      (error, token) => {
        if (!error) {
          const clientDto = {
            _id: client._id,
            code: client.code,
            token: token,
          };
          res.json(createResponse(1, "Login exitoso", clientDto));
        } else {
          console.log(error);
          res.json(createResponse(-1, "Error en token", null));
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.json(createResponse(-1, "Error en el servidor", null));
  }
};

export const uploadPalmPrint = async (req, res) => {
  const { _id: _id } = req.query;
  try {
    const result = await streamUpload(req);
    let client = await Client.findById(_id);
    client.palmPrint = result;
    const clientSave = await client.save();
    res.json(createResponse(1, "Imagen guardada", result));
  } catch (e) {
    console.log(e);
    res.json(createResponse(-1, "Error al guardar imagen", null));
  }
};

export const validateDocument = async (req, res) => {
  const documentType = req.body.documentType;
  const documentNumber = req.body.documentNumber;
  let loginType = "CLASSIC";
  const client = await Client.findOne({
    documentType: documentType,
    documentNumber: documentNumber,
  });
  if (client === null) {
    res.json(createResponse(0, "El cliente no existe", null));
  } else {
    needPalmarPrintLogin(client.code).then(
      (data) => {
        if (data && data.response) {
          if (data.response === true) loginType = "PALMAR_PRINT";
        }
        res.json(
          createResponse(1, "Cliente encontrado", {
            _id: client._id,
            name: client.name,
            loginType: loginType,
          })
        );
      },
      (error) => {
        console.log(error);
        res.json(createResponse(-1, "Error en el servidor", null));
      }
    );
  }
};

export const create = async (req, res) => {
  try {
    const client = new Client(req.body);
    client.password = encryptPassword(client.password);
    const clientSave = await client.save();
    res.json(createResponse(1, "Registro exitoso", clientSave));
  } catch (e) {
    console.log(e);
    res.json(createResponse(-1, "Error en el servidor", null));
  }
};
