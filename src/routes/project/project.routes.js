import express from 'express';
import { createProject, deleteProject, getProject, updateSelectedProject } from './project.controller.js';

const ProjectRouter = express.Router();

ProjectRouter.post('/project',createProject );
ProjectRouter.get('/project',getProject );
ProjectRouter.put('/project',updateSelectedProject );
ProjectRouter.delete('/project',deleteProject );

export {ProjectRouter}