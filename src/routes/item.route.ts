import { Router } from 'express'
import ItemController from '../controllers/item.controller.ts'

const router = Router()

const itemController = new ItemController()

router.post('/', itemController.createItem.bind(itemController))
router.get('/', itemController.getAllItems.bind(itemController))
router.get('/:id', itemController.getItemById.bind(itemController))
router.put('/:id', itemController.updateItem.bind(itemController))
router.delete('/:id', itemController.deleteItem.bind(itemController))

export default router