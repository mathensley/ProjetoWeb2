import { Router } from 'express';
import { Request, Response } from "express";
import { CreateAdminController } from '../../controller/admin/CreateAdminController.js';
import { DeleteAdminController } from '../../controller/admin/DeleteAdminController.js';

const adminRoutes = Router();

const createAdminController = new CreateAdminController();
const deleteAdminController =  new DeleteAdminController();

adminRoutes.post("/api/admins", (request: Request, response: Response) => {createAdminController.handle(request, response)});
adminRoutes.delete("/api/admins/:id", (request: Request, response: Response) => {deleteAdminController.handle(request, response)});

export default adminRoutes;