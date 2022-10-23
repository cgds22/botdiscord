const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("skipto").setDescription("Skippea a cierto numero de cancion")
    .addNumberOption((option) => 
        option.setName("tracknumber").setDescription("Cancion para skipear a").setMinValue(1).setRequired(true)),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("No hay canciones en la queue")

        const trackNum = interaction.options.getNumber("tracknumber")
        if (trackNum > queue.tracks.length)
            return await interaction.editReply("Numero de cancion invalido")
		queue.skipTo(trackNum - 1)

        await interaction.editReply(`Skippeado al tema numero ${trackNum}`)
	},
}