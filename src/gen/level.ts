import { join } from "node:path";
import { createCanvas, loadImage, GlobalFonts } from "@napi-rs/canvas";

GlobalFonts.registerFromPath(join(__dirname, "../assets/HSR.otf"), "HSR");

export async function createLevel({
	level,
	username,
	totalXP,
	currentXP,
	avatar,
	bg,
	rank,
}: {
	level: string;
	username: string;
	totalXP: string;
	currentXP: string;
	avatar: string;
	bg: string;
	rank: string;
}) {
	const canvas = createCanvas(1600, 400);
	const ctx = canvas.getContext("2d");

	const avatarImage = await loadImage(avatar);
	const bgImage = await loadImage(bg);
	const crown = await loadImage(
		"https://cdn.mikn.dev/bot-assets/mikanbot/crown.png",
	);

	ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
	const x = 35; // Rectangle X position
	const y = 35; // Rectangle Y position
	const width = 330; // Rectangle width
	const height = 330; // Rectangle height
	const radius = 20; // Adjust the radius for more or less rounded corners

	ctx.beginPath();
	ctx.moveTo(x + radius, y);
	ctx.arcTo(x + width, y, x + width, y + height, radius);
	ctx.arcTo(x + width, y + height, x, y + height, radius);
	ctx.arcTo(x, y + height, x, y, radius);
	ctx.arcTo(x, y, x + width, y, radius);
	ctx.closePath();
	ctx.fillStyle = "#5a5a5a";
	ctx.fill();
	ctx.drawImage(avatarImage, 65, 65, 270, 270);

	const x2 = 1300; // Rectangle X position
	const y2 = -20; // Rectangle Y position
	const width2 = 330; // Rectangle width
	const height2 = 150; // Rectangle height
	const radius2 = 20; // Adjust the radius for more or less rounded corners

	ctx.beginPath();
	ctx.moveTo(x2 + radius2, y2);
	ctx.arcTo(x2 + width2, y2, x2 + width2, y2 + height2, radius2);
	ctx.arcTo(x2 + width2, y2 + height2, x2, y2 + height2, radius2);
	ctx.arcTo(x2, y2 + height2, x2, y2, radius2);
	ctx.arcTo(x2, y2, x2 + width2, y2, radius2);
	ctx.closePath();
	ctx.fillStyle = "#FFB900";
	ctx.fill();
	ctx.drawImage(avatarImage, 65, 65, 270, 270);

	ctx.font = "50px HSR";
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText(`Level ${level}`, 1350, 50);

	if (rank === "1") {
		ctx.drawImage(crown, 1380, 65, 50, 55);
		ctx.font = "40px HSR";
		ctx.fillStyle = "#FF7700";
		ctx.fillText(`Rank ${rank}`, 1450, 110);
	}

	if (rank !== "1") {
		ctx.font = "40px HSR";
		ctx.fillStyle = "#FFFFFF";
		ctx.fillText(`Rank ${rank}`, 1450, 105);
	}

	const usernameTrunc =
		username.length > 20 ? `${username.substring(0, 20)}...` : username;

	ctx.font = "70px HSR";
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText(`${usernameTrunc}`, 400, 170);

	ctx.font = "40px HSR";
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText(`${currentXP} XP`, 400, 230);

	const totalXPNum = Number.parseInt(totalXP);
	const currentXPNum = Number.parseInt(currentXP);

	// New width for the progress bar
	const progressBarWidth = 1100; // Increased width
	const progressBarHeight = 50;
	const cornerRadius = 10; // Corner radius for rounded corners
	const progressBarX = 400;
	const progressBarY = 270;

	// Calculate progress
	const progress = currentXPNum / totalXPNum;
	const filledWidth = progressBarWidth * progress;

	// Draw background progress bar with rounded corners
	ctx.beginPath();
	ctx.moveTo(progressBarX + cornerRadius, progressBarY);
	ctx.lineTo(progressBarX + progressBarWidth - cornerRadius, progressBarY);
	ctx.arc(
		progressBarX + progressBarWidth - cornerRadius,
		progressBarY + cornerRadius,
		cornerRadius,
		1.5 * Math.PI,
		2 * Math.PI,
	);
	ctx.lineTo(
		progressBarX + progressBarWidth,
		progressBarY + progressBarHeight - cornerRadius,
	);
	ctx.arc(
		progressBarX + progressBarWidth - cornerRadius,
		progressBarY + progressBarHeight - cornerRadius,
		cornerRadius,
		0,
		0.5 * Math.PI,
	);
	ctx.lineTo(progressBarX + cornerRadius, progressBarY + progressBarHeight);
	ctx.arc(
		progressBarX + cornerRadius,
		progressBarY + progressBarHeight - cornerRadius,
		cornerRadius,
		0.5 * Math.PI,
		Math.PI,
	);
	ctx.lineTo(progressBarX, progressBarY + cornerRadius);
	ctx.arc(
		progressBarX + cornerRadius,
		progressBarY + cornerRadius,
		cornerRadius,
		Math.PI,
		1.5 * Math.PI,
	);
	ctx.closePath();
	ctx.fillStyle = "#5a5a5a";
	ctx.fill();

	// Draw filled progress bar with rounded corners
	ctx.beginPath();
	ctx.moveTo(progressBarX + cornerRadius, progressBarY);
	ctx.lineTo(progressBarX + filledWidth - cornerRadius, progressBarY);
	ctx.arc(
		progressBarX + filledWidth - cornerRadius,
		progressBarY + cornerRadius,
		cornerRadius,
		1.5 * Math.PI,
		2 * Math.PI,
	);
	ctx.lineTo(
		progressBarX + filledWidth,
		progressBarY + progressBarHeight - cornerRadius,
	);
	ctx.arc(
		progressBarX + filledWidth - cornerRadius,
		progressBarY + progressBarHeight - cornerRadius,
		cornerRadius,
		0,
		0.5 * Math.PI,
	);
	ctx.lineTo(progressBarX + cornerRadius, progressBarY + progressBarHeight);
	ctx.arc(
		progressBarX + cornerRadius,
		progressBarY + progressBarHeight - cornerRadius,
		cornerRadius,
		0.5 * Math.PI,
		Math.PI,
	);
	ctx.lineTo(progressBarX, progressBarY + cornerRadius);
	ctx.arc(
		progressBarX + cornerRadius,
		progressBarY + cornerRadius,
		cornerRadius,
		Math.PI,
		1.5 * Math.PI,
	);
	ctx.closePath();
	ctx.fillStyle = "#FFB900";
	ctx.fill();

	ctx.font = "25px HSR";
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText(`${totalXPNum - currentXPNum} to next level`, 1230, 305);

	return await canvas.encode("png");
}
