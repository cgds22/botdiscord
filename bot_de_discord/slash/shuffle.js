const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("shuffle")
        .setDescription("Shufflea la queue"),
    run: async ({client, interaction}) => {
        const queue= client.player.getQueue(interaction.guildId)
        
        if (!queue || !queue.playing){
            return await interaction.editReply("No hay una queue activa")
        }
    queue.shuffle()
    await interaction.editReply("La queue de ${queue.tracks.length} canciones ha sido shuffleada")
    },

}