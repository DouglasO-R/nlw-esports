import express, { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { convertHoursStringInMinutes } from "./util/convert-hours-string-in-minutes";
import { convertMinutesInHoursString } from "./util/convert-minutes-to-hour-string";



const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/games", async (request: Request, response: Response) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    });
    return response.status(200).json(games)
});

app.post("/games/:id/ads", async(request: Request, response: Response) => {
    const gameId = request.params.id;
    const body = request.body;

    const ad = await prisma.ad.create({
        data:{
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: convertHoursStringInMinutes(body.hourStart),
            hourEnd:convertHoursStringInMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel,
        }
    })

    return response.status(201).json(ad);
});

app.get("/games/:id/ads", async (request: Request, response: Response) => {
    const { id } = request.params;
    const ads = await prisma.ad.findMany({
        where: {
            gameId: id
        },
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return response.status(200).json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart:convertMinutesInHoursString(ad.hourStart),
            hourEnd:convertMinutesInHoursString(ad.hourEnd)
        }

    }))

});

app.get("/ads/:id/discord", async (request: Request, response: Response) => {
    const { id } = request.params;
    const ad = await prisma.ad.findUniqueOrThrow({
        select:{
            discord:true
        },

        where:{
            id
        }
    });

    return response.status(200).json({discord:ad.discord})
});




app.listen(3333, () => console.log("Runing"))