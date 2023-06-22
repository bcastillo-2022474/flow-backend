# job-board-backend

## Project Management Schema Documentation

### User

The `User` model represents a user in the system.

- `id`: The unique identifier for the user.
- `email`: The user's email address, which is unique.
- `password`: The user's password.
- `role`: The role of the user, which can be either `ADMIN` or `USER`.
- `tasks`: A list of tasks assigned to the user.
- `sprints`: A list of sprints the user is associated with.
- `projectsParticipating`: A list of projects in which the user is a member.
- `projectsManaging`: A list of projects in which the user is an admin.
- `organizationsOwned`: A list of organizations owned by the user.
- `OrganizationMembers`: A list of organization memberships with associated permissions.

### OrganizationMembers

The `OrganizationMembers` model represents the relationship between users and organizations, including the permissions associated with the membership.

- `id`: The unique identifier for the organization membership.
- `organizations_permissions`: The permissions granted to the user for the organization (`NONE`, `READ`, or `MODIFY`).
- `member`: The user who is a member of the organization.
- `userId`: The ID of the user.
- `organization`: The organization to which the user belongs.
- `organizationId`: The ID of the organization.

### Organization

The `Organization` model represents an organization.

- `id`: The unique identifier for the organization.
- `name`: The name of the organization.
- `owner`: The user who owns the organization.
- `userId`: The ID of the user who owns the organization.
- `projects`: A list of projects associated with the organization.
- `OrganizationMembers`: A list of organization memberships.

### ProjectLevelPermission

The `ProjectLevelPermission` model represents the specific permissions granted to users on individual projects within an organization.

- `id`: The unique identifier for the project-level permission.
- `projectPermission`: The permission level granted to the user for the project (NONE, READ, or MODIFY).
- `user`: The user who is granted the project-level permission.
- `userId`: The ID of the user.
- `project`: The project for which the permission is granted.
- `projectId`: The ID of the project.

### Project

The `Project` model represents a project.

- `id`: The unique identifier for the project.
- `name`: The name of the project.
- `description`: The description of the project.
- `startDate`: The start date of the project.
- `endDate`: The end date of the project (optional).
- `admin`: The user who is the admin of the project.
- `userId`: The ID of the user who is the admin of the project.
- `organization`: The organization to which the project belongs (optional).
- `organizationId`: The ID of the organization to which the project belongs.
- `tasks`: A list of tasks associated with the project.
- `sprints`: A list of sprints associated with the project.
- `columns`: A list of columns associated with the project.
- `members`: A list of users who are members of the project.

### Sprint

The `Sprint` model represents a sprint.

- `id`: The unique identifier for the sprint.
- `name`: The name of the sprint.
- `description`: The description of the sprint (optional).
- `startDate`: The start date of the sprint.
- `endDate`: The end date of the sprint.
- `updatedAt`: The last update timestamp of the sprint.
- `createdBy`: The user who created the sprint.
- `userId`: The ID of the user who created the sprint.
- `Project`: The project to which the sprint belongs.
- `projectId`: The ID of the project to which the sprint belongs.
- `tasks`: A list of tasks associated with the sprint.

### Column

The `Column` model represents a column within a project.

- `id`: The unique identifier for the column.
- `name`: The name of the column (unique within the project).
- `color`: The color code associated with the column.
- `project`: The project to which the column belongs.
- `projectId`: The ID of the project to which the column belongs.
- `tasks`: A list of tasks associated with the column.

### Task

The `Task` model represents a task.

- `id`: The unique identifier for the task.
- `description`: The description of the task.
- `createdAt`: The creation timestamp of the task.
- `updatedAt`: The last update timestamp of the task.
- `dueDate`: The due date of the task.
- `assignedTo`: The user to whom the task is assigned (optional).
- `userId`: The ID of the user to whom the task is assigned.
- `priority`: The priority of the task.
- `Project`: The project to which the task belongs.
- `projectId`: The ID of the project to which the task belongs.
- `column`: The column to which the task is assigned.
- `columnId`: The ID of the column to which the task is assigned.
- `sprint`: The sprint to which the task belongs.
- `sprintId`: The ID of the sprint to which the task belongs.
- `comments`: A list of comments associated with the task.
- `attachments`: A list of attachments associated with the task.

### Attachment

The `Attachment` model represents an attachment associated with a task.

- `id`: The unique identifier for the attachment.
- `url`: The URL of the attachment.
- `createdAt`: The creation timestamp of the attachment.
- `task`: The task to which the attachment belongs.
- `taskId`: The ID of the task to which the attachment belongs.

### Comment

The `Comment` model represents a comment associated with a task.

