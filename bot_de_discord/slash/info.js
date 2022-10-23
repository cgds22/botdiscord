const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("info")
        .setDescription("Muestra informacion de la cancion sonando"),
    run: async ({client, interaction}) => {
        const queue= client.player.getQueue(interaction.guildId)
        
        if (!queue || !queue.playing){
            return await interaction.editReply("No hay una queue activa")
        }
    let bar = queue.createProgressBar({
        queue: false,
        length: 19
    })

    const song = queue.current

    await interaction.editReply({
        embeds: [new EmbedBuilder()
        .setThumbnail(song.thumbnail)
        .setDescription(`Currently Playing [${song.title}](${song.url})\n\n` + bar)
    ],
    })
},
}