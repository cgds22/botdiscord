const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("resume")
        .setDescription("despausa la musica"),
    run: async ({client, interaction}) => {
        const queue= client.player.getQueue(interaction.guildId)
        
        if (!queue || !queue.playing){
            return await interaction.editReply("No hay una queue activa")
        }
    queue.setPaused(false)
    await interaction.editReply("Cancion despausada")
    },

}