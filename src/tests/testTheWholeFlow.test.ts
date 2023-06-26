import { Project, User } from "@prisma/client";

const BASE_URL = "http://localhost:3000";

describe("Test the whole flow", () => {
	// create user
	const userObj: User = {
		email: "brandonjoaocastillo83@gmail.com",
		password: "123",
		role: "ADMIN",
	};

	const user: User = await fetch(`${BASE_URL}/user`, {
		method: "POST",
		body: userObj,
	}).then((res) => res.json());

	// create project
	const projectObj: Project = {
		name: "test project",
		description: "test description",
	};
});
