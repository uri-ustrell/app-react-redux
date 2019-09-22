//Use CommonJA require bleow so we can dynamicaly import during build tim
if (process.env.NODE_ENV === "producction") {
	module.exports = require("./configureStore.prod");
} else {
	module.exports = require("./configureStore.dev");
}
