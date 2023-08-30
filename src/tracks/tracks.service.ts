import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Tracks } from './tracks.interface';
const BASE_URL = "http://localhost:3030/tracks/"
@Injectable()
export class TracksService {
    
    async getTracks(): Promise<Tracks[]> {
        const res = await fetch(BASE_URL);
        if (!res.ok) throw new BadRequestException("Fallo el fetch")
        const parsed = res.json();       
        return parsed;
    }

    async getTrackById(id:number): Promise<Tracks> {
        const res = await fetch(BASE_URL + id);
        const parsed = await res.json();
        if (!Object.keys(parsed).length)throw new NotFoundException(`Track con id ${id} no existe`);
        return parsed;
        
    }

    async getTrackByArtist( artist:string ): Promise<Tracks[]> {
        const res = await this.getTracks();
        const parsed = res.filter((track) =>  track.artist.toLocaleLowerCase().includes(artist.toLocaleLowerCase()) );      
        if (!parsed.length) throw new NotFoundException(`No existen tracks del artista ${artist}`);
        return parsed;
    }

    async getTrackByTitle(title:string ): Promise <Tracks[]> {
        const res = await this.getTracks();
        const parsed = res.filter((track)=> track.title.toLocaleLowerCase().includes(title.toLocaleLowerCase()));
        if(!parsed.length) throw new NotFoundException(`No existe ninguna canción con el titulo ${title}`);
        return parsed;
    }

    async createTrack(track:Tracks):Promise<Tracks>{
        const id = await this.setId();
        const newTrack = {
            title: track.title,
            duration: track.duration,
            artist: track.artist,
            img: track.img,
            id };
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTrack),
        });
        const parsed = res.json();
        return parsed;
    }

    async deleteTrackById(id: number): Promise<void> {
        const comprobacion = await this.getTrackById(id);
        const res = await fetch(BASE_URL + id, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Hubo un problema al borrar el track');
    }
    

    async updateTrackById(id:number, body:Tracks): Promise<Tracks>{
        const isTrack = await this.getTrackById(id);
        const updatedTrack = {
            title: body.title,
            duration: body.duration,
            artist: body.artist,
            img: body.img,
        };        
        const res = await fetch(BASE_URL+id,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTrack),
        });
        const parsed = await res.json();     
        return parsed;
    }

    private async setId(): Promise<number>{
        const tracks=await this.getTracks();
        const id = tracks.pop().id + 1;
        return id;
    }

    
}
