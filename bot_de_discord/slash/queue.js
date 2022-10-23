const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Muestra la cancion que suena")
    .addNumberOption((option) => option.setName("page").setDescription("Numero de pagina de la queue").setMinValue(1)),

    run: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)
        if (!queue || !queue.playing){
            return await interaction.editReply("No hay una queue activa")
        }

        const totalPages = Math.ceil(queue.tracks.length / 10) || 1
        const page = (interaction.option.getNumber("page") || 1) -1

        if (page > totalPages)
        return await interaction.editReply('Numero de pagina invalido')

        const queueString = queue.tracks.slice(page * 10, page * 10 + 10).map((song, i) => {
            return `**${page * 10 + i + 1}.** \`[${song.duration}]\` ${song.title} -- <@${song.requestedBy.id}>`
        }).join("\n")

        const currentSong = queue.current

        await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`**Ahora esta sonando**\n` + 
                    (currentSong ? `\`[${currentSong.duration}]\` ${currentSong.title} -- <@${currentSong.requestedBy.id}>` : "Nada") +
                    `\n\n**Queue**\n${queueString}`
                    )
                    .setFooter({
                        text: `Page ${page + 1} of ${totalPages}`
                    })
                    .setThumbnail(currentSong.setThumbnail)
            ]
        })
    }
}