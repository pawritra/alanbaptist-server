const { Employee } = require('../../models/employee')

const getCoaches = async (req, reply) => {
	try {
		let emps = [];
		const defaultLimit = 10;
		const defaultIndex = 0;

		const limit = req.query.limit ? req.query.limit : defaultLimit;
		let index = req.query.index ? req.query.index : defaultIndex;
		const params = {};
		emps = await Employee.find(params).skip(index).limit(limit)

		return emps;
	} catch (err) {
		reply.status(401).send({ error: err.message })
	}
}

const getCoach = async (req, reply) => {
	try {
		const emp = await Employee.findOne({ _id: req.params.id })
		return emp;
	} catch (err) {
		reply.status(401).send({ error: err.message })
	}
}

const addCoach = async (req, reply) => {
	try {
		console.log("Created")
		const message = new Employee({ ...req.body })
		await message.save();
		return { message: "Employee Created!" }
	} catch (err) {
		reply.status(401).send({ error: err.message })
	}
}

const updateCoach = async (req, reply) => {
	try {
		await Employee.findByIdAndUpdate(req.params.id, {
			...req.body
		});
		return { message: "Employee Updated" }
	} catch (err) {
		reply.status(400).send({ error: "Some error occured." });
	}
}

const deleteCoach = async (req, reply) => {
	try {
		await Employee.findByIdAndDelete(req.params.id);
		return { message: "Employee Deleted" }
	} catch (err) {
		reply.status(400).send({ error: "Some error occured." });
	}
}

module.exports = {
	getCoach,
	getCoaches,
	addCoach,
	updateCoach,
	deleteCoach
}
