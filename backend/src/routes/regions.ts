import { Router } from 'express'
import { RegionsController } from '../controllers/RegionsController'

const router = Router()

router.get('/', RegionsController.getAllRegions)
router.post('/', RegionsController.createRegion)
router.get('/:regionId/status', RegionsController.getRegionStatus)
router.get('/:regionId/threat-level', RegionsController.getRegionThreatLevel)

export default router
