import { Elysia } from "elysia";
import { createLevel } from "./gen/level";

const app = new Elysia();

app.get("/level", async ({ query, set }) => {
	const level = query.level
	const username = query.username
	const totalXP = query.totalXP
	const currentXP = query.currentXP
	const avatar = query.avatar
	const bg = query.bg
	const rank = query.rank

	if (!level || !username || !totalXP || !currentXP || !avatar || !bg || !rank) {
		set.status = 400;
		return "Missing query parameters";
	}

	const bgImg = await fetch(bg ?? '');
	const avatarImg = await fetch(avatar ?? '');

	if (!bgImg.ok || !avatarImg.ok) {
		set.status = 400;
		return "Invalid image URL";
	}

	if (currentXP > totalXP) {
		set.status = 400;
		return "Current XP cannot be greater than total XP";
	}

	const levelImage = await createLevel({
		level: level,
		username: username,
		totalXP: totalXP,
		currentXP: currentXP,
		avatar: avatar,
		bg: bg,
		rank: rank
	});

	set.headers['Content-Type'] = 'image/png';
	return levelImage;
})

app.listen(3000);

console.log(
	`Server is running on ${app.server?.hostname}:${app.server?.port}`,
);