import { Elysia } from "elysia";
import { createLevel } from "./gen/level";
import "dotenv/config";

const app = new Elysia();

app.get("/level", async ({ query, set }) => {
	const level = query.level
	const username = query.username
	const totalXP = query.totalXP
	const currentXP = query.currentXP
	const avatar = query.avatar
	const bg = query.bg
	const rank = query.rank
	const mdAcc = query.mdAcc
	const premium = query.premium

	if (!level || !username || !totalXP || !currentXP || !avatar || !bg || !rank || !mdAcc || !premium) {
		set.status = 400;
		return "Missing query parameters";
	}

	const bgImg = await fetch(bg ?? '');
	const avatarImg = await fetch(avatar ?? '');

	if (!bgImg.ok || !avatarImg.ok) {
		set.status = 400;
		return "Invalid image URL";
	}

	const levelImage = await createLevel({
		level: level,
		username: username,
		totalXP: totalXP,
		currentXP: currentXP,
		avatar: avatar,
		bg: bg,
		rank: rank,
		acc: mdAcc,
		premium: premium
	});

	set.headers['Content-Type'] = 'image/png';
	return levelImage;
})

const port = process.env.PORT || 80;
app.listen(port);

console.log(
	`Server is running on ${app.server?.hostname}:${app.server?.port}`,
);
