import { Controller, Get, Param, Body, Post, Delete, Put, HttpCode, Res, HttpStatus, Query } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { Tracks } from './tracks.interface';

@Controller('/tracks')
export class TracksController {
    constructor(private readonly tracksService: TracksService){}
    
    @Get()
    getTracks(
        @Query('artist') artist?:string,
        @Query('title') title?:string
    ): Promise<Tracks[]>{      
        if (artist) return this.tracksService.getTrackByArtist(artist);
        if (title) return this.tracksService.getTrackByTitle(title);
        return this.tracksService.getTracks();
    }

    @Get('/:id')
    async getTrackById(@Param('id') id:number): Promise<any>{
        return this.tracksService.getTrackById(id);
    }

    @Post()
    createTrack(@Body()body): Promise<any>{
        return this.tracksService.createTrack(body);
    }

    @Delete('/:id')
    @HttpCode(204)
    deleteTrackById(@Param('id') id:number): Promise<void>{
        return this.tracksService.deleteTrackById(id);
    }

    @Put('/:id')
    updateTrackById(@Param('id') id:number, @Body() body): Promise<Tracks>{
        return this.tracksService.updateTrackById(id, body);
    }
}
