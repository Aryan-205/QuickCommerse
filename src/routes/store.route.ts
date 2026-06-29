import { Router } from 'express'
import { handleError } from '../helpers/handleError'

const router = Router()

const storeController = new StoreController()

router.get('/', storeController.getStore.bind(storeController))
router.get('/:id', storeController.getStoreById.bind(storeController))
router.post('/', storeController.createStore.bind(storeController))
router.put('/:id', storeController.updateStore.bind(storeController))
router.delete('/:id', storeController.deleteStore.bind(storeController))

export default router