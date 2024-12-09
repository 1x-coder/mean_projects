

export class BookRequest{
    idBookRequest: number;
    username: string;
    idBook: number;
    title: string;
    writer: Array<string>;
    genre: Array<string>;
    publisher: string;
    pubYear: number;
    language: string;
    picture: string;
    processed: boolean;
}