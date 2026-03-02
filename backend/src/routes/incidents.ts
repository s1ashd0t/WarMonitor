import { Router } from 'express'
import { IncidentsController } from '../controllers/IncidentsController'

const router = Router()

router.get('/', IncidentsController.getAllIncidents)
router.post('/', IncidentsController.createIncident)
router.get('/:id', IncidentsController.getIncidentById)
router.post('/:id/analyze', IncidentsController.analyzeIncident)

export default router
