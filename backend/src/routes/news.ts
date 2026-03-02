import { Router } from 'express'
import { NewsController } from '../controllers/NewsController'

const router = Router()

router.get('/latest', NewsController.getLatestArticles)
router.get('/search', NewsController.searchArticles)
router.get('/region/:region', NewsController.getArticlesByRegion)
router.post('/aggregate', NewsController.aggregateNews)

export default router
