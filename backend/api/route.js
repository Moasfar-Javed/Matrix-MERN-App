import express from "express"
import EmployeeCtrl from "./employee.controller.js"
import LogisticsCtrl from "./logistics.controller.js"
import TasksCtrl from "./tasks.controller.js"

const router = express.Router()

//login route
router.route("/login").get(EmployeeCtrl.apiGetEmployeeID)

//employee routes
router
    .route("/itdept/employee")
    .get(EmployeeCtrl.apiGetEmployees)
    .post(EmployeeCtrl.apiPostEmployees)
    .put(EmployeeCtrl.apiPutEmployees)
    .delete(EmployeeCtrl.apiDeleteEmployees)

router
    .route("/itdept/employee/details")
    .get(EmployeeCtrl.apiGetEmployeeByID)

//logistics route 
router
    .route("/logistics")
    .get(LogisticsCtrl.apiGetLogistics)
    .get(LogisticsCtrl.apiGetLogisticsByID)
    .post(LogisticsCtrl.apiPostLogistics)
    .put(LogisticsCtrl.apiPutStatus)
    .delete(LogisticsCtrl.apiDeleteLogistics)

router
    .route("/tasks")
    .get(TasksCtrl.apiGetTasks)
    .post(TasksCtrl.apiPostTasks)
    .put(TasksCtrl.apiMarkCompleted)
    .delete(TasksCtrl.apiDeleteTasks)

//router.route("/logistics/details").get(LogisticsCtrl.apiGetLogisticsByID)

export default router