- `id`: The unique identifier for the comment.
- `text`: The content of the comment.
- `createdAt`: The creation timestamp of the comment.
- `task`: The task to which the comment belongs.
- `taskId`: The ID of the task to which the comment belongs.

### Enumerations

- `Role`: Represents the role of a user (`ADMIN` or `USER`).
- `Organization_Permissions`: Represents the permissions associated with a user's organization membership (`NONE`, `READ`, or `MODIFY`).
- `Priority`: Represents the priority of a task (`ULTRA_LOW`, `LOW`, `MEDIUM`, `HIGH`, or `ULTRA_HIGH`).

Please note that this documentation provides a high-level overview of the schema structure and relationships. It can serve as a reference guide for understanding the entities, their fields, and their associations in the project.

## Entities Definitions

### User and Organization

The `User` and `Organization` models form the core entities in your project management system.

- The `User` model represents individual users with their email, password, and role (admin or regular user). Users can be associated with multiple tasks, sprints, projects, and organizations. They can also own organizations and have different roles within projects.

- The `Organization` model represents a group or entity within your system. Organizations have a name and can be associated with multiple projects and organization members. An organization can and must be owned by a user, allowing hierarchical ownership and management.

The design allows for flexibility in managing users and organizations, enabling users to be associated with multiple organizations and projects.

### Project

The `Project` model represents a specific project within an organization. Each project has a name, description, start date, and an optional end date.

- Projects are associated with an admin (a user who manages the project) and can (optionally) be linked to an organization. This allows projects to be organized within an organization and managed by designated users.

- Projects can have multiple members (users who are part of the project). This association allows collaboration and task assignment among project members.

- Projects can be divided into different columns, representing various stages or sections. Each column is associated with tasks, helping to organize and visualize the project workflow.

### Sprint and Task

The `Sprint` model represents a time-bound iteration or phase within a project. Sprints have a name, description, start date, end date, and an associated project.

- Sprints enable the project to be divided into smaller, manageable iterations, typically used in agile development methodologies.

- Tasks, represented by the `Task` model, are the actionable items within a project or sprint. Each task has a description, creation timestamp, update timestamp, due date, and priority level.

- Tasks can be assigned to users, helping to distribute work and track responsibilities. They are associated with a project, sprint, and column, providing context and organizing the workflow.

### Column, Comment, and Attachment

The `Column` model represents different stages or sections within a project. Columns have a name, a unique identifier within the project, and a color associated with them.

- Columns help visualize and organize tasks within a project. Tasks can be assigned to specific columns, representing their progress or status.

- Comments and attachments are associated with tasks, enabling collaboration and adding additional information or files related to a specific task.

### Organization Members and Permissions

The `OrganizationMembers` model represents the membership relationship between users and organizations. It includes permissions associated with the membership, defined by the `Organization_Permissions` enum. We also have the `ProjectLevelPermission` which defines the specific permissions of the members of an Organization on a Project

- This design allows for flexible permission management within organizations. Users can have different levels of access and control over the organization's projects based on their permissions.

- This means that if you are not part of a Organization, you can still be part of a project linked to an Organization, thats because project are independent of Organizations, this also means that if you are part of an organization you would be able to see projects from the Organization even if you are not assigned (READ permission), you may be able to modify them too (MODIFY permission). In case you are part from an Organization but have any (NONE permission) permissions, you would count as part of the organization but will be treated as an external worker. at least thats the default behaviour, with `ProjectLevelPermission` you can define explicit project permission to every member of the organization, if you dont define anything then the default permission (Organization-level Permission) would dictate the behaviour

Here are some key points to understand the revised schema and its permission system:

- The relationship between users and organizations is captured through the OrganizationMembers model. Users can be members of multiple organizations, and each membership has an associated permission level.

- The Permission enum provides three options: NONE, READ, and MODIFY. These permissions determine the level of access and control that members have over projects within the organization.

- By default, if a user is part of an organization, they will have access to view and potentially modify the projects associated with that organization, based on the organization-level permission.

- The ProjectLevelPermission model allows for explicit project-level permissions to be defined for individual members of the organization. This means that you can override the default organization-level permission with specific permissions for a particular project.

- If no explicit ProjectLevelPermission is defined for a user on a project, their permission level will be determined by the organization-level permission.

- The ProjectLevelPermission model enables fine-grained control over individual projects, allowing you to grant or restrict certain members' access and control on a per-project basis.

The schema provides a foundation for organizing and managing projects, users, organizations, and their relationships within your project management system. It allows for collaboration, task tracking, and hierarchy in ownership and management. The design aims to provide a flexible and scalable structure to support various project management workflows and requirements.
