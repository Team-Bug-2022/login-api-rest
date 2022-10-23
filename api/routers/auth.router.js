import express from "express";
import {
  login,
  palmPrintLogin,
  validateDocument,
  uploadPalmPrint,
  create,
} from "../controllers/auth.controller.js";

import multer from "multer";

const fileUpload = multer();

const AuthRouter = express.Router();

const clientRouter = {
  VALIDATE_DOCUMENT: "/auth/validate-document",
  LOGIN: "/auth/login",
  PALM_PRINT_LOGIN: "/auth/palm-print-login",
  UPLOAD_PALM_PRINT: "/auth/upload-palm-print",
  CREATE: "/auth/create",
};

AuthRouter.post(clientRouter.VALIDATE_DOCUMENT, validateDocument);
AuthRouter.post(clientRouter.LOGIN, login);
AuthRouter.post(clientRouter.CREATE, create);

AuthRouter.post(
  clientRouter.PALM_PRINT_LOGIN,
  fileUpload.single("image"),
  palmPrintLogin
);

AuthRouter.post(
  clientRouter.UPLOAD_PALM_PRINT,
  fileUpload.single("image"),
  uploadPalmPrint
);

export default AuthRouter;
