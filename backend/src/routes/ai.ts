import { Router } from 'express'
import { AIController } from '../controllers/AIController'

const router = Router()

router.post('/sentiment', AIController.analyzeSentiment)
router.post('/threat-analysis', AIController.generateThreatAnalysis)
router.get('/summary', AIController.generateSummary)

export default router
