export interface tokenInterface {

    "access_token": string,
    "token_type": string,
    "expires_in": number

}
export interface ArtistInterface {
    name: string;
    images: ArtistImage[];
    //Die API liefert keine eigentlichen Bilder (also keine Bilddateien), sondern nur die Adresse URL,
    // wo das Bild im Internet gespeichert ist. & eine URL iz a string
}

export interface ArtistImage {
    url: string;
    height: number;
    width: number;
}