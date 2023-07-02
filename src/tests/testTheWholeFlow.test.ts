import fetch, {Response} from "node-fetch";
import {Attachment, Column, Project, Sprint, Task, User} from "@prisma/client";

const BASE_URL = "http://localhost:3000/api";

describe("Test the whole flow", () => {
    test("creating users", async () => {
        // create user
        const user: User | null = await fetch(`${BASE_URL}/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: "brandonjoaocastillo83@gmail.com",
                password: "123",
                role: "ADMIN",
            })
        }).then((res: Response) => res.json() as Promise<User>)
            .catch((err: any) => {
                console.error(err);
                return null;
            });

        expect(user).not.toBeNull();
        expect(user).toHaveProperty("id");
        if (user === null) return

        // create project
        const project: Project | null = await fetch(`${BASE_URL}/project`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "test project",
                description: "test project description",
                startDate: new Date(),
                adminId: user.id,
            })
        })
            .then((res: Response) => res.json() as Promise<Project>)
            .catch((err: any) => {
                console.error(err);
                return null;
            })

        expect(project).not.toBeNull();
        expect(project).toHaveProperty("id");
        if (project === null) return

        // create sprint

        const sprint: Sprint | null = await fetch(`${BASE_URL}/sprint`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "test sprint",
                description: "test sprint description",
                startDate: new Date(),
                createdByUserId: user.id,
                projectId: project.id,
            })
        }).then((res: Response) => res.json() as Promise<Sprint>)
            .catch((err: any) => {
                console.error(err);
                return null;
            })

        expect(sprint).not.toBeNull();
        expect(sprint).toHaveProperty("id");
        if (sprint === null) return


        // create column

        const column: Column | null = await fetch(`${BASE_URL}/column`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "TODO",
                // color: "#000000",
                projectId: project.id,
            }),
        }).then((res: Response) => res.json() as Promise<Column>)
            .catch((err: any) => {
                console.error(err);
                return null;
            })

        expect(column).not.toBeNull();
        expect(column).toHaveProperty("id");
        if (column === null) return

        // create task

        const task: Task | null = await fetch(`${BASE_URL}/task`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                description: "test task description",
                createdAt: new Date(),
                priority: "LOW",
                sprintId: sprint.id,
                columnId: column.id,
            })
        }).then((res: Response) => res.json() as Promise<Task>)
            .catch((err: any) => {
                console.error(err);
                return null;
            })

        expect(task).not.toBeNull();
        expect(task).toHaveProperty("id");
        if (task === null) return

        // create comment
        const comment: Comment | null = await fetch(`${BASE_URL}/comment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                text: "test comment",
                createdAt: new Date(),
                taskId: task.id,
            }),
        }).then((res: Response) => res.json() as Promise<Comment>)
            .catch((err: any) => {
                console.error(err);
                return null;
            })

        expect(comment).not.toBeNull();
        expect(comment).toHaveProperty("id");
        if (comment === null) return

        // create attachment

        const attachment: Attachment | null = await fetch(`${BASE_URL}/attachment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                url: "test url",
                createdAt: new Date(),
                taskId: task.id,
            }),
        }).then((res: Response) => res.json() as Promise<Attachment>)
            .catch((err: any) => {
                console.error(err);
                return null;
            })

        expect(attachment).not.toBeNull();
        expect(attachment).toHaveProperty("id");
        if (attachment === null) return
        console.log({user, project, sprint, column, task, comment, attachment});
    })
});





