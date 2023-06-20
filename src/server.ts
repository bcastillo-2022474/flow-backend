import express from "express";

const app = express();

app.get("/api", (req) => {});
app.get("/", () => {
	console.log("Hello World");
});
