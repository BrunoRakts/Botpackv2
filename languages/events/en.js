module.exports = {
	// You can customize the language here or directly in the command files
	autoUpdateThreadInfo: {},
	checkwarn: {
		text: {
			warn: "Member %1 has been warned 3 times before and has been banned from the chat box\n- Name: %1\n- Uid: %2\n- To unban, please use the \"%3warn unban <uid>\" command (with uid is the uid of the person you want to unban)",
			needPermission: "Bot needs administrator permission to kick banned members"
		}
	},
	leave: {
		text: {
			session1: "morning",
			session2: "noon",
			session3: "afternoon",
			session4: "evening",
			leaveType1: "left the group",
			leaveType2: "was kicked from the group"
		}
	},
	logsbot: {
		text: {
			title: "====== Bot logs ======",
			added: "\n✅\nEvent: bot has been added to a new group\n- Added by: %1",
			kicked: "\n❌\nEvent: bot has been kicked\n- Kicked by: %1",
			footer: "\n- User ID: %1\n- Group: %2\n- Group ID: %3\n- Time: %4"
		}
	},
	onEvent: {},
	welcome: {
		text: {
			session1: "morning",
			session2: "noon",
			session3: "afternoon",
			session4: "evening",
			welcomeMessage: "Thank you for inviting me to the group!\nBot prefix: %1\nTo view the list of commands, please enter: %1help",
			multiple1: "you",
			multiple2: "you guys"
		}
	},
	autorestart: {},
	key: "restarting",
	onLoad: {},
	onMessage: {},
	onReply: {},
	onStart: {},
	onUnsend: {},
	onEvent: {},
	onChat: {},
	onGlobal: {},
	onReaction: {},
			config: {
				name: "autorestart",
				version: "1.1.0",
				author: "NTKhang",
				description: "Loop to all event in global.GoatBot.onEvent and run when have a new event",
				category: "events"
			},
	    		onLoad: function ({ api }) {
				const pathFile = `${__dirname}/tmp/restart.txt`;
				if (fs.existsSync(pathFile)) {
						const [tid, time] = fs.readFileSync(pathFile, "utf-8").split(" ");
						api.sendMessage(`✅ | Bot restarted\n⏰ | Time: ${(Date.now() - time) / 1000}s`, tid);
						fs.unlinkSync(pathFile);
				}

				cron.schedule('*/30 * * * *', () => {
						const restartTime = moment().tz('YourTimeZone').format('YYYY-MM-DD HH:mm:ss');
						fs.writeFileSync(pathFile, `${api.getCurrentUserID()} ${restartTime}`);
						process.exit(2);
				});
		},

		onStart: async function ({ message, event, getLang }) {
				const pathFile = `${__dirname}/tmp/restart.txt`;
				fs.writeFileSync(pathFile, `${event.threadID} ${Date.now()}`);
				await message.reply(getLang("restarting"));
				process.exit(2);
		}
};