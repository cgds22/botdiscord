const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("skip")
        .setDescription("Skipea la cancion"),
    run: async ({client, interaction}) => {
        const queue= client.player.getQueue(interaction.guildId)
        
        if (!queue || !queue.playing){
            return await interaction.editReply("No hay una queue activa")
        }

        const currentSong = queue.currentSong

    queue.skip()
    await interaction.editReply({
        embeds: [
            new EmbedBuilder().setDescription('${currentSong.title} fue skippeada').setThumbnail(currentSong.thumbnail)
        ]
    })
    },

